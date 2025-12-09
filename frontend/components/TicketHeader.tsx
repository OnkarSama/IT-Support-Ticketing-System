"use client";

import { Button } from "@heroui/react";

interface Props {
    onNewTicket: () => void;
}



export default function TicketHeader({ onNewTicket }: Props) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-heading text-3xl mb-4 font-semibold">Tickets</h1>
                <p className="mb-4 text-subheading">
                    View, filter, and manage support tickets.
                </p>
            </div>

            <Button className="bg-button-bg text-text" onPress={onNewTicket}>
                + New Ticket
            </Button>
        </div>
    );
}
