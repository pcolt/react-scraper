module.exports = {
	'env': {
		'browser': true,
		'node': true,
		'es2021': true,
		'jest/globals': true,
		"cypress/globals": true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
	],
	'ignorePatterns': [
		'dist', 
		'.eslintrc.cjs',
		'node_modules',
		'cypress.config.js',
		'built_backend',
		'tsconfig.json'
	],
	'settings': {
		'react': {
			'version': 'detect'
		}
	},
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'jest',
		"cypress"
	],
	'rules': {
		'indent': [
			'warn',
			2
		], 
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'warn',
			'single'
		],
		'semi': [
			'warn',
			'never'
		],
		"eqeqeq": "error",
		"no-trailing-spaces": "warn",
		"arrow-spacing": [
			"error", { "before": true, "after": true }
		],
		'no-console': [
			'off'
		],
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'no-unused-vars': [
			'warn'
		]
	},
}
