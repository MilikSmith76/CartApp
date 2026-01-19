import type { JSX } from 'react';

import type { ButtonProps } from '@/interfaces';

const Button = ({
    className,
    disabled,
    onClick,
    text,
}: ButtonProps): JSX.Element => {
    return (
        <button
            className={
                className ??
                'mt-5 mr-5 cursor-pointer rounded-md bg-emerald-500 p-5 text-white hover:bg-emerald-300 disabled:cursor-default disabled:bg-slate-500'
            }
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
