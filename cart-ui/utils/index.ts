// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRequestParams = (searchParams: URLSearchParams): any => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {};

    searchParams.forEach((value, key) => {
        params[key] = value;
    });

    return params;
};

export {
    BAD_REQUEST,
    DEFAULT_EXTERNAL_IMAGE_HEIGHT,
    DEFAULT_EXTERNAL_IMAGE_WIDTH,
    DEFAULT_PAGE_SIZE,
    FORM_REQUIRED_FEILD_ERROR,
} from './constants';
