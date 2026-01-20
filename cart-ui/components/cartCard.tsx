import type { JSX } from 'react';

import Link from 'next/link';

import type { CartCardProps } from '@/interfaces';

const CartCard = ({ cart }: CartCardProps): JSX.Element => {
    return (
        <Link href={`/carts/${cart.id}/groceries`}>
            <div
                className='group col-span-1 rounded-md border-2 p-5'
                key={cart.id}
            >
                <div className='mt-5 text-2xl font-bold'>{cart.name}</div>
                {cart.description && <div>{cart.description}</div>}
            </div>
        </Link>
    );
};

export default CartCard;
