import { NextResponse } from 'next/server';

import type { ParameterErrors, Parameters } from '@/interfaces';

import { BAD_REQUEST } from './constants';

const getRequestParams = (searchParams: URLSearchParams): Parameters => {
    const params: Parameters = {};

    searchParams.forEach((value, key) => {
        params[key] = value;
    });

    return params;
};

const getParameterErrorsResponse = (
    paramErrors: ParameterErrors
): NextResponse<ParameterErrors> => {
    return NextResponse.json(paramErrors, { status: BAD_REQUEST });
};

const getRequiredIdErrorResponse = (
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

const getNumberParametersErrorResponse = (
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
    getNumberParametersErrorResponse,
    getParameterErrorsResponse,
    getRequestParams,
    getRequiredIdErrorResponse,
};
