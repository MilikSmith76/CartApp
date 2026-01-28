import { NextResponse } from 'next/server';

import type { ParameterErrors } from '@/interfaces';

import {
    BAD_REQUEST_ERROR,
    INTERNAL_ERROR,
    NOT_FOUND_ERROR,
} from './constants';

const getErrorResponse = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
): Promise<NextResponse<ParameterErrors>> => {
    if (error.status == BAD_REQUEST_ERROR) {
        return Promise.resolve(
            NextResponse.json(
                {
                    errors: [
                        {
                            error: 'This request is invalid.',
                        },
                    ],
                },
                { status: BAD_REQUEST_ERROR }
            )
        );
    }

    if (error.status == NOT_FOUND_ERROR) {
        return Promise.resolve(
            NextResponse.json(
                {
                    errors: [
                        {
                            error: 'The resource for this request does not exist.',
                        },
                    ],
                },
                { status: NOT_FOUND_ERROR }
            )
        );
    }

    return Promise.resolve(
        NextResponse.json(
            {
                errors: [
                    {
                        error: 'There is an issue on the server preventing the processing of this request.',
                    },
                ],
            },
            { status: INTERNAL_ERROR }
        )
    );
};

export { getErrorResponse };
