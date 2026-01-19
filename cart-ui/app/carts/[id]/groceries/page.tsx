'use client';
import type { JSX } from 'react';

import axios from 'axios';
import Link from 'next/link';
import { use, useCallback, useEffect, useState } from 'react';
import { Form } from 'react-final-form';

import type {
    BulkUpsertRequest,
    BulkUpsertResponse,
    CartGrocery,
    PaginationResponse,
    UpdateCartPageProps,
} from '@/interfaces';

import { Button, Header, Main } from '@/components';
import TextFormField from '@/components/textFormField';
import { cartGroceriesValidator } from '@/validators';

const DEFAULT_MAX_CART_GROCERIES = 1000;

const DEFAULT_BULK_REQUEST = { items: [] };

const UpdateCartGroceriesPage = ({
    params,
}: UpdateCartPageProps): JSX.Element => {
    const { id } = use(params);

    const [cartGroceries, setCartGroceries] = useState<
        BulkUpsertRequest<CartGrocery>
    >(DEFAULT_BULK_REQUEST);

    const onSubmit = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (value: any) => {
            const result = await axios.put<BulkUpsertResponse<CartGrocery>>(
                '/api/cartGroceries',
                value
            );

            // No convertion for the data because BulkUpsertRequest and BulkUpsertResponse are the same
            setCartGroceries(result.data);
        },
        [setCartGroceries]
    );

    const getCartGroceries = useCallback(async () => {
        const result = await axios.get<PaginationResponse<CartGrocery>>(
            '/api/cartGroceries',
            {
                params: {
                    cartId: id,
                    limit: DEFAULT_MAX_CART_GROCERIES,
                },
            }
        );

        setCartGroceries({
            items: result.data.results,
        });
    }, [id, setCartGroceries]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getCartGroceries();
    }, [getCartGroceries]);

    return (
        <>
            <Header name={`Edit Cart ${id}`} />
            <Main>
                <Link
                    className='ml-auto flex w-fit cursor-pointer rounded-md bg-emerald-500 p-5 text-white hover:bg-emerald-300'
                    href={`/carts/${id}`}
                >
                    Edit Cart
                </Link>
                <div className='mt-5 mr-auto ml-auto rounded border-2 p-4 md:w-2/3 dark:border-white'>
                    <Form
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        initialValues={cartGroceries as any}
                        onSubmit={onSubmit}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <div className='mb-5 text-2xl font-bold'>
                                    Edit Cart Groceries
                                </div>
                                {cartGroceries.items.map((item, index) => (
                                    <div key={index}>
                                        <div className='mt-5 text-2xl font-bold'>
                                            {item.cart?.name}
                                        </div>
                                        <TextFormField
                                            inputType='number'
                                            label='Quantity'
                                            name={`items[${index}].quantity`}
                                        />
                                    </div>
                                ))}
                                <Button text='Submit' type='submit' />
                            </form>
                        )}
                        validate={cartGroceriesValidator}
                    />
                </div>
            </Main>
        </>
    );
};

export default UpdateCartGroceriesPage;
