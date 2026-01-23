'use client';
import type { JSX } from 'react';

import { useEffect } from 'react';

import {
    Button,
    CardContainer,
    ErrorAlert,
    GroceryCard,
    Header,
    LinkButton,
    ListContainer,
    Loading,
    Main,
} from '@/components';
import { useGroceries, usePagination } from '@/hooks';
import { ROUTES } from '@/utils';
const GroceriesPage = (): JSX.Element => {
    const {
        clearErrorMessage,
        errorMessage,
        fetchGroceries,
        groceries,
        isLoading,
        total,
    } = useGroceries();

    const { hasNext, hasPrev, page, toNextPage, toPrevPage } =
        usePagination(total);

    useEffect(() => {
        fetchGroceries(page);
    }, [page, fetchGroceries]);

    return (
        <>
            <Header name='Groceries' />
            <Main>
                <LinkButton href={`${ROUTES.groceries}/new`} text='Create' />
                <Loading isLoading={isLoading} />
                {!isLoading && !groceries.length && (
                    <CardContainer classExtension='mt-5'>
                        No Groceries could be found.
                    </CardContainer>
                )}
                {!isLoading && !!groceries.length && (
                    <>
                        <ErrorAlert
                            errorMessage={errorMessage}
                            onClear={clearErrorMessage}
                        />
                        <ListContainer>
                            {groceries.map((grocery) => (
                                <GroceryCard
                                    grocery={grocery}
                                    key={grocery.id}
                                />
                            ))}
                        </ListContainer>
                        <Button
                            disabled={!hasPrev}
                            onClick={toPrevPage}
                            text='Prev'
                        />
                        <Button
                            disabled={!hasNext}
                            onClick={toNextPage}
                            text='Next'
                        />
                    </>
                )}
            </Main>
        </>
    );
};

export default GroceriesPage;
