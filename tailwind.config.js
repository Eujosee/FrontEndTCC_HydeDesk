/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				"azul-hyde": "#23AFFF",
				"azul-claro-hyde": "#55CCEF",
				'preto': "#0d1117",
				'pretosec': "#1f2937",
				'branco': "#e2e8f0",
			},
		},
	},
	plugins: [],
};
