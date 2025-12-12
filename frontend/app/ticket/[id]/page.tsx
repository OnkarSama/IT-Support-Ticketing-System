"use client";

import { use, useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Input, Textarea, Form } from "@heroui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRouter from "@/api/router";

import DeleteTicketModal from "@/components/DeleteTicketModal";

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

    const { title, description, status } = formState;

    const { data: ticketData, isLoading, refetch } = useQuery({
        queryKey: ["getTicketById", ticketId],
        queryFn: () => apiRouter.tickets.getTicketById(ticketId),
    });

    const { data: userData} = useQuery({
        queryKey: ["showUser"],
        queryFn: () => apiRouter.sessions.showUser(),
    });

    const isStaff = userData?.user?.role === "staff";

    console.log(userData);
    const ticket = ticketData?.ticket;

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

    // DELETE MUTATION
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => apiRouter.tickets.deleteTicket(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["getTickets"]);
            router.push("/dashboard");
        },
        onError: (error) => {
            console.error("Delete Ticket Error:", error);
            setSubmitting(false);
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        updateMutation.mutate(formState);
    };


    const handleDelete = () => {
        setSubmitting(true);
        deleteMutation.mutate(ticketId);
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
                            value={title}
                            onChange={(e) =>
                                setFormState((p) => ({ ...p, title: e.target.value }))
                            }
                        />

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-200">Status</label>
                            <select
                                name="status"
                                value={status}
                                onChange={(e) =>
                                    setFormState((p) => ({ ...p, status: e.target.value }))
                                }
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
                            minRows={4}
                            value={description}
                            onChange={(e) =>
                                setFormState((p) => ({ ...p, description: e.target.value }))
                            }
                        />

                        <div className="mt-6 flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="flat"
                                onPressEnd={() =>
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
                                isDisabled={submitting}
                            >
                                {submitting ? "Updating..." : "Update Ticket"}
                            </Button>


                            {isStaff && (
                                <DeleteTicketModal
                                    ticketId={ticketId}
                                    deleteFn={handleDelete}
                                />
                            )}
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
