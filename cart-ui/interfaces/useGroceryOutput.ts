import { Grocery } from './grocery';

interface UseGroceryOutput {
    clearErrorMessage: () => void;
    createGrocery: (value?: Grocery) => Promise<boolean>;
    deleteGrocery: () => Promise<boolean>;
    errorMessage: string;
    fetchGrocery: (id?: string) => Promise<void>;
    grocery?: Grocery;
    isLoading: boolean;
    updateGrocery: (value?: Grocery) => Promise<boolean>;
}

export type { UseGroceryOutput };
