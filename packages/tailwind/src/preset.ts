/**
 * Forge UI - Tailwind CSS Preset
 * Mapea las utilidades de Tailwind hacia las CSS variables generadas por @forge-ui/css.
 * Uso: presets: [require('@forge-ui/tailwind')]
 */
import type { Config } from 'tailwindcss';

const forgePreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--forge-primary-50)',
          100: 'var(--forge-primary-100)',
          400: 'var(--forge-primary-400)',
          500: 'var(--forge-primary-500)',
          600: 'var(--forge-primary-600)',
          700: 'var(--forge-primary-700)',
          main: 'var(--forge-primary-main)',
          hover: 'var(--forge-primary-hover)',
          active: 'var(--forge-primary-active)',
          subtle: 'var(--forge-primary-subtle)',
          'subtle-hover': 'var(--forge-primary-subtleHover)',
        },
        success: {
          main: 'var(--forge-success-main)',
          hover: 'var(--forge-success-hover)',
          subtle: 'var(--forge-success-subtle)',
        },
        danger: {
          main: 'var(--forge-danger-main)',
          hover: 'var(--forge-danger-hover)',
          subtle: 'var(--forge-danger-subtle)',
        },
        warning: {
          main: 'var(--forge-warning-main)',
          hover: 'var(--forge-warning-hover)',
          subtle: 'var(--forge-warning-subtle)',
        },
        surface: {
          50: 'var(--forge-surface-50)',
          100: 'var(--forge-surface-100)',
          200: 'var(--forge-surface-200)',
          300: 'var(--forge-surface-300)',
          400: 'var(--forge-surface-400)',
          500: 'var(--forge-surface-500)',
          600: 'var(--forge-surface-600)',
          800: 'var(--forge-surface-800)',
          900: 'var(--forge-surface-900)',
          background: 'var(--forge-surface-background)',
          raised: 'var(--forge-surface-raised)',
          overlay: 'var(--forge-surface-overlay)',
          sunken: 'var(--forge-surface-sunken)',
          border: 'var(--forge-surface-border)',
          'border-hover': 'var(--forge-surface-borderHover)',
        },
        text: {
          main: 'var(--forge-text-main)',
          secondary: 'var(--forge-text-secondary)',
          muted: 'var(--forge-text-muted)',
          disabled: 'var(--forge-text-disabled)',
          inverse: 'var(--forge-text-inverse)',
          link: 'var(--forge-text-link)',
        },
      },
      spacing: {
        '0.5': 'var(--forge-space-0_5)',
        '1': 'var(--forge-space-1)',
        '1.5': 'var(--forge-space-1_5)',
        '2': 'var(--forge-space-2)',
        '2.5': 'var(--forge-space-2_5)',
        '3': 'var(--forge-space-3)',
        '4': 'var(--forge-space-4)',
        '5': 'var(--forge-space-5)',
        '6': 'var(--forge-space-6)',
        '8': 'var(--forge-space-8)',
        '10': 'var(--forge-space-10)',
        '12': 'var(--forge-space-12)',
        '14': 'var(--forge-space-14)',
        '16': 'var(--forge-space-16)',
        '20': 'var(--forge-space-20)',
        '24': 'var(--forge-space-24)',
      },
      fontFamily: {
        sans: 'var(--forge-font-family-sans)',
        mono: 'var(--forge-font-family-mono)',
      },
      fontSize: {
        xs: 'var(--forge-font-size-xs)',
        sm: 'var(--forge-font-size-sm)',
        base: 'var(--forge-font-size-base)',
        lg: 'var(--forge-font-size-lg)',
        xl: 'var(--forge-font-size-xl)',
        '2xl': 'var(--forge-font-size-2xl)',
        '3xl': 'var(--forge-font-size-3xl)',
        '4xl': 'var(--forge-font-size-4xl)',
      },
      fontWeight: {
        regular: 'var(--forge-font-weight-regular)',
        medium: 'var(--forge-font-weight-medium)',
        semibold: 'var(--forge-font-weight-semibold)',
        bold: 'var(--forge-font-weight-bold)',
      },
      lineHeight: {
        tight: 'var(--forge-font-lineHeight-tight)',
        normal: 'var(--forge-font-lineHeight-normal)',
        relaxed: 'var(--forge-font-lineHeight-relaxed)',
      },
      letterSpacing: {
        tight: 'var(--forge-font-letterSpacing-tight)',
        normal: 'var(--forge-font-letterSpacing-normal)',
        wide: 'var(--forge-font-letterSpacing-wide)',
      },
      borderRadius: {
        none: 'var(--forge-radius-none)',
        sm: 'var(--forge-radius-sm)',
        md: 'var(--forge-radius-md)',
        lg: 'var(--forge-radius-lg)',
        xl: 'var(--forge-radius-xl)',
        '2xl': 'var(--forge-radius-2xl)',
        full: 'var(--forge-radius-full)',
      },
      boxShadow: {
        none: 'var(--forge-shadow-none)',
        xs: 'var(--forge-shadow-xs)',
        sm: 'var(--forge-shadow-sm)',
        md: 'var(--forge-shadow-md)',
        lg: 'var(--forge-shadow-lg)',
        xl: 'var(--forge-shadow-xl)',
        inner: 'var(--forge-shadow-inner)',
      },
      transitionDuration: {
        instant: 'var(--forge-motion-duration-instant)',
        fast: 'var(--forge-motion-duration-fast)',
        normal: 'var(--forge-motion-duration-normal)',
        slow: 'var(--forge-motion-duration-slow)',
        slower: 'var(--forge-motion-duration-slower)',
      },
      transitionTimingFunction: {
        default: 'var(--forge-motion-easing-default)',
        in: 'var(--forge-motion-easing-in)',
        out: 'var(--forge-motion-easing-out)',
        'in-out': 'var(--forge-motion-easing-inOut)',
        bounce: 'var(--forge-motion-easing-bounce)',
      },
    },
  },
};

export default forgePreset;
