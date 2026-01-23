import type { DebouncedFunc } from 'lodash';

import type { Cart } from './cart';

interface UseCartsOutput {
    carts: Cart[];
    clearErrorMessage: () => void;
    debouncedFetchCarts: DebouncedFunc<
        (page?: number, search?: string) => Promise<void>
    >;
    errorMessage: string;
    fetchCarts: (page?: number, search?: string) => Promise<void>;
    isLoading: boolean;
    total: number;
}

export type { UseCartsOutput };
