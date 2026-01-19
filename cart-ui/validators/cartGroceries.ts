import type { ValidationErrors } from 'final-form';

import type { BulkUpsertRequest, CartGrocery } from '@/interfaces';

import cartGroceryValidator from './cartGrocery';

const cartGroceriesValidator = (
    value: BulkUpsertRequest<CartGrocery>
): ValidationErrors => {
    const errors: ValidationErrors = {};

    let wasErrorsFound = false;

    const items: ValidationErrors[] = [];

    value.items.forEach((cartGrocery) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cartGroceryErrors = cartGroceryValidator(cartGrocery as any);

        if (
            !wasErrorsFound &&
            cartGroceryErrors &&
            Object.keys(cartGroceryErrors).length > 0
        ) {
            wasErrorsFound = true;
        }

        items.push(cartGroceryErrors);
    });

    if (wasErrorsFound) {
        errors.items = items;
    }

    return errors;
};

export default cartGroceriesValidator;
