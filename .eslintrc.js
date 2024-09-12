module.exports = {
    parser: '@typescript-eslint/parser', 
    extends: [
      'eslint:recommended', 
      'plugin:@typescript-eslint/recommended', 
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      ecmaVersion: 2020, 
      sourceType: 'module', 
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-var-requires': 'error',
        'import/order': ['error', { 'newlines-between': 'always', 'alphabetize': { 'order': 'asc', 'caseInsensitive': true } }],
        "max-len": ["error", { code: 120, ignoreComments: true }],
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            semi: false,
            trailingComma: 'all',
          },
        ],
      },
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
}
  