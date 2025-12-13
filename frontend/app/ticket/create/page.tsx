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
    type SelectedItems,
    Chip,
    Avatar,
} from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiRouter from "@/api/router";
import type { User } from "@/api/user";

type Assignee = Pick<User, "id" | "name" | "email">;

export default function NewTicketPage() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [submitting, setSubmitting] = useState(false);

    // Controlled state
    const [status, setStatus] = useState("Open");
    const [priority, setPriority] = useState("Medium");
    const [category, setCategory] = useState("");
    const [selectedAssignees, setSelectedAssignees] = useState<Set<string>>(
        new Set()
    );

    const { data: userData } = useQuery({
        queryKey: ["showUser"],
        queryFn: () => apiRouter.sessions.showUser(),
    });

    const isStaff = userData?.user?.role === "staff";

    // Fetch users for assignee dropdown
    const { data: users = [] } = useQuery<Assignee[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const result = await apiRouter.users.showUsers();
            return result.map(({ id, name, email }: User) => ({
                id,
                name,
                email,
            }));
        },
    });

    const createMutation = useMutation({
        mutationFn: async (formData: Record<string, any>) => {
            const assigneeID =
                selectedAssignees.size > 0
                    ? Number(Array.from(selectedAssignees)[0])
                    : null;

            return apiRouter.tickets.createTicket({
                ticket: {
                    title: formData.title,
                    description: formData.description,
                    status,
                    category,
                    assigneeID,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getTickets"] });
            router.push("/dashboard");
        },
        onError: (err) => {
            console.error("Create Ticket Error:", err);
            setSubmitting(false);
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = Object.fromEntries(new FormData(e.currentTarget));
        createMutation.mutate(formData);
    };

    return (
        <div className="min-h-screen px-4 py-10 text-slate-100">
            <div className="mx-auto max-w-3xl">
                <header className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        New Ticket
                    </h1>
                    <p className="mt-1 text-sm text-slate-400">
                        Fill out the form below to create a new ticket.
                    </p>
                </header>

                <Card className="bg-table_bg border border-table_border p-6 shadow-lg">
                    <Form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            isRequired
                            label="Ticket Name"
                            labelPlacement="inside"
                            name="title"
                            placeholder="e.g. Cannot log in to portal"
                        />

                        <div className="grid grid-cols-3 gap-4 w-full">

                        <Select
                            label="Status"
                            labelPlacement="inside"
                            selectedKeys={[status]}
                            className="w-full"
                            onSelectionChange={(keys) =>
                                setStatus(Array.from(keys)[0] as string)
                            }
                        >
                            <SelectItem key="Open">Open</SelectItem>
                            <SelectItem key="In Progress">In Progress</SelectItem>
                            <SelectItem key="Closed">Closed</SelectItem>
                        </Select>

                            {isStaff && (
                        <Select
                            label="Priority"
                            labelPlacement="inside"
                            selectedKeys={[priority]}
                            className="w-full"
                            onSelectionChange={(keys) =>
                                setPriority(Array.from(keys)[0] as string)
                            }
                        >
                            <SelectItem key="Low">Low</SelectItem>
                            <SelectItem key="Medium">Medium</SelectItem>
                            <SelectItem key="High">High</SelectItem>
                        </Select>)}

                        <Select
                            label="Category"
                            labelPlacement="inside"
                            selectedKeys={category ? [category] : []}
                            className="w-full"
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
                        {isStaff && (
                            <Select
                                items={users}
                                label="Assign To"
                                labelPlacement="inside"
                                selectionMode="multiple"
                                isMultiline
                                selectedKeys={selectedAssignees}
                                className="w-full"
                                placeholder="Select assignees"
                                onSelectionChange={(keys) =>
                                    setSelectedAssignees(new Set(keys as Set<string>))
                                }
                                renderValue={(items: SelectedItems<Assignee>) => (
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((item) => (
                                            <Chip key={item.key}>
                                                {item.data?.name}
                                            </Chip>
                                        ))}
                                    </div>
                                )}
                            >
                                {(user) => (
                                    <SelectItem
                                        key={String(user.id)}
                                        textValue={user.name}
                                    >
                                        <div className="flex gap-2 items-center">
                                            <Avatar size="sm" name={user.name} />
                                            <div className="flex flex-col">
                                                <span className="text-small">{user.name}</span>
                                                <span className="text-tiny text-default-400">
                          {user.email}
                        </span>
                                            </div>
                                        </div>
                                    </SelectItem>
                                )}
                            </Select>
                        )}

                        <Textarea
                            isRequired
                            label="Description"
                            name="description"
                            placeholder="Describe the issue in a few sentences."
                            minRows={4}
                        />

                        <div className="flex justify-end gap-4">
                            <Button
                                type="submit"
                                color="primary"
                                isDisabled={submitting}
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
