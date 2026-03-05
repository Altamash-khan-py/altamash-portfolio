import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/query-provider';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Md Altamash Khan | Software Developer & Data Science Enthusiast',
  description: 'Portfolio of Md Altamash Khan - Software Developer, Data Science Enthusiast, and Entrepreneur from Bhagalpur, Bihar, India.',
  keywords: ['software developer', 'data science', 'entrepreneur', 'web development', 'machine learning', 'Bhagalpur', 'Bihar', 'India'],
  authors: [{ name: 'Md Altamash Khan' }],
  creator: 'Md Altamash Khan',
  metadataBase: new URL('https://altamashkhan.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://altamashkhan.dev',
    siteName: 'Md Altamash Khan',
    title: 'Md Altamash Khan | Software Developer & Data Science Enthusiast',
    description: 'Portfolio of Md Altamash Khan - Software Developer, Data Science Enthusiast, and Entrepreneur.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Md Altamash Khan | Software Developer & Data Science Enthusiast',
    description: 'Portfolio of Md Altamash Khan - Software Developer, Data Science Enthusiast, and Entrepreneur.',
    creator: '@altamashkhan',
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <QueryProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
