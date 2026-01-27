import type { CartGrocery } from './cartGrocery';

interface UseCartGroceryOutput {
    cartGrocery?: CartGrocery;
    clearErrorMessage: () => void;
    createCartGrocery: (value?: CartGrocery) => Promise<boolean>;
    deleteCartGrocery: () => Promise<boolean>;
    errorMessage: string;
    fetchCartGrocery: (id?: string) => Promise<void>;
    finishInitialLoading: () => void;
    isLoading: boolean;
    updateCartGrocery: (value?: CartGrocery) => Promise<boolean>;
}

export type { UseCartGroceryOutput };
