import type { BulkUpsertRequest } from '@/interfaces';

const BAD_REQUEST = 400;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEFAULT_BULK_REQUEST: BulkUpsertRequest<any> = { items: [] };

const DEFAULT_CACHE_TIME_TO_LIVE = 5 * 60 * 1000;

const DEFAULT_DEBOUNCE_TIME_MS = 300;

const DEFAULT_DEDUPE_INTERVAL = 10 * 60 * 1000;

const DEFAULT_ERROR_RETRIES = 3;

const DEFAULT_ERROR_RETRY_INTERVAL = 60 * 1000;

const DEFAULT_EXTERNAL_IMAGE_HEIGHT = 400;

const DEFAULT_EXTERNAL_IMAGE_WIDTH = 400;

const DEFAULT_MAX_CACHE_SIZE = 500;

const DEFAULT_MAX_CART_GROCERIES = 1000;

const DEFAULT_PAGE_SIZE = 20;

const DEFAULT_REFRESH_INTERVAL = 10 * 60 * 1000;

const DEFAULT_REQUEST_TIMEOUT = 10 * 1000;

const FORM_REQUIRED_FEILD_ERROR = 'Field required';

const ROUTES = {
    apiCartGroceries: '/api/cartGroceries',
    apiCarts: '/api/carts',
    apiGroceries: '/api/groceries',
    carts: '/carts',
    groceries: '/groceries',
};

const ENDPOINT_RESOURCES = {
    cartGrocery: 'cart_groceries',
    carts: 'carts',
    groceries: 'groceries',
};

export {
    BAD_REQUEST,
    DEFAULT_BULK_REQUEST,
    DEFAULT_CACHE_TIME_TO_LIVE,
    DEFAULT_DEBOUNCE_TIME_MS,
    DEFAULT_DEDUPE_INTERVAL,
    DEFAULT_ERROR_RETRIES,
    DEFAULT_ERROR_RETRY_INTERVAL,
    DEFAULT_EXTERNAL_IMAGE_HEIGHT,
    DEFAULT_EXTERNAL_IMAGE_WIDTH,
    DEFAULT_MAX_CACHE_SIZE,
    DEFAULT_MAX_CART_GROCERIES,
    DEFAULT_PAGE_SIZE,
    DEFAULT_REFRESH_INTERVAL,
    DEFAULT_REQUEST_TIMEOUT,
    ENDPOINT_RESOURCES,
    FORM_REQUIRED_FEILD_ERROR,
    ROUTES,
};
