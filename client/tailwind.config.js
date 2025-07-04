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
        // Modern HSL-based color system
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Legacy color names for backward compatibility
        ivory: 'hsl(40 33% 97.5%)',
        'ivory-light': 'hsl(40 33% 98.5%)',
        graphite: 'hsl(0 0% 10.2%)',
        'graphite-light': 'hsl(0 0% 20%)',
        champagne: 'hsl(37 41% 89.8%)',
        'champagne-light': 'hsl(37 41% 94%)',
        blush: 'hsl(350 68% 91.2%)',
        'blush-light': 'hsl(350 68% 95%)',
        sage: 'hsl(130 25% 85%)',
        'sage-light': 'hsl(130 25% 90%)',
        lavender: 'hsl(275 47% 84.9%)',
        'lavender-light': 'hsl(275 47% 90%)',
        navy: 'hsl(210 29% 24%)',
        'warm-gray': 'hsl(0 0% 55%)',
        'error-color': 'hsl(0 84.2% 60.2%)',
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
        'spin-slow': 'spin 8s ease-in-out infinite',
        'spin-elegant': 'elegantSpin 12s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
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
        elegantSpin: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(90deg) scale(1.05)' },
          '50%': { transform: 'rotate(180deg) scale(1)' },
          '75%': { transform: 'rotate(270deg) scale(1.05)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
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