/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Custom color palette for Classic Text Stream design
        // Background: Warm off-white for softer reading experience
        'warm-white': '#FDFCFB',
        // Primary text: Very dark gray (not pure black) for comfortable reading
        'dark-gray': '#1A1A1A',
        // Accent: Saddle brown for links, highlights, and progress bar
        'saddle-brown': '#8B4513',
        // Muted: Gray for secondary content like dates and metadata
        'muted-gray': '#6B7280',
      },
      fontFamily: {
        // System font stack for UI elements (header, footer, buttons)
        // Uses native fonts for fast loading and familiar appearance
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        // Lora serif for body text and articles
        // Professional, highly readable serif designed for screens
        serif: ['Lora', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      typography: (theme) => ({
        // Custom prose styles for markdown content
        // The 'prose' class is provided by @tailwindcss/typography
        DEFAULT: {
          css: {
            // Set color variables used by prose plugin
            '--tw-prose-body': theme('colors.dark-gray'),
            '--tw-prose-headings': theme('colors.dark-gray'),
            '--tw-prose-links': theme('colors.saddle-brown'),
            '--tw-prose-bold': theme('colors.dark-gray'),
            '--tw-prose-code': theme('colors.dark-gray'),
            '--tw-prose-quotes': theme('colors.dark-gray'),

            // Base typography settings
            color: theme('colors.dark-gray'),
            maxWidth: '650px', // Optimal reading width (~70 chars/line)
            fontSize: '18px',  // Comfortable reading size
            lineHeight: '1.75', // Sweet spot between readability and density

            // Heading styles - all use dark gray
            h1: {
              color: theme('colors.dark-gray'),
              fontWeight: '700',
              lineHeight: '1.2',
            },
            h2: {
              color: theme('colors.dark-gray'),
              fontWeight: '600',
              lineHeight: '1.3',
            },
            h3: {
              color: theme('colors.dark-gray'),
              fontWeight: '600',
              lineHeight: '1.4',
            },
            h4: {
              color: theme('colors.dark-gray'),
              fontWeight: '600',
            },

            // Link styles with saddle brown accent
            a: {
              color: theme('colors.saddle-brown'),
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.saddle-brown'),
                opacity: '0.8',
              },
            },

            // Inline code styles
            code: {
              backgroundColor: '#1e293b', // Dark slate background
              color: '#e2e8f0',           // Light slate text
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
              fontSize: '0.875em',
            },
            // Remove default backticks around inline code
            'code::before': { content: '""' },
            'code::after': { content: '""' },

            // Code block styles (pre-formatted code)
            pre: {
              backgroundColor: '#1e293b', // Dark slate background
              color: '#e2e8f0',           // Light slate text
              borderRadius: '0.5rem',
              padding: '1.5rem',
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              borderRadius: '0',
              fontSize: 'inherit',
            },

            // Blockquote styles with saddle brown left border
            blockquote: {
              borderLeftColor: theme('colors.saddle-brown'),
              borderLeftWidth: '4px',
              fontStyle: 'italic',
              paddingLeft: '1.5rem',
              color: theme('colors.dark-gray'),
            },

            // Strong/bold text
            strong: {
              color: theme('colors.dark-gray'),
              fontWeight: '600',
            },

            // Paragraph spacing for comfortable reading
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
