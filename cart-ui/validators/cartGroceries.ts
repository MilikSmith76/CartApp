import type { ValidationErrors } from 'final-form';

import type { BulkUpsertRequest, CartGrocery } from '@/interfaces';

import cartGroceryValidator from './cartGrocery';

const cartGroceriesValidator = (
    value?: BulkUpsertRequest<CartGrocery>
): ValidationErrors => {
    const errors: ValidationErrors = {};

    let wasErrorFound = false;

    const items: ValidationErrors[] = [];

    value?.items?.forEach((cartGrocery) => {
        const cartGroceryErrors = cartGroceryValidator(cartGrocery);

        if (
            !wasErrorFound &&
            cartGroceryErrors &&
            Object.keys(cartGroceryErrors).length > 0
        ) {
            wasErrorFound = true;
        }

        items.push(cartGroceryErrors);
    });

    if (wasErrorFound) {
        errors.items = items;
    }

    return errors;
};

export default cartGroceriesValidator;
