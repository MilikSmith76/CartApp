import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { GroceryService } from '@/services';
import { BAD_REQUEST } from '@/utils';

const groceryService = new GroceryService();

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

    const response = await groceryService.get(+id);

    return NextResponse.json(response);
};

export { GET };
