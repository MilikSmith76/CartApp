'use client';
import type { JSX } from 'react';

import { Form } from 'react-final-form';

import type { GroceryFormProps } from '@/interfaces';

import { groceryValidator } from '@/validators';

import Button from './button';
import TextFormField from './textFormField';

const GroceryForm = ({
    formHeader,
    grocery,
    onSubmit,
}: GroceryFormProps): JSX.Element => {
    return (
        <Form
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            initialValues={grocery as any}
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div className='mb-5 text-2xl font-bold'>{formHeader}</div>
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
    );
};

export default GroceryForm;
