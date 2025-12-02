"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type TicketStatus = "Open" | "In Progress" | "Closed";

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  requester: string;
}

const MOCK_TICKETS: Ticket[] = [
  {
    id: 101,
    title: "Cannot login to portal",
    description: "User reports an authentication error on login.",
    status: "Open",
    requester: "James Carter",
  },
  {
    id: 102,
    title: "Email not syncing",
    description: "Mobile email app is not syncing new messages.",
    status: "In Progress",
    requester: "Rahima Patel",
  },
  {
    id: 103,
    title: "Printer offline",
    description: "Office printer shows offline on all workstations.",
    status: "Closed",
    requester: "Alex Johnson",
  },
];

type Filter = "all" | "open" | "in-progress" | "closed";

export default function HomePage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredTickets = useMemo(() => {
    switch (filter) {
      case "open":
        return MOCK_TICKETS.filter((t) => t.status === "Open");
      case "in-progress":
        return MOCK_TICKETS.filter((t) => t.status === "In Progress");
      case "closed":
        return MOCK_TICKETS.filter((t) => t.status === "Closed");
      default:
        return MOCK_TICKETS;
    }
  }, [filter]);

  const handleOpenNewTicketWindow = () => {
    if (typeof window === "undefined") return;

    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      "/new-ticket",
      "newTicketWindow",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Tickets</h1>
          <p className="page-subtitle">
            View, filter, and manage support tickets.
          </p>
        </div>

        <div className="actions-row">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleOpenNewTicketWindow}
          >
            + New Ticket
          </button>
        </div>
      </div>

      <section className="card">
        <div className="card-header">
          <h2>Ticket Filters</h2>
        </div>
        <div className="filters-row">
          <button
            type="button"
            className={`filter-chip ${
              filter === "all" ? "filter-chip-active" : ""
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-chip ${
              filter === "open" ? "filter-chip-active" : ""
            }`}
            onClick={() => setFilter("open")}
          >
            Open
          </button>
          <button
            type="button"
            className={`filter-chip ${
              filter === "in-progress" ? "filter-chip-active" : ""
            }`}
            onClick={() => setFilter("in-progress")}
          >
            In Progress
          </button>
          <button
            type="button"
            className={`filter-chip ${
              filter === "closed" ? "filter-chip-active" : ""
            }`}
            onClick={() => setFilter("closed")}
          >
            Closed
          </button>
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <h2>All Tickets</h2>
        </div>

        <div className="table-wrapper">
          <table className="ticket-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ticket Name</th>
                <th>Status</th>
                <th>Requester</th>
                <th>Short Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={5} className="empty-row">
                    No tickets match this filter.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>
                      <Link href={`/tickets/${ticket.id}`} className="link">
                        #{ticket.id}
                      </Link>
                    </td>
                    <td>
                      <Link href={`/tickets/${ticket.id}`} className="link">
                        {ticket.title}
                      </Link>
                    </td>
                    <td>
                      <span
                        className={`status-badge status-${ticket.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td>{ticket.requester}</td>
                    <td className="ticket-description">
                      {ticket.description}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
