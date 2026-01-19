interface ApiPaginationResponse<ResponseType> {
    count: number;
    next?: string;
    previos?: string;
    results: ResponseType[];
}

export type { ApiPaginationResponse };
