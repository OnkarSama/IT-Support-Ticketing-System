
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TicketFlow | Ticket Management",
  description: "Simple ticket management system UI built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="app-header">
            <div className="app-logo">TicketFlow</div>
            <nav className="app-nav">
              <a href="/" className="nav-link">
                Home
              </a>
              <a href="/new-ticket" className="nav-link">
                New Ticket
              </a>
            </nav>
          </header>

          <main className="app-main">{children}</main>

          <footer className="app-footer">
            <span>TicketFlow &copy; {new Date().getFullYear()}</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
