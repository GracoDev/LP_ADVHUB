import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cores extraídas dos prints do dashboard
        adv: {
          black: '#050505',      // Fundo principal
          dark: '#0F0F0F',       // Fundo de cards
          card: '#141414',       // Fundo de elementos internos
          gold: '#FFB84D',       // Laranja/Dourado principal (Brand)
          'gold-dim': 'rgba(255, 184, 77, 0.1)',
          blue: '#3B82F6',       // Azul Tech (Glow/Marketing)
          'blue-dim': 'rgba(59, 130, 246, 0.1)',
          text: '#A3A3A3',       // Texto secundário
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
