import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)"],
                mono: ["var(--font-mono)"],
            },
            backgroundImage: {
                'button-bg': 'linear-gradient(135deg, #3b82f6, #06b6d4)', // your gradient
            },
        },
    },
    darkMode: "class",
    plugins: [
        heroui({
            prefix: "heroui",
            addCommonColors: true,
            defaultTheme: "dark",
            defaultExtendTheme: "dark",
            layout: {},
            themes: {
                light: {
                    layout: {},
                    colors: {
                        background: "#0f172a",
                        table_bg :"#020617",
                        table_border : "#1f2937",
                        loading: "#739B7F",
                        heading: "#5B21B6",
                        secondary: "#2d2d2dff",
                        hover: "#E9D5FF",
                        border:'#1f2937',
                        text: "#e5e7eb",
                    },
                },
                dark: {
                    layout: {},
                    colors: {
                        background: "#000000",
                        subheading: "#C4B5FD",
                        heading: "#6D28D9",
                        primary: {
                            DEFAULT: "#4d4e5b9a",
                            foreground: "#FFFFFF",
                        },
                        accent: "#7C3AED",
                        hover: "#581C87",
                        text: "#D1D5DB",
                    },
                },
            }
        })
    ],
}

module.exports = config
