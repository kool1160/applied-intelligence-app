import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-WOC Lite',
  description: 'Applied Intelligence AI-WOC Work Order Correction Agent'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
