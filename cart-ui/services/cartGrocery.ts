import type { AxiosResponse } from 'axios';

import axios from 'axios';
import { keys } from 'lodash';
import { LRUCache } from 'lru-cache';

import type {
    BulkUpsertRequest,
    BulkUpsertResponse,
    CartGrocery,
    CartGroceryApi,
    GroceryApi,
    PaginationResponse,
} from '@/interfaces';

import {
    BAD_REQUEST_ERROR,
    DEFAULT_CACHE_TIME_TO_LIVE,
    DEFAULT_MAX_CACHE_SIZE,
    DEFAULT_REQUEST_TIMEOUT,
    ENDPOINT_RESOURCES,
    getNumber,
    getValue,
    RequestError,
} from '@/utils';
import { cartGroceryValidator } from '@/validators';

import BaseResourceService from './baseResource';
import GroceryService from './grocery';

class CartGroceryService extends BaseResourceService<
    CartGrocery,
    CartGroceryApi
> {
    private static cache: LRUCache<
        string,
        CartGrocery | PaginationResponse<CartGrocery>
    >;

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
        const cartId = getValue(cart?.id, 0);

        const groceryId = getValue(apiGrocery?.id, 0);

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

        this.getCache().clear();

        return response;
    }

    public validate({
        cartId,
        groceryId,
        id,
        purchased,
        quantity,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }: any): CartGrocery {
        const cartGrocery: CartGrocery = {
            cartId,
            groceryId,
            id: getNumber(id),
            purchased,
            quantity,
        };

        const validationErrors = cartGroceryValidator(cartGrocery);

        if (keys(validationErrors).length > 0) {
            throw new RequestError('Invalid Request', BAD_REQUEST_ERROR);
        }

        return cartGrocery;
    }

    protected getCache(): LRUCache<
        string,
        CartGrocery | PaginationResponse<CartGrocery>
    > {
        if (!CartGroceryService.cache) {
            CartGroceryService.cache = new LRUCache({
                max: DEFAULT_MAX_CACHE_SIZE,
                ttl: DEFAULT_CACHE_TIME_TO_LIVE,
            });
        }

        return CartGroceryService.cache;
    }
}

export default CartGroceryService;
