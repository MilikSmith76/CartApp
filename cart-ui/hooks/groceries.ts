'use client';
import axios from 'axios';
import { useCallback, useState } from 'react';

import type {
    Grocery,
    PaginationResponse,
    UseGroceriesOutput,
} from '@/interfaces';

import { ROUTES } from '@/utils';

import useDebounce from './debounce';

const useGroceries = (): UseGroceriesOutput => {
    const [groceries, setGroceries] = useState<Grocery[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchGroceries = useCallback(
        async (page: number = 0, search?: string) => {
            setIsLoading(true);

            try {
                const { data } = await axios.get<PaginationResponse<Grocery>>(
                    ROUTES.apiGroceries,
                    {
                        params: {
                            page,
                            search,
                        },
                    }
                );

                setGroceries(data.results);
                setTotal(data.count);
            } catch {
                setErrorMessage(
                    'Was unable to retrieve Grocery items. Please try again.'
                );
            } finally {
                setIsLoading(false);
            }
        },
        [setGroceries, setTotal, setErrorMessage, setIsLoading]
    );

    const { debouncedFunc: debouncedFetchGroceries } =
        useDebounce(fetchGroceries);

    const clearErrorMessage = useCallback(() => {
        setErrorMessage('');
    }, [setErrorMessage]);

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
