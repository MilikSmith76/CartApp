'use client';
import type { JSX } from 'react';

import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Grocery, PaginationResponse } from '@/interfaces';

import { Button, GroceryCard, Header, Main } from '@/components';
import { DEFAULT_PAGE_SIZE } from '@/utils';

const GroceriesPage = (): JSX.Element => {
    const [groceries, setgroceries] = useState<Grocery[]>([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);

    const fetchGroceries = useCallback(async () => {
        const result = await axios.get<PaginationResponse<Grocery>>(
            '/api/groceries',
            {
                params: {
                    page,
                },
            }
        );

        setgroceries(result.data.results);
        setTotal(result.data.count);
    }, [setgroceries, page]);

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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchGroceries();
    }, [fetchGroceries]);

    return (
        <>
            <Header name='Groceries' />
            <Main>
                <div className='ml-auto grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                    {groceries.map((grocery) => (
                        <GroceryCard grocery={grocery} key={grocery.id} />
                    ))}
                </div>
                <Button disabled={!hasPrev} onClick={toPrevPage} text='Prev' />
                <Button disabled={!hasNext} onClick={toNextPage} text='Next' />
            </Main>
        </>
    );
};

export default GroceriesPage;
