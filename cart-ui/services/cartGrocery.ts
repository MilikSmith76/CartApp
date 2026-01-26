import type { AxiosResponse } from 'axios';

import axios from 'axios';

import type {
    BulkUpsertRequest,
    BulkUpsertResponse,
    CartGrocery,
    CartGroceryApi,
    GroceryApi,
} from '@/interfaces';

import { DEFAULT_REQUEST_TIMEOUT, ENDPOINT_RESOURCES } from '@/utils';

import BaseResourceService from './baseResource';
import GroceryService from './grocery';

class CartGroceryService extends BaseResourceService<
    CartGrocery,
    CartGroceryApi
> {
    constructor() {
        super(
            ENDPOINT_RESOURCES.cartGrocery,
            CartGroceryService.apiToUi,
            CartGroceryService.uiToApi
        );
    }

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

    public async bulkUpsert(
        input: CartGrocery[]
    ): Promise<BulkUpsertResponse<CartGrocery>> {
        const request: BulkUpsertRequest<CartGroceryApi> = {
            items: input.map(CartGroceryService.uiToApi),
        };

        const { data } = await axios.put<
            BulkUpsertResponse<CartGroceryApi>,
            AxiosResponse<BulkUpsertResponse<CartGroceryApi>>,
            BulkUpsertRequest<CartGroceryApi>
        >(this.endpoint, request, { timeout: DEFAULT_REQUEST_TIMEOUT });

        const response: BulkUpsertResponse<CartGrocery> = {
            items: data.items.map(CartGroceryService.apiToUi),
        };

        this.cache.clear();

        return response;
    }
}

export default CartGroceryService;
