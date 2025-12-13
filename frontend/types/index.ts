export type TicketStatus = "Open" | "In Progress" | "Closed" ;

export type Filter =  "open" | "in-progress" | "closed" | "all";

export interface Ticket {
    id: number;
    category: string;
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
