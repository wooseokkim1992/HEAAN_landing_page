import type { Metadata } from 'next';

import Image from 'next/image';

import AmplifyConfiguration from '@/amplify/AmplifyConfiguration';

import './globals.css';
import AuthChecker from '@/components/AuthChecker';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import QueryProvider from '@/state/tanstackQuery/QueryProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://heaan.io'),
  title: 'CODE.HEAAN',
  description: 'Building and executing HEaaN-powered applications even on GPU via the web.',
  keywords: ['CODE.HEAAN', 'HEaaN', 'cloud-base development environment'],
  openGraph: {
    title: 'CODE.HEAAN',
    description: 'Building and executing HEaaN-powered applications even on GPU via the web.',
    url: new URL('https://heaan.io'),
    siteName: 'CODE.HEAAN',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'CODE.HEAAN Symbol image',
      },
    ],
    type: 'website',
  },
  twitter: {
    title: 'CODE.HEAAN',
    description: 'Building and executing HEaaN-powered applications even on GPU via the web.',
    card: 'summary_large_image',
    images: '/twitter-image.png',
  },
  icons: {
    icon: [
      {
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
        url: '/assets/HEaaN_light.png',
      },
      {
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
        url: '/assets/HEaaN_dark.png',
      },
    ],
    apple: [
      {
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
        url: '/assets/HEaaN_light.png',
      },
      {
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
        url: '/assets/HEaaN_dark.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`bg-bg00 antialiased`}>
        <AmplifyConfiguration>
          <QueryProvider>
            <AuthChecker />
            <Navigation />
            <main className="relative h-fit min-h-screen">
              <Image
                src="/assets/codeheaan_bg_light.png"
                alt="codeheaan-background"
                className="-z-1 mt-[60px] block object-cover dark:hidden"
                sizes="(max-width: 1280px) 85vw, 70vw"
                fill
                priority
              />
              <Image
                src="/assets/codeheaan_bg_dark.png"
                alt="codeheaan-background"
                className="-z-1 mt-[60px] hidden object-cover dark:block"
                sizes="(max-width: 1280px) 85vw, 70vw"
                fill
                priority
              />
              <section className="h-full min-h-screen w-full pt-[60px]">{children}</section>
            </main>
            <Footer />
          </QueryProvider>
        </AmplifyConfiguration>
      </body>
    </html>
  );
}
