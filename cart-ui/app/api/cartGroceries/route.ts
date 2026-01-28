import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { BaseResourcesHandler } from '@/handlers';
import { CartGroceryService } from '@/services';
import { getErrorResponse } from '@/utils';

const cartGroceryService = new CartGroceryService();

const cartGroceriesHandler = new BaseResourcesHandler(cartGroceryService);

const GET = async (request: NextRequest): Promise<NextResponse> =>
    cartGroceriesHandler.get(request);

const PUT = async (request: NextRequest): Promise<NextResponse> => {
    const { items } = await request.json();

    try {
        const response = await cartGroceryService.bulkUpsert(items);

        return NextResponse.json(response);
    } catch (error) {
        return getErrorResponse(error);
    }
};

export { GET, PUT };
