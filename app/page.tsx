"use client";

import { useMemo, useState } from "react";
import TicketHeader from "@/components/TicketHeader";
import TicketTable from "@/components/TicketTable";

/* ---------------- Types ---------------- */

type TicketStatus = "Open" | "In Progress" | "Closed";
type Filter = "all" | "open" | "in-progress" | "closed";

interface Ticket {
    id: number;
    title: string;
    description: string;
    status: TicketStatus;
    requester: string;
}

/* ---------------- Mock Data ---------------- */

const MOCK_TICKETS: Ticket[] = [
    {
        id: 101,
        title: "Cannot login to portal",
        description: "User reports an authentication error on login.",
        status: "Open",
        requester: "James Carter",
    },
    {
        id: 102,
        title: "Email not syncing",
        description: "Mobile email app is not syncing new messages.",
        status: "In Progress",
        requester: "Rahima Patel",
    },
    {
        id: 103,
        title: "Printer offline",
        description: "Office printer shows offline on all workstations.",
        status: "Closed",
        requester: "Alex Johnson",
    },
];

/* ---------------- Page ---------------- */

export default function HomePage() {
    const [filter, setFilter] = useState<Filter>("all");

    const filteredTickets = useMemo(() => {
        switch (filter) {
            case "open":
                return MOCK_TICKETS.filter((t) => t.status === "Open");
            case "in-progress":
                return MOCK_TICKETS.filter((t) => t.status === "In Progress");
            case "closed":
                return MOCK_TICKETS.filter((t) => t.status === "Closed");
            default:
                // Show Open + In Progress by default
                return MOCK_TICKETS.filter(
                    (t) => t.status === "Open" || t.status === "In Progress"
                );
        }
    }, [filter]);

    const handleNewTicketWindow = () => {
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        window.open(
            "/new-ticket",
            "newTicketWindow",
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );
    };

    return (
        <main className="max-w-7xl mx-auto p-6">
            <TicketHeader onNewTicket={handleNewTicketWindow} />

            <TicketTable
                tickets={filteredTickets}
                filter={filter}
                setFilter={setFilter}
            />
        </main>
    );
}
