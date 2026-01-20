'use client';

import axios from 'axios';
import { useCallback, useState } from 'react';

import type { Grocery } from '@/interfaces';

interface UseGroceryOutput {
    clearErrorMessage: () => void;
    createGrocery: (value: Grocery) => Promise<boolean>;
    deleteGrocery: () => Promise<boolean>;
    errorMessage: string;
    fetchGrocery: (id: string) => Promise<void>;
    grocery?: Grocery;
    isLoading: boolean;
    updateGrocery: (value: Grocery) => Promise<boolean>;
}

const useGrocery = (): UseGroceryOutput => {
    const [grocery, setGrocery] = useState<Grocery>();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchGrocery = useCallback(
        async (id: string) => {
            if (!id || isNaN(+id)) {
                return;
            }

            setIsLoading(true);

            try {
                const result = await axios.get<Grocery>(`/api/groceries/${id}`);

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

            try {
                const result = await axios.post<Grocery>(
                    '/api/groceries',
                    value
                );

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

            try {
                const result = await axios.put<Grocery>(
                    `/api/groceries/${grocery?.id}`,
                    value
                );

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

        try {
            await axios.delete(`/api/groceries/${grocery?.id}`);

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

    return {
        clearErrorMessage,
        createGrocery,
        deleteGrocery,
        errorMessage,
        fetchGrocery,
        grocery,
        isLoading,
        updateGrocery,
    };
};

export default useGrocery;
