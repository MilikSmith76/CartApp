'use client';
import type { JSX } from 'react';

import axios from 'axios';
import { use, useCallback, useEffect, useState } from 'react';

import type { Cart, UpdateCartPageProps } from '@/interfaces';

import { CartForm, Header, LinkButton, Main } from '@/components';

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
                <LinkButton
                    href={`/carts/${id}/groceries`}
                    text='Edit Cart Groceries'
                />
                <div className='mt-5 mr-auto ml-auto rounded border-2 p-4 md:w-2/3 dark:border-white'>
                    <CartForm
                        cart={cart}
                        formHeader='Edit Cart'
                        onSubmit={onSubmit}
                    />
                </div>
            </Main>
        </>
    );
};

export default UpdateCartPage;
