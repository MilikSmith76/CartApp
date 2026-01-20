import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { CartGroceryService } from '@/services';
import { getNumberParametersErrorResponse, getRequestParams } from '@/utils';

const cartGroceryService = new CartGroceryService();

const GET = async (request: NextRequest): Promise<NextResponse> => {
    const { cartId, limit, page } = getRequestParams(
        request.nextUrl.searchParams
    );

    const errorResponse = getNumberParametersErrorResponse(
        ['cartId', 'page', 'limit'],
        [cartId, page, limit]
    );

    if (errorResponse) {
        return errorResponse;
    }

    const response = await cartGroceryService.getPage(cartId, page, limit);

    return NextResponse.json(response);
};

const PUT = async (request: NextRequest): Promise<NextResponse> => {
    const { items } = await request.json();

    const response = await cartGroceryService.bulkUpsert(items);

    return NextResponse.json(response);
};

export { GET, PUT };
