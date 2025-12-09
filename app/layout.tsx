import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import clsx from "clsx";
import React from "react";

import { Providers } from "./providers";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Navbar } from "@/components/Navbar"; // optional
// import { Footer } from "@/components/Footer"; // if you want to replace app-footer

export const metadata: Metadata = {
    title: "Ticket Management",
    description: "Simple ticket management system UI built with Next.js",
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="en">
        <head />
        <body
            className={clsx(
                "min-h-screen text-foreground bg-background font-sans antialiased",
            )}
        >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col h-screen">

                <Navbar/> 

                <main className="app-main flex-1 p-6">{children}</main>



                {/* Theme Switcher */}
                <div className="fixed bottom-4 right-4 z-50">
                    <ThemeSwitcher className="transition-transform duration-300 hover:scale-110 hover:rotate-12" />
                </div>

                {/* --- App Footer (kept from original) --- */}
                <footer className="app-footer text-center py-4 border-t">
              <span>
                Ticket Management &copy; {new Date().getFullYear()}
              </span>
                </footer>
            </div>
        </Providers>
        </body>
        </html>
    );
}
