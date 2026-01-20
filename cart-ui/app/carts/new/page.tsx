'use client';
import type { JSX } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { CartForm, Header, Main } from '@/components';

const NewCartPage = (): JSX.Element => {
    const router = useRouter();

    const onSubmit = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (value: any) => {
            await axios.post('/api/carts', value);

            router.push('/carts');
        },
        [router]
    );

    return (
        <>
            <Header name='Create New Cart' />
            <Main>
                <div className='mr-auto ml-auto rounded border-2 p-4 md:w-2/3 dark:border-white'>
                    <CartForm formHeader='New Cart' onSubmit={onSubmit} />
                </div>
            </Main>
        </>
    );
};

export default NewCartPage;
