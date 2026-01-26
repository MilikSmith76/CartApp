import type { AxiosResponse } from 'axios';

import axios from 'axios';
import { LRUCache } from 'lru-cache';

import type {
    ApiPaginationResponse,
    Cart,
    CartApi,
    PaginationResponse,
    Parameters,
    SuccessResponse,
} from '@/interfaces';

import {
    DEFAULT_CACHE_TIME_TO_LIVE,
    DEFAULT_MAX_CACHE_SIZE,
    DEFAULT_PAGE_SIZE,
    DEFAULT_REQUEST_TIMEOUT,
    ENDPOINT_RESOURCES
} from '@/utils';

class CartService {
    private cache = new LRUCache({
        max: DEFAULT_MAX_CACHE_SIZE,
        ttl: DEFAULT_CACHE_TIME_TO_LIVE,
    });

    private endpoint = `${process.env.API_HOST}/${ENDPOINT_RESOURCES.carts}`;

    public async create(input: Cart): Promise<Cart> {
        const result = await axios.post<
            CartApi,
            AxiosResponse<CartApi>,
            CartApi
        >(this.endpoint, input, { timeout: DEFAULT_REQUEST_TIMEOUT });

        const id = result.data?.id ?? 0;

        this.cache.clear();

        this.cache.set(
            this.getIndividualCacheKey(id),
            result.data
        );

        return result.data;
    }

    public async delete(id: number): Promise<SuccessResponse> {
        const result = await axios.delete<SuccessResponse>(
            `${this.endpoint}/${id}`,
            { timeout: DEFAULT_REQUEST_TIMEOUT }
        );

        this.cache.clear();

        return result.data;
    }

    public async get(id: number): Promise<Cart> {
        const cacheKey = this.getIndividualCacheKey(id);

        const cacheHit = this.cache.get(cacheKey);

        if (cacheHit) {
            return cacheHit as Cart;
        }

        const result = await axios.get<CartApi>(`${this.endpoint}/${id}`, {
            timeout: DEFAULT_REQUEST_TIMEOUT,
        });

        this.cache.set(cacheKey, result.data);

        return result.data;
    }

    public async getPage(
        page: number = 0,
        limit: number = DEFAULT_PAGE_SIZE
    ): Promise<PaginationResponse<Cart>> {
        const cacheKey = this.getListCacheKey({ limit, page });

        const cacheHit = this.cache.get(cacheKey);

        if (cacheHit) {
            return cacheHit as PaginationResponse<Cart>;
        }

        const offset = page * limit;

        const result = await axios.get<ApiPaginationResponse<CartApi>>(
            this.endpoint,
            {
                params: {
                    limit,
                    offset,
                },
                timeout: DEFAULT_REQUEST_TIMEOUT,
            }
        );

        this.cache.set(cacheKey, result.data);

        // No further processing required because the Cart representation in
        // the ui and the api are the same.
        const response: PaginationResponse<Cart> = {
            count: result.data.count,
            results: result.data.results,
        };

        return response;
    }

    public async update(id: number, input: Cart): Promise<Cart> {
        const result = await axios.put<
            CartApi,
            AxiosResponse<CartApi>,
            CartApi
        >(`${this.endpoint}/${id}`, input, {
            timeout: DEFAULT_REQUEST_TIMEOUT,
        });

        this.cache.clear();

        this.cache.set(this.getIndividualCacheKey(id), result.data);

        return result.data;
    }

    private getIndividualCacheKey(id: number): string {
        return `${ENDPOINT_RESOURCES.carts}/${id}`;
    }

    private getListCacheKey(params: Parameters): string {
        const keys = Object.keys(params);

        const paramList: string[] = [];

        keys.forEach((key) => {
            paramList.push(`${key}=${params[key]}`);
        });

        return `${ENDPOINT_RESOURCES.carts}?${paramList.join('&')}`;
    }
}

export default CartService;
