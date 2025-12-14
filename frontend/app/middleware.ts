import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = [
    "/dashboard",
    "/ticket/create",
    "/ticket/[id]",
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isProtected = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route)
    );

    // Allow public routes
    if (!isProtected) return NextResponse.next();

    // Check for session cookie
    const hasSession = request.cookies.get("_my_app_session"); // adjust name if needed

    if (!hasSession) {
        // Redirect to login
        const loginUrl = new URL("/", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
    matcher: ["/dashboard/:path*", "/ticket/:path*"],
};
