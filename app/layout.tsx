import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Link from "next/link";
import { useCartStore } from "./utils/cartStore";
import CartItems from "./components/CartItems";
import CurrencySelector from "./components/CurrencySelector";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mini-Commerce",
  description: "A tiny e-commerce store built with Next.js and React Query",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <header className="w-full border-b mb-6 py-4 px-6 flex items-center justify-between bg-white sticky top-0 z-10">
            <Link href="/" className="text-xl font-bold">
              Mini-Commerce
            </Link>
            <div className="flex items-center gap-6">
              <CurrencySelector />
              <CartItems />
            </div>
          </header>
          <main className="w-full mx-auto px-4">{children}</main>
          <footer className="w-full mt-12 py-6 bg-gray-50 border-t text-center text-gray-600 text-sm">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4">
              <div>
                © {new Date().getFullYear()} Mini-Commerce. All rights reserved.
              </div>
              <div className="flex gap-4 items-center">
                <span className="hidden sm:inline">|</span>
                <Link
                  href="https://david-bradford.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  About
                </Link>
                <Link
                  href="https://github.com/deviator53"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
