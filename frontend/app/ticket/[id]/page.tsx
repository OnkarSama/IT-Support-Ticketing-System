"use client";

import {use, useEffect, useState, FormEvent} from "react";
import {useRouter} from "next/navigation";
import {
    Card,
    Button,
    Input,
    Textarea,
    Form,
    Select,
    SelectItem, type SelectedItems, Chip, Avatar,
} from "@heroui/react";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";

import {useSearchParams} from "next/navigation";

import apiRouter from "@/api/router";
import type {TicketPayload} from "@/api/ticket";
import type {User} from "@/api/user";

import DeleteTicketModal from "@/components/DeleteTicketModal";


type Assignee = Pick<User, "id" | "name" | "email">;

interface PageProps {
    params: Promise<{ id: number }>;
}

export default function EditTicketPage({params}: PageProps) {

    const {id: ticketIdString} = use(params);
    const ticketId = Number(ticketIdString);

    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    const [submitting, setSubmitting] = useState(false);

    const [formState, setFormState] = useState<TicketPayload["ticket"]>({
        title: "",
        category: "",
        description: "",
        status: "Open",
        priority: "Medium",
        assigneeIDs: [],
    });


    const {title, description, priority, status, category, assigneeIDs} = formState;


    const {data: ticketData, isLoading, refetch} = useQuery({
        queryKey: ["getTicketById", ticketId],
        queryFn: () => apiRouter.tickets.getTicketById(ticketId),
    });

    const {data: currentUserData} = useQuery({
        queryKey: ["showUser"],
        queryFn: () => apiRouter.sessions.showUser(),
    });

    const isStaff = currentUserData?.user?.role === "staff";
    const ticket = ticketData?.ticket;

    const {data: users = []} = useQuery<Assignee[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const result = await apiRouter.users.showUsers();
            return result.map(({id, name, email}: User) => ({
                id,
                name,
                email,
            }));
        },
    });

    console.log(users);
    useEffect(() => {
        if (!ticket) return;

        setFormState({
            title: ticket.title || "",
            category: ticket.category || "",
            description: ticket.description || "",
            status: ticket.status || "Open",
            priority: priority.toLowerCase() || "Medium",
            assigneeIDs: ticket.assignees?.map(a => a.id) ?? [],
        });
    }, [ticket]);


    const updateMutation = useMutation({
        mutationFn: async (payload: typeof formState) => {
            const ticketPayload: TicketPayload = {ticket: {...payload}};
            return apiRouter.tickets.updateTicket(ticketId, ticketPayload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["getTickets"]);
            refetch();
            setSubmitting(false);
            router.push(`/dashboard?${searchParams.toString()}`);
        },
        onError: (error) => {
            console.error("Update Ticket Error:", error);
            setSubmitting(false);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => apiRouter.tickets.deleteTicket(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["getTickets"]});
            router.push(`/dashboard?${searchParams.toString()}`);
        },
        onError: (error) => {
            console.error("Delete Ticket Error:", error);
            setSubmitting(false);
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("FORM STATE BEING SENT:", formState);
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
                            labelPlacement="inside"
                            value={title}
                            onChange={(e) =>
                                setFormState((p) => ({...p, title: e.target.value}))
                            }
                        />

                        <div className="grid grid-cols-2 gap-4 w-full">

                            <Select
                                label="Status"
                                labelPlacement="inside"
                                defaultSelectedKeys={[status]}
                                className="w-full"
                                onSelectionChange={(keys) => {
                                    const value = Array.from(keys)[0] as string;
                                    setFormState((p) => ({...p, status: value}));
                                }}
                            >
                                <SelectItem key="Open">Open</SelectItem>
                                <SelectItem key="In Progress">In Progress</SelectItem>
                                <SelectItem key="Closed">Closed</SelectItem>
                            </Select>


                            <Select
                                label="Category"
                                labelPlacement="inside"
                                selectedKeys={category ? [category] : []}
                                placeholder="Select a category"
                                className="w-full"
                                onSelectionChange={(keys) => {
                                    const value = Array.from(keys)[0] as string;
                                    setFormState((p) => ({...p, category: value}));
                                }}
                            >
                                <SelectItem key="Access">Access</SelectItem>
                                <SelectItem key="Network">Network</SelectItem>
                                <SelectItem key="Hardware">Hardware</SelectItem>
                                <SelectItem key="Software">Software</SelectItem>
                                <SelectItem key="Other">Other</SelectItem>
                            </Select>
                        </div>

                        {isStaff && (
                            <>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <Select
                                        items={users}
                                        label="Assign To"
                                        labelPlacement="inside"
                                        selectionMode="multiple"
                                        isMultiline
                                        selectedKeys={new Set(assigneeIDs.map(String))}
                                        className="w-full"
                                        placeholder="Select assignees"
                                        onSelectionChange={(keys) => {
                                            const ids = Array.from(keys).map(Number);
                                            setFormState((p) => ({...p, assigneeIDs: ids}));
                                        }}
                                        renderValue={(items: SelectedItems<Assignee>) => (
                                            <div className="flex flex-wrap gap-2">
                                                {items.map((item) => (
                                                    <Chip key={item.key}>{item.data?.name}</Chip>
                                                ))}
                                            </div>
                                        )}
                                    >
                                        {(user) => (
                                            <SelectItem key={String(user.id)} textValue={user.name}>
                                                <div className="flex gap-2 items-center">
                                                    <Avatar size="sm" name={user.name}/>
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

                                    <Select
                                        label="Priority"
                                        labelPlacement="inside"
                                        selectedKeys={priority ? [priority] : []}
                                        placeholder="Select a Priority"
                                        className="w-full"
                                        onSelectionChange={(keys) => {
                                            const value = Array.from(keys)[0] as string;
                                            setFormState((p) => ({...p, priority: value}));
                                        }}
                                    >
                                        <SelectItem key="Low">Low</SelectItem>
                                        <SelectItem key="Medium">Medium</SelectItem>
                                        <SelectItem key="High">High</SelectItem>
                                    </Select>
                                </div>
                            </>
                        )}


                        <Textarea
                            isRequired
                            label="Description"
                            minRows={4}
                            value={description}
                            onChange={(e) =>
                                setFormState((p) => ({...p, description: e.target.value}))
                            }
                        />

                        <div className="mt-6 flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="flat"
                                onPressEnd={() =>
                                    setFormState({
                                        title: ticket.title || "",
                                        category: ticket.category || "",
                                        description: ticket.description || "",
                                        priority: ticket.priority || "Medium",
                                        status: ticket.status || "Open",
                                        assigneeIDs: ticket.assignees?.map(a => a.id) ?? [],
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
