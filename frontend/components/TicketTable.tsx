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
    const [rowsPerPage, setRowsPerPage] = React.useState(30);
    const [page, setPage] = React.useState(1);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });

    // SAFELY FILTER TICKETS
    const filteredTickets = React.useMemo(() => {
        if (!Array.isArray(tickets)) return [];

        return tickets.filter((t) => {
            const status = (t.status ?? "").toLowerCase();

            if (filter === "open") return status === "open";
            if (filter === "in-progress") return status === "in progress";
            if (filter === "closed") return status === "closed";

            return true; // no filter selected
        });
    }, [tickets, filter]);

    React.useEffect(() => {
        setPage(1);
    }, [filter]);

    // SAFE SORTING
    const sortedTickets = React.useMemo(() => {
        const list = Array.isArray(filteredTickets) ? filteredTickets : [];
        const sorted = [...list];
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

    const pages = Math.ceil(sortedTickets.length / rowsPerPage);

    const statusColorMap: Record<string, "success" | "warning" | "danger"> = {
        open: "success",
        "in progress": "warning",
        closed: "danger",
    };

    const truncateWords = (text: string, limit: number) => {
        const words = text.split(" ");
        if (words.length <= limit) return text;
        return words.slice(0, limit).join(" ") + "...";
    };

    const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    };

    return (
        <>
            {/* FILTER CHIPS */}
            <div className="flex mb-6 flex-wrap">
                {(["open", "in-progress", "closed"] as Filter[]).map((f) => {
                    const active = filter === f;

                    return (
                        <Chip
                            key={f}
                            color={
                                f === "open"
                                    ? "success"
                                    : f === "in-progress"
                                        ? "warning"
                                        : "danger"
                            }
                            variant={active ? "shadow" : "flat"}
                            className="cursor-pointer transition"
                            onClick={() => {
                                if (filter === f) setFilter(null);
                                else setFilter(f);
                            }}
                        >
                            {f === "in-progress"
                                ? "In Progress"
                                : f.charAt(0).toUpperCase() + f.slice(1)}
                        </Chip>
                    );
                })}
            </div>

            {/* TABLE */}
            <Table
                removeWrapper
                isHeaderSticky
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
                className="
                    bg-table_bg
                    rounded-xl
                    border border-table_border
                    min-w-full w-full
                    py-6 px-8
                    shadow-[0_18px_40px_rgba(0,0,0,0.35)]
                "
                classNames={{
                    wrapper: "bg-table_bg",
                    thead: "bg-table_bg",
                    th: "bg-table_bg text-subheading font-semibold",
                    tr: "hover:bg-[#1a1a1a50]",
                    td: "text-text",
                }}
            >
                <TableHeader className="bg-table_border">
                    <TableColumn key="id" allowsSorting>
                        Number
                    </TableColumn>
                    <TableColumn key="title" allowsSorting>
                        Title
                    </TableColumn>
                    <TableColumn key="status" allowsSorting>
                        Status
                    </TableColumn>
                    <TableColumn key="requester">Requester</TableColumn>
                    <TableColumn key="description">Description</TableColumn>
                </TableHeader>

                <TableBody emptyContent="No tickets match this filter." items={displayedTickets}>
                    {(ticket) => (
                        <TableRow key={ticket.id}>
                            <TableCell>
                                <Link
                                    href={`/ticket/${ticket.id}`}
                                    className="text-text hover:underline"
                                >
                                    #{ticket.id}
                                </Link>
                            </TableCell>

                            <TableCell>
                                <Link
                                    href={`/ticket/${ticket.id}`}
                                    className="text-text hover:underline"
                                >
                                    {ticket.title}
                                </Link>
                            </TableCell>

                            <TableCell>
                                <Chip
                                    size="sm"
                                    color={
                                        statusColorMap[
                                            (ticket.status ?? "").toLowerCase()
                                            ] || "default"
                                    }
                                >
                                    {ticket.status ?? "Unknown"}
                                </Chip>
                            </TableCell>

                            <TableCell>{ticket.creator.name}</TableCell>

                            <TableCell>
                                {truncateWords(ticket.description, 20)}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* PAGINATION */}
            <div className="text-text flex justify-between items-center mt-4">
                <Pagination
                    showControls
                    loop
                    isCompact
                    showShadow
                    page={page}
                    total={pages}
                    variant="flat"
                    onChange={setPage}
                />

                <label className="flex items-center gap-2 text-default-400 text-small">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        value={rowsPerPage}
                        onChange={onRowsPerPageChange}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="30">30</option>
                    </select>
                </label>
            </div>
        </>
    );
}
