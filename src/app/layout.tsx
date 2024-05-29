import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Provider from './_trpc/Provider';

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "An application that allows you to manage all your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main className="p-24">
            <p className="fixed left-0 top-0 flex w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
              Todo List
            </p>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
