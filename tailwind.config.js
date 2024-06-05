const defaultColors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: false,
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				'main': '#fff8f9',
				'bright-red': '#E72929',
				'vivid-pink': '#FF5BAE',
				'pale-orange': '#FFE4CF',
				'light-yellow': '#FFFDD7',
			},

			fontFamily: {
				sans: ["Inter", "sans-serif"],
				display: ["lexend", "sans-serif"],
				logo: ['Bricolage', 'sans-serif'] // Include a fallback font
			},
		},
	},
	plugins: [],
}
