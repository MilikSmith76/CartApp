'use client';
import type { AxiosResponse } from 'axios';

import axios from 'axios';
import { useCallback, useState } from 'react';

import type { CartGrocery, UseCartGroceryOutput } from '@/interfaces';

import { DEFAULT_REQUEST_TIMEOUT, ROUTES } from '@/utils';

const useCartGrocery = (): UseCartGroceryOutput => {
    const [cartGrocery, setCartGrocery] = useState<CartGrocery>();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchCartGrocery = useCallback(
        async (id?: string) => {
            if (!id || isNaN(+id)) {
                return;
            }

            setIsLoading(true);

            try {
                const result = await axios.get<CartGrocery>(
                    `${ROUTES.apiCartGroceries}/${id}`,
                    { timeout: DEFAULT_REQUEST_TIMEOUT }
                );

                setCartGrocery(result.data);
            } catch {
                setErrorMessage(
                    'Was unable to retrieve the CartGrocery item. It is likely this item does not exist.'
                );
            } finally {
                setIsLoading(false);
            }
        },
        [setCartGrocery, setErrorMessage, setIsLoading]
    );

    const createCartGrocery = useCallback(
        async (value?: CartGrocery): Promise<boolean> => {
            if (!value) {
                return false;
            }

            let success = true;

            setIsLoading(true);

            try {
                const result = await axios.post<
                    CartGrocery,
                    AxiosResponse<CartGrocery>,
                    CartGrocery
                >(ROUTES.apiCartGroceries, value, {
                    timeout: DEFAULT_REQUEST_TIMEOUT,
                });

                setCartGrocery(result.data);
            } catch {
                setErrorMessage(
                    'Was unable to create the CartGrocery item. Please try again.'
                );

                success = false;
            } finally {
                setIsLoading(false);
            }

            return success;
        },
        [setCartGrocery, setErrorMessage, setIsLoading]
    );

    const updateCartGrocery = useCallback(
        async (value?: CartGrocery): Promise<boolean> => {
            if (!value?.id) {
                return false;
            }

            let success = true;

            setIsLoading(true);

            try {
                const result = await axios.put<
                    CartGrocery,
                    AxiosResponse<CartGrocery>,
                    CartGrocery
                >(`${ROUTES.apiCartGroceries}/${cartGrocery?.id}`, value, {
                    timeout: DEFAULT_REQUEST_TIMEOUT,
                });

                setCartGrocery(result.data);
            } catch {
                setErrorMessage(
                    'Was unable to retrieve the CartGrocery item. Please try again.'
                );

                success = false;
            } finally {
                setIsLoading(false);
            }

            return success;
        },
        [cartGrocery, setCartGrocery, setErrorMessage, setIsLoading]
    );

    const deleteCartGrocery = useCallback(async () => {
        if (!cartGrocery?.id) {
            return false;
        }

        let success = true;

        setIsLoading(true);

        try {
            await axios.delete(
                `${ROUTES.apiCartGroceries}/${cartGrocery?.id}`,
                {
                    timeout: DEFAULT_REQUEST_TIMEOUT,
                }
            );

            setCartGrocery(undefined);
        } catch {
            setErrorMessage(
                'Was unable to delete the CartGrocery item. Please try again.'
            );

            success = false;
        } finally {
            setIsLoading(false);
        }

        return success;
    }, [cartGrocery, setIsLoading, setCartGrocery, setErrorMessage]);

    const clearErrorMessage = useCallback(() => {
        setErrorMessage('');
    }, [setErrorMessage]);

    return {
        cartGrocery,
        clearErrorMessage,
        createCartGrocery,
        deleteCartGrocery,
        errorMessage,
        fetchCartGrocery,
        isLoading,
        updateCartGrocery,
    };
};

export default useCartGrocery;
