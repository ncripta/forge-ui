/**
 * Forge UI - Token Compiler
 * Lee los JSON de @forge-ui/tokens y genera CSS variables con prefijo --forge-
 */
import * as fs from 'fs';
import * as path from 'path';

const tokensDir = path.resolve(__dirname, '../../tokens/src');
const outDir = path.resolve(__dirname, '../dist');

// --- Tipos ---

interface TokenValue {
  value: string;
  comment?: string;
}

type TokenObject = { [key: string]: TokenValue | TokenObject };

// --- Utilidades ---

function deepGet(obj: unknown, pathStr: string): unknown {
  const keys = pathStr.replace(/[{}]/g, '').split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

function resolveValue(value: string, rootData: unknown): string {
  if (!value.startsWith('{')) return value;
  const target = deepGet(rootData, value);
  if (target && typeof target === 'object' && 'value' in target) {
    return (target as TokenValue).value;
  }
  if (typeof target === 'string') return target;
  return value;
}

function flattenTokens(obj: TokenObject, prefix = '', result: Record<string, string> = {}): Record<string, string> {
  for (const [key, val] of Object.entries(obj)) {
    const tokenKey = prefix ? `${prefix}-${key}` : key;
    if (val && typeof val === 'object' && 'value' in val) {
      result[tokenKey] = (val as TokenValue).value;
    } else if (val && typeof val === 'object') {
      flattenTokens(val as TokenObject, tokenKey, result);
    }
  }
  return result;
}

// --- Lectura de tokens ---

function readJSON<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

const colors = readJSON<{ color: TokenObject }>(path.join(tokensDir, 'base/colors.json'));
const spacing = readJSON<{ spacing: TokenObject }>(path.join(tokensDir, 'base/spacing.json'));
const themeLight = readJSON<{ semantic: TokenObject }>(path.join(tokensDir, 'semantic/theme-light.json'));
const themeDark = readJSON<{ semantic: TokenObject }>(path.join(tokensDir, 'semantic/theme-dark.json'));
const typography = readJSON<{ font: TokenObject }>(path.join(tokensDir, 'semantic/typography.json'));
const radius = readJSON<{ radius: TokenObject }>(path.join(tokensDir, 'semantic/radius.json'));
const shadows = readJSON<{ shadow: TokenObject }>(path.join(tokensDir, 'semantic/shadows.json'));
const motion = readJSON<{ motion: TokenObject }>(path.join(tokensDir, 'semantic/motion.json'));

interface ColorThemes {
  themes: Record<string, Record<string, TokenValue>>;
}
const colorThemes = readJSON<ColorThemes>(path.join(tokensDir, 'semantic/color-themes.json'));

// Objeto raíz para resolver referencias
const rootData = { color: colors.color };

// --- Resolución y aplanamiento ---

function resolveAndFlatten(tokenObj: TokenObject, root: unknown): Record<string, string> {
  const flat = flattenTokens(tokenObj);
  const resolved: Record<string, string> = {};
  for (const [key, value] of Object.entries(flat)) {
    resolved[key] = resolveValue(value, root);
  }
  return resolved;
}

const lightResolved = resolveAndFlatten(themeLight.semantic, rootData);
const darkResolved = resolveAndFlatten(themeDark.semantic, rootData);
const spacingFlat = flattenTokens(spacing.spacing);
const typographyFlat = flattenTokens(typography.font);
const radiusFlat = flattenTokens(radius.radius);
const shadowsFlat = flattenTokens(shadows.shadow);
const motionFlat = flattenTokens(motion.motion);

// --- Generación de CSS vars ---

/**
 * Sanitiza claves de tokens para que sean nombres válidos de CSS custom properties.
 * Los puntos (ej. "0.5") no son válidos en nombres de variables CSS y generan
 * warnings en minificadores modernos (esbuild). Se reemplazan por "_".
 */
function sanitizeKey(key: string): string {
  return key.replace(/\./g, '_');
}

function generateVars(tokens: Record<string, string>, prefix: string): string {
  return Object.entries(tokens)
    .map(([key, value]) => `  --forge-${prefix}${sanitizeKey(key)}: ${value};`)
    .join('\n');
}

const lightVars = generateVars(lightResolved, '');
const darkVars = generateVars(darkResolved, '');
const spacingVars = generateVars(spacingFlat, 'space-');
const typographyVars = generateVars(typographyFlat, 'font-');
const radiusVars = generateVars(radiusFlat, 'radius-');
const shadowsVars = generateVars(shadowsFlat, 'shadow-');
const motionVars = generateVars(motionFlat, 'motion-');

// --- Color theme default (indigo) vars para inyectar en :root ---

const defaultThemeVars = Object.entries(colorThemes.themes['indigo']!)
  .map(([key, token]) => `  --forge-${key}: ${token.value};`)
  .join('\n');

// --- Ensamblaje ---

const themeBaseCSS = `/**
 * Forge UI - Theme Base (Light)
 * Auto-generated from @forge-ui/tokens. DO NOT EDIT MANUALLY.
 */
:root {
  /* Color Theme (default: indigo) */
${defaultThemeVars}

  /* Semantic Colors */
${lightVars}

  /* Spacing */
${spacingVars}

  /* Typography */
${typographyVars}

  /* Radius */
${radiusVars}

  /* Shadows */
${shadowsVars}

  /* Motion */
${motionVars}
}
`;

const themeDarkCSS = `/**
 * Forge UI - Theme Dark
 * Auto-generated from @forge-ui/tokens. DO NOT EDIT MANUALLY.
 */
[data-mode="dark"] {
${darkVars}

  /* Surface scale overrides for dark mode */
  --forge-surface-50: #0f172a;
  --forge-surface-100: #1e293b;
  --forge-surface-200: #334155;
  --forge-surface-300: #475569;
  --forge-surface-400: #64748b;
  --forge-surface-500: #94a3b8;
  --forge-surface-600: #cbd5e1;
  --forge-surface-800: #f1f5f9;
  --forge-surface-900: #f8fafc;

  /* Primary scale adjustments for dark mode */
  --forge-primary-50: #1e1b4b;
  --forge-primary-100: #312e81;
  --forge-primary-400: #a5b4fc;
  --forge-primary-500: #818cf8;
  --forge-primary-600: #a5b4fc;
  --forge-primary-700: #c7d2fe;
}
`;


const colorThemesCSS = Object.entries(colorThemes.themes)
  .map(([themeName, tokens]) => {
    if (themeName === 'indigo') {
      return `/* Theme: ${themeName} (default - applied via :root in theme-base.css) */`;
    }

    // Light mode vars
    const lightVarsTheme = Object.entries(tokens)
      .map(([key, token]) => `  --forge-${key}: ${token.value};`)
      .join('\n');

    // Dark mode vars: invert surface scale, adjust primary
    const darkEntries: Record<string, string> = {};
    for (const [key, token] of Object.entries(tokens)) {
      if (key.startsWith('surface-')) {
        // Invert: 50↔900, 100↔800, 200↔600, 300↔500, 400 stays
        const invertMap: Record<string, string> = {
          'surface-50': 'surface-900',
          'surface-100': 'surface-800',
          'surface-200': 'surface-600',
          'surface-300': 'surface-500',
          'surface-400': 'surface-400',
          'surface-500': 'surface-300',
          'surface-600': 'surface-200',
          'surface-800': 'surface-100',
          'surface-900': 'surface-50',
        };
        const targetKey = invertMap[key];
        if (targetKey) {
          darkEntries[targetKey] = token.value;
        }
      } else if (key.startsWith('primary-')) {
        // For dark: swap low/high (50↔700, 100↔600, keep 400/500 with lighter tones)
        const primaryDarkMap: Record<string, string> = {
          'primary-50': 'primary-700',
          'primary-100': 'primary-600',
          'primary-400': 'primary-400',
          'primary-500': 'primary-400',
          'primary-600': 'primary-100',
          'primary-700': 'primary-50',
        };
        const targetKey = primaryDarkMap[key];
        if (targetKey) {
          darkEntries[targetKey] = token.value;
        }
      }
    }
    const darkVarsTheme = Object.entries(darkEntries)
      .map(([key, value]) => `  --forge-${key}: ${value};`)
      .join('\n');

    return `[data-theme="${themeName}"] {
${lightVarsTheme}
}

[data-mode="dark"][data-theme="${themeName}"] {
${darkVarsTheme}
}`;
  })
  .filter(Boolean)
  .join('\n\n');

const colorThemesFile = `/**
 * Forge UI - Color Themes
 * Auto-generated from @forge-ui/tokens. DO NOT EDIT MANUALLY.
 * Apply themes via: document.documentElement.setAttribute('data-theme', 'emerald')
 */

/* Default theme (indigo) variables are in theme-base.css :root */

${colorThemesCSS}
`;

// --- Escritura ---

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'theme-base.css'), themeBaseCSS);
fs.writeFileSync(path.join(outDir, 'theme-dark.css'), themeDarkCSS);
fs.writeFileSync(path.join(outDir, 'color-themes.css'), colorThemesFile);

console.log('✓ @ncripta/forge-css compiled successfully');
console.log('  → dist/theme-base.css');
console.log('  → dist/theme-dark.css');
console.log('  → dist/color-themes.css');
