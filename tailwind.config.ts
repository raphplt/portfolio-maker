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
				asparagus: "#6da34d", // Main green
				"english-violet": "#56445d", // Dark purple
				"dark-cyan": "#548687", // Teal-like color
				"cambridge-blue": "#8fbc94", // Light green
				"tea-green": "#c5e99b", // Very light green
				"dark-asparagus": "#5a8a3e", // Darker green variant
				"light-violet": "#6a5672", // Lighter violet variant
				"light-cyan": "#679a9b", // Lighter cyan variant
				"deep-violet": "#443651", // Deeper violet variant
				"earthy-gold": "#a3915e", // Complementary earthy tone
				"light-sand": "#c7b580", // Lighter earthy tone
			},
		},
	},
	darkMode: "class",
	plugins: [
		heroui({
			themes: {
				light: {
					colors: {
						primary: {
							DEFAULT: "#6da34d", // Asparagus
							foreground: "#FFFFFF",
						},
						secondary: {
							DEFAULT: "#548687", // Dark cyan
							foreground: "#FFFFFF",
						},
						background: "#FFFFFF",
						foreground: "#000000",
					},
				},
				dark: {
					colors: {
						primary: "#8fbc94", // Cambridge blue
						secondary: "#56445d", // English violet
						background: "#000000",
						foreground: "#FFFFFF",
					},
				},
			},
		}),
	],
} satisfies Config;