import type { CartApi } from './cartApi';
import type { GroceryApi } from './groceryApi';

interface CartGroceryApi {
    cart?: CartApi;
    cart_id: number;
    grocery?: GroceryApi;
    grocery_id: number;
    id?: number;
    purchased: boolean;
    quantity: number;
}

export type { CartGroceryApi };
