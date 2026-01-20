import type { JSX } from 'react';

import { XMarkIcon } from '@heroicons/react/20/solid';

import type { ErrorAlertProps } from '@/interfaces';

const ErrorAlert = ({
    errorMessage,
    onClear,
}: ErrorAlertProps): JSX.Element => {
    return (
        <>
            {errorMessage && (
                <div className='text mt-5 mr-auto ml-auto flex items-center rounded border-2 border-red-800 bg-red-400 p-4 md:w-2/3'>
                    <XMarkIcon
                        className='mr-5 size-7 cursor-pointer fill-red-800 text-gray-800'
                        onClick={onClear}
                    />
                    {errorMessage}
                </div>
            )}
        </>
    );
};

export default ErrorAlert;
