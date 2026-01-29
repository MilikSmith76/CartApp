'use client';
import axios, { AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';

import type {
    BulkUpsertRequest,
    BulkUpsertResponse,
    CartGrocery,
    Grocery,
    PaginationResponse,
    UseBulkCartGroceriesRequestOutput,
} from '@/interfaces';

import {
    DEFAULT_BULK_REQUEST,
    DEFAULT_MAX_CART_GROCERIES,
    DEFAULT_REQUEST_TIMEOUT,
    duplicate,
    getValue,
    ROUTES,
} from '@/utils';

import useDebounce from './debounce';

const useBulkCartGroceriesRequest = (): UseBulkCartGroceriesRequestOutput => {
    const [bulkUpsert, setBulkUpsert] = useState<
        BulkUpsertRequest<CartGrocery>
    >(duplicate(DEFAULT_BULK_REQUEST));
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchCartGroceries = useCallback(
        async (cartId: number, page: number = 0, search?: string) => {
            setIsLoading(true);

            try {
                const { data } = await axios.get<
                    PaginationResponse<CartGrocery>
                >(ROUTES.apiCartGroceries, {
                    params: {
                        cartId,
                        limit: DEFAULT_MAX_CART_GROCERIES,
                        page,
                        search,
                    },
                    timeout: DEFAULT_REQUEST_TIMEOUT,
                });

                setBulkUpsert({
                    items: data.results,
                });
            } catch {
                setErrorMessage(
                    'Was unable to retrieve items. Please try again.'
                );
            } finally {
                setIsLoading(false);
            }
        },
        [setBulkUpsert, setErrorMessage, setIsLoading]
    );

    const { debouncedFunc: debouncedFetchCartGroceries } =
        useDebounce(fetchCartGroceries);

    const bulkCartGroceriesUpsert = useCallback(
        async (value: BulkUpsertRequest<CartGrocery>): Promise<boolean> => {
            let success = true;

            setIsLoading(true);

            try {
                const { data } = await axios.put<
                    BulkUpsertResponse<CartGrocery>,
                    AxiosResponse<BulkUpsertResponse<CartGrocery>>,
                    BulkUpsertRequest<CartGrocery>
                >(ROUTES.apiCartGroceries, value, {
                    timeout: DEFAULT_REQUEST_TIMEOUT,
                });

                // No convertion for the data because BulkUpsertRequest and BulkUpsertResponse are the same
                setBulkUpsert(data);
            } catch {
                setErrorMessage(
                    'Was unable to update CartGrocery items. Please try again.'
                );

                success = false;
            } finally {
                setIsLoading(false);
            }

            return success;
        },
        [setBulkUpsert, setErrorMessage, setIsLoading]
    );

    const addCartGroceryItem = useCallback(
        (cartId: number, grocery: Grocery) => {
            const updateCartGroceries: BulkUpsertRequest<CartGrocery> = {
                items: [
                    ...bulkUpsert.items,
                    {
                        cartId,
                        grocery: grocery,
                        groceryId: getValue(grocery.id, 0),
                        purchased: false,
                        quantity: 1,
                    },
                ],
            };

            setBulkUpsert(updateCartGroceries);
        },
        [bulkUpsert, setBulkUpsert]
    );

    const removeCartGroceryItem = useCallback(
        async (index: number): Promise<boolean> => {
            if (index > bulkUpsert.items.length) {
                return false;
            }

            let success = true;

            const item = bulkUpsert.items[index];

            setIsLoading(true);

            try {
                if (item.id) {
                    await axios.delete(
                        `${ROUTES.apiCartGroceries}/${item.id}`,
                        { timeout: DEFAULT_REQUEST_TIMEOUT }
                    );
                }

                const updateCartGroceries: BulkUpsertRequest<CartGrocery> = {
                    items: bulkUpsert.items.filter(
                        (_, checkIndex) => checkIndex != index
                    ),
                };

                setBulkUpsert(updateCartGroceries);
            } catch {
                setErrorMessage(
                    'Was unable to delete the CartGrocery item. Please try again.'
                );

                success = false;
            } finally {
                setIsLoading(false);
            }

            return success;
        },
        [bulkUpsert, setIsLoading, setBulkUpsert, setErrorMessage]
    );

    const clearErrorMessage = useCallback(() => {
        setErrorMessage('');
    }, [setErrorMessage]);

    const finishInitialLoading = useCallback(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    return {
        addCartGroceryItem,
        bulkCartGroceriesUpsert,
        bulkUpsert,
        clearErrorMessage,
        debouncedFetchCartGroceries,
        errorMessage,
        fetchCartGroceries,
        finishInitialLoading,
        isLoading,
        removeCartGroceryItem,
    };
};

export default useBulkCartGroceriesRequest;
