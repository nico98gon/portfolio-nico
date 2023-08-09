import './global.css';
import clsx from 'clsx';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';

const kaisei = localFont({
  src: '../public/fonts/kaisei-tokumin-latin-700-normal.woff2',
  weight: '700',
  variable: '--font-kaisei',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Nico Gonzalez',
    template: '%s | Nico Gonzalez',
  },
  description: 'Frontend developer, designer and backend dev',
  openGraph: {
    title: 'Nico Gonzalez',
    description: 'Frontend developer, designer and backend dev',
    url: 'https://nicogon.com.ar',
    siteName: 'Nico Gonzalez',
    images: [
      {
        url: '',
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Nico',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
  verification: {
    google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
    yandex: '14d2e73487fa6c71',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'text-white bg-black dark:text-white dark:bg-black',
        kaisei.variable
      )}
    >
      {/* <head/> */}
      <link href="/_next/static/css/app/layout.css?v=1683600244618" rel="preload" as="style" />
      <body className="bg-white antialiased max-w-[100wh] flex flex-col md:flex-row lg:mx-auto">
        <main className="bg-white flex-auto min-w-0 md:mt-0 flex flex-col md:px-0">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}