export type TicketStatus = "Open" | "In Progress" | "Closed";

export type Filter = "all" | "open" | "in-progress" | "closed";

export interface Ticket {
    id: number;
    title: string;
    description: string;
    status: TicketStatus;
    requester: string;
}
