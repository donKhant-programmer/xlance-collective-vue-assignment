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
	
			blue: "var(--color-blue)",
	
			card: "var(--color-bg-card)",
			page: "var(--color-bg-primary)",
	
			border: "var(--color-border)",
	
			"slate-900": "var(--color-slate-900)",
			"slate-800": "var(--color-slate-800)",
			"slate-700": "var(--color-slate-700)",
		  }
		}
	  },
  
	plugins: [require("tailwindcss-animate")]
  }