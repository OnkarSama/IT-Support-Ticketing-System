export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Ticket Management",
    description: "Make beautiful websites regardless of your design experience.",
    navItems: [
        {
            label: "Home",
            href: "/dashboard",
        },
        {
            label: "New Ticket",
            href: "/ticket/create",
        },

    ],
    navMenuItems: [
        {
            label: "Home",
            href: "/dashboard",
        },
        {
            label: "New Ticket",
            href: "/ticket/create",
        },
    ],
    links: {
    },
};