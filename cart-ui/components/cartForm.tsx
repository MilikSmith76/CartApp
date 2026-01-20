'use client';
import type { JSX } from 'react';

import { Form } from 'react-final-form';

import type { CartFormProps } from '@/interfaces';

import { cartValidator } from '@/validators';

import Button from './button';
import TextFormField from './textFormField';

const CartForm = ({
    cart,
    formHeader,
    onSubmit,
}: CartFormProps): JSX.Element => {
    return (
        <Form
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            initialValues={cart as any}
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div className='mb-5 text-2xl font-bold'>{formHeader}</div>
                    <TextFormField label='Name' name='name' />
                    <TextFormField label='Description' name='description' />
                    <Button text='Submit' type='submit' />
                </form>
            )}
            validate={cartValidator}
        />
    );
};

export default CartForm;
