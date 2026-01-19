import axios from 'axios';

import type {
    ApiPaginationResponse,
    Grocery,
    GroceryApi,
    PaginationResponse,
} from '@/interfaces';

import { DEFAULT_PAGE_SIZE } from '@/utils';

class GroceryService {
    private endpoint = `${process.env.API_HOST}/groceries`;

    public async create(input: Grocery): Promise<Grocery> {
        const result = await axios.post<GroceryApi>(
            this.endpoint,
            input,
        );

        return this.apiToUi(result.data);
    }

    public async get(id: number): Promise<Grocery> {
        const result = await axios.get<GroceryApi>(`${this.endpoint}/${id}`);

        return this.apiToUi(result.data);;
    }

    public async getPage(
        page: number = 0,
        limit: number = DEFAULT_PAGE_SIZE
    ): Promise<PaginationResponse<Grocery>> {
        const offset = page * limit;

        const result = await axios.get<ApiPaginationResponse<GroceryApi>>(
            this.endpoint,
            {
                params: {
                    limit,
                    offset,
                },
            }
        );

        return {
            count: result.data.count,
            results: result.data.results.map(this.apiToUi),
        };
    }

    private apiToUi({
        description,
        id,
        image_url,
        name,
        price,
        purchased,
    }: GroceryApi): Grocery {
        return {
            description,
            id,
            imageUrl: image_url,
            name,
            price,
            purchased,
        };
    }

    private uiToApi({
        description,
        id,
        imageUrl,
        name,
        price,
        purchased,
    }: Grocery): GroceryApi {
        return {
            description,
            id,
            image_url: imageUrl,
            name,
            price,
            purchased,
        };
    }
}

export default GroceryService;
