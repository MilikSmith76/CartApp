'use client';
import type { JSX } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { use, useCallback, useEffect, useState } from 'react';

import type {
    BulkUpsertRequest,
    BulkUpsertResponse,
    CartGrocery,
    Grocery,
    PaginationResponse,
    UpdateCartPageProps,
} from '@/interfaces';

import {
    Button,
    CardContainer,
    CartGroceriesForm,
    GrocerySearchField,
    Header,
    LinkButton,
    Main,
} from '@/components';
import { DEFAULT_MAX_CART_GROCERIES } from '@/utils';

const DEFAULT_BULK_REQUEST: BulkUpsertRequest<CartGrocery> = { items: [] };

const UpdateCartGroceriesPage = ({
    params,
}: UpdateCartPageProps): JSX.Element => {
    const { id: cartId } = use(params);

    const router = useRouter();

    const [bulkUpsertRequest, setBulkUpsertRequest] =
        useState<BulkUpsertRequest<CartGrocery>>(DEFAULT_BULK_REQUEST);

    const onSubmit = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (value: any) => {
            const result = await axios.put<BulkUpsertResponse<CartGrocery>>(
                '/api/cartGroceries',
                value
            );

            // No convertion for the data because BulkUpsertRequest and BulkUpsertResponse are the same
            setBulkUpsertRequest(result.data);
        },
        [setBulkUpsertRequest]
    );

    const getCartGroceries = useCallback(async () => {
        const result = await axios.get<PaginationResponse<CartGrocery>>(
            '/api/cartGroceries',
            {
                params: {
                    cartId,
                    limit: DEFAULT_MAX_CART_GROCERIES,
                },
            }
        );

        setBulkUpsertRequest({
            items: result.data.results,
        });
    }, [cartId, setBulkUpsertRequest]);

    const onAddGrocery = useCallback(
        (grocery: Grocery) => {
            const updateCartGroceries: BulkUpsertRequest<CartGrocery> = {
                items: [
                    ...bulkUpsertRequest.items,
                    {
                        cartId: +cartId,
                        grocery: grocery,
                        groceryId: grocery.id ?? 0,
                        purchased: false,
                        quantity: 1,
                    },
                ],
            };

            setBulkUpsertRequest(updateCartGroceries);
        },
        [bulkUpsertRequest, setBulkUpsertRequest, cartId]
    );

    const onDelete = useCallback(async () => {
        await axios.delete(`/api/carts/${cartId}`);

        router.push('/carts');
    }, [router, cartId]);

    const onCartGroceryDelete = useCallback(
        (index: number) => async (): Promise<void> => {
            const item = bulkUpsertRequest.items[index];

            if (item.id) {
                await axios.delete(`/api/cartGroceries/${cartId}`);
            }

            const updateCartGroceries: BulkUpsertRequest<CartGrocery> = {
                items: bulkUpsertRequest.items.filter(
                    (_, checkIndex) => checkIndex != index
                ),
            };

            setBulkUpsertRequest(updateCartGroceries);
        },
        [cartId, bulkUpsertRequest, setBulkUpsertRequest]
    );

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getCartGroceries();
    }, [getCartGroceries]);

    return (
        <>
            <Header name={`Edit Cart ${cartId}`} />
            <Main>
                <div className='flex'>
                    <LinkButton
                        className='ml-auto inline-flex w-fit cursor-pointer rounded-md bg-emerald-500 p-5 text-white hover:bg-emerald-300'
                        href={`/carts/${cartId}`}
                        text='Edit Cart'
                    />
                    <Button
                        className='ml-5 inline-flex w-fit cursor-pointer rounded-md bg-red-500 p-5 text-white hover:bg-red-300'
                        onClick={onDelete}
                        text='Delete'
                    />
                </div>
                <CardContainer classExtension='mt-5'>
                    <GrocerySearchField onAddGrocery={onAddGrocery} />
                </CardContainer>
                <CardContainer classExtension='mt-5'>
                    <CartGroceriesForm
                        bulkUpsertRequest={bulkUpsertRequest}
                        formHeader='Edit Cart Groceries'
                        onItemDelete={onCartGroceryDelete}
                        onSubmit={onSubmit}
                    />
                </CardContainer>
            </Main>
        </>
    );
};

export default UpdateCartGroceriesPage;
