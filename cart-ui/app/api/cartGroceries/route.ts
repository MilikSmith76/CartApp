import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { CartGroceryService } from '@/services';
import { BAD_REQUEST, getRequestParams } from '@/utils';

const cartGroceryService = new CartGroceryService();

const GET = async (request: NextRequest): Promise<NextResponse> => {
    const { cartId, limit, page } = getRequestParams(
        request.nextUrl.searchParams
    );

    if (limit && isNaN(+cartId)) {
        return NextResponse.json(
            { error: 'Param "cartId" must be a number if provided.' },
            { status: BAD_REQUEST }
        );
    }

    if (page && isNaN(+page)) {
        return NextResponse.json(
            { error: 'Param "page" must be a number if provided.' },
            { status: BAD_REQUEST }
        );
    }

    if (limit && isNaN(+limit)) {
        return NextResponse.json(
            { error: 'Param "limit" must be a number if provided.' },
            { status: BAD_REQUEST }
        );
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
