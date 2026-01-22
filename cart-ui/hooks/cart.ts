'use client';

import axios from 'axios';
import { useCallback, useState } from 'react';

import type { Cart, UseCartOutput } from '@/interfaces';

const useCart = (): UseCartOutput => {
    const [cart, setCart] = useState<Cart>();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchCart = useCallback(
        async (id?: string) => {
            if (!id || isNaN(+id)) {
                return;
            }

            setIsLoading(true);

            try {
                const result = await axios.get<Cart>(`/api/carts/${id}`);

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
                const result = await axios.post<Cart>('/api/carts', value);

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
                const result = await axios.put<Cart>(
                    `/api/carts/${cart?.id}`,
                    value
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
            await axios.delete(`/api/carts/${cart?.id}`);

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

    return {
        cart,
        clearErrorMessage,
        createCart,
        deleteCart,
        errorMessage,
        fetchCart,
        isLoading,
        updateCart,
    };
};

export default useCart;
