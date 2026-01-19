'use client'
import type { JSX } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Form } from 'react-final-form';

import { Button, Header, Main } from '@/components';
import TextFormField from '@/components/textFormField';
import { groceryValidator } from '@/validators';

const NewGroceryPage = (): JSX.Element => {
    const router = useRouter();

    const onSubmit = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (value: any) => {
            await axios.post('/api/groceries', value);

            router.push('/grocies');
        },
        [router]
    );

    return (
        <>
            <Header name='Create New Grocery' />
            <Main>
                <div className='mr-auto ml-auto rounded border-2 p-4 dark:border-white md:w-2/3'>
                    <Form
                        onSubmit={onSubmit}
                        render={({ handleSubmit }) => (
                           <form onSubmit={handleSubmit}>
                                <div className='mb-5 text-2xl font-bold'>New Grocery</div>
                                <TextFormField label='Name' name='name' />
                                <TextFormField label='Description' name='description' />
                                <TextFormField label='Image URL' name='imageUrl' />
                                <TextFormField label='Price' name='price' />
                                <TextFormField label='Purchased' name='purchased' />
                                <Button text='Submit' type='submit' />
                           </form> 
                        )}
                        validate={groceryValidator}
                    />
                </div>
            </Main>
        </>
    );
}

export default NewGroceryPage;
