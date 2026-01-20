import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import type { Grocery } from '@/interfaces';

import { GroceryService } from '@/services';
import { getNumberParametersErrorResponse, getRequestParams } from '@/utils';

const grocerySerice = new GroceryService();

const GET = async (request: NextRequest): Promise<NextResponse> => {
    const { limit, page, search } = getRequestParams(
        request.nextUrl.searchParams
    );

    const errorResponse = getNumberParametersErrorResponse(
        ['page', 'limit'],
        [page, limit]
    );

    if (errorResponse) {
        return errorResponse;
    }

    const response = await grocerySerice.getPage(page, limit, search);

    return NextResponse.json(response);
};

const POST = async (request: NextRequest): Promise<NextResponse> => {
    const { description, imageUrl, name, price, purchased } =
        await request.json();

    const input: Grocery = {
        description,
        imageUrl,
        name,
        price,
        purchased,
    };

    const response = await grocerySerice.create(input);

    return NextResponse.json(response);
};

export { GET, POST };
