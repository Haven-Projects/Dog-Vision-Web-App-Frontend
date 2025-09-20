import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dog Vision AI - Breed Predictor",
  description: "AI-powered dog breed prediction from photos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
