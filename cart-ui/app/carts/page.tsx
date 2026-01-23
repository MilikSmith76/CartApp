'use client';
import type { JSX } from 'react';

import { useEffect } from 'react';

import {
    Button,
    CardContainer,
    CartCard,
    Header,
    LinkButton,
    ListContainer,
    Loading,
    Main,
} from '@/components';
import { useCarts, usePagination } from '@/hooks';
import { ROUTES } from '@/utils';

const CartsPage = (): JSX.Element => {
    const { carts, fetchCarts, isLoading, total } = useCarts();

    const { hasNext, hasPrev, page, toNextPage, toPrevPage } =
        usePagination(total);

    useEffect(() => {
        fetchCarts(page);
    }, [page, fetchCarts]);

    return (
        <>
            <Header name='Carts' />
            <Main>
                <LinkButton href={`${ROUTES.carts}/new`} text='Create' />
                {isLoading && <Loading />}
                {!isLoading && !carts.length && (
                    <CardContainer classExtension='mt-5'>
                        No Carts could be found.
                    </CardContainer>
                )}
                {!isLoading && !!carts.length && (
                    <>
                        <ListContainer>
                            {carts.map((cart) => (
                                <CartCard cart={cart} key={cart.id} />
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

export default CartsPage;
