'use client';
import axios from 'axios';
import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

import type {
    Grocery,
    PaginationResponse,
    UseGroceriesOutput,
} from '@/interfaces';

import {
    DEFAULT_ERROR_RETRIES,
    DEFAULT_ERROR_RETRY_INTERVAL,
    DEFAULT_REFRESH_INTERVAL,
    ROUTES,
} from '@/utils';

import useDebounce from './debounce';

const useGroceries = (): UseGroceriesOutput => {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');

    const fetcher = useCallback(
        async (
            url: string,
            page?: number,
            search?: string
        ): Promise<PaginationResponse<Grocery>> => {
            try {
                const { data } = await axios.get<PaginationResponse<Grocery>>(
                    url,
                    {
                        params: {
                            page,
                            search,
                        },
                    }
                );

                return data;
            } catch {
                throw new Error(
                    'Was unable to retrieve Grocery items. Please try again.'
                );
            }
        },
        []
    );

    const { data, error, isLoading, mutate } = useSWR(
        [ROUTES.apiGroceries, page, search],
        fetcher,
        {
            errorRetryCount: DEFAULT_ERROR_RETRIES,
            errorRetryInterval: DEFAULT_ERROR_RETRY_INTERVAL,
            refreshInterval: DEFAULT_REFRESH_INTERVAL,
            shouldRetryOnError: true,
        }
    );

    const groceries = useMemo(() => data?.results ?? [], [data]);

    const total = useMemo(() => data?.count ?? 0, [data]);

    const errorMessage = useMemo((): string => error?.message ?? '', [error]);

    const fetchGroceries = useCallback(
        async (page: number = 0, search?: string) => {
            setPage(page);
            setSearch(search ?? '');
        },
        [setPage, setSearch]
    );

    const { debouncedFunc: debouncedFetchGroceries } =
        useDebounce(fetchGroceries);

    const clearErrorMessage = useCallback(() => {
        mutate();
    }, [mutate]);

    return {
        clearErrorMessage,
        debouncedFetchGroceries,
        errorMessage,
        fetchGroceries,
        groceries,
        isLoading,
        total,
    };
};

export default useGroceries;
