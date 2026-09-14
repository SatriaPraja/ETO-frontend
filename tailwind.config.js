/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        primaryHover: 'var(--color-primary-hover)',
        primaryContainer: 'var(--color-primary-container)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        neutralText: 'var(--color-neutral)',
        background: 'var(--color-background)',
        surfaceCard: 'var(--color-surface-card)',
        surfaceCanvas: 'var(--color-surface-canvas)',
        surfaceContainer: 'var(--color-surface-container)',
        surfaceContainerHigh: 'var(--color-surface-container-high)',
        surfaceContainerLow: 'var(--color-surface-container-low)',
        error: 'var(--color-error)',
        errorContainer: 'var(--color-error-container)',
        onErrorContainer: 'var(--color-on-error-container)',
        tertiaryFixed: 'var(--color-tertiary-fixed)',
        onTertiaryFixed: 'var(--color-on-tertiary-fixed)',
        textPrimary: 'var(--color-text-primary)',
        textMuted: 'var(--color-text-muted)',
        onPrimary: 'var(--color-on-primary)',
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Hanken Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}