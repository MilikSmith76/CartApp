import type { NextRequest, NextResponse } from 'next/server';

import type { RouteParameters } from '@/interfaces';

import { BaseResourceHandler } from '@/handlers';
import { CartService } from '@/services';

const cartService = new CartService();

const cartHandler = new BaseResourceHandler(cartService);

const GET = async (
    request: NextRequest,
    context: RouteParameters
): Promise<NextResponse> => cartHandler.get(request, context);

const PUT = async (
    request: NextRequest,
    context: RouteParameters
): Promise<NextResponse> => cartHandler.put(request, context);

const DELETE = async (
    request: NextRequest,
    context: RouteParameters
): Promise<NextResponse> => cartHandler.delete(request, context);

export { DELETE, GET, PUT };
