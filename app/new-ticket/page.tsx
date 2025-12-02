"use client";
//test//
import { FormEvent, useState } from "react";

export default function NewTicketPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    // backend

    console.log("New ticket payload", payload);
    alert("Ticket created (mock). Check console for payload.");

    setSubmitting(false);
    if (window && window.opener) {
      window.close();
    }
  };

  return (
    <div className="page-container narrow">
      <header className="popup-header">
        <h1>New Ticket</h1>
        <p className="page-subtitle">
          Fill out the form below to create a new ticket.
        </p>
      </header>

      <form className="card form-card" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Ticket Name</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="e.g. Cannot login to portal"
          />
        </div>

        <div className="form-field">
          <label htmlFor="requester">Requester Name</label>
          <input
            id="requester"
            name="requester"
            type="text"
            required
            placeholder="e.g. John Doe"
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Requester Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="e.g. john@example.com"
          />
        </div>

        <div className="form-field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue="Open">
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" defaultValue="Medium">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" defaultValue="">
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

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            placeholder="Describe the issue in a few sentences."
          />
        </div>

        <div className="form-actions">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => window.close()}
          >
            Cancel
          </button>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
}
