import type { NextRequest, NextResponse } from 'next/server';

import { BaseResourcesHandler } from '@/handlers';
import { CartService } from '@/services';

const cartService = new CartService();

const cartsHandler = new BaseResourcesHandler(cartService);

const GET = async (request: NextRequest): Promise<NextResponse> =>
    cartsHandler.get(request);

const POST = async (request: NextRequest): Promise<NextResponse> =>
    cartsHandler.post(request);

export { GET, POST };
