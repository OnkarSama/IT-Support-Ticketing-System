"use client";

import { use, useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Input, Textarea, Form } from "@heroui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRouter from "@/api/router";

interface TicketPayload {
    ticket: {
        title: string;
        description: string;
        status: string;
        assigneeID: number | null;
    };
}

interface PageProps {
    params: Promise<{ id: number }>;
}

export default function EditTicketPage({ params }: PageProps) {
    // unwrap params
    const { id: ticketIdString } = use(params);
    const ticketId = Number(ticketIdString);

    const router = useRouter();
    const queryClient = useQueryClient();
    const [submitting, setSubmitting] = useState(false);

    const [formState, setFormState] = useState({
        title: "",
        description: "",
        status: "open",
        assigneeID: null as number | null,
    });

    const { title, description, status, assigneeID } = formState;

    // fetch ticket
    const { data: ticketData, isLoading, refetch } = useQuery({
        queryKey: ["getTicketById", ticketId],
        queryFn: () => apiRouter.tickets.getTicketById(ticketId),
    });

    // Safely extract ticket object
    const ticket = ticketData?.ticket;

    console.log(ticket?.title);

    // sync fetched ticket → form
    useEffect(() => {
        if (ticket) {
            setFormState({
                title: ticket.title || "",
                description: ticket.description || "",
                status: ticket.status || "open",
                assigneeID: ticket.assignee?.id ?? null,
            });
        }
    }, [ticket]);

    // update mutation
    const updateMutation = useMutation({
        mutationFn: async (payload: typeof formState) => {
            const ticketPayload: TicketPayload = { ticket: { ...payload } };
            return apiRouter.tickets.updateTicket(ticketId, ticketPayload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["getTickets"]);
            refetch();
            setSubmitting(false);
            router.push("/dashboard");
        },
        onError: (error) => {
            console.error("Update Ticket Error:", error);
            setSubmitting(false);
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        updateMutation.mutate(formState);
    };

    if (isLoading) return <div className="p-6">Loading Ticket...</div>;
    if (!ticket) return <div className="p-6">Ticket Not Found</div>;

    return (
        <div className="min-h-screen px-4 py-10 text-slate-100">
            <div className="mx-auto max-w-3xl">
                <header className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">Edit Ticket</h1>
                    <p className="mt-1 text-sm text-slate-400">
                        Update the ticket details below.
                    </p>
                </header>

                <Card className="bg-table_bg border border-table_border p-6 shadow-lg">
                    <Form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            isRequired
                            label="Ticket Name"
                            labelPlacement="outside"
                            name="title"
                            type="text"
                            value={title}
                            onChange={(e) => setFormState((p) => ({ ...p, title: e.target.value }))}
                        />

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-200">Status</label>
                            <select
                                name="status"
                                value={status}
                                onChange={(e) => setFormState((p) => ({ ...p, status: e.target.value }))}
                                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
                            >
                                <option value="open">Open</option>
                                <option value="in progress">In Progress</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>

                        <Textarea
                            isRequired
                            label="Description"
                            name="description"
                            minRows={4}
                            value={description}
                            onChange={(e) => setFormState((p) => ({ ...p, description: e.target.value }))}
                        />

                        <div className="mt-6 flex justify-end gap-4">
                            <Button
                                type="reset"
                                variant="flat"
                                size="md"
                                className="px-6 text-slate-200 hover:bg-white/10 transition-all duration-200 active:scale-95"
                                onClick={() =>
                                    setFormState({
                                        title: ticket.title || "",
                                        description: ticket.description || "",
                                        status: ticket.status || "open",
                                        assigneeID: ticket.assignee?.id ?? null,
                                    })
                                }
                            >
                                Reset
                            </Button>

                            <Button
                                type="submit"
                                variant="solid"
                                color="primary"
                                size="md"
                                isDisabled={submitting}
                                className="px-6 font-semibold shadow-md shadow-blue-600/40 transition-all duration-200 hover:shadow-blue-400/60 hover:scale-105 active:scale-95"
                            >
                                {submitting ? "Updating..." : "Update Ticket"}
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
