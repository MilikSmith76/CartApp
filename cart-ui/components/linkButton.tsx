import type { JSX } from 'react';

import Link from 'next/link';

interface LinkButtonProps {
    className?: string;
    href: string;
    text: string;
}

const LinkButton = ({
    className,
    href,
    text,
}: LinkButtonProps): JSX.Element => {
    return (
        <Link
            className={
                className ??
                'ml-auto flex w-fit cursor-pointer rounded-md bg-emerald-500 p-5 text-white hover:bg-emerald-300'
            }
            href={href}
        >
            {text}
        </Link>
    );
};

export default LinkButton;
