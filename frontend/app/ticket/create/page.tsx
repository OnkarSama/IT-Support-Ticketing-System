"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Input, Textarea, Form } from "@heroui/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRouter from "@/api/router";

export default function NewTicketPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [submitting, setSubmitting] = useState(false);
    const [action, setAction] = useState<string | null>(null);

    const createMutation = useMutation({
        mutationFn: async (formData: any) => {
            return await apiRouter.tickets.createTicket({
                ticket: {
                    title: formData.title,
                    description: formData.description,
                    status: formData.status,
                    assigneeID: null,
                },
            });
        },
        onSuccess: () => {
            setSubmitting(false);
            queryClient.invalidateQueries(["getTickets"]).then(r => router.push("/dashboard")); // refresh ticket list
        },
        onError: (error) => {
            console.error("Create Ticket Error:", error);
            setSubmitting(false);
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = Object.fromEntries(new FormData(e.currentTarget));

        setAction(`submit ${JSON.stringify(formData)}`);
        createMutation.mutate(formData);
    };

    return (
        <div className="min-h-screen px-4 py-10 text-slate-100">
            <div className="mx-auto max-w-3xl">
                <header className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">New Ticket</h1>
                    <p className="mt-1 text-sm text-slate-400">
                        Fill out the form below to create a new ticket.
                    </p>
                </header>

                <Card className="bg-table_bg border border-table_border p-6 shadow-lg">
                    <Form
                        className="space-y-6"
                        onSubmit={handleSubmit}
                        onReset={() => setAction("reset")}
                    >
                        <Input
                            isRequired
                            errorMessage="Please enter a valid ticket name"
                            label="Ticket Name"
                            labelPlacement="outside"
                            name="title"
                            placeholder="e.g. Cannot log in to portal"
                            type="text"
                        />

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-slate-200">Status</label>
                                <select
                                    name="status"
                                    defaultValue="open"
                                    className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
                                >
                                    <option value="open">Open</option>
                                    <option value="in progress">In Progress</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-slate-200">Priority</label>
                                <select
                                    name="priority"
                                    defaultValue="Medium"
                                    className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-slate-200">Category</label>
                                <select
                                    name="category"
                                    defaultValue=""
                                    className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200"
                                >
                                    <option value="" disabled>Select a category</option>
                                    <option value="Access">Login</option>
                                    <option value="Network">Network</option>
                                    <option value="Hardware">Hardware</option>
                                    <option value="Software">Software</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <Textarea
                            isRequired
                            label="Description"
                            name="description"
                            placeholder="Describe the issue in a few sentences."
                            minRows={4}
                        />

                        <div className="mt-6 flex justify-end gap-4">
                            <Button
                                type="reset"
                                variant="flat"
                                size="md"
                                className="px-6 text-slate-200 hover:bg-white/10 transition-all duration-200 active:scale-95"
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
                                {submitting ? "Creating..." : "Create Ticket"}
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
