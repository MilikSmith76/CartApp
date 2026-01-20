import type { JSX } from 'react';

import type { CardContainerProps } from '@/interfaces';

const DEFAULT_CLASS_NAME =
    'mr-auto ml-auto rounded border-2 p-4 md:w-2/3 dark:border-white';

const CardContainer = ({
    children,
    classExtension,
}: CardContainerProps): JSX.Element => {
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

export default CardContainer;
