/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy for custom toggle
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Playfair Display', 'Georgia', 'serif'], // H1, H2 - Luxury headings
        'body': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'], // Body text
        'accent': ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'], // Buttons, CTAs
        // Legacy support
        'primary': ['Playfair Display', 'Georgia', 'serif'],
        'secondary': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.2' }],     // 12px
        'sm': ['0.875rem', { lineHeight: '1.3' }],    // 14px - Buttons, captions
        'base': ['1rem', { lineHeight: '1.4' }],      // 16px - Body text
        'lg': ['1.125rem', { lineHeight: '1.6' }],    // 18px - Large body
        'xl': ['1.25rem', { lineHeight: '1.3' }],     // 20px - H4
        '2xl': ['1.5rem', { lineHeight: '1.3' }],     // 24px - H3
        '3xl': ['1.875rem', { lineHeight: '1.2' }],   // 30px - H2
        '4xl': ['2.25rem', { lineHeight: '1.2' }],    // 36px - H1 mobile
        '5xl': ['3rem', { lineHeight: '1.2' }],       // 48px - H1 desktop
        '6xl': ['3.75rem', { lineHeight: '1.1' }],    // 60px - Hero
        '7xl': ['4.5rem', { lineHeight: '1.1' }],     // 72px - Large hero
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        'luxury': '0.025em', // For luxury headings
      },
      lineHeight: {
        'none': '1',
        'tight': '1.2',
        'snug': '1.3',
        'normal': '1.4',
        'relaxed': '1.6',
        'loose': '1.8',
      },
      colors: {
        // "Soft Precision" Color Palette - Primary System
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Primary Palette - "Soft Precision"
        ivory: {
          DEFAULT: '#FFFFFF',
          soft: '#F9F9F9',
          muted: '#F5F5F5',
        },
        graphite: {
          DEFAULT: '#1A1A1A',
          light: '#2A2A2A',
          dark: '#0F0F0F',
        },
        champagne: {
          DEFAULT: '#EFE7DD',
          light: '#F5F0E8',
          dark: '#E6DDD1',
        },
        
        // Accent Colors (Gen Z Appeal)
        blush: {
          DEFAULT: '#F5DADF',
          light: '#F9E8EB',
          dark: '#F0CAD1',
        },
        sage: {
          DEFAULT: '#DCEDE4',
          light: '#E6F2EA',
          dark: '#D0E7D8',
        },
        lavender: {
          DEFAULT: '#CDB4DB',
          light: '#D8C4E2',
          dark: '#C1A3D3',
        },

        // Semantic color mapping for modern components
        primary: {
          DEFAULT: "hsl(0 0% 10.2%)", // Graphite
          light: "hsl(0 0% 16.5%)",
          dark: "hsl(0 0% 5.9%)",
          foreground: "hsl(0 0% 98%)", // Ivory
        },
        secondary: {
          DEFAULT: "hsl(32 23% 90.4%)", // Champagne
          light: "hsl(32 23% 94%)",
          dark: "hsl(32 23% 86%)",
          foreground: "hsl(0 0% 10.2%)", // Graphite
        },
        accent: {
          DEFAULT: "hsl(352 43% 90.2%)", // Blush
          light: "hsl(352 43% 93%)",
          dark: "hsl(352 43% 86.5%)",
          foreground: "hsl(0 0% 10.2%)", // Graphite
        },
        muted: {
          DEFAULT: "hsl(144 20% 87.8%)", // Sage
          light: "hsl(144 20% 91%)",
          dark: "hsl(144 20% 84%)",
          foreground: "hsl(0 0% 10.2%)", // Graphite
        },
        
        // Functional colors
        success: {
          DEFAULT: "hsl(144 20% 87.8%)", // Sage for success/progress
          foreground: "hsl(0 0% 10.2%)",
        },
        warning: {
          DEFAULT: "hsl(32 23% 90.4%)", // Champagne for warnings
          foreground: "hsl(0 0% 10.2%)",
        },
        destructive: {
          DEFAULT: "hsl(352 43% 75%)", // Deeper blush for destructive actions
          light: "hsl(352 43% 85%)",
          dark: "hsl(352 43% 65%)",
          foreground: "hsl(0 0% 98%)",
        },
        
        // Card and popover colors
        card: {
          DEFAULT: "hsl(0 0% 98%)", // Ivory soft
          foreground: "hsl(0 0% 10.2%)",
        },
        popover: {
          DEFAULT: "hsl(0 0% 98%)",
          foreground: "hsl(0 0% 10.2%)",
        },

        // Link states
        link: {
          DEFAULT: "hsl(278 35% 68%)", // Lavender for links
          hover: "hsl(144 20% 77%)", // Sage for hover
        },
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #1A1A1A 0%, #EFE7DD 100%)',
        'accent-gradient': 'linear-gradient(135deg, #F5DADF 0%, #CDB4DB 100%)',
        'subtle-gradient': 'linear-gradient(180deg, #F9F9F9 0%, #EFE7DD 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        'section': '5.5rem',
        'section-lg': '8rem',
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
        'focus-ring': '0 0 0 2px hsl(278 35% 68%)', // Lavender focus
        'focus-primary': '0 0 0 2px hsl(0 0% 10.2%)', // Graphite focus
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
        // Button Components - Updated for Soft Precision palette
        '.btn-primary': {
          '@apply bg-[#1A1A1A] text-white': {},
          'background-color': '#1A1A1A !important',
          'color': '#FFFFFF !important',
          '&:hover': {
            'background-color': '#1A1A1A !important',
            'opacity': '0.6'
          },
          '&:focus': {
            '@apply outline-none ring-2 ring-white ring-offset-2': {}
          },
          '&:disabled': {
            '@apply opacity-50 cursor-not-allowed': {}
          }
        },
        '.btn-secondary': {
          '@apply bg-champagne text-graphite hover:bg-champagne-dark focus:bg-champagne-dark focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-offset-2 active:bg-champagne-dark transition-all duration-200 ease-in-out': {},
          '&:disabled': {
            '@apply opacity-50 cursor-not-allowed hover:bg-champagne': {},
          }
        },
        '.btn-accent': {
          '@apply bg-blush text-graphite hover:bg-blush-dark focus:bg-blush-dark focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-offset-2 active:bg-blush-dark transition-all duration-200 ease-in-out': {},
          '&:disabled': {
            '@apply opacity-50 cursor-not-allowed hover:bg-blush': {},
          }
        },
        '.btn-success': {
          '@apply bg-sage text-graphite hover:bg-sage-dark focus:bg-sage-dark focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-offset-2 active:bg-sage-dark transition-all duration-200 ease-in-out': {},
          '&:disabled': {
            '@apply opacity-50 cursor-not-allowed hover:bg-sage': {},
          }
        },
        // Enhanced Card Components
        '.card-luxury': {
          '@apply bg-ivory text-graphite shadow-luxury border border-champagne rounded-xl p-6 transition-all duration-300 hover:shadow-xl': {},
        },
        '.card-elevated': {
          '@apply bg-luxury-gradient text-ivory shadow-lg border-0 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]': {},
        },
        // Focus and accessibility utilities
        '.focus-visible-ring': {
          '@apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2': {},
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