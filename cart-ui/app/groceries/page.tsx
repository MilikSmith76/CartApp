'use client';
import type { JSX } from 'react';

import { useCallback, useEffect, useMemo, useState } from 'react';

import {
    Button,
    CardContainer,
    ErrorAlert,
    GroceryCard,
    Header,
    LinkButton,
    Loading,
    Main,
} from '@/components';
import { useGroceries } from '@/hooks';
import { DEFAULT_PAGE_SIZE, ROUTES } from '@/utils';

const GroceriesPage = (): JSX.Element => {
    const [page, setPage] = useState(0);

    const {
        clearErrorMessage,
        errorMessage,
        fetchGroceries,
        groceries,
        isLoading,
        total,
    } = useGroceries();

    const toPrevPage = useCallback(() => {
        if (page == 0) {
            return;
        }

        setPage(page - 1);
    }, [setPage, page]);

    const toNextPage = useCallback(() => {
        setPage(page + 1);
    }, [setPage, page]);

    const hasPrev = useMemo(() => page > 0, [page]);

    const hasNext = useMemo(
        () => page * DEFAULT_PAGE_SIZE + groceries.length < total,
        [page, groceries, total]
    );

    useEffect(() => {
        fetchGroceries();
    }, [fetchGroceries]);

    return (
        <>
            <Header name='Groceries' />
            <Main>
                <LinkButton href={`${ROUTES.groceries}/new`} text='Create' />
                {isLoading && <Loading />}
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
                        <div className='mt-5 ml-auto grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                            {groceries.map((grocery) => (
                                <GroceryCard
                                    grocery={grocery}
                                    key={grocery.id}
                                />
                            ))}
                        </div>
                    </>
                )}
                <Button disabled={!hasPrev} onClick={toPrevPage} text='Prev' />
                <Button disabled={!hasNext} onClick={toNextPage} text='Next' />
            </Main>
        </>
    );
};

export default GroceriesPage;
