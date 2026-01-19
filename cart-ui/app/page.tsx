'use client';
import type { JSX } from 'react';

import axios from 'axios';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Cart, PaginationResponse } from '@/interfaces';

import { Button, CartCard, Header, Main } from '@/components';
import { DEFAULT_PAGE_SIZE } from '@/utils';

const CartsPage = (): JSX.Element => {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);

    const fetchCarts = useCallback(async () => {
        const result = await axios.get<PaginationResponse<Cart>>('/api/carts', {
            params: {
                page,
            },
        });

        setCarts(result.data.results);
        setTotal(result.data.count);
    }, [setCarts, page]);

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
        () => page * DEFAULT_PAGE_SIZE + carts.length < total,
        [page, carts, total]
    );

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCarts();
    }, [fetchCarts]);

    return (
        <>
            <Header name='Carts' />
            <Main>
                <Link
                    className='ml-auto flex w-fit cursor-pointer rounded-md bg-emerald-500 p-5 text-white hover:bg-emerald-300'
                    href={'carts/new'}
                >
                    Create
                </Link>
                <div className='mt-5 ml-auto grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                    {carts.map((cart) => (
                        <CartCard cart={cart} key={cart.id} />
                    ))}
                </div>
                <Button disabled={!hasPrev} onClick={toPrevPage} text='Prev' />
                <Button disabled={!hasNext} onClick={toNextPage} text='Next' />
            </Main>
        </>
    );
};

export default CartsPage;
