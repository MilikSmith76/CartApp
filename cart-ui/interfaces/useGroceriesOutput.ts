import { Grocery } from './grocery';

interface UseGroceriesOutput {
    clearErrorMessage: () => void;
    errorMessage: string;
    fetchGroceries: (page?: number, search?: string) => Promise<void>;
    groceries: Grocery[];
    isLoading: boolean;
    total: number;
}

export type { UseGroceriesOutput };
