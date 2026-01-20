import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { CartGroceryService } from '@/services';
import { getRequiredIdErrorResponse } from '@/utils';

const cartGroceryService = new CartGroceryService();

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

    const response = await cartGroceryService.delete(+id);

    return NextResponse.json(response);
};

export { DELETE };
