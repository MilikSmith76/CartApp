import type { Metadata } from 'next';
import type { JSX } from 'react';

import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';

import type { RootLayoutProps } from '@/interfaces';

import { Navbar } from '@/components';

const geistSans = Geist({
    subsets: ['latin'],
    variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-geist-mono',
});

export const metadata: Metadata = {
    description: 'An application to manage carts for a family.',
    title: 'Cart App',
};

const RootLayout = ({ children }: Readonly<RootLayoutProps>): JSX.Element => {
    return (
        <html lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Navbar />
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
