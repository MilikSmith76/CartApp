'use client';
import type { AxiosResponse } from 'axios';

import axios from 'axios';
import { useCallback, useState } from 'react';

import type { Cart, UseCartOutput } from '@/interfaces';

import { DEFAULT_REQUEST_TIMEOUT, ROUTES } from '@/utils';

const useCart = (): UseCartOutput => {
    const [cart, setCart] = useState<Cart>();
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchCart = useCallback(
        async (id?: string) => {
            if (!id || isNaN(+id)) {
                return;
            }

            setIsLoading(true);

            try {
                const result = await axios.get<Cart>(
                    `${ROUTES.apiCarts}/${id}`,
                    { timeout: DEFAULT_REQUEST_TIMEOUT }
                );

                setCart(result.data);
            } catch {
                setErrorMessage(
                    'Was unable to retrieve the Cart item. It is likely this item does not exist.'
                );
            } finally {
                setIsLoading(false);
            }
        },
        [setCart, setErrorMessage, setIsLoading]
    );

    const createCart = useCallback(
        async (value?: Cart): Promise<boolean> => {
            if (!value) {
                return false;
            }

            let success = true;

            setIsLoading(true);

            try {
                const result = await axios.post<
                    Cart,
                    AxiosResponse<Cart>,
                    Cart
                >(ROUTES.apiCarts, value, {
                    timeout: DEFAULT_REQUEST_TIMEOUT,
                });

                setCart(result.data);
            } catch {
                setErrorMessage(
                    'Was unable to create the Cart item. Please try again.'
                );

                success = false;
            } finally {
                setIsLoading(false);
            }

            return success;
        },
        [setCart, setErrorMessage, setIsLoading]
    );

    const updateCart = useCallback(
        async (value?: Cart): Promise<boolean> => {
            if (!value?.id) {
                return false;
            }

            let success = true;

            setIsLoading(true);

            try {
                const result = await axios.put<Cart, AxiosResponse<Cart>, Cart>(
                    `${ROUTES.apiCarts}/${cart?.id}`,
                    value,
                    { timeout: DEFAULT_REQUEST_TIMEOUT }
                );

                setCart(result.data);
            } catch {
                setErrorMessage(
                    'Was unable to retrieve the Cart item. Please try again.'
                );

                success = false;
            } finally {
                setIsLoading(false);
            }

            return success;
        },
        [cart, setCart, setErrorMessage, setIsLoading]
    );

    const deleteCart = useCallback(async () => {
        if (!cart?.id) {
            return false;
        }

        let success = true;

        setIsLoading(true);

        try {
            await axios.delete(`${ROUTES.apiCarts}/${cart?.id}`, {
                timeout: DEFAULT_REQUEST_TIMEOUT,
            });

            setCart(undefined);
        } catch {
            setErrorMessage(
                'Was unable to delete the Cart item. Please try again.'
            );

            success = false;
        } finally {
            setIsLoading(false);
        }

        return success;
    }, [cart, setIsLoading, setCart, setErrorMessage]);

    const clearErrorMessage = useCallback(() => {
        setErrorMessage('');
    }, [setErrorMessage]);

    const finishInitialLoading = useCallback(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    return {
        cart,
        clearErrorMessage,
        createCart,
        deleteCart,
        errorMessage,
        fetchCart,
        finishInitialLoading,
        isLoading,
        updateCart,
    };
};

export default useCart;
