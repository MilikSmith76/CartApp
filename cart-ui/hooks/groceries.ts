'use client';
import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

import type {
    Grocery,
    PaginationResponse,
    UseGroceriesOutput,
} from '@/interfaces';

import {
    baseListFetcher,
    DEFAULT_DEDUPE_INTERVAL,
    DEFAULT_ERROR_RETRIES,
    DEFAULT_ERROR_RETRY_INTERVAL,
    DEFAULT_PAGE_SIZE,
    DEFAULT_REFRESH_INTERVAL,
    getValue,
    ROUTES,
} from '@/utils';

import useDebounce from './debounce';

const useGroceries = (): UseGroceriesOutput => {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');

    const fetcher = useCallback(
        async ([url, page, search]: string[]): Promise<
            PaginationResponse<Grocery>
        > => {
            return baseListFetcher(url, +page, DEFAULT_PAGE_SIZE, search);
        },
        []
    );

    const { data, error, isLoading, mutate } = useSWR(
        [ROUTES.apiGroceries, page.toString(), search],
        fetcher,
        {
            dedupingInterval: DEFAULT_DEDUPE_INTERVAL,
            errorRetryCount: DEFAULT_ERROR_RETRIES,
            errorRetryInterval: DEFAULT_ERROR_RETRY_INTERVAL,
            refreshInterval: DEFAULT_REFRESH_INTERVAL,
            shouldRetryOnError: true,
        }
    );

    const groceries = useMemo(() => getValue(data?.results, []), [data]);

    const total = useMemo(() => getValue(data?.count, 0), [data]);

    const errorMessage = useMemo(
        (): string => getValue(error?.message, ''),
        [error]
    );

    const fetchGroceries = useCallback(
        async (page: number = 0, search?: string) => {
            setPage(page);
            setSearch(getValue(search, ''));
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
