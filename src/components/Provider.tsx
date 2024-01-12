"use client";
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ThemeProvider as NextThemesProvider, ThemeProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from 'react-query';

type Props = {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

const Providers = ({children, ...props}: ThemeProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <NextThemesProvider 
                attribute='class' 
                defaultTheme='light' 
                enableSystem
                {...props}>      
                <SessionProvider>
                    {children}
                </SessionProvider>
            </NextThemesProvider>
        </QueryClientProvider>
    )
}

export default Providers;