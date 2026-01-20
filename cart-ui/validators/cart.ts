import type { ValidationErrors } from 'final-form';

import type { Cart } from '@/interfaces';

import { FORM_REQUIRED_FEILD_ERROR } from '@/utils';

const cartValidator = (value?: Cart): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!value?.name) {
        errors.name = FORM_REQUIRED_FEILD_ERROR;
    }

    return errors;
};

export default cartValidator;
