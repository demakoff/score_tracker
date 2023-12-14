import React from 'react';
import type { Metadata } from 'next';
import { Teko } from 'next/font/google';
import '@styles/globals.css';
import { Providers } from './providers';

const font = Teko({ subsets: ['latin'], weight: '300' });

export const metadata: Metadata = {
    title: 'Table Football score tracker'
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const headerClasses = 'bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent text-center text-4xl py-4';
    return (
        <html lang="en" className='dark'>
            <head><link rel="icon" href="/favicon.ico" sizes="any" /></head>
            <body className={font.className}>
                <Providers>
                    <main className="flex flex-col p-4 py-8">
                        <h1 className={headerClasses}>
                            Brand new Kicker score tracker
                        </h1>
                        {children}
                    </main>
                </Providers>
            </body>
        </html >
    );
}
