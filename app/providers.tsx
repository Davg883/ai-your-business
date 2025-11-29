'use client';

import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import { ReactNode } from 'react';
import { UserSync } from '@/components/UserSync';

import { ThemeProvider } from '@/components/providers/ThemeProvider';

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://placeholder-url.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <ThemeProvider>
                    <UserSync />
                    {children}
                </ThemeProvider>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}
