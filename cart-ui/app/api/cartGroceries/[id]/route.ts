import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { CartGroceryService } from '@/services';
import { BAD_REQUEST } from '@/utils';

const cartGroceryService = new CartGroceryService();

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

    const response = await cartGroceryService.delete(+id);

    return NextResponse.json(response);
};

export { DELETE };
