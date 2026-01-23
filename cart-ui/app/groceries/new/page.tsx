'use client';
import type { JSX } from 'react';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import type { Grocery } from '@/interfaces';

import {
    CardContainer,
    ErrorAlert,
    GroceryForm,
    Header,
    Loading,
    Main,
} from '@/components';
import { useGrocery } from '@/hooks';
import { ROUTES } from '@/utils';

const NewGroceryPage = (): JSX.Element => {
    const { clearErrorMessage, createGrocery, errorMessage, isLoading } =
        useGrocery();

    const router = useRouter();

    const onSubmit = useCallback(
        async (value?: Grocery) => {
            const success = await createGrocery(value);

            if (success) {
                router.push(ROUTES.groceries);
            }
        },
        [router, createGrocery]
    );

    return (
        <>
            <Header name='Create New Grocery' />
            <Main>
                <Loading isLoading={isLoading} />
                {!isLoading && (
                    <>
                        <ErrorAlert
                            errorMessage={errorMessage}
                            onClear={clearErrorMessage}
                        />
                        <CardContainer classExtension='mt-5'>
                            <GroceryForm
                                formHeader='New Grocery'
                                onSubmit={onSubmit}
                            />
                        </CardContainer>
                    </>
                )}
            </Main>
        </>
    );
};

export default NewGroceryPage;
