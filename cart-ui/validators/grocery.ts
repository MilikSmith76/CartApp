import type { ValidationErrors } from 'final-form';

import type { Grocery } from '@/interfaces';

import { FORM_REQUIRED_FEILD_ERROR } from '@/utils';

const groceryValidator = (value?: Grocery): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!value?.name) {
        errors.name = FORM_REQUIRED_FEILD_ERROR;
    }

    if (!value?.imageUrl) {
        errors.imageUrl = FORM_REQUIRED_FEILD_ERROR;
    }

    if (!value?.price) {
        errors.price = FORM_REQUIRED_FEILD_ERROR;
    }

    return errors;
};

export default groceryValidator;
