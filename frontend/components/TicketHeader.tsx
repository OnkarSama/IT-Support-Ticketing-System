"use client";

import { Button } from "@heroui/react";

interface Props {
    onNewTicket: () => void;
}


export default function TicketHeader({ onNewTicket }: Props) {
    return (
        <div className="
            flex flex-col gap-4
            sm:flex-row sm:items-center sm:justify-between
            mb-6
        ">
            <div>
                <h1 className="text-heading text-2xl sm:text-3xl font-semibold">
                    Tickets
                </h1>
                <p className="text-subheading text-sm sm:text-base">
                    View, filter, and manage support tickets.
                </p>
            </div>

            <Button
                className="
                    bg-button-bg text-text
                    w-full sm:w-auto
                "
                onPress={onNewTicket}
            >
                + New Ticket
            </Button>
        </div>
    );
}

