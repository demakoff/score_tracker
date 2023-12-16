'use client';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ApolloProvider client={apolloClient}>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </ApolloProvider>
    );
}