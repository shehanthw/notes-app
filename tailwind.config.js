// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        // Mobile-first: start from smallest
        'xs': '375px',    // Small phones
        'sm': '640px',    // Larger phones
        'md': '768px',    // Tablets
        'lg': '1024px',   // Small laptops
        'xl': '1280px',   // Desktops
      },
      fontSize: {
        // Mobile-optimized font sizes
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
      },
      spacing: {
        // Touch-friendly sizes (44px minimum for buttons)
        'touch': '44px',
      },
    },
  },
  plugins: [],
}