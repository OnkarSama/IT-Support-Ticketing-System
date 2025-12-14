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
import {useRouter, useSearchParams} from "next/navigation";
import {Ticket, Filter} from "@/types";

interface Props {
    tickets: Ticket[];
    filter: Filter | null;
    setFilter: (f: Filter | null) => void;
}

export default function TicketTable({tickets, filter, setFilter}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialPage = Number(searchParams.get("page")) || 1;
    const initialRows = Number(searchParams.get("rows")) || 10;

    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRows);

    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });

    const categoryColorMap: Record<
        string,
        "primary" | "secondary" | "success" | "warning" | "danger"
    > = {
        hardware: "primary",
        software: "secondary",
        network: "warning",
        access: "danger",
        email: "success",
    };

    const statusColorMap: Record<string, "success" | "warning" | "danger"> = {
        Open: "success",
        "In Progress": "warning",
        Closed: "danger",
        high: "danger",
        medium: "warning",
        low: "success",
    };

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

    React.useEffect(() => {
        setPage(1);
    }, [filter]);

    const sortedTickets = React.useMemo(() => {
        const sorted = [...filteredTickets];
        const {column, direction} = sortDescriptor;

        const priorityRank: Record<string, number> = {
            high: 3,
            medium: 2,
            low: 1,
        };

        const statusRank: Record<string, number> = {
            open: 1,
            "in progress": 2,
            closed: 3,
        };

        sorted.sort((a, b) => {
            // ✅ Priority sorting
            if (column === "priority") {
                const aVal =
                    priorityRank[(a.priority ?? "medium").toLowerCase()] ?? 2;
                const bVal =
                    priorityRank[(b.priority ?? "medium").toLowerCase()] ?? 2;

                const cmp = aVal - bVal;
                return direction === "descending" ? -cmp : cmp;
            }

            // ✅ Status sorting
            if (column === "status") {
                const aVal =
                    statusRank[(a.status ?? "open").toLowerCase()] ?? 1;
                const bVal =
                    statusRank[(b.status ?? "open").toLowerCase()] ?? 1;

                const cmp = aVal - bVal;
                return direction === "descending" ? -cmp : cmp;
            }

            // 🔁 Default sorting
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

    const pages = Math.max(1, Math.ceil(sortedTickets.length / rowsPerPage));

    React.useEffect(() => {
        if (page > pages) setPage(pages);
    }, [pages]);

    React.useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        router.replace(`?${params.toString()}`, {scroll: false});
    }, [page]);

    return (
        <>
            {/* FILTER CHIPS */}
            <div className="grid grid-cols-2 gap-2 mb-4 sm:flex sm:flex-wrap sm:gap-3">

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
                            className="cursor-pointer whitespace-nowrap w-full justify-center"
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
            <div className="relative -mx-4 sm:mx-0 overflow-x-auto">
                <Table
                    removeWrapper
                    isHeaderSticky
                    sortDescriptor={sortDescriptor}
                    onSortChange={setSortDescriptor}
                    className="
                        bg-table_bg
                        rounded-xl
                        border border-table_border
                        w-full
                        py-4 px-3 sm:py-6 sm:px-8
                        shadow-[0_18px_40px_rgba(0,0,0,0.35)]
                    "
                    classNames={{
                        th: "text-subheading font-semibold text-center px-2 sm:px-4",
                        td: "text-text text-sm sm:text-base px-2 sm:px-4",
                        tr: "hover:bg-[#1a1a1a50]",
                    }}
                >
                    <TableHeader>
                        <TableColumn key="id" allowsSorting>
                            Ticket
                        </TableColumn>

                        <TableColumn
                            key="title"
                            allowsSorting
                            className="hidden sm:table-cell"
                        >
                            Title
                        </TableColumn>

                        <TableColumn key="status" allowsSorting>
                            Status
                        </TableColumn>

                        <TableColumn
                            key="priority"
                            allowsSorting
                            className="hidden sm:table-cell"
                        >
                            Priority
                        </TableColumn>

                        <TableColumn
                            key="category"
                            allowsSorting
                            className="hidden md:table-cell"
                        >
                            Category
                        </TableColumn>

                        <TableColumn
                            key="description"
                            className="hidden lg:table-cell"
                        >
                            Description
                        </TableColumn>

                        <TableColumn
                            key="assignees"
                            className="hidden lg:table-cell"
                        >
                            Assignees
                        </TableColumn>

                        <TableColumn
                            key="requester"
                            className="hidden lg:table-cell"
                        >
                            Requester
                        </TableColumn>
                    </TableHeader>

                    <TableBody emptyContent="No tickets match." items={displayedTickets}>
                        {(ticket) => (
                            <TableRow key={ticket.id}>
                                <TableCell>
                                    <Link
                                        href={`/ticket/${ticket.id}`}
                                        className="hover:underline"
                                    >
                                        #{ticket.id}
                                    </Link>
                                </TableCell>


                                <TableCell className="hidden sm:table-cell">
                                    {ticket.title}
                                </TableCell>

                                <TableCell>
                                    <div className="flex justify-center">
                                        <Chip
                                            size="sm"
                                            color={statusColorMap[ticket.status ?? "Open"]}
                                        >
                                            {ticket.status || "Open"}
                                        </Chip>
                                    </div>
                                </TableCell>

                                <TableCell className="hidden sm:table-cell">
                                    <div className="flex justify-center">
                                        <Chip
                                            size="sm"
                                            color={
                                                statusColorMap[
                                                ticket.priority ?? "Medium"
                                                    ]
                                            }
                                        >
                                            {(ticket.priority ?? "Medium")
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                (ticket.priority ?? "Medium").slice(1)}
                                        </Chip>
                                    </div>
                                </TableCell>

                                <TableCell className="hidden md:table-cell">
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
                                <TableCell className="hidden lg:table-cell">
                                    <span className="line-clamp-2">
                                        {ticket.description}
                                    </span>
                                </TableCell>


                                <TableCell className="hidden lg:table-cell">
                                    {ticket.assignees?.length
                                        ? ticket.assignees.map((a) => a.name).join(", ")
                                        : "No Assignees"}
                                </TableCell>

                                <TableCell className="hidden lg:table-cell">
                                    {ticket.creator.name}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col gap-3 mt-4 sm:flex-row sm:justify-between sm:items-center text-text">
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
            </div>
        </>
    );
}
