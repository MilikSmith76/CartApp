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
