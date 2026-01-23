'use client';
import type { JSX } from 'react';

import { useRouter } from 'next/navigation';
import { use, useCallback, useEffect } from 'react';

import type {
    BulkUpsertRequest,
    CartGrocery,
    Grocery,
    UpdateCartPageProps,
} from '@/interfaces';

import {
    Button,
    CardContainer,
    CartGroceriesForm,
    ErrorAlert,
    GrocerySearchField,
    Header,
    LinkButton,
    Loading,
    Main,
} from '@/components';
import { useBulkCartGroceriesRequest, useCart } from '@/hooks';
import { ROUTES } from '@/utils';

const UpdateCartGroceriesPage = ({
    params,
}: UpdateCartPageProps): JSX.Element => {
    const router = useRouter();

    const { id: cartId } = use(params);

    const { cart, deleteCart, fetchCart } = useCart();

    const {
        addCartGroceryItem,
        bulkCartGroceriesUpsert,
        bulkUpsert,
        clearErrorMessage,
        errorMessage,
        fetchCartGroceries,
        isLoading,
        removeCartGroceryItem,
    } = useBulkCartGroceriesRequest();

    const onSubmit = useCallback(
        async (value: BulkUpsertRequest<CartGrocery>) => {
            await bulkCartGroceriesUpsert(value);
        },
        [bulkCartGroceriesUpsert]
    );

    const onAddGrocery = useCallback(
        async (grocery: Grocery) => {
            await addCartGroceryItem(+cartId, grocery);
        },
        [cartId, addCartGroceryItem]
    );

    const onDelete = useCallback(async () => {
        const success = await deleteCart();

        if (success) {
            router.push(ROUTES.carts);
        }
    }, [router, deleteCart]);

    const onCartGroceryDelete = useCallback(
        (index: number) => async (): Promise<void> => {
            await removeCartGroceryItem(index);
        },
        [removeCartGroceryItem]
    );

    useEffect(() => {
        if (!cartId || isNaN(+cartId)) {
            return;
        }

        fetchCart(cartId);
        fetchCartGroceries(+cartId);
    }, [cartId, fetchCart, fetchCartGroceries]);

    return (
        <>
            <Header name={`Edit Cart ${cartId}`} />
            <Main>
                <div className='flex'>
                    <LinkButton
                        className='ml-auto inline-flex w-fit cursor-pointer rounded-md bg-emerald-500 p-5 text-white hover:bg-emerald-300'
                        href={`${ROUTES.carts}/${cartId}`}
                        text='Edit Cart'
                    />
                    <Button
                        className='ml-5 inline-flex w-fit cursor-pointer rounded-md bg-red-500 p-5 text-white hover:bg-red-300'
                        onClick={onDelete}
                        text='Delete'
                    />
                </div>
                {cart && (
                    <CardContainer classExtension='mt-5'>
                        <GrocerySearchField onAddGrocery={onAddGrocery} />
                    </CardContainer>
                )}
                {(!cartId || isLoading) && <Loading />}
                {!isLoading && !!bulkUpsert.items.length && (
                    <>
                        <ErrorAlert
                            errorMessage={errorMessage}
                            onClear={clearErrorMessage}
                        />
                        <CardContainer classExtension='mt-5'>
                            <CartGroceriesForm
                                bulkUpsertRequest={bulkUpsert}
                                formHeader='Edit Cart Groceries'
                                onItemDelete={onCartGroceryDelete}
                                onSubmit={onSubmit}
                            />
                        </CardContainer>
                    </>
                )}
                {!isLoading && !bulkUpsert.items.length && (
                    <CardContainer classExtension='mt-5'>
                        No groceries are in this cart.
                    </CardContainer>
                )}
            </Main>
        </>
    );
};

export default UpdateCartGroceriesPage;
