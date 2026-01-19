import axios from 'axios';

import type {
    ApiPaginationResponse,
    Cart,
    CartApi,
    PaginationResponse,
} from '@/interfaces';

import { DEFAULT_PAGE_SIZE } from '@/utils';

class CartService {
    private endpoint = `${process.env.API_HOST}/carts`;

    public async create(input: Cart): Promise<Cart> {
        const result = await axios.post<CartApi>(this.endpoint, input);

        return result.data;
    }

    public async get(id: number): Promise<Cart> {
        const result = await axios.get<CartApi>(`${this.endpoint}/${id}`);

        return result.data;
    }

    public async getPage(
        page: number = 0,
        limit: number = DEFAULT_PAGE_SIZE
    ): Promise<PaginationResponse<Cart>> {
        const offset = page * limit;

        const result = await axios.get<ApiPaginationResponse<CartApi>>(
            this.endpoint,
            {
                params: {
                    limit,
                    offset,
                },
            }
        );

        // No further processing required because the Cart representation in
        // the ui and the api are the same.
        return {
            count: result.data.count,
            results: result.data.results as Cart[],
        };
    }
}

export default CartService;
