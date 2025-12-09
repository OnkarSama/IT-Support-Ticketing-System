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
                dark: {
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
            }
        })
    ],
}

module.exports = config
