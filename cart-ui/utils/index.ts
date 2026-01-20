import { NextResponse } from 'next/server';

import type { ParameterErrors } from '@/interfaces';

import { BAD_REQUEST } from './constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRequestParams = (searchParams: URLSearchParams): any => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {};

    searchParams.forEach((value, key) => {
        params[key] = value;
    });

    return params;
};

export const getParameterErrorsResponse = (
    paramErrors: ParameterErrors
): NextResponse<ParameterErrors> => {
    return NextResponse.json(paramErrors, { status: BAD_REQUEST });
};

export const getRequiredIdErrorResponse = (
    idParam: string
): NextResponse<ParameterErrors> | undefined => {
    if (isNaN(+idParam)) {
        return getParameterErrorsResponse({
            errors: [
                {
                    error: `Parameter "id" has a value "${idParam}" but should be a number.`,
                },
            ],
        });
    }
};

export const getNumberParametersErrorResponse = (
    paramNames: string[],
    paramValues: string[]
): NextResponse<ParameterErrors> | undefined => {
    if (paramNames.length != paramValues.length) {
        throw new Error(
            'There should be the same amount of names as there are values.'
        );
    }

    const paramErrors: ParameterErrors = { errors: [] };

    paramValues.forEach((value, index) => {
        if (value && isNaN(+value)) {
            paramErrors.errors.push({
                error: `Parameter "${paramNames[index]}" has a value "${value}" but should be a number.`,
            });
        }
    });

    if (paramErrors.errors.length > 0) {
        return getParameterErrorsResponse(paramErrors);
    }
};

export {
    BAD_REQUEST,
    DEFAULT_EXTERNAL_IMAGE_HEIGHT,
    DEFAULT_EXTERNAL_IMAGE_WIDTH,
    DEFAULT_MAX_CART_GROCERIES,
    DEFAULT_PAGE_SIZE,
    FORM_REQUIRED_FEILD_ERROR,
} from './constants';
