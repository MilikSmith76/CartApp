import type { Cart } from './cart';
import type { Grocery } from './grocery';

interface CartGrocery {
    cart?: Cart;
    cartId: number;
    grocery?: Grocery;
    groceryId: number;
    id?: number;
    purchased: boolean;
    quantity: number;
}

export type { CartGrocery };
