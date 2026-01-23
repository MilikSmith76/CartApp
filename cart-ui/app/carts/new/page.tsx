'use client';
import type { JSX } from 'react';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import type { Cart } from '@/interfaces';

import {
    CardContainer,
    CartForm,
    ErrorAlert,
    Header,
    Loading,
    Main,
} from '@/components';
import { useCart } from '@/hooks';
import { ROUTES } from '@/utils';

const NewCartPage = (): JSX.Element => {
    const router = useRouter();

    const { clearErrorMessage, createCart, errorMessage, isLoading } =
        useCart();

    const onSubmit = useCallback(
        async (value?: Cart) => {
            const success = await createCart(value);

            if (success) {
                router.push(ROUTES.carts);
            }
        },
        [router, createCart]
    );

    return (
        <>
            <Header name='Create New Cart' />
            <Main>
                <Loading isLoading={isLoading} />
                {!isLoading && (
                    <>
                        <ErrorAlert
                            errorMessage={errorMessage}
                            onClear={clearErrorMessage}
                        />
                        <CardContainer classExtension='mt-5'>
                            <CartForm
                                formHeader='New Cart'
                                onSubmit={onSubmit}
                            />
                        </CardContainer>
                    </>
                )}
            </Main>
        </>
    );
};

export default NewCartPage;
