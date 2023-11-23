import * as prettier from 'prettier'
import * as fs from 'fs'
import * as path from 'path'

interface CustomPrettierOptions {
  classesPerLine: number
  lineBreakAfterClasses: number
  indentStyle: 'tab' | 'space'
  indentSize: number
}

/**
 * Reads the .classbreakerrs file and returns its JSON content.
 * @returns {CustomPrettierOptions} The parsed configuration from .classbreakerrs.
 */
function readClassBreakerConfig(): Partial<CustomPrettierOptions> {
  const configPath = path.join(process.cwd(), '.classbreakerrs')
  if (fs.existsSync(configPath)) {
    const configFile = fs.readFileSync(configPath, 'utf8')
    return JSON.parse(configFile)
  }
  return {}
}

/**
 * Resolves and returns combined Prettier and .classbreakerrs configuration options.
 * @returns {Promise<CustomPrettierOptions>} An object containing the resolved configuration options.
 */
export async function resolvePrettierConfig(): Promise<CustomPrettierOptions> {
  // Obtains Prettier configurations from the current directory
  const prettierOptions = (await prettier.resolveConfig(process.cwd())) as Partial<CustomPrettierOptions>

  // Read custom .classbreakerrs configurations
  const classBreakerOptions = readClassBreakerConfig()

  return {
    classesPerLine: classBreakerOptions.classesPerLine || prettierOptions.classesPerLine || 1,
    lineBreakAfterClasses: classBreakerOptions.lineBreakAfterClasses || prettierOptions.lineBreakAfterClasses || 5,
    indentStyle: classBreakerOptions.indentStyle || prettierOptions.indentStyle || 'space',
    indentSize: classBreakerOptions.indentSize || prettierOptions.indentSize || 4,
  }
}
