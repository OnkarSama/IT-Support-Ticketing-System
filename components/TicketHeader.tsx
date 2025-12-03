"use client";

import { Button } from "@heroui/react";

interface Props {
    onNewTicket: () => void;
}



export default function TicketHeader({ onNewTicket }: Props) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-3xl font-semibold">Tickets</h1>
                <p className="text-text">
                    View, filter, and manage support tickets.
                </p>
            </div>

            <Button className="bg-button-bg" onPress={onNewTicket}>
                + New Ticket
            </Button>
        </div>
    );
}
