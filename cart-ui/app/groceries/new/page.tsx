'use client';
import type { JSX } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { GroceryForm, Header, Main } from '@/components';

const NewGroceryPage = (): JSX.Element => {
    const router = useRouter();

    const onSubmit = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (value: any) => {
            await axios.post('/api/groceries', value);

            router.push('/groceries');
        },
        [router]
    );

    return (
        <>
            <Header name='Create New Grocery' />
            <Main>
                <div className='mr-auto ml-auto rounded border-2 p-4 md:w-2/3 dark:border-white'>
                    <GroceryForm formHeader='New Grocery' onSubmit={onSubmit} />
                </div>
            </Main>
        </>
    );
};

export default NewGroceryPage;
