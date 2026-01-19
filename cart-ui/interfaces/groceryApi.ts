interface GroceryApi {
    description?: string;
    id?: number;
    image_url: string;
    name: string;
    price: number;
    purchased: boolean;
}

export type { GroceryApi };
