import { JSX } from 'react';

import type { HeaderProps } from '@/interfaces';

const Header = ({ name }: HeaderProps): JSX.Element => {
    return (
        <header className='relative bg-emerald-400 after:pointer-events-none after:absolute after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10'>
            <div className='max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                <h1 className='text-3xl font-bold tracking-tight text-white'>
                    {name}
                </h1>
            </div>
        </header>
    );
};

export default Header;
