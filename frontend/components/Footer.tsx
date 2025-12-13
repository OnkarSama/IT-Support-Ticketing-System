"use client";
export default function Footer() {
    return (
        <footer className="px-8 py-3 border-t border-border text-sm text-text text-center">
      <span>
        Ticket Management &copy; {new Date().getFullYear()}
      </span>
        </footer>
    );
}
