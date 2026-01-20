'use client';
import type { JSX } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { CardContainer, GroceryForm, Header, Main } from '@/components';

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
                <CardContainer>
                    <GroceryForm formHeader='New Grocery' onSubmit={onSubmit} />
                </CardContainer>
            </Main>
        </>
    );
};

export default NewGroceryPage;
