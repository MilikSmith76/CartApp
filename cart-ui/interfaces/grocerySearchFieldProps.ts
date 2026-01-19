import type { Grocery } from './grocery';

interface GrocerySearchFieldProps {
    onAddGrocery?: (grocery: Grocery) => void;
}

export type { GrocerySearchFieldProps };
