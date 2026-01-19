interface PaginationResponse<ResponseType> {
    count: number;
    results: ResponseType[];
}

export type { PaginationResponse };
