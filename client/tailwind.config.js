/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Georgia', 'Times New Roman', 'serif'],
        'secondary': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        // Luxury Brand Colors
        ivory: '#FFFFFF',
        'ivory-light': '#F9F9F9',
        graphite: '#1A1A1A',
        'graphite-light': '#333333',
        champagne: '#EFE7DD',
        'champagne-light': '#F5F0E8',
        blush: '#F5DADF',
        'blush-light': '#F8E5E9',
        sage: '#DCEDE4',
        'sage-light': '#E6F3EA',
        lavender: '#CDB4DB',
        'lavender-light': '#DCC9E3',
        navy: '#2C3E50',
        'warm-gray': '#8B8B8B',
        'error-color': '#E74C3C',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-in-out',
        'slideUp': 'slideUp 0.4s ease-out',
        'pulse-soft': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'banner-gradient-move': 'banner-gradient-move 8s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce': 'bounce 2s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'banner-gradient-move': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'luxury': '0 20px 40px rgba(26, 26, 26, 0.1)',
        'soft': '0 4px 20px rgba(26, 26, 26, 0.08)',
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'lg': '0 8px 25px rgba(0, 0, 0, 0.15)',
        'xl': '0 15px 35px rgba(0, 0, 0, 0.1)',
        'heavy': '0 25px 50px rgba(0, 0, 0, 0.25)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
      },
    },
  },
  plugins: [],
} 