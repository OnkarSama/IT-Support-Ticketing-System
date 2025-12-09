import { MOCK_TICKETS } from "@/types/MOCK_TICKETS";

interface TicketPageProps {
    params: {
        id: string;
    };
}

export default function TicketPage({ params }: TicketPageProps) {
    const ticketId = Number(params.id);

    const ticket = MOCK_TICKETS.find(t => t.id === ticketId);

    if (!ticket) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">Ticket not found</h1>
                <p>No ticket exists with ID: {params.id}</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold">Ticket #{ticket.id}</h1>
            <h2 className="text-xl font-semibold">{ticket.title}</h2>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p><strong>Requester:</strong> {ticket.requester}</p>
            <p className="text-gray-700">{ticket.description}</p>
        </div>
    );
}

// Optional: if using Next.js 13 App Router
export async function generateStaticParams() {
    return MOCK_TICKETS.map(ticket => ({ id: ticket.id.toString() }));
}
