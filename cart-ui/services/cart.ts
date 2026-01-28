import { keys } from 'lodash';
import { LRUCache } from 'lru-cache';

import type { Cart, CartApi, PaginationResponse } from '@/interfaces';

import {
    BAD_REQUEST_ERROR,
    DEFAULT_CACHE_TIME_TO_LIVE,
    DEFAULT_MAX_CACHE_SIZE,
    ENDPOINT_RESOURCES,
    RequestError,
} from '@/utils';
import { cartValidator } from '@/validators';

import BaseResourceService from './baseResource';

class CartService extends BaseResourceService<Cart, CartApi> {
    private static cache: LRUCache<string, Cart | PaginationResponse<Cart>>;

    constructor() {
        super(
            ENDPOINT_RESOURCES.carts,
            CartService.apiToUi,
            CartService.uiToApi
        );
    }

    static apiToUi(value: CartApi): Cart {
        // No further processing required because the Cart representation in
        // the ui and the api are the same.
        return value;
    }

    static uiToApi(value: Cart): CartApi {
        // No further processing required because the Cart representation in
        // the ui and the api are the same.
        return value;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public validate({ description, id, name }: any): Cart {
        const cart: Cart = {
            description,
            id: id && !isNaN(id) ? +id : undefined,
            name,
        };

        const validationErrors = cartValidator(cart);

        if (keys(validationErrors).length > 0) {
            throw new RequestError('Invalid Request', BAD_REQUEST_ERROR);
        }

        return cart;
    }

    protected getCache(): LRUCache<string, Cart | PaginationResponse<Cart>> {
        if (!CartService.cache) {
            CartService.cache = new LRUCache({
                max: DEFAULT_MAX_CACHE_SIZE,
                ttl: DEFAULT_CACHE_TIME_TO_LIVE,
            });
        }

        return CartService.cache;
    }
}

export default CartService;
