import {heroui} from "@heroui/theme"

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
        },
    },

    darkMode: "class",
    plugins: [heroui({
        prefix: "heroui",
        addCommonColors: true,
        defaultTheme: "dark",
        defaultExtendTheme: "dark",
        layout: {},
        themes: {
            light: {
                layout: {},
                colors: {
                    background: "#0A1D37",// Soft lavender
                    loading: "#739B7F",
                    subheading: "#7C3AED", // Purple accents (formerly foreground)
                    heading: "#5B21B6", // Darker purple for headings
                    primary: {
                        DEFAULT: "#ffffffff",
                        foreground: "#000000",
                    },
                    secondary: "#2d2d2dff", //ur mom gay
                    hover: "#E9D5FF", // Light purple hover effect
                    text: "#374151", // Dark gray text color for light mode
                },
            },
            dark: {
                layout: {},
                colors: {
                    background: "#000000", // Black background
                    subheading: "#C4B5FD", // Soft purple subheading (formerly foreground)
                    heading: "#6D28D9", // Darker purple for headings
                    primary: {
                        DEFAULT: "#4d4e5b9a", // Bright purple primary
                        foreground: "#FFFFFF",
                    },
                    accent: "#7C3AED",
                    hover: "#581C87", // Dark purple hover effect
                    text: "#D1D5DB", // Soft gray text color for dark mode
                },
            },
        }
    })],
}

module.exports =  config;// {
//   plugins: [
//     heroui({
//       prefix: "heroui", // prefix for themes variables
//       addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
//       defaultTheme: "dark", // default theme from the themes object
//       defaultExtendTheme: "dark", // default theme to extend on custom themes
//       layout: {}, // common layout tokens (applied to all themes)
//       themes: {
//         light: {
//           layout: {}, // light theme layout tokens
//           colors: {}, // light theme colors
//         },
//         dark: {
//           layout: {}, // dark theme layout tokens
//           colors: {}, // dark theme colors
//         },
//         // ... custom themes
//       },
//     }),
//   ],
// };