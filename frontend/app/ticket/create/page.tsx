"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    Button,
    Input,
    Textarea,
    Form,
    Select,
    SelectItem,
} from "@heroui/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRouter from "@/api/router";

export default function NewTicketPage() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [submitting, setSubmitting] = useState(false);
    const [action, setAction] = useState<string | null>(null);

    // local state for selects (needed for FormData compatibility)
    const [status, setStatus] = useState("Open");
    const [priority, setPriority] = useState("Medium");
    const [category, setCategory] = useState("");

    const createMutation = useMutation({
        mutationFn: async (formData: any) => {
            return await apiRouter.tickets.createTicket({
                ticket: {
                    title: formData.title,
                    category: formData.category,
                    description: formData.description,
                    status: formData.status,
                    assigneeID: null,
                },
            });
        },
        onSuccess: () => {
            setSubmitting(false);
            queryClient
                .invalidateQueries(["getTickets"])
                .then(() => router.push("/dashboard"));
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
                        onReset={() => {
                            setAction("reset");
                            setStatus("Open");
                            setPriority("Medium");
                            setCategory("");
                        }}
                    >
                        <Input
                            isRequired
                            errorMessage="Please enter a valid ticket name"
                            label="Ticket Name"
                            labelPlacement="inside"
                            name="title"
                            placeholder="e.g. Cannot log in to portal"
                            type="text"
                        />

                        <div className="flex flex-col gap-4 md:flex-row md:w-full">
                            <Select
                                label="Status"
                                labelPlacement="inside"
                                selectedKeys={[status]}
                                className="w-full md:flex-1"
                                onSelectionChange={(keys) =>
                                    setStatus(Array.from(keys)[0] as string)
                                }
                            >
                                <SelectItem key="Open">Open</SelectItem>
                                <SelectItem key="In Progress">In Progress</SelectItem>
                                <SelectItem key="Closed">Closed</SelectItem>
                            </Select>

                            <Select
                                label="Priority"
                                labelPlacement="inside"
                                selectedKeys={[priority]}
                                className="w-full md:flex-1"
                                onSelectionChange={(keys) =>
                                    setPriority(Array.from(keys)[0] as string)
                                }
                            >
                                <SelectItem key="Low">Low</SelectItem>
                                <SelectItem key="Medium">Medium</SelectItem>
                                <SelectItem key="High">High</SelectItem>
                            </Select>

                            <Select
                                label="Category"
                                labelPlacement="inside"
                                placeholder="Select a category"
                                selectedKeys={category ? [category] : []}
                                className="w-full md:flex-1"
                                onSelectionChange={(keys) =>
                                    setCategory(Array.from(keys)[0] as string)
                                }
                            >
                                <SelectItem key="Access">Access</SelectItem>
                                <SelectItem key="Network">Network</SelectItem>
                                <SelectItem key="Hardware">Hardware</SelectItem>
                                <SelectItem key="Software">Software</SelectItem>
                                <SelectItem key="Other">Other</SelectItem>
                            </Select>
                        </div>



                        {/* Hidden inputs so FormData still works */}
                        <input type="hidden" name="status" value={status} />
                        <input type="hidden" name="priority" value={priority} />
                        <input type="hidden" name="category" value={category} />

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
