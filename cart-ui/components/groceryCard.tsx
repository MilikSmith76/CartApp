import type { JSX } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import type { GroceryCardProps } from '@/interfaces';

import {
    DEFAULT_EXTERNAL_IMAGE_HEIGHT,
    DEFAULT_EXTERNAL_IMAGE_WIDTH,
} from '@/utils/constants';

const GroceryCard = ({ grocery }: GroceryCardProps): JSX.Element => {
    return (
        <Link href={`/groceries/${grocery.id}`}>
            <div
                className='group col-span-1 rounded-md border-2 bg-white p-5'
                key={grocery.id}
            >
                <div className='mt-5 text-2xl font-bold'>{grocery.name}</div>
                <div className='mt-2 flex justify-center h-auto w-full'>
                    <Image
                        alt='Product Image'
                        height={DEFAULT_EXTERNAL_IMAGE_HEIGHT}
                        loading='lazy'
                        src={grocery.imageUrl}
                        width={DEFAULT_EXTERNAL_IMAGE_WIDTH}
                    />
                </div>
                <div className='mt-2'>
                    <b>$</b> {grocery.price}
                </div>
                {grocery.description && (
                    <div className='mt-2'>{grocery.description}</div>
                )}
            </div>
        </Link>
    );
};

export default GroceryCard;
