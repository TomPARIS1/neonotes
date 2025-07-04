import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Neonotes",
  description: "A new way to take notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} font-sans`}
        >
          <Header/>

          <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex-1 p-4 bg-gray-100 overflow-y-auto scrollbar-hide">
              {children}
            </div>

          </div>

          <Toaster position="top-center"/>
        </body>
      </html>
    </ClerkProvider>
  );
}
