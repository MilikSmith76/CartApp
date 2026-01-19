import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import type { Cart } from '@/interfaces';

import { CartService } from '@/services';
import { BAD_REQUEST, getRequestParams } from '@/utils';

const cartService = new CartService();

const GET = async (request: NextRequest): Promise<NextResponse> => {
    const { limit, page } = getRequestParams(request.nextUrl.searchParams);

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

    const response = await cartService.getPage(page, limit);

    return NextResponse.json(response);
};

const POST = async (request: NextRequest): Promise<NextResponse> => {
    const { description, name } = await request.json();

    const input: Cart = {
        description,
        name,
    };

    const response = await cartService.create(input);

    return NextResponse.json(response);
};

export { GET, POST };
