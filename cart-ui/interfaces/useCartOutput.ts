import type { Cart } from './cart';

interface UseCartOutput {
    cart?: Cart;
    clearErrorMessage: () => void;
    createCart: (value?: Cart) => Promise<boolean>;
    deleteCart: () => Promise<boolean>;
    errorMessage: string;
    fetchCart: (id?: string) => Promise<void>;
    isLoading: boolean;
    updateCart: (value?: Cart) => Promise<boolean>;
}

export type { UseCartOutput };
