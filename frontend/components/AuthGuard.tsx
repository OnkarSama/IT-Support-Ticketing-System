"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import apiRouter from "@/api/router";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["showUser"],
        queryFn: () => apiRouter.sessions.showUser(),
        retry: false,
    });

    useEffect(() => {
        if (!isLoading && (isError || !data?.user)) {
            router.replace("/"); // redirect to login
        }
    }, [isLoading, isError, data, router]);

    if (isLoading) return <div className="p-6">Checking session...</div>;

    return <>{children}</>;
}
