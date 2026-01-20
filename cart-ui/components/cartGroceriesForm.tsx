'use client';
import type { JSX } from 'react';

import { Form } from 'react-final-form';

import type { CartGroceriesFormProps } from '@/interfaces';

import { cartGroceriesValidator } from '@/validators';

import Button from './button';
import TextFormField from './textFormField';

const CartGroceriesForm = ({
    bulkUpsertRequest,
    formHeader,
    onItemDelete,
    onSubmit,
}: CartGroceriesFormProps): JSX.Element => {
    return (
        <Form
            initialValues={bulkUpsertRequest}
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div className='mb-5 text-2xl font-bold'>{formHeader}</div>
                    {bulkUpsertRequest.items.map((cartGrocery, index) => (
                        <div key={index}>
                            <div className='mt-5 text-2xl font-bold'>
                                {cartGrocery.grocery?.name}
                            </div>
                            <TextFormField
                                inputType='number'
                                label='Quantity'
                                name={`items[${index}].quantity`}
                            />
                            <Button
                                className='mt-3 ml-auto flex w-fit cursor-pointer rounded-md bg-red-500 p-5 text-white hover:bg-red-300'
                                onClick={onItemDelete(index)}
                                text='Delete'
                            />
                        </div>
                    ))}
                    <Button text='Submit' type='submit' />
                </form>
            )}
            validate={cartGroceriesValidator}
        />
    );
};

export default CartGroceriesForm;
