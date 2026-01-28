import { keys } from 'lodash';

import type { Grocery, GroceryApi } from '@/interfaces';

import { BAD_REQUEST_ERROR, ENDPOINT_RESOURCES, RequestError } from '@/utils';
import { groceryValidator } from '@/validators';

import BaseResourceService from './baseResource';

class GroceryService extends BaseResourceService<Grocery, GroceryApi> {
    constructor() {
        super(
            ENDPOINT_RESOURCES.groceries,
            GroceryService.apiToUi,
            GroceryService.uiToApi
        );
    }

    static apiToUi({
        description,
        id,
        image_url,
        name,
        price,
        purchased,
    }: GroceryApi): Grocery {
        return {
            description,
            id,
            imageUrl: image_url,
            name,
            price,
            purchased,
        };
    }

    static uiToApi({
        description,
        id,
        imageUrl,
        name,
        price,
        purchased,
    }: Grocery): GroceryApi {
        return {
            description,
            id,
            image_url: imageUrl,
            name,
            price,
            purchased,
        };
    }

    public validate({
        description,
        id,
        imageUrl,
        name,
        price,
        purchased,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }: any): Grocery {
        const grocery: Grocery = {
            description,
            id: id && !isNaN(id) ? +id : undefined,
            imageUrl,
            name,
            price,
            purchased,
        };

        const validationErrors = groceryValidator(grocery);

        if (keys(validationErrors).length > 0) {
            throw new RequestError('Invalid Request', BAD_REQUEST_ERROR);
        }

        return grocery;
    }
}

export default GroceryService;
