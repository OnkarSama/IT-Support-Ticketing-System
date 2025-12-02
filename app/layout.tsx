import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import clsx from "clsx";

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
                fontSans.variable
            )}
        >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col h-screen">
                {/* --- App Header (Your original one) --- */}
                <header className="app-header flex items-center justify-between px-6 py-4 border-b">
                    <div className="app-logo text-xl font-semibold">
                        Ticket Management
                    </div>
                    <nav className="app-nav flex gap-4">
                        <a href="/" className="nav-link hover:underline">
                            Home
                        </a>
                        <a href="/new-ticket" className="nav-link hover:underline">
                            New Ticket
                        </a>
                    </nav>
                </header>

                {/* --- Main content --- */}
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
