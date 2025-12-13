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
import { useRouter, useSearchParams } from "next/navigation";
import { Ticket, Filter } from "@/types";

interface Props {
    tickets: Ticket[];
    filter: Filter | null;
    setFilter: (f: Filter | null) => void;
}

export default function TicketTable({ tickets, filter, setFilter }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // ---- INITIAL STATE FROM URL ----
    const initialPage = Number(searchParams.get("page")) || 1;
    const initialRows = Number(searchParams.get("rows")) || 30;

    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRows);

    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });

    // ---- COLOR MAPS ----
    const categoryColorMap: Record<
        string,
        "primary" | "secondary" | "success" | "warning" | "danger"
    > = {
        hardware: "primary",
        software: "secondary",
        network: "warning",
        access: "danger",
        login: "success",
    };

    const statusColorMap: Record<string, "success" | "warning" | "danger"> = {
        Open: "success",
        "In Progress": "warning",
        Closed: "danger",
    };

    // ---- FILTER ----
    const filteredTickets = React.useMemo(() => {
        if (!Array.isArray(tickets)) return [];

        return tickets.filter((t) => {
            const status = t.status ?? "";

            if (filter === "open") return status === "Open";
            if (filter === "in-progress") return status === "In Progress";
            if (filter === "closed") return status === "Closed";
            if (filter === "all") return true;

            return status === "Open" || status === "In Progress";
        });
    }, [tickets, filter]);

    // reset page ONLY when filter changes
    React.useEffect(() => {
        setPage(1);
    }, [filter]);

    // ---- SORT ----
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

    // ---- PAGINATION ----
    const displayedTickets = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return sortedTickets.slice(start, start + rowsPerPage);
    }, [sortedTickets, page, rowsPerPage]);

    const pages = Math.max(1, Math.ceil(sortedTickets.length / rowsPerPage));

    // clamp page if rowsPerPage changes or tickets shrink
    React.useEffect(() => {
        if (page > pages) {
            setPage(pages);
        }
    }, [pages]);

    // ---- SYNC PAGE + ROWS TO URL ----
    React.useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        params.set("rows", String(rowsPerPage));

        router.replace(`?${params.toString()}`, { scroll: false });
    }, [page, rowsPerPage]);

    const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
    };

    const truncateWords = (text: string, limit: number) => {
        const words = text.split(" ");
        if (words.length <= limit) return text;
        return words.slice(0, limit).join(" ") + "...";
    };

    return (
        <>
            {/* FILTER CHIPS */}
            <div className="flex mb-4 gap-3 flex-wrap">
                {(["open", "in-progress", "closed", "all"] as Filter[]).map((f) => {
                    const active = filter === f;

                    return (
                        <Chip
                            key={f}
                            color={
                                f === "open"
                                    ? "success"
                                    : f === "in-progress"
                                        ? "warning"
                                        : f === "closed"
                                            ? "danger"
                                            : "primary"
                            }
                            variant={active ? "shadow" : "flat"}
                            className="cursor-pointer"
                            onClick={() => setFilter(active ? null : f)}
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
                <TableHeader>
                    <TableColumn key="id" allowsSorting>Number</TableColumn>
                    <TableColumn key="title" allowsSorting>Title</TableColumn>
                    <TableColumn key="status" allowsSorting>Status</TableColumn>
                    <TableColumn key="category" allowsSorting>Category</TableColumn>
                    <TableColumn key="description">Description</TableColumn>
                    <TableColumn key="assignees">Assignees</TableColumn>
                    <TableColumn key="requester">Requester</TableColumn>
                </TableHeader>

                <TableBody emptyContent="No tickets match." items={displayedTickets}>
                    {(ticket) => (
                        <TableRow key={ticket.id}>
                            <TableCell>
                                <Link href={`/ticket/${ticket.id}`} className="hover:underline">
                                    #{ticket.id}
                                </Link>
                            </TableCell>

                            <TableCell>
                                <Link href={`/ticket/${ticket.id}`} className="hover:underline">
                                    {ticket.title}
                                </Link>
                            </TableCell>

                            <TableCell>
                                <Chip size="sm" color={statusColorMap[ticket.status ?? "Open"]}>
                                    {ticket.status || "Open"}
                                </Chip>
                            </TableCell>

                            <TableCell>
                                <Chip
                                    size="sm"
                                    variant="flat"
                                    color={
                                        categoryColorMap[
                                            (ticket.category ?? "").toLowerCase()
                                            ] || "default"
                                    }
                                >
                                    {ticket.category || "uncategorized"}
                                </Chip>
                            </TableCell>

                            <TableCell>
                                {truncateWords(ticket.description, 20)}
                            </TableCell>

                            <TableCell>
                                {ticket?.assignee?.name || "No Assignees"}
                            </TableCell>

                            <TableCell>
                                {ticket.creator.name}
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
                        <option value="15">15</option>
                        <option value="30">30</option>
                    </select>
                </label>
            </div>
        </>
    );
}
