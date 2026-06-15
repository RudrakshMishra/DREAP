import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'DREAP — Disaster Response & Emergency Assistance Portal',
  description: 'Real-time emergency alerts, shelter finder, safety guidelines, and incident reporting for India. Built for citizens, responders, and government agencies.',
  keywords: 'disaster response, emergency, flood, earthquake, shelter, NDMA, India, NDRF',
  authors: [{ name: 'DREAP Team' }],
  openGraph: {
    title: 'DREAP — Disaster Response & Emergency Assistance Portal',
    description: 'Real-time emergency coordination for India.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        {/* Floating Emergency Button (mobile) */}
        <a href="/contacts" className="fab" aria-label="Emergency Contacts">
          🚨
        </a>
      </body>
    </html>
  );
}
