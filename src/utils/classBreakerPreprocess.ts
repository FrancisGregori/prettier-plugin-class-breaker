import { Parser } from 'prettier'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'
import * as t from '@babel/types'

import { resolvePrettierConfig } from './prettierConfig'
import { breakClassName } from './breakClassName'

/**
 * Preprocess function for the Prettier plugin to handle class name formatting.
 * This function modifies the JSX 'className' attribute to format long class strings.
 *
 * @param {Parser} parser - The original parser from Prettier.
 * @returns {Promise<Parser>} A modified parser that includes the preprocessing step.
 */
export const classBreakerPreprocess = async (parser: Parser): Promise<Parser> => {
  const { lineBreakAfterClasses, classesPerLine, indentStyle, indentSize } = await resolvePrettierConfig()

  return {
    ...parser,
    preprocess: (code) => {
      const ast = parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
      })

      let modified = false

      traverse(ast, {
        JSXAttribute(path) {
          if (path.node.name.name === 'className') {
            let classValue

            if (path.node.value?.type === 'StringLiteral') {
              classValue = path.node.value.value
            } else if (
              path.node.value?.type === 'JSXExpressionContainer' &&
              path.node.value.expression.type === 'TemplateLiteral'
            ) {
              classValue = path.node.value.expression.quasis
                .map((quasi) => quasi.value.raw)
                .join('')
                .replace(/\s+/g, ' ')
                .trim()
            }

            if (classValue) {
              const classes = classValue.split(' ')
              if (classes.length > lineBreakAfterClasses) {
                const parentNode = path.parent
                const parentStartColumn = parentNode.loc?.start.column
                const baseIndentation = ' '.repeat(parentStartColumn || 0)
                const result = breakClassName(classValue, baseIndentation, classesPerLine, indentStyle, indentSize)

                if (result.expression.type === 'TemplateLiteral') {
                  path.node.value = t.jsxExpressionContainer(result.expression)
                  modified = true
                }
              }
            }
          }
        },
      })

      return modified ? generate(ast).code : code
    },
  }
}
