import type { JSX } from 'react';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, ShoppingCartIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

import type { NavbarLink } from '@/interfaces';

const links: NavbarLink[] = [
    {
        href: '/',
        name: 'Carts',
    },
    {
        href: '/groceries',
        name: 'Groceries',
    },
];

const Navbar = (): JSX.Element => {
    return (
        <nav className='w-full bg-emerald-700'>
            <div className='flex h-16 items-center justify-between'>
                <div className='shrink-0 p-4'>
                    <ShoppingCartIcon className='size-5 fill-white' />
                </div>
                <div className='ml-10 hidden items-baseline space-x-4 md:flex'>
                    {links.map((link) => (
                        <Link
                            className='text-md rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white'
                            href={link.href}
                            key={link.name}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className='p-4 px-3 py-2' />
                </div>
                <div className='ml-10 flex items-baseline space-x-4 md:hidden'>
                    <Menu>
                        <MenuButton className='inline-flex items-center pr-4 text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white'>
                            <Bars3Icon className='size-5 fill-white' />
                        </MenuButton>
                        <MenuItems
                            anchor='bottom end'
                            className='w-52 origin-top-right rounded-xl border border-slate-500 bg-white p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0'
                            transition
                        >
                            {links.map((link) => (
                                <MenuItem key={link.name}>
                                    <Link
                                        className='group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-black data-focus:bg-white/10'
                                        href={link.href}
                                        key={link.name}
                                    >
                                        {link.name}
                                    </Link>
                                </MenuItem>
                            ))}
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
