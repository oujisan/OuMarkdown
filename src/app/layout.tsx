import type { Metadata } from "next";
import { JetBrains_Mono } from 'next/font/google';
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "OuMarkdown",
  description: "Oujisan's Markdown Collection",
  icons: {
    icon: '/fumori.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrains.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}