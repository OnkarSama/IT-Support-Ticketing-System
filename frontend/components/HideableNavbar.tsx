"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";

export default function HideableNavbar() {
    const pathname = usePathname();

    // pages where navbar should NOT show
    const hideNavbarRoutes = ["/"]; // login page

    if (hideNavbarRoutes.includes(pathname)) {
        return null;
    }

    return <Navbar />;
}
