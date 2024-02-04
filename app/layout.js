import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: 'ShareHub',
  description: 'built for you',
};

const RootLayout = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
