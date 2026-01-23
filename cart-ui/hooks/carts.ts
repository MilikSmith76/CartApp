'use client';
import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

import type { Cart, PaginationResponse, UseCartsOutput } from '@/interfaces';

import {
    baseListFetcher,
    DEFAULT_ERROR_RETRIES,
    DEFAULT_ERROR_RETRY_INTERVAL,
    DEFAULT_PAGE_SIZE,
    DEFAULT_REFRESH_INTERVAL,
    ROUTES,
} from '@/utils';

import useDebounce from './debounce';

const useCarts = (): UseCartsOutput => {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');

    const fetcher = useCallback(
        async (
            url: string,
            page?: number,
            search?: string
        ): Promise<PaginationResponse<Cart>> => {
            return baseListFetcher(url, page, DEFAULT_PAGE_SIZE, search);
        },
        []
    );

    const { data, error, isLoading, mutate } = useSWR(
        [ROUTES.apiCarts, page, search],
        fetcher,
        {
            errorRetryCount: DEFAULT_ERROR_RETRIES,
            errorRetryInterval: DEFAULT_ERROR_RETRY_INTERVAL,
            refreshInterval: DEFAULT_REFRESH_INTERVAL,
            shouldRetryOnError: true,
        }
    );

    const carts = useMemo(() => data?.results ?? [], [data]);

    const total = useMemo(() => data?.count ?? 0, [data]);

    const errorMessage = useMemo((): string => error?.message ?? '', [error]);

    const fetchCarts = useCallback(
        async (page: number = 0, search?: string) => {
            setPage(page);
            setSearch(search ?? '');
        },
        [setPage, setSearch]
    );

    const { debouncedFunc: debouncedFetchCarts } = useDebounce(fetchCarts);

    const clearErrorMessage = useCallback(() => {
        mutate();
    }, [mutate]);

    return {
        carts,
        clearErrorMessage,
        debouncedFetchCarts,
        errorMessage,
        fetchCarts,
        isLoading,
        total,
    };
};

export default useCarts;
