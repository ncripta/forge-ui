import colors from './base/colors.json';
import spacing from './base/spacing.json';
import themeLight from './semantic/theme-light.json';
import themeDark from './semantic/theme-dark.json';
import typography from './semantic/typography.json';
import radius from './semantic/radius.json';
import shadows from './semantic/shadows.json';
import motion from './semantic/motion.json';

// --- Tipos base ---

export interface TokenValue {
  value: string;
  comment?: string;
}

export interface ColorScale {
  [step: string]: TokenValue;
}

export interface BaseColors {
  color: {
    base: {
      indigo: ColorScale;
      slate: ColorScale;
      emerald: ColorScale;
      red: ColorScale;
      amber: ColorScale;
      white: TokenValue;
      black: TokenValue;
    };
  };
}

export interface SpacingTokens {
  spacing: Record<string, TokenValue>;
}

export interface SemanticColorGroup {
  main: TokenValue;
  hover: TokenValue;
  subtle: TokenValue;
  [key: string]: TokenValue;
}

export interface SemanticTheme {
  semantic: {
    primary: SemanticColorGroup;
    success: SemanticColorGroup;
    danger: SemanticColorGroup;
    warning: SemanticColorGroup;
    surface: Record<string, TokenValue>;
    text: Record<string, TokenValue>;
  };
}

export interface TypographyTokens {
  font: {
    family: Record<string, TokenValue>;
    size: Record<string, TokenValue>;
    weight: Record<string, TokenValue>;
    lineHeight: Record<string, TokenValue>;
    letterSpacing: Record<string, TokenValue>;
  };
}

export interface RadiusTokens {
  radius: Record<string, TokenValue>;
}

export interface ShadowTokens {
  shadow: Record<string, TokenValue>;
}

export interface MotionTokens {
  motion: {
    duration: Record<string, TokenValue>;
    easing: Record<string, TokenValue>;
  };
}

// --- Exportaciones tipadas ---

export const forgeColors = colors as unknown as BaseColors;
export const forgeSpacing = spacing as unknown as SpacingTokens;
export const forgeThemeLight = themeLight as unknown as SemanticTheme;
export const forgeThemeDark = themeDark as unknown as SemanticTheme;
export const forgeTypography = typography as unknown as TypographyTokens;
export const forgeRadius = radius as unknown as RadiusTokens;
export const forgeShadows = shadows as unknown as ShadowTokens;
export const forgeMotion = motion as unknown as MotionTokens;

export const tokens = {
  colors: forgeColors,
  spacing: forgeSpacing,
  themeLight: forgeThemeLight,
  themeDark: forgeThemeDark,
  typography: forgeTypography,
  radius: forgeRadius,
  shadows: forgeShadows,
  motion: forgeMotion,
} as const;

export default tokens;
