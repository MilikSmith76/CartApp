import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { CartGroceryService } from '@/services';
import {
    getErrorResponse,
    getNumberParametersErrorResponse,
    getRequestParams,
} from '@/utils';

const cartGroceryService = new CartGroceryService();

const GET = async (request: NextRequest): Promise<NextResponse> => {
    const { cartId, limit, page } = getRequestParams(
        request.nextUrl.searchParams
    );

    const errorResponse = getNumberParametersErrorResponse(
        ['cartId', 'page', 'limit'],
        [cartId as string, page as string, limit as string]
    );

    if (errorResponse) {
        return errorResponse;
    }

    const response = await cartGroceryService.getPage({ cartId, limit, page });

    return NextResponse.json(response);
};

const PUT = async (request: NextRequest): Promise<NextResponse> => {
    const { items } = await request.json();

    try {
        const response = await cartGroceryService.bulkUpsert(items);

        return NextResponse.json(response);
    } catch (error) {
        return getErrorResponse(error);
    }
};

export { GET, PUT };
