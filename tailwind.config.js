/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      }
    },
  },
  plugins: [],
  safelist: [
    // Primary Colors (Green, Blue, Red)
    { pattern: /(text|bg|border)-(green|blue|red)-(400|500|700|900)(\/(20|30|50))?/ },
    { pattern: /hover:(text|bg|border)-(green|blue|red)-(400|500)/ },

    // Accent Colors (Amber, Fuchsia, Cyan)
    { pattern: /(text|bg|border)-(amber|fuchsia|cyan)-(400|500|700|900)(\/(20|30|50))?/ },

    // Neutral Colors (Neutral, Zinc, Stone)
    { pattern: /(text|bg|border)-(neutral|zinc|stone)-(200|400|500|700|900)(\/(20|30|50))?/ },

    // Other Used Colors (Purple)
    { pattern: /(text|bg|border)-purple-(400|500|700|900)(\/(20|30|50))?/ },
  ]
}
