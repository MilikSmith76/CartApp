interface RouteParameters {
    params: Promise<{ [param: string]: string }>;
}

export type { RouteParameters };
