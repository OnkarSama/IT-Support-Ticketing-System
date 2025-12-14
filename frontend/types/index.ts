export type TicketStatus = "Open" | "In Progress" | "Closed";

export type Filter = "open" | "in-progress" | "closed" | "all";

export interface Assignee {
    id: number;
    name: string;
    email: string;
}

export interface Ticket {
    id: number;
    category: string;
    title: string;
    description: string;
    status: TicketStatus;
    priority: string;
    creator: {
        id: number;
        name: string;
        email: string;
    };
    assignees?: Assignee[] | null;
    created_at: string;
    updated_at: string;
}
