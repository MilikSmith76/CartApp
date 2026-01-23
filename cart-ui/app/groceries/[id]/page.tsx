'use client';
import type { JSX } from 'react';

import { useRouter } from 'next/navigation';
import { use, useCallback, useEffect } from 'react';

import type { Grocery, UpdateGroceryPageProps } from '@/interfaces';

import {
    Button,
    CardContainer,
    ErrorAlert,
    GroceryForm,
    Header,
    Loading,
    Main,
} from '@/components';
import { useGrocery } from '@/hooks';

const UpdateGroceryPage = ({ params }: UpdateGroceryPageProps): JSX.Element => {
    const {
        clearErrorMessage,
        deleteGrocery,
        errorMessage,
        fetchGrocery,
        grocery,
        isLoading,
        updateGrocery,
    } = useGrocery();

    const { id } = use(params);

    const router = useRouter();

    const onSubmit = useCallback(
        async (value?: Grocery) => {
            await updateGrocery(value);
        },
        [updateGrocery]
    );

    const onDelete = useCallback(async () => {
        const success = await deleteGrocery();

        if (success) {
            router.push('/groceries');
        }
    }, [router, deleteGrocery]);

    useEffect(() => {
        fetchGrocery(id);
    }, [fetchGrocery, id]);

    return (
        <>
            <Header name={`Edit Grocery ${id}`} />
            <Main>
                <Loading isLoading={isLoading} />
                {!isLoading && grocery && (
                    <>
                        <Button
                            className='ml-auto flex w-fit cursor-pointer rounded-md bg-red-500 p-5 text-white hover:bg-red-300'
                            onClick={onDelete}
                            text='Delete'
                        />
                        <ErrorAlert
                            errorMessage={errorMessage}
                            onClear={clearErrorMessage}
                        />
                        <CardContainer classExtension='mt-5'>
                            <GroceryForm
                                formHeader='Edit Grocery'
                                grocery={grocery}
                                onSubmit={onSubmit}
                            />
                        </CardContainer>
                    </>
                )}
                {!isLoading && !grocery && (
                    <CardContainer>
                        {`Grocery ${id} cannot be found`}
                    </CardContainer>
                )}
            </Main>
        </>
    );
};

export default UpdateGroceryPage;
