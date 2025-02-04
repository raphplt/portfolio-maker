// tailwind.config.ts
import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

export default {
	content: [
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				white: "#FFFFFF",
				black: "#000000",
				cyan: "#1FACC8",
				navy: "#252477",
				teal: "#2B8091",
				violet: "#433FD3",
				blue: "#55ACBD",
				indigo: "#7370D7",
				gold: "#BF8733",
				amber: "#EAAD53",
				sand: "#EEBE76",
				background: "#FFFFFF",
				foreground: "#000000",
			},
		},
	},
	darkMode: "class",
	plugins: [
		heroui({
			themes: {
				light: {
					colors: {
						primary: "#1FACC8",
						secondary: "#2B8091",
						background: "#FFFFFF",
						foreground: "#000000",
					},
				},
				dark: {
					colors: {
						primary: "#55ACBD",
						secondary: "#7370D7",
						background: "#000000",
						foreground: "#FFFFFF",
					},
				},
			},
		}),
	],
} satisfies Config;
