import type { DebouncedFunc } from 'lodash';

import type { BulkUpsertRequest } from './bulkUpsertRequest';
import type { CartGrocery } from './cartGrocery';
import type { Grocery } from './grocery';

interface UseBulkCartGroceriesRequestOutput {
    addCartGroceryItem: (cartId: number, grocery: Grocery) => void;
    bulkCartGroceriesUpsert: (
        value: BulkUpsertRequest<CartGrocery>
    ) => Promise<boolean>;
    bulkUpsert: BulkUpsertRequest<CartGrocery>;
    clearErrorMessage: () => void;
    debouncedFetchCartGroceries: DebouncedFunc<
        (cartId: number, page?: number, search?: string) => Promise<void>
    >;
    errorMessage: string;
    fetchCartGroceries: (
        cartId: number,
        page?: number,
        search?: string
    ) => Promise<void>;
    isLoading: boolean;
    removeCartGroceryItem: (index: number) => Promise<boolean>;
}

export type { UseBulkCartGroceriesRequestOutput };
