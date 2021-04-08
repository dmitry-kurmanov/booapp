module.exports = {
	ignorePatterns: ['unit-tests/**/*'],
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: ['eslint:recommended', 'prettier'],
	overrides: [
		{
			files: ['**/*.svelte'],
			processor: 'svelte3/svelte3',
		},
	],
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
	},
	plugins: ['svelte3'],
};
