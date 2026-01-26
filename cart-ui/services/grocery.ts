import type { Grocery, GroceryApi } from '@/interfaces';

import { ENDPOINT_RESOURCES } from '@/utils';

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
}

export default GroceryService;
