'use client';
import type { JSX } from 'react';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import {
    CardContainer,
    ErrorAlert,
    GroceryForm,
    Header,
    Loading,
    Main,
} from '@/components';
import { useGrocery } from '@/hooks';

const NewGroceryPage = (): JSX.Element => {
    const { clearErrorMessage, createGrocery, errorMessage, isLoading } =
        useGrocery();

    const router = useRouter();

    const onSubmit = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (value: any) => {
            const success = await createGrocery(value);

            if (success) {
                router.push('/groceries');
            }
        },
        [router, createGrocery]
    );

    return (
        <>
            <Header name='Create New Grocery' />
            <Main>
                {isLoading && <Loading />}

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
