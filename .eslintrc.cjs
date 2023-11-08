module.exports = {
	'env': {
		'browser': true,
		'node': true,
		'es2021': true,
		'jest/globals': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
	],
	'settings': {
		'react': {
			'version': 'detect'
		}
	},
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'jest'
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
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		"no-unused-vars": [
			'warn'
		]
	},
}
