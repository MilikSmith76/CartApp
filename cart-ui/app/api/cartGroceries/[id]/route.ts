import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import type { RouteParameters } from '@/interfaces';

import { BaseResourceHandler } from '@/handlers';
import { CartGroceryService } from '@/services';

const cartGroceryService = new CartGroceryService();

const cartGroceryHandler = new BaseResourceHandler(cartGroceryService);

const DELETE = async (
    request: NextRequest,
    context: RouteParameters
): Promise<NextResponse> => cartGroceryHandler.delete(request, context);

export { DELETE };
