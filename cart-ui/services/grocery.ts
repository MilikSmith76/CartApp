import type { AxiosResponse } from 'axios';

import axios from 'axios';

import type {
    ApiPaginationResponse,
    Grocery,
    GroceryApi,
    PaginationResponse,
    SuccessResponse,
} from '@/interfaces';

import { DEFAULT_PAGE_SIZE } from '@/utils';

class GroceryService {
    private endpoint = `${process.env.API_HOST}/groceries`;

    static apiToUi({
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

    static uiToApi({
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

    public async create(input: Grocery): Promise<Grocery> {
        const result = await axios.post<
            GroceryApi,
            AxiosResponse<GroceryApi>,
            GroceryApi
        >(this.endpoint, GroceryService.uiToApi(input));

        return GroceryService.apiToUi(result.data);
    }

    public async delete(id: number): Promise<SuccessResponse> {
        const result = await axios.delete<SuccessResponse>(
            `${this.endpoint}/${id}`
        );

        return result.data;
    }

    public async get(id: number): Promise<Grocery> {
        const result = await axios.get<GroceryApi>(`${this.endpoint}/${id}`);

        return GroceryService.apiToUi(result.data);
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
            results: result.data.results.map(GroceryService.apiToUi),
        };
    }

    public async update(id: number, input: Grocery): Promise<Grocery> {
        const result = await axios.put<
            GroceryApi,
            AxiosResponse<GroceryApi>,
            GroceryApi
        >(`${this.endpoint}/${id}`, GroceryService.uiToApi(input));

        return GroceryService.apiToUi(result.data);
    }
}

export default GroceryService;
