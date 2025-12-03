import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Pagination,
    SortDescriptor,
} from "@heroui/react";
import Link from "next/link";
import { Ticket, Filter } from "@/types";

export const statusOptions = [
    { name: "Open", uid: "open" },
    { name: "In Progress", uid: "in-progress" },
    { name: "Closed", uid: "closed" },
];

interface Props {
    tickets: Ticket[];
    filter: Filter | null;
    setFilter: (f: Filter | null) => void;
}

export default function TicketTable({ tickets, filter, setFilter }: Props) {
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(1);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });

    const filteredTickets = React.useMemo(() => {
        if (!filter || filter === "all") return tickets;

        return tickets.filter((t) =>
            filter === "in-progress"
                ? t.status.toLowerCase() === "in progress"
                : t.status.toLowerCase() === filter
        );
    }, [tickets, filter]);

    const sortedTickets = React.useMemo(() => {
        const sorted = [...filteredTickets];
        const { column, direction } = sortDescriptor;

        sorted.sort((a, b) => {
            let first: any = a[column as keyof Ticket];
            let second: any = b[column as keyof Ticket];

            if (typeof first === "string") first = first.toLowerCase();
            if (typeof second === "string") second = second.toLowerCase();

            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return direction === "descending" ? -cmp : cmp;
        });

        return sorted;
    }, [filteredTickets, sortDescriptor]);

    const displayedTickets = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return sortedTickets.slice(start, start + rowsPerPage);
    }, [sortedTickets, page, rowsPerPage]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const pages = Math.ceil(sortedTickets.length / rowsPerPage);

    const statusColorMap: Record<string, "success" | "warning" | "danger"> = {
        open: "success",
        "in progress": "warning",
        closed: "danger",
    };

    return (
        <>

            <div className="flex gap-3 mb-6 flex-wrap">
                {(["open", "in-progress", "closed", "all"] as Filter[]).map((f) => {
                    const activeColor =
                        f === "open"
                            ? "success"
                            : f === "in-progress"
                                ? "warning"
                                : f === "closed"
                                    ? "danger"
                                    : "primary";
                    const isActive = filter === f;
                    return (
                        <Chip
                            key={f}
                            color={activeColor}
                            variant={isActive ? "shadow" : "flat"}
                            className="cursor-pointer transition"
                            onClick={() => setFilter(isActive || f === "all" ? null : f)}
                        >
                            {f === "in-progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
                        </Chip>
                    );
                })}
            </div>

            {/* Table */}
            <Table
                className="bg-table_bg rounded-[0.75rem] py-5 px-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                removeWrapper
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
            >
                <TableHeader>
                    <TableColumn key="id" allowsSorting>
                        ID
                    </TableColumn>
                    <TableColumn key="title" allowsSorting>
                        Ticket
                    </TableColumn>
                    <TableColumn key="status" allowsSorting>
                        Status
                    </TableColumn>
                    <TableColumn key="requester">
                        Requester
                    </TableColumn>
                    <TableColumn key="description">Description</TableColumn>
                </TableHeader>

                <TableBody emptyContent="No tickets match this filter." items={displayedTickets}>
                    {(ticket) => (
                        <TableRow key={ticket.id}>
                            <TableCell>
                                <Link href={`/tickets/${ticket.id}`} className="text-text hover:underline">
                                    #{ticket.id}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/tickets/${ticket.id}`} className="text-text hover:underline">
                                    {ticket.title}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Chip size="sm" color={statusColorMap[ticket.status.toLowerCase()]}>
                                    {ticket.status}
                                </Chip>
                            </TableCell>
                            <TableCell className="text-text">{ticket.requester}</TableCell>
                            <TableCell className="text-text">{ticket.description}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className=" text-text flex justify-between items-center mt-4">
                <Pagination showControls loop isCompact showShadow page={page} total={pages} variant="flat" onChange={setPage} />
                <label className="flex items-center gap-2 text-default-400 text-small">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        onChange={onRowsPerPageChange}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </label>
            </div>
        </>
    );
}
