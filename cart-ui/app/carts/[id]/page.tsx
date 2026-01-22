'use client';
import type { JSX } from 'react';

import { use, useCallback, useEffect } from 'react';

import type { Cart, UpdateCartPageProps } from '@/interfaces';

import {
    CardContainer,
    CartForm,
    ErrorAlert,
    Header,
    LinkButton,
    Loading,
    Main,
} from '@/components';
import { useCart } from '@/hooks';

const UpdateCartPage = ({ params }: UpdateCartPageProps): JSX.Element => {
    const { id } = use(params);

    const {
        cart,
        clearErrorMessage,
        errorMessage,
        fetchCart,
        isLoading,
        updateCart,
    } = useCart();

    const onSubmit = useCallback(
        async (value?: Cart) => {
            await updateCart(value);
        },
        [updateCart]
    );

    useEffect(() => {
        fetchCart(id);
    }, [fetchCart, id]);

    return (
        <>
            <Header name={`Edit Cart ${id}`} />
            <Main>
                {(!id || isLoading) && <Loading />}
                {!isLoading && cart && (
                    <>
                        <LinkButton
                            href={`/carts/${id}/groceries`}
                            text='Edit Cart Groceries'
                        />
                        <ErrorAlert
                            errorMessage={errorMessage}
                            onClear={clearErrorMessage}
                        />
                        <CardContainer classExtension='mt-5'>
                            <CartForm
                                cart={cart}
                                formHeader='Edit Cart'
                                onSubmit={onSubmit}
                            />
                        </CardContainer>
                    </>
                )}
                {!isLoading && !cart && (
                    <CardContainer>
                        {`Cart ${id} cannot be found`}
                    </CardContainer>
                )}
            </Main>
        </>
    );
};

export default UpdateCartPage;
