import type { Cart, CartApi } from '@/interfaces';

import { ENDPOINT_RESOURCES } from '@/utils';

import BaseResourceService from './baseResource';

class CartService extends BaseResourceService<Cart, CartApi> {
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
}

export default CartService;
