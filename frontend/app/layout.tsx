import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import HideableNavbar from "@/components/HideableNavbar";
import Footer  from "@/components/Footer"; // if you want to replace app-footer

export const metadata: Metadata = {
    title: "Ticket Management",
    description: "Simple ticket management system UI built with Next.js",
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html className="m-0 p-0" suppressHydrationWarning lang="en">
        <body className="min-h-screen text-foreground bg-background font-sans antialiased">
        <Providers>
            <div className="relative flex flex-col h-screen">
                <HideableNavbar />
                <main className="pt-6 px-8 pb-10 flex-1 p-6">{children}</main>
                <Footer />
            </div>
        </Providers>
        </body>
        </html>
    );
}
