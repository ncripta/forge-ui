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

function generateVars(tokens: Record<string, string>, prefix: string): string {
  return Object.entries(tokens)
    .map(([key, value]) => `  --forge-${prefix}${key}: ${value};`)
    .join('\n');
}

const lightVars = generateVars(lightResolved, '');
const darkVars = generateVars(darkResolved, '');
const spacingVars = generateVars(spacingFlat, 'space-');
const typographyVars = generateVars(typographyFlat, 'font-');
const radiusVars = generateVars(radiusFlat, 'radius-');
const shadowsVars = generateVars(shadowsFlat, 'shadow-');
const motionVars = generateVars(motionFlat, 'motion-');

// --- Ensamblaje ---

const themeBaseCSS = `/**
 * Forge UI - Theme Base (Light)
 * Auto-generated from @forge-ui/tokens. DO NOT EDIT MANUALLY.
 */
:root {
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
[data-theme="dark"] {
${darkVars}
}
`;

// --- Escritura ---

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'theme-base.css'), themeBaseCSS);
fs.writeFileSync(path.join(outDir, 'theme-dark.css'), themeDarkCSS);

console.log('✓ @forge-ui/css compiled successfully');
console.log('  → dist/theme-base.css');
console.log('  → dist/theme-dark.css');
