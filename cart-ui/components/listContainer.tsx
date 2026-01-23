import type { JSX } from 'react';

import type { ListContainerProps } from '@/interfaces';

const DEFAULT_CLASS_NAME =
    'mt-5 ml-auto grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3';

const ListContainer = ({
    children,
    classExtension,
}: ListContainerProps): JSX.Element => {
    return (
        <div
            className={
                classExtension
                    ? DEFAULT_CLASS_NAME + ' ' + classExtension
                    : DEFAULT_CLASS_NAME
            }
        >
            {children}
        </div>
    );
};

export default ListContainer;
