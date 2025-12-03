import { Ticket } from "@/types/index";

export const MOCK_TICKETS: Ticket[] = Array.from({ length: 100 }, (_, i) => {
    const id = 101 + i;
    const statuses = ["Open", "In Progress", "Closed"];
    const status = statuses[i % 3];
    const requesters = [
        "James Carter", "Rahima Patel", "Alex Johnson", "Sophia Lee", "Daniel Kim",
        "Mia Chen", "Liam Johnson", "Olivia Davis", "Ethan Brown", "Ava Wilson",
        "Noah Miller", "Isabella Moore", "Mason Taylor", "Charlotte Anderson",
        "Lucas Thomas", "Amelia Jackson", "Logan White", "Harper Harris",
        "Elijah Martin", "Sofia Thompson"
    ];
    const titles = [
        "Cannot login to portal", "Email not syncing", "Printer offline",
        "VPN connection fails", "Forgot password", "Software update issue",
        "Laptop battery draining fast", "Access denied to shared folder",
        "Keyboard not working", "Email signature missing", "Cannot print PDF",
        "Slow WiFi", "Monitor flickering", "Software license expired",
        "Cannot connect to database", "Printer jammed", "Phone not ringing",
        "VPN slow", "Outlook crash on startup", "Cannot access intranet"
    ];
    const descriptions = [
        "User reports an authentication error on login.",
        "Mobile email app is not syncing new messages.",
        "Office printer shows offline on all workstations.",
        "Remote VPN connection fails intermittently.",
        "User cannot reset password using the portal.",
        "Application update fails on launch.",
        "Laptop battery lasts only 1 hour.",
        "Cannot access marketing shared folder.",
        "External keyboard not detected.",
        "New employees’ signatures not appearing in emails.",
        "Printing PDFs fails with error code 0x123.",
        "Office WiFi speed very slow during peak hours.",
        "External monitor flickers intermittently.",
        "Photoshop license expired, cannot open app.",
        "DB connection times out for analytics app.",
        "Paper jam in main office printer.",
        "Desk phone not receiving incoming calls.",
        "VPN connection extremely slow for remote team.",
        "Outlook crashes immediately when launched.",
        "Corporate intranet page fails to load."
    ];

    return {
        id,
        title: titles[i % titles.length] + ` #${id}`,
        description: descriptions[i % descriptions.length],
        status,
        requester: requesters[i % requesters.length]
    } as Ticket;
});
