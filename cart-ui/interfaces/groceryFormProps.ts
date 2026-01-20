import type { Grocery } from './grocery';

interface GroceryFormProps {
    formHeader: string;
    grocery?: Grocery;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (value: any) => Promise<void>;
}

export type { GroceryFormProps };
