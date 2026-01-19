import type { AxiosResponse } from 'axios';

import axios from 'axios';

import type {
    ApiPaginationResponse,
    BulkUpsertRequest,
    BulkUpsertResponse,
    CartGrocery,
    CartGroceryApi,
    GroceryApi,
    PaginationResponse,
    SuccessResponse,
} from '@/interfaces';

import { DEFAULT_PAGE_SIZE } from '@/utils';

import GroceryService from './grocery';

class CartGroceryService {
    private endpoint = `${process.env.API_HOST}/cart_groceries`;

    static apiToUi({
        cart,
        grocery: apiGrocery,
        id,
        purchased,
        quantity,
    }: CartGroceryApi): CartGrocery {
        const cartId = cart?.id ?? 0;

        const groceryId = apiGrocery?.id ?? 0;

        const grocery = GroceryService.apiToUi(
            apiGrocery as unknown as GroceryApi
        );

        return {
            cart,
            cartId,
            grocery,
            groceryId,
            id,
            purchased,
            quantity,
        };
    }

    static uiToApi({
        cartId,
        groceryId,
        id,
        purchased,
        quantity,
    }: CartGrocery): CartGroceryApi {
        return {
            cart_id: cartId,
            grocery_id: groceryId,
            id,
            purchased,
            quantity,
        };
    }

    public async bulkUpsert(input: CartGrocery[]): Promise<CartGrocery[]> {
        const request: BulkUpsertRequest<CartGroceryApi> = {
            items: input.map(CartGroceryService.uiToApi),
        };

        const result = await axios.put<
            BulkUpsertResponse<CartGroceryApi>,
            AxiosResponse<BulkUpsertResponse<CartGroceryApi>>,
            BulkUpsertRequest<CartGroceryApi>
        >(this.endpoint, request);

        return result.data.items.map(CartGroceryService.apiToUi);
    }

    public async delete(id: number): Promise<SuccessResponse> {
        const result = await axios.delete<SuccessResponse>(
            `${this.endpoint}/${id}`
        );

        return result.data;
    }

    public async get(id: number): Promise<CartGrocery> {
        const result = await axios.get<CartGroceryApi>(
            `${this.endpoint}/${id}`
        );

        return CartGroceryService.apiToUi(result.data);
    }

    public async getPage(
        page: number = 0,
        limit: number = DEFAULT_PAGE_SIZE
    ): Promise<PaginationResponse<CartGrocery>> {
        const offset = page * limit;

        const result = await axios.get<ApiPaginationResponse<CartGroceryApi>>(
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
            results: result.data.results.map(CartGroceryService.apiToUi),
        };
    }
}

export default CartGroceryService;
