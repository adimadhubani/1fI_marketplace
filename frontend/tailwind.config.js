/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a2e",
        secondary: "#16213e",
        accent: "#e94560",
        gold: "#d4af37",
        appBg: "#f5f5f5",
        textPrimary: "#1a1a2e",
        textSecondary: "#666666",
        surface: "#ffffff",
        cardBorder: "#e2e8f0",
        brandGreen: "#10b981",
        lightGray: "#f8fafc"
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(26, 26, 46, 0.08)',
        'elevated': '0 12px 30px -4px rgba(26, 26, 46, 0.12)',
        'glow-accent': '0 0 15px rgba(233, 69, 96, 0.25)',
        'glow-gold': '0 0 15px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
