'use client'
import { Description, Field, Input, Label } from '@headlessui/react';
import { JSX } from 'react';
import { Field as FinalField } from 'react-final-form';

import type { TextFormFieldProps } from '@/interfaces';

const TextFormField = ({
    inputType,
    label,
    name,
}: TextFormFieldProps): JSX.Element => (
    <FinalField name={name}>
        {({ input, meta }) => (
            <Field>
                <Label className='mt-4 block'>{label}</Label>
                <Input
                    {...input}
                    className='mt-1 block w-full rounded border-2 p-2 dark:border-white'
                    invalid={meta.error}
                    type={inputType}
                />
                {meta.error && meta.touched && (
                    <Description className='text-red-600'>
                        {meta.error}
                    </Description>
                )}
            </Field>
        )}
    </FinalField>
);

export default TextFormField;