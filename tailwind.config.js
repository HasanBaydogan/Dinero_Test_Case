/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "marine-blue": "hsl(213, 96%, 18%)",
        "purplish-blue": "hsl(243, 100%, 62%)",
        "pastel-blue": "hsl(228, 100%, 84%)",
        "light-blue": "hsl(206, 94%, 87%)",
        "strawberry-red": "hsl(354, 84%, 57%)",
        "cool-gray": "hsl(231, 11%, 63%)",
        "light-gray": "hsl(229, 24%, 87%)",
        magnolia: "hsl(217, 100%, 97%)",
        alabaster: "hsl(231, 100%, 99%)",
        "title-purple": "#3F2F70",
        "description-gray": "#5A5A59",
        "toggle-border": "#E5E7EB",
        "toggle-bg-off": "#78788052",
        "toggle-text": "#1F2937",
        "input-header-border": "#EAEAFF",
        "input-header-text": "#5A5A59",
        "input-text": "#3F2F70",
        "input-active-border": "#EAEAFF",
        "input-inactive-bg": "#F5F5FF",
        "input-placeholder": "#CECAD7",
        "label-default-bg": "#F5F5FF",
      },
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
        "red-hat": ["Red Hat Display", "sans-serif"],
        "red-hat-text": ["Red Hat Text", "sans-serif"],
      },
      spacing: {
        15: "3.75rem",
      },
      letterSpacing: {
        title: "-0.01em",
        "toggle-label": "0.005em",
      },
      lineHeight: {
        description: "30px",
        "toggle-label": "24px",
        "input-header": "12px",
        "input-text": "22px",
      },
    },
  },
  plugins: [],
};
