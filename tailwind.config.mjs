import flowbite from 'flowbite-react/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    flowbite.content(),
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      dropShadow: {
        gift: '3px 4px 8px rgba(0, 96, 255, 0.4)'
      },
      boxShadow: {
        button: 'inset 0 6px 12px #26b6ff, 0 0 17px rgba(38, 182, 255, 0.77), inset 0 1px 10px rgba(255, 255, 255, 0.55)',
        'button-hover': ' inset 0 6px 12px #26b6ff, 0 0 34px rgba(38, 182, 255, 0.77), inset 0 1px 10px rgba(255, 255, 255, 0.55)'
      },
      animation: {
        marquee: 'marquee var(--duration) linear infinite',
        meteor: 'meteor 5s linear infinite',
        'text-gradient': 'text-gradient 1.5s linear infinite',
        spin: 'spin calc(var(--speed) * 2) infinite linear',
        slide: 'slide var(--speed) ease-in-out infinite alternate'
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-50% - var(--gap)/2))' }
        },
        'text-gradient': {
          to: {
            backgroundPosition: '200% center'
          }
        },
        spin: {
          '0%': {
            rotate: '0deg'
          },
          '15%, 35%': {
            rotate: '90deg'
          },
          '65%, 85%': {
            rotate: '270deg'
          },
          '100%': {
            rotate: '360deg'
          }
        },
        slide: {
          to: {
            transform: 'translate(calc(100cqw - 100%), 0)'
          }
        },
        meteor: {
          '0%': { transform: 'rotate(-40deg) translateX(0)', opacity: 0 },
          '30%': { opacity: 1 },
          '100%': {
            transform: 'rotate(-40deg) translateX(-500px)',
            opacity: 0
          }
        }
      },
      screens: {
        base: '1200px'
      },
      colors: {
        commerce: {
          50: '#e9f7ff',
          100: '#ceedff',
          200: '#a7e1ff',
          300: '#6bd3ff',
          400: '#26b6ff',
          500: '#008cff',
          600: '#0062ff',
          700: '#0047ff',
          800: '#003ce6',
          900: '#0039b3',
          950: '#001d56'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        button: 'linear-gradient(to bottom, #a7e1ff, #0062ff)'
      }
    }
  },
  plugins: [
    import('flowbite/plugin'),
    flowbite.plugin(),
    import('tailwindcss-textshadow'),
    import('@midudev/tailwind-animations')
  ]
}
