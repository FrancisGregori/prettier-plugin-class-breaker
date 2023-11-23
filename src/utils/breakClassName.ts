import * as t from '@babel/types'

/**
 * Breaks a long string of CSS class names into multiple lines.
 * @returns {t.JSXExpressionContainer} A JSX expression container with formatted class names.
 */
export function breakClassName(
  classString: string,
  baseIndentation = '',
  maxClassesPerLine: number,
  indentStyle: 'tab' | 'space' = 'space',
  indentSize: number,
) {
  const indentCharacter = indentStyle === 'tab' ? '\t' : ' '
  const classes = classString?.split(' ')
  const extraSpace = indentCharacter.repeat(indentSize)
  const classIndentation = baseIndentation + extraSpace

  let brokenClasses = '\n' + classIndentation

  for (let i = 0; i < classes.length; i += maxClassesPerLine) {
    const line = classes.slice(i, i + maxClassesPerLine).join(' ')
    brokenClasses += line

    if (i + maxClassesPerLine < classes.length) {
      brokenClasses += '\n' + classIndentation
    }
  }

  brokenClasses += '\n' + baseIndentation + extraSpace

  const templateElement = t.templateElement({ raw: brokenClasses, cooked: brokenClasses }, true)
  const templateLiteral = t.templateLiteral([templateElement], [])

  return t.jsxExpressionContainer(templateLiteral)
}
