'use client';
import type { JSX } from 'react';

import { useEffect } from 'react';

import {
    Button,
    CardContainer,
    CartCard,
    Header,
    LinkButton,
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
                        <div className='mt-5 ml-auto grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                            {carts.map((cart) => (
                                <CartCard cart={cart} key={cart.id} />
                            ))}
                        </div>
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
