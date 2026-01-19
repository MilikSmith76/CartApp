'use client';
import type { JSX } from 'react';

import axios from 'axios';
import { use, useCallback, useEffect, useState } from 'react';
import { Form } from 'react-final-form';

import type { Grocery, UpdateGroceryPageProps } from '@/interfaces';

import { Button, Header, Main } from '@/components';
import TextFormField from '@/components/textFormField';
import { groceryValidator } from '@/validators';

const UpdateGroceryPage = ({ params }: UpdateGroceryPageProps): JSX.Element => {
    const { id } = use(params);

    const [grocery, setGrocery] = useState<Grocery>();

    const onSubmit = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (value: any) => {
            const result = await axios.put<Grocery>(
                `/api/groceries/${id}`,
                value
            );

            setGrocery(result.data);
        },
        [id]
    );

    const getGrocery = useCallback(async () => {
        const result = await axios.get<Grocery>(`/api/groceries/${id}`);

        setGrocery(result.data);
    }, [id, setGrocery]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getGrocery();
    }, [getGrocery]);

    return (
        <>
            <Header name={`Edit Grocery ${id}`} />
            <Main>
                <div className='mr-auto ml-auto rounded border-2 p-4 md:w-2/3 dark:border-white'>
                    <Form
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        initialValues={grocery as any}
                        onSubmit={onSubmit}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <div className='mb-5 text-2xl font-bold'>
                                    Edit Grocery
                                </div>
                                <TextFormField label='Name' name='name' />
                                <TextFormField
                                    label='Description'
                                    name='description'
                                />
                                <TextFormField
                                    label='Image URL'
                                    name='imageUrl'
                                />
                                <TextFormField label='Price' name='price' />
                                <TextFormField
                                    label='Purchased'
                                    name='purchased'
                                />
                                <Button text='Submit' type='submit' />
                            </form>
                        )}
                        validate={groceryValidator}
                    />
                </div>
            </Main>
        </>
    );
};

export default UpdateGroceryPage;
