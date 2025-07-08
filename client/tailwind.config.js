/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy for custom toggle
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Georgia', 'Times New Roman', 'serif'],
        'secondary': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        // Modern HSL-based color system with light/dark variants
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          light: "hsl(var(--secondary-light))",
          dark: "hsl(var(--secondary-dark))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          light: "hsl(var(--destructive-light))",
          dark: "hsl(var(--destructive-dark))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          light: "hsl(var(--muted-light))",
          dark: "hsl(var(--muted-dark))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          light: "hsl(var(--accent-light))",
          dark: "hsl(var(--accent-dark))",
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
        lavender: 'hsl(278 35% 78%)',
        'lavender-light': 'hsl(278 35% 85%)',
        navy: 'hsl(210 29% 24%)',
        'warm-gray': 'hsl(0 0% 55%)',
        'error-color': 'hsl(0 84.2% 60.2%)',
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
        'luxury-gradient-dark': 'linear-gradient(135deg, hsl(var(--primary-dark)) 0%, hsl(var(--accent-dark)) 100%)',
        'subtle-gradient': 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        'section': '5.5rem',
        'editorial-lg': '3.5rem',
        'editorial-md': '2.25rem',
        'editorial-sm': '1.25rem',
      },
      textAlign: {
        'editorial': 'left',
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
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
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
        bounceSubtle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(-2px)' },
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
        'focus-ring': '0 0 0 2px hsl(var(--ring))',
        'focus-primary': '0 0 0 2px hsl(var(--primary))',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
      },
    },
    textAlign: {
      DEFAULT: 'left',
      center: 'center',
      right: 'right',
      justify: 'justify',
    },
  },
  plugins: [
    // Add custom component classes
    function({ addComponents, theme }) {
      addComponents({
        // Button Components
        '.btn-primary': {
          '@apply bg-primary text-primary-foreground hover:bg-primary-dark focus:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:bg-primary-dark transition-all duration-200 ease-in-out': {},
          '&:disabled': {
            '@apply opacity-50 cursor-not-allowed hover:bg-primary': {},
          }
        },
        '.btn-secondary': {
          '@apply bg-secondary text-secondary-foreground hover:bg-secondary-dark focus:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 active:bg-secondary-dark transition-all duration-200 ease-in-out': {},
          '&:disabled': {
            '@apply opacity-50 cursor-not-allowed hover:bg-secondary': {},
          }
        },
        '.btn-muted': {
          '@apply bg-muted text-muted-foreground hover:bg-muted-dark focus:bg-muted-dark focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-2 active:bg-muted-dark transition-all duration-200 ease-in-out': {},
          '&:disabled': {
            '@apply opacity-50 cursor-not-allowed hover:bg-muted': {},
          }
        },
        '.btn-destructive': {
          '@apply bg-destructive text-destructive-foreground hover:bg-destructive-dark focus:bg-destructive-dark focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2 active:bg-destructive-dark transition-all duration-200 ease-in-out': {},
          '&:disabled': {
            '@apply opacity-50 cursor-not-allowed hover:bg-destructive': {},
          }
        },
        '.btn-accent': {
          '@apply bg-accent text-accent-foreground hover:bg-accent-dark focus:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 active:bg-accent-dark transition-all duration-200 ease-in-out': {},
          '&:disabled': {
            '@apply opacity-50 cursor-not-allowed hover:bg-accent': {},
          }
        },
        // Enhanced Card Components
        '.card-luxury': {
          '@apply bg-card text-card-foreground shadow-luxury border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-xl': {},
        },
        '.card-elevated': {
          '@apply bg-luxury-gradient text-primary-foreground shadow-lg border-0 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]': {},
        },
        // Focus and accessibility utilities
        '.focus-visible-ring': {
          '@apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2': {},
        },
        // Interactive elements
        '.interactive-scale': {
          '@apply transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95': {},
        },
        '.interactive-fade': {
          '@apply transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-60': {},
        }
      })
    }
  ],
} 