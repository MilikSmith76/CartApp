import type { AxiosResponse } from 'axios';
import type { LRUCache } from 'lru-cache';

import axios from 'axios';

import type {
    ApiPaginationResponse,
    BaseResource,
    PaginationResponse,
    Parameters,
    SuccessResponse,
} from '@/interfaces';

import { DEFAULT_PAGE_SIZE, DEFAULT_REQUEST_TIMEOUT, getValue } from '@/utils';

abstract class BaseResourceService<
    UiType extends BaseResource,
    ApiType extends BaseResource,
> {
    protected endpoint: string;

    private apiToUiFunc: (value: ApiType) => UiType;

    private resourceName: string;

    private uiToApiFunc: (value: UiType) => ApiType;

    constructor(
        resourceName: string,
        apiToUiFunc: (value: ApiType) => UiType,
        uiToApiFunc: (value: UiType) => ApiType
    ) {
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

        const id = getValue(response?.id, 0);

        const cache = this.getCache();

        cache.clear();

        cache.set(this.getIndividualCacheKey(id), response);

        return response;
    }

    public async delete(id: number): Promise<SuccessResponse> {
        const { data } = await axios.delete<SuccessResponse>(
            `${this.endpoint}/${id}`,
            { timeout: DEFAULT_REQUEST_TIMEOUT }
        );

        this.getCache().clear();

        return data;
    }

    public async get(id: number): Promise<UiType> {
        const cache = this.getCache();

        const cacheKey = this.getIndividualCacheKey(id);

        const cacheHit = cache.get(cacheKey);

        if (cacheHit) {
            return cacheHit as UiType;
        }

        const { data } = await axios.get<ApiType>(`${this.endpoint}/${id}`, {
            timeout: DEFAULT_REQUEST_TIMEOUT,
        });

        const response = this.apiToUiFunc(data);

        cache.set(cacheKey, response);

        return response;
    }

    public async getPage({
        cartId,
        limit = DEFAULT_PAGE_SIZE,
        page = 0,
        search,
    }: Parameters): Promise<PaginationResponse<UiType>> {
        const cache = this.getCache();

        const cacheKey = this.getListCacheKey({ cartId, limit, page, search });

        const cacheHit = cache.get(cacheKey);

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

        cache.set(cacheKey, response);

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

        const cache = this.getCache();

        cache.clear();

        cache.set(this.getIndividualCacheKey(id), response);

        return response;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public abstract validate(body: any): UiType;

    protected abstract getCache(): LRUCache<
        string,
        UiType | PaginationResponse<UiType>
    >;

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
