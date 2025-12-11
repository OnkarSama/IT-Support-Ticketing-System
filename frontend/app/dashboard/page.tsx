"use client";

import { useState } from "react";
import TicketHeader from "@/components/TicketHeader";
import TicketTable from "@/components/TicketTable";
import { useRouter } from "next/navigation";
import { Filter, Ticket } from "@/types";

import { useQuery, useMutation } from "@tanstack/react-query";
import apiRouter from "@/api/router";

export default function HomePage() {
    const router = useRouter();
    const [filter, setFilter] = useState<Filter | null>(null);

    const { data, refetch } = useQuery<Ticket[]>({ queryKey: ['getUsers'], queryFn: apiRouter.tickets.getTickets})

    console.log(data);
    const handleNewTicketWindow = () => {
        router.push("/ticket/create");
    };

    return (
        <main className="max-w-7xl mx-auto p-6">
            <TicketHeader onNewTicket={handleNewTicketWindow} />

            <TicketTable
                tickets={data || []}
                filter={filter}
                setFilter={setFilter}
            />
        </main>
    );
}
