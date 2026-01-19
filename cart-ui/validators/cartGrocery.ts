import type { ValidationErrors } from 'final-form';

import type { CartGrocery } from '@/interfaces';

import { FORM_REQUIRED_FEILD_ERROR } from '@/utils';

const cartGroceryValidator = (
    value: Record<keyof CartGrocery, string>
): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!value.quantity) {
        errors.quantity = FORM_REQUIRED_FEILD_ERROR;
    }

    return errors;
};

export default cartGroceryValidator;
