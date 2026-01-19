'use client';
import type { JSX } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Form } from 'react-final-form';

import { Button, Header, Main } from '@/components';
import TextFormField from '@/components/textFormField';
import { cartValidator } from '@/validators';

const NewCartPage = (): JSX.Element => {
    const router = useRouter();

    const onSubmit = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (value: any) => {
            await axios.post('/api/carts', value);

            router.push('/');
        },
        [router]
    );

    return (
        <>
            <Header name='Create New Cart' />
            <Main>
                <div className='mr-auto ml-auto rounded border-2 p-4 md:w-2/3 dark:border-white'>
                    <Form
                        onSubmit={onSubmit}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <div className='mb-5 text-2xl font-bold'>
                                    New Cart
                                </div>
                                <TextFormField label='Name' name='name' />
                                <TextFormField
                                    label='Description'
                                    name='description'
                                />
                                <Button text='Submit' type='submit' />
                            </form>
                        )}
                        validate={cartValidator}
                    />
                </div>
            </Main>
        </>
    );
};

export default NewCartPage;
