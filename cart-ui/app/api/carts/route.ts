import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import type { Cart } from '@/interfaces';

import { CartService } from '@/services';
import { getNumberParametersErrorResponse, getRequestParams } from '@/utils';

const cartService = new CartService();

const GET = async (request: NextRequest): Promise<NextResponse> => {
    const { limit, page } = getRequestParams(request.nextUrl.searchParams);

    const errorResponse = getNumberParametersErrorResponse(
        ['page', 'limit'],
        [page as string, limit as string]
    );

    if (errorResponse) {
        return errorResponse;
    }

    const response = await cartService.getPage({ limit, page });

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
