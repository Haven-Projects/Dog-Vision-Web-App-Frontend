import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dog Vision AI - Breed Predictor",
  description: "AI-powered dog breed prediction from photos",
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon-16x16.svg',
        sizes: '16x16',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.svg',
        sizes: '180x180',
        type: 'image/svg+xml',
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
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-16x16.svg" sizes="16x16" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#40E0D0" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
