// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRequestParams = (searchParams: URLSearchParams): any => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {};

    searchParams.forEach((value, key) => {
        params[key] = value;
    });

    return params;
};

export { BAD_REQUEST, DEFAULT_PAGE_SIZE } from './constants';
