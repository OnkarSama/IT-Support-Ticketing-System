import AuthGuard from "@/components/AuthGuard";

export default function EditTicketPage({ children }: { children: React.ReactNode }) {
    return <AuthGuard>{children}</AuthGuard>;
}
