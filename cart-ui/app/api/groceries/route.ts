import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import type { Grocery } from '@/interfaces';

import { GroceryService } from '@/services';
import { BAD_REQUEST, getRequestParams } from '@/utils';

const grocerySerice = new GroceryService();

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

    const response = await grocerySerice.getPage(page, limit);

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
