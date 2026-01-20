import type { BulkUpsertRequest } from './bulkUpsertRequest';
import type { CartGrocery } from './cartGrocery';

interface CartGroceriesFormProps {
    bulkUpsertRequest: BulkUpsertRequest<CartGrocery>;
    formHeader: string;
    onItemDelete: (index: number) => () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (value: any) => Promise<void>;
}

export type { CartGroceriesFormProps };
