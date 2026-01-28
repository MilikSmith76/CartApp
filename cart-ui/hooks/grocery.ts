'use client';
import type { AxiosResponse } from 'axios';

import axios from 'axios';
import { useCallback, useState } from 'react';

import type { Grocery, UseGroceryOutput } from '@/interfaces';

import { DEFAULT_REQUEST_TIMEOUT, ROUTES } from '@/utils';

const useGrocery = (): UseGroceryOutput => {
    const [grocery, setGrocery] = useState<Grocery>();
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchGrocery = useCallback(
        async (id?: string) => {
            if (!id || isNaN(+id)) {
                return;
            }

            setIsLoading(true);
            setErrorMessage('');

            try {
                const result = await axios.get<Grocery>(
                    `${ROUTES.apiGroceries}/${id}`,
                    { timeout: DEFAULT_REQUEST_TIMEOUT }
                );

                setGrocery(result.data);
            } catch {
                setErrorMessage(
                    'Was unable to retrieve the Grocery item. It is likely this item does not exist.'
                );
            } finally {
                setIsLoading(false);
            }
        },
        [setGrocery, setErrorMessage, setIsLoading]
    );

    const createGrocery = useCallback(
        async (value?: Grocery): Promise<boolean> => {
            if (!value) {
                return false;
            }

            let success = true;

            setIsLoading(true);
            setErrorMessage('');

            try {
                const result = await axios.post<
                    Grocery,
                    AxiosResponse<Grocery>,
                    Grocery
                >(ROUTES.apiGroceries, value, {
                    timeout: DEFAULT_REQUEST_TIMEOUT,
                });

                setGrocery(result.data);
            } catch {
                setErrorMessage(
                    'Was unable to create the Grocery item. Please try again.'
                );

                success = false;
            } finally {
                setIsLoading(false);
            }

            return success;
        },
        [setGrocery, setErrorMessage, setIsLoading]
    );

    const updateGrocery = useCallback(
        async (value?: Grocery): Promise<boolean> => {
            if (!value?.id) {
                return false;
            }

            let success = true;

            setIsLoading(true);
            setErrorMessage('');

            try {
                const result = await axios.put<
                    Grocery,
                    AxiosResponse<Grocery>,
                    Grocery
                >(`${ROUTES.apiGroceries}/${grocery?.id}`, value, {
                    timeout: DEFAULT_REQUEST_TIMEOUT,
                });

                setGrocery(result.data);
            } catch {
                setErrorMessage(
                    'Was unable to retrieve the Grocery item. Please try again.'
                );

                success = false;
            } finally {
                setIsLoading(false);
            }

            return success;
        },
        [grocery, setGrocery, setErrorMessage, setIsLoading]
    );

    const deleteGrocery = useCallback(async () => {
        if (!grocery?.id) {
            return false;
        }

        let success = true;

        setIsLoading(true);
        setErrorMessage('');

        try {
            await axios.delete(`${ROUTES.apiGroceries}/${grocery?.id}`, {
                timeout: DEFAULT_REQUEST_TIMEOUT,
            });

            setGrocery(undefined);
        } catch {
            setErrorMessage(
                'Was unable to delete the Grocery item. Please try again.'
            );

            success = false;
        } finally {
            setIsLoading(false);
        }

        return success;
    }, [grocery, setIsLoading, setGrocery, setErrorMessage]);

    const clearErrorMessage = useCallback(() => {
        setErrorMessage('');
    }, [setErrorMessage]);

    const finishInitialLoading = useCallback(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    return {
        clearErrorMessage,
        createGrocery,
        deleteGrocery,
        errorMessage,
        fetchGrocery,
        finishInitialLoading,
        grocery,
        isLoading,
        updateGrocery,
    };
};

export default useGrocery;
