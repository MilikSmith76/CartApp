import type { JSX } from 'react';

import { ArrowPathIcon } from '@heroicons/react/24/outline';

import type { LoadingProps } from '@/interfaces';

const Loading = ({ isLoading }: LoadingProps): JSX.Element => {
    return (
        <>
            {isLoading && (
                <div className='inline-flex w-full justify-center'>
                    <div className='size-10 animate-spin'>
                        <ArrowPathIcon className='text-gray-800 dark:text-white' />
                    </div>
                </div>
            )}
        </>
    );
};

export default Loading;
