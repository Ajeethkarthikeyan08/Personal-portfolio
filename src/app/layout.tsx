import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ajeeth | AI & Data Science Student & Web Developer',
  description: 'Explore the personal portfolio of Ajeeth, specializing in Artificial Intelligence, Data Science, and premium Web Development. View interactive developer dashboards, skill graphs, and projects.',
  keywords: ['Ajeeth', 'Artificial Intelligence Student', 'Data Science Student', 'Web Developer', 'Next.js Portfolio', 'Machine Learning Engineer', 'Portfolio Website'],
  authors: [{ name: 'Ajeeth' }],
  creator: 'Ajeeth',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ajeeth.dev', // placeholder domain
    title: 'Ajeeth | AI & Data Science Student & Web Developer',
    description: 'Explore the personal portfolio of Ajeeth, specializing in Artificial Intelligence, Data Science, and premium web development.',
    siteName: 'Ajeeth Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ajeeth | AI & Data Science Student & Web Developer',
    description: 'Explore the personal portfolio of Ajeeth, specializing in Artificial Intelligence, Data Science, and premium web development.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-full flex flex-col antialiased bg-bg-base text-text-base transition-colors duration-300">
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.remove('light');
                  localStorage.setItem('theme', 'dark'); // Default
                }
              } catch (e) {}
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
