/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#FF0000', // YouTube's iconic red (red-600)
        'primary-50': '#FEF2F2', // Light red tint (red-50)
        'primary-100': '#FEE2E2', // Light red (red-100)
        'primary-500': '#EF4444', // Medium red (red-500)
        'primary-600': '#DC2626', // Standard red (red-600)
        'primary-700': '#B91C1C', // Dark red (red-700)
        'primary-900': '#7F1D1D', // Very dark red (red-900)

        // Secondary Colors
        'secondary': '#065FD4', // YouTube's blue (blue-700)
        'secondary-50': '#EFF6FF', // Light blue tint (blue-50)
        'secondary-100': '#DBEAFE', // Light blue (blue-100)
        'secondary-500': '#3B82F6', // Medium blue (blue-500)
        'secondary-600': '#2563EB', // Standard blue (blue-600)
        'secondary-700': '#1D4ED8', // Dark blue (blue-700)
        'secondary-900': '#1E3A8A', // Very dark blue (blue-900)

        // Accent Colors
        'accent': '#F9F9F9', // Subtle warm white (gray-50)
        'accent-100': '#F3F4F6', // Light gray (gray-100)
        'accent-200': '#E5E7EB', // Medium light gray (gray-200)
        'accent-300': '#D1D5DB', // Medium gray (gray-300)
        'accent-400': '#9CA3AF', // Medium dark gray (gray-400)

        // Background Colors
        'background': '#0F0F0F', // Deep black (gray-950)
        'background-50': '#F9FAFB', // Light background (gray-50)
        'background-100': '#F3F4F6', // Very light background (gray-100)
        'background-800': '#1F2937', // Dark background (gray-800)
        'background-900': '#111827', // Very dark background (gray-900)

        // Surface Colors
        'surface': '#212121', // Elevated dark gray (gray-800)
        'surface-50': '#F8FAFC', // Light surface (slate-50)
        'surface-100': '#F1F5F9', // Very light surface (slate-100)
        'surface-700': '#334155', // Dark surface (slate-700)
        'surface-800': '#1E293B', // Very dark surface (slate-800)
        'surface-900': '#0F172A', // Darkest surface (slate-900)

        // Text Colors
        'text-primary': '#FFFFFF', // Pure white (white)
        'text-secondary': '#AAAAAA', // Medium gray (gray-400)
        'text-50': '#F8FAFC', // Light text (slate-50)
        'text-100': '#F1F5F9', // Very light text (slate-100)
        'text-300': '#CBD5E1', // Light gray text (slate-300)
        'text-600': '#475569', // Medium dark text (slate-600)
        'text-700': '#334155', // Dark text (slate-700)
        'text-900': '#0F172A', // Very dark text (slate-900)

        // Status Colors
        'success': '#00D924', // Vibrant green (green-500)
        'success-50': '#F0FDF4', // Light green tint (green-50)
        'success-100': '#DCFCE7', // Light green (green-100)
        'success-500': '#22C55E', // Medium green (green-500)
        'success-600': '#16A34A', // Standard green (green-600)
        'success-700': '#15803D', // Dark green (green-700)
        'success-900': '#14532D', // Very dark green (green-900)

        'warning': '#FF8C00', // Warm orange (orange-500)
        'warning-50': '#FFF7ED', // Light orange tint (orange-50)
        'warning-100': '#FFEDD5', // Light orange (orange-100)
        'warning-500': '#F97316', // Medium orange (orange-500)
        'warning-600': '#EA580C', // Standard orange (orange-600)
        'warning-700': '#C2410C', // Dark orange (orange-700)
        'warning-900': '#9A3412', // Very dark orange (orange-900)

        'error': '#FF4444', // Clear red (red-500)
        'error-50': '#FEF2F2', // Light red tint (red-50)
        'error-100': '#FEE2E2', // Light red (red-100)
        'error-500': '#EF4444', // Medium red (red-500)
        'error-600': '#DC2626', // Standard red (red-600)
        'error-700': '#B91C1C', // Dark red (red-700)
        'error-900': '#7F1D1D', // Very dark red (red-900)
      },
      fontFamily: {
        'heading': ['Roboto', 'sans-serif'], // Roboto for headings
        'body': ['Roboto', 'sans-serif'], // Roboto for body text
        'caption': ['Roboto', 'sans-serif'], // Roboto light for captions
        'mono': ['Roboto Mono', 'monospace'], // Roboto Mono for data
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'bold': '700',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
        'elevation-1': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        'elevation-2': '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
        'elevation-3': '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      backdropBlur: {
        'subtle': '8px',
      },
      animation: {
        'skeleton': 'skeleton-loading 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-in-left': 'slideInLeft 200ms ease-in-out',
        'slide-in-right': 'slideInRight 200ms ease-in-out',
        'scale-in': 'scaleIn 150ms ease-in-out',
      },
      keyframes: {
        'skeleton-loading': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slideInLeft': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slideInRight': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scaleIn': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}