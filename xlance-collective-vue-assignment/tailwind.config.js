/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./index.html",
	  "./src/**/*.{vue,ts,js}"
	],
	theme: {
		extend: {
		  colors: {
			primary: "var(--color-text-primary)",
			secondary: "var(--color-text-secondary)",
			muted: "var(--color-text-muted)",

			layout: {
				page: "var(--color-layout-page)",
				surface: "var(--color-layout-surface)",
				section: "var(--color-layout-section)",
			  },

			  form: {
				bg: "##233648",
				border: "#324D67",
				field: "#111A22",
				search: "#0F172A"
			  },
	
			card: "var(--color-bg-card)",
			page: "#101922",
	
			border: "var(--color-border)",

			indigo: {
      100: "var(--color-indigo-100)",
      500: "var(--color-indigo-500)",
    },
    badge: "var(--color-badge-bg)",
		  }
		}
	  },
  
	plugins: [require("tailwindcss-animate")]
  }