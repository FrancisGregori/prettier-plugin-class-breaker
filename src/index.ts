import { parsers as babelParsers } from 'prettier/parser-babel'
import { parsers as typescriptParsers } from 'prettier/parser-typescript'

import { classBreakerPreprocess } from './utils/classBreakerPreprocess'

/**
 * Main configuration for the Prettier plugin.
 */
const plugin = {
	parsers: {
		babel: classBreakerPreprocess(babelParsers.babel),
		'babel-ts': classBreakerPreprocess(babelParsers['babel-ts']),
		typescript: classBreakerPreprocess(typescriptParsers.typescript),
	},
}

module.exports = plugin
