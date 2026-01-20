import type { JSX } from 'react';

import { ArrowPathIcon } from '@heroicons/react/24/outline';

const Loading = (): JSX.Element => {
    return (
        <div className='inline-flex w-full justify-center'>
            <div className='size-10 animate-spin'>
                <ArrowPathIcon className='text-gray-800' />
            </div>
        </div>
    );
};

export default Loading;
