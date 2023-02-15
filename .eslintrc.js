module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'class-methods-use-this': 'off',
    'no-await-in-loop': 'off',
    'import/no-cycle': 'off',
    'no-param-reassign' : 'off',
    "prettier/prettier": ["error",{
      "endOfLine": "auto"}
    ],
    'no-restricted-syntax' : 'off',
  },
};
