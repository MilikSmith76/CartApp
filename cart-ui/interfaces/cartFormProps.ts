import type { Cart } from './cart';

interface CartFormProps {
    cart?: Cart;
    formHeader: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (value: any) => Promise<void>;
}

export type { CartFormProps };
