import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import type { BaseResource, RouteParameters } from '@/interfaces';
import type BaseResourceService from '@/services/baseResource';

import { getErrorResponse } from '@/utils';

import { getRequiredIdErrorResponse } from '../utils/parameters';

class BaseResourceHandler<UiType extends BaseResource> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private resourceService: BaseResourceService<UiType, any>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(resourceService: BaseResourceService<UiType, any>) {
        this.resourceService = resourceService;
    }

    public async delete(
        _request: NextRequest,
        context: RouteParameters
    ): Promise<NextResponse> {
        const { id } = await context.params;

        const errorResponse = getRequiredIdErrorResponse(id);

        if (errorResponse) {
            return errorResponse;
        }

        try {
            const response = await this.resourceService.delete(+id);

            return NextResponse.json(response);
        } catch (error) {
            return getErrorResponse(error);
        }
    }

    public async get(
        _request: NextRequest,
        context: RouteParameters
    ): Promise<NextResponse> {
        const { id } = await context.params;

        const errorResponse = getRequiredIdErrorResponse(id);

        if (errorResponse) {
            return errorResponse;
        }

        try {
            const response = await this.resourceService.get(+id);

            return NextResponse.json(response);
        } catch (error) {
            return getErrorResponse(error);
        }
    }

    public async put(
        request: NextRequest,
        context: RouteParameters
    ): Promise<NextResponse> {
        const { id } = await context.params;

        const errorResponse = getRequiredIdErrorResponse(id);

        if (errorResponse) {
            return errorResponse;
        }

        const body = await request.json();

        try {
            const input: UiType = this.resourceService.validate(body);

            const response = await this.resourceService.update(+id, input);

            return NextResponse.json(response);
        } catch (error) {
            return getErrorResponse(error);
        }
    }
}

export default BaseResourceHandler;
