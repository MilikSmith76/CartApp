import { keys } from 'lodash';
import { LRUCache } from 'lru-cache';

import type { Grocery, GroceryApi, PaginationResponse } from '@/interfaces';

import {
    BAD_REQUEST_ERROR,
    DEFAULT_CACHE_TIME_TO_LIVE,
    DEFAULT_MAX_CACHE_SIZE,
    ENDPOINT_RESOURCES,
    getNumber,
    RequestError,
} from '@/utils';
import { groceryValidator } from '@/validators';

import BaseResourceService from './baseResource';

class GroceryService extends BaseResourceService<Grocery, GroceryApi> {
    private static cache: LRUCache<
        string,
        Grocery | PaginationResponse<Grocery>
    >;

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
            id: getNumber(id),
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

    protected getCache(): LRUCache<
        string,
        Grocery | PaginationResponse<Grocery>
    > {
        if (!GroceryService.cache) {
            GroceryService.cache = new LRUCache({
                max: DEFAULT_MAX_CACHE_SIZE,
                ttl: DEFAULT_CACHE_TIME_TO_LIVE,
            });
        }

        return GroceryService.cache;
    }
}

export default GroceryService;
