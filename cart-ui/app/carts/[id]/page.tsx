'use client';
import type { JSX } from 'react';

import axios from 'axios';
import Link from 'next/link';
import { use, useCallback, useEffect, useState } from 'react';
import { Form } from 'react-final-form';

import type { Cart, UpdateCartPageProps } from '@/interfaces';

import { Button, Header, Main } from '@/components';
import TextFormField from '@/components/textFormField';
import { cartValidator } from '@/validators';

const UpdateCartPage = ({ params }: UpdateCartPageProps): JSX.Element => {
    const { id } = use(params);

    const [cart, setCart] = useState<Cart>();

    const onSubmit = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (value: any) => {
            const result = await axios.put<Cart>(`/api/carts/${id}`, value);

            setCart(result.data);
        },
        [id, setCart]
    );

    const getCart = useCallback(async () => {
        const result = await axios.get<Cart>(`/api/carts/${id}`);

        setCart(result.data);
    }, [id, setCart]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getCart();
    }, [getCart]);

    return (
        <>
            <Header name={`Edit Cart ${id}`} />
            <Main>
                <Link
                    className='ml-auto flex w-fit cursor-pointer rounded-md bg-emerald-500 p-5 text-white hover:bg-emerald-300'
                    href={`/carts/${id}/groceries`}
                >
                    Edit Cart Groceries
                </Link>
                <div className='mt-5 mr-auto ml-auto rounded border-2 p-4 md:w-2/3 dark:border-white'>
                    <Form
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        initialValues={cart as any}
                        onSubmit={onSubmit}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <div className='mb-5 text-2xl font-bold'>
                                    Edit Cart
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

export default UpdateCartPage;
