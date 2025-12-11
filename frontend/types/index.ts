export type TicketStatus = "open" | "in progress" | "closed" | null;

export type Filter = "all" | "open" | "in-progress" | "closed";

export interface Ticket {
    id: number;
    title: string;
    description: string;
    status: TicketStatus;
    creator: {
        id: number;
        name: string;
        email: string;
    };
    assignee?: {
        id: number;
        name: string;
        email: string;
    } | null;
    created_at: string;
    updated_at: string;
}
