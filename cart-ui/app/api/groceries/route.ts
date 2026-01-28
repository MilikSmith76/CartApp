import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { BaseResourcesHandler } from '@/handlers';
import { GroceryService } from '@/services';

const grocerySerice = new GroceryService();

const groceriesHandler = new BaseResourcesHandler(grocerySerice);

const GET = async (request: NextRequest): Promise<NextResponse> =>
    groceriesHandler.get(request);

const POST = async (request: NextRequest): Promise<NextResponse> =>
    groceriesHandler.post(request);

export { GET, POST };
