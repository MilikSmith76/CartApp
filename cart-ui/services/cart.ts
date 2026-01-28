import { keys } from 'lodash';

import type { Cart, CartApi } from '@/interfaces';

import { BAD_REQUEST_ERROR, ENDPOINT_RESOURCES, RequestError } from '@/utils';
import { cartValidator } from '@/validators';

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
}

export default CartService;
