"use client";

import {useState} from "react";
import TicketHeader from "@/components/TicketHeader";
import TicketTable from "@/components/TicketTable";
import {Filter} from "@/types";
import {MOCK_TICKETS} from "@/types/MOCK_TICKETS";


export default function HomePage() {
    const [filter, setFilter] = useState<Filter | null>(null);


    const filteredTickets = filter
        ? MOCK_TICKETS.filter(
            t => t.status.toLowerCase().replace(" ", "-") === filter
        )
        : MOCK_TICKETS.filter((t) => t.status === "Open" || t.status === "In Progress");


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
