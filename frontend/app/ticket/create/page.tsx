"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Input, Textarea } from "@heroui/react";

export default function NewTicketPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    // TODO: replace with real API call
    console.log("New ticket payload", payload);
    alert("Ticket created (mock). Check console for payload.");

    setSubmitting(false);
    router.push("/tickets"); // change route if needed
  };

  return (
      <div className="min-h-screen px-4 py-10 text-slate-100">
        <div className="mx-auto max-w-3xl">
          {/* Page heading */}
          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">
              New Ticket
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Fill out the form below to create a new ticket.
            </p>
          </header>

          <Card className="bg-table_bg border border-slate-800 p-6 shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Ticket name */}
              <Input
                  name="title"
                  label="Ticket Name"
                  placeholder="e.g. Cannot log in to portal"
                  isRequired
              />

              {/* Requester + Email */}
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                    name="requester"
                    label="Requester Name"
                    placeholder="e.g. John Doe"
                    isRequired
                />
                <Input
                    name="email"
                    type="email"
                    label="Requester Email"
                    placeholder="e.g. john@example.com"
                    isRequired
                />
              </div>

              {/* Status / Priority / Category */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col gap-1">
                  <label
                      htmlFor="status"
                      className="text-sm font-medium text-slate-200"
                  >
                    Status
                  </label>
                  <select
                      id="status"
                      name="status"
                      defaultValue="Open"
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label
                      htmlFor="priority"
                      className="text-sm font-medium text-slate-200"
                  >
                    Priority
                  </label>
                  <select
                      id="priority"
                      name="priority"
                      defaultValue="Medium"
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label
                      htmlFor="category"
                      className="text-sm font-medium text-slate-200"
                  >
                    Category
                  </label>
                  <select
                      id="category"
                      name="category"
                      defaultValue=""
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="Access">Access / Login</option>
                    <option value="Network">Network</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <Textarea
                  name="description"
                  label="Description"
                  placeholder="Describe the issue in a few sentences."
                  minRows={4}
                  isRequired
                  className="mt-1"
              />

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-4">
                {/* Fancy Cancel */}
                <Button
                    type="button"
                    variant="flat"
                    size="md"
                    className="px-6 text-slate-200 hover:bg-white/10 transition-all duration-200 active:scale-95"
                    onPress={() => router.back()}
                >
                  Cancel
                </Button>

                {/* Fancy Submit */}
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
            </form>
          </Card>
        </div>
      </div>
  );
}
