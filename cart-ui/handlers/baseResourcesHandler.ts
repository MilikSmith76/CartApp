import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type { BaseResource } from '@/interfaces';
import type BaseResourceService from '@/services/baseResource';

import {
    getErrorResponse,
    getNumberParametersErrorResponse,
    getRequestParams,
} from '@/utils';

class BaseResourceHandler<UiType extends BaseResource> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private resourceService: BaseResourceService<UiType, any>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(resourceService: BaseResourceService<UiType, any>) {
        this.resourceService = resourceService;
    }

    public async get(request: NextRequest): Promise<NextResponse> {
        const { cartId, limit, page, search } = getRequestParams(
            request.nextUrl.searchParams
        );

        const errorResponse = getNumberParametersErrorResponse(
            ['cartId', 'page', 'limit'],
            [cartId as string, page as string, limit as string]
        );

        if (errorResponse) {
            return errorResponse;
        }

        try {
            const response = await this.resourceService.getPage({
                cartId,
                limit,
                page,
                search,
            });

            return NextResponse.json(response);
        } catch (error) {
            return getErrorResponse(error);
        }
    }

    public async post(request: NextRequest): Promise<NextResponse> {
        const body = await request.json();

        try {
            const input: UiType = this.resourceService.validate(body);

            const response = await this.resourceService.create(input);

            return NextResponse.json(response);
        } catch (error) {
            return getErrorResponse(error);
        }
    }
}

export default BaseResourceHandler;
