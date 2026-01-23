'use client';
import type { JSX } from 'react';

import { use, useCallback, useEffect } from 'react';

import type {
    BulkUpsertRequest,
    CartGrocery,
    Grocery,
    UpdateCartPageProps,
} from '@/interfaces';

import {
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
    const { id: cartId } = use(params);

    const { cart, fetchCart } = useCart();

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
    }, [cartId, fetchCart]);

    useEffect(() => {
        if (!cart) {
            return;
        }

        fetchCartGroceries(+cartId);
    }, [cart, cartId, fetchCartGroceries]);

    return (
        <>
            <Header name={`Edit Cart ${cartId}`} />
            <Main>
                <LinkButton
                    href={`${ROUTES.carts}/${cartId}`}
                    text='Edit Cart'
                />
                {cart && (
                    <CardContainer classExtension='mt-5'>
                        <GrocerySearchField onAddGrocery={onAddGrocery} />
                    </CardContainer>
                )}
                <ErrorAlert
                    errorMessage={errorMessage}
                    onClear={clearErrorMessage}
                />
                {(!cartId || isLoading) && <Loading />}
                {!isLoading && cart && !!bulkUpsert.items.length && (
                    <CardContainer classExtension='mt-5'>
                        <CartGroceriesForm
                            bulkUpsertRequest={bulkUpsert}
                            formHeader='Edit Cart Groceries'
                            onItemDelete={onCartGroceryDelete}
                            onSubmit={onSubmit}
                        />
                    </CardContainer>
                )}
                {!isLoading && cart && !bulkUpsert.items.length && (
                    <CardContainer classExtension='mt-5'>
                        No groceries are in this cart.
                    </CardContainer>
                )}
                {!isLoading && !cart && (
                    <CardContainer classExtension='mt-5'>
                        {`Cart ${cartId} cannot be found`}
                    </CardContainer>
                )}
            </Main>
        </>
    );
};

export default UpdateCartGroceriesPage;
