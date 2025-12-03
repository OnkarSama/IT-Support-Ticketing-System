import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableColumn,
    Chip,
} from "@heroui/react";
import Link from "next/link";
import { Ticket, Filter } from "@/types";

interface Props {
    tickets: Ticket[];
    filter: Filter;
    setFilter: (f: Filter) => void;
}

export default function TicketTable({ tickets, filter, setFilter }: Props) {
    return (
        <>

            <div className="flex gap-3 mb-6">
                {(["open", "in-progress", "closed", "all"] as Filter[]).map((f) => (
                    <Chip
                        key={f}
                        color={
                            filter === f ? f === "open"
                                    ? "success"
                                    : f === "in-progress"
                                        ? "warning"
                                        : f === "closed"
                                            ? "danger"
                                            : "primary"
                                : "default"
                        }
                        className="cursor-pointer"
                        onClick={() => setFilter(f)}
                    >
                        {f === "in-progress"
                            ? "In Progress"
                            : f.charAt(0).toUpperCase() + f.slice(1)}
                    </Chip>
                ))}
            </div>

            {/* Table */}
            <Table className = "bg-table_bg rounded-[0.75rem] py-5 px-6 mt-4 shadow-[0_18px_40px_rgba(0,0,0,0.35)]" aria-label="support tickets table" removeWrapper>
                <TableHeader className="">
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Ticket</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Requester</TableColumn>
                    <TableColumn>Description</TableColumn>
                </TableHeader>

                <TableBody
                    emptyContent="No tickets match this filter."
                    items={tickets}
                >
                    {(ticket) => (
                        <TableRow className = "m-4 p-4" key={ticket.id}>
                            <TableCell>
                                <Link
                                    href={`/tickets/${ticket.id}`}
                                    className="text-primary hover:underline"
                                >
                                    #{ticket.id}
                                </Link>
                            </TableCell>

                            <TableCell>
                                <Link
                                    href={`/tickets/${ticket.id}`}
                                    className="text-primary hover:underline"
                                >
                                    {ticket.title}
                                </Link>
                            </TableCell>

                            <TableCell>
                                <Chip
                                    size="sm"
                                    color={
                                        ticket.status === "Open"
                                            ? "success"
                                            : ticket.status === "In Progress"
                                                ? "warning"
                                                : "danger"
                                    }
                                >
                                    {ticket.status}
                                </Chip>
                            </TableCell>

                            <TableCell>{ticket.requester}</TableCell>
                            <TableCell className="text-text">
                                {ticket.description}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
