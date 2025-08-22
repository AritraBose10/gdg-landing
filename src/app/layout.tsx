import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './provider';

export const metadata: Metadata = {
  title: 'GDG On Campus TIU',
  description: 'Join the Core Team',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
