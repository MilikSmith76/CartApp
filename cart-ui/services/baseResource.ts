import type { AxiosResponse } from 'axios';

import axios from 'axios';
import { LRUCache } from 'lru-cache';

import type {
    ApiPaginationResponse,
    BaseResource,
    PaginationResponse,
    Parameters,
    SuccessResponse,
} from '@/interfaces';

import {
    DEFAULT_CACHE_TIME_TO_LIVE,
    DEFAULT_MAX_CACHE_SIZE,
    DEFAULT_PAGE_SIZE,
    DEFAULT_REQUEST_TIMEOUT,
} from '@/utils';

abstract class BaseResourceService<
    UiType extends BaseResource,
    ApiType extends BaseResource,
> {
    protected cache: LRUCache<string, UiType | PaginationResponse<UiType>>;

    protected endpoint: string;

    private apiToUiFunc: (value: ApiType) => UiType;

    private resourceName: string;

    private uiToApiFunc: (value: UiType) => ApiType;

    constructor(
        resourceName: string,
        apiToUiFunc: (value: ApiType) => UiType,
        uiToApiFunc: (value: UiType) => ApiType
    ) {
        this.cache = new LRUCache({
            max: DEFAULT_MAX_CACHE_SIZE,
            ttl: DEFAULT_CACHE_TIME_TO_LIVE,
        });

        this.endpoint = `${process.env.API_HOST}/${resourceName}`;
        this.resourceName = resourceName;

        this.apiToUiFunc = apiToUiFunc;
        this.uiToApiFunc = uiToApiFunc;
    }

    public async create(input: UiType): Promise<UiType> {
        const { data } = await axios.post<
            ApiType,
            AxiosResponse<ApiType>,
            ApiType
        >(this.endpoint, this.uiToApiFunc(input), {
            timeout: DEFAULT_REQUEST_TIMEOUT,
        });

        const response = this.apiToUiFunc(data);

        const id = response?.id ?? 0;

        this.cache.clear();

        this.cache.set(this.getIndividualCacheKey(id), response);

        return response;
    }

    public async delete(id: number): Promise<SuccessResponse> {
        const { data } = await axios.delete<SuccessResponse>(
            `${this.endpoint}/${id}`,
            { timeout: DEFAULT_REQUEST_TIMEOUT }
        );

        this.cache.clear();

        return data;
    }

    public async get(id: number): Promise<UiType> {
        const cacheKey = this.getIndividualCacheKey(id);

        const cacheHit = this.cache.get(cacheKey);

        if (cacheHit) {
            return cacheHit as UiType;
        }

        const { data } = await axios.get<ApiType>(`${this.endpoint}/${id}`, {
            timeout: DEFAULT_REQUEST_TIMEOUT,
        });

        const response = this.apiToUiFunc(data);

        this.cache.set(cacheKey, response);

        return response;
    }

    public async getPage({
        cartId,
        limit = DEFAULT_PAGE_SIZE,
        page = 0,
        search,
    }: Parameters): Promise<PaginationResponse<UiType>> {
        const cacheKey = this.getListCacheKey({ cartId, limit, page, search });

        const cacheHit = this.cache.get(cacheKey);

        if (cacheHit) {
            return cacheHit as PaginationResponse<UiType>;
        }

        const offset = +page * +limit;

        const { data } = await axios.get<ApiPaginationResponse<ApiType>>(
            this.endpoint,
            {
                params: {
                    cart_id: cartId,
                    limit,
                    offset,
                    search,
                },
                timeout: DEFAULT_REQUEST_TIMEOUT,
            }
        );

        const response: PaginationResponse<UiType> = {
            count: data.count,
            results: data.results.map(this.apiToUiFunc),
        };

        this.cache.set(cacheKey, response);

        return response;
    }

    public async update(id: number, input: UiType): Promise<UiType> {
        const { data } = await axios.put<
            ApiType,
            AxiosResponse<ApiType>,
            ApiType
        >(`${this.endpoint}/${id}`, this.uiToApiFunc(input), {
            timeout: DEFAULT_REQUEST_TIMEOUT,
        });

        const response = this.apiToUiFunc(data);

        this.cache.clear();

        this.cache.set(this.getIndividualCacheKey(id), response);

        return response;
    }

    private getIndividualCacheKey(id: number): string {
        return `${this.resourceName}/${id}`;
    }

    private getListCacheKey(params: Parameters): string {
        const keys = Object.keys(params);

        const paramList: string[] = [];

        keys.forEach((key) => {
            if (!key) {
                return;
            }

            paramList.push(`${key}=${params[key]}`);
        });

        return `${this.resourceName}?${paramList.join('&')}`;
    }
}

export default BaseResourceService;
