import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import type { Cart } from '@/interfaces';

import { CartService } from '@/services';
import { BAD_REQUEST } from '@/utils';

const cartService = new CartService();

const GET = async (
    _request: NextRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
): Promise<NextResponse> => {
    const { id } = await context.params;

    if (isNaN(+id)) {
        return NextResponse.json(
            { error: `${id} is not a valid id` },
            { status: BAD_REQUEST }
        );
    }

    const response = await cartService.get(+id);

    return NextResponse.json(response);
};

const PUT = async (
    request: NextRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
): Promise<NextResponse> => {
    const { id } = await context.params;

    if (isNaN(+id)) {
        return NextResponse.json(
            { error: `${id} is not a valid id` },
            { status: BAD_REQUEST }
        );
    }

    const { description, name } = await request.json();

    const input: Cart = {
        description,
        id: +id,
        name,
    };

    const response = await cartService.update(+id, input);

    return NextResponse.json(response);
};

const DELETE = async (
    _request: NextRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
): Promise<NextResponse> => {
    const { id } = await context.params;

    if (isNaN(+id)) {
        return NextResponse.json(
            { error: `${id} is not a valid id` },
            { status: BAD_REQUEST }
        );
    }

    const response = await cartService.delete(+id);

    return NextResponse.json(response);
};

export { DELETE, GET, PUT };
