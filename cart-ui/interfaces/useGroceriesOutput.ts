import type { DebouncedFunc } from 'lodash';

import type { Grocery } from './grocery';

interface UseGroceriesOutput {
    clearErrorMessage: () => void;
    debouncedFetchGroceries: DebouncedFunc<
        (page?: number, search?: string) => Promise<void>
    >;
    errorMessage: string;
    fetchGroceries: (page?: number, search?: string) => Promise<void>;
    groceries: Grocery[];
    isLoading: boolean;
    total: number;
}

export type { UseGroceriesOutput };
