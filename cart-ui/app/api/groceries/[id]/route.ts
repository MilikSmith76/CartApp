import type { NextRequest, NextResponse } from 'next/server';

import type { RouteParameters } from '@/interfaces';

import { BaseResourceHandler } from '@/handlers';
import { GroceryService } from '@/services';

const groceryService = new GroceryService();

const groceryHandler = new BaseResourceHandler(groceryService);

const GET = async (
    request: NextRequest,
    context: RouteParameters
): Promise<NextResponse> => groceryHandler.get(request, context);

const PUT = async (
    request: NextRequest,
    context: RouteParameters
): Promise<NextResponse> => groceryHandler.put(request, context);

const DELETE = async (
    request: NextRequest,
    context: RouteParameters
): Promise<NextResponse> => groceryHandler.delete(request, context);

export { DELETE, GET, PUT };
