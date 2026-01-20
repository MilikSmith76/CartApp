import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import type { Grocery } from '@/interfaces';

import { GroceryService } from '@/services';
import { getRequiredIdErrorResponse } from '@/utils';

const groceryService = new GroceryService();

const GET = async (
    _request: NextRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
): Promise<NextResponse> => {
    const { id } = await context.params;

    const errorResponse = getRequiredIdErrorResponse(id);

    if (errorResponse) {
        return errorResponse;
    }

    const response = await groceryService.get(+id);

    return NextResponse.json(response);
};

const PUT = async (
    request: NextRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
): Promise<NextResponse> => {
    const { id } = await context.params;

    const errorResponse = getRequiredIdErrorResponse(id);

    if (errorResponse) {
        return errorResponse;
    }

    const { description, imageUrl, name, price, purchased } =
        await request.json();

    const input: Grocery = {
        description,
        id: +id,
        imageUrl,
        name,
        price,
        purchased,
    };

    const response = await groceryService.update(+id, input);

    return NextResponse.json(response);
};

const DELETE = async (
    _request: NextRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
): Promise<NextResponse> => {
    const { id } = await context.params;

    const errorResponse = getRequiredIdErrorResponse(id);

    if (errorResponse) {
        return errorResponse;
    }

    const response = await groceryService.delete(+id);

    return NextResponse.json(response);
};

export { DELETE, GET, PUT };
