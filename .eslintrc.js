module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "arrow-parens": [
      "error",
      "always",
    ],
    "class-methods-use-this": "off",
    "import/extensions": [
      "error",
      "always",
    ],
    "no-underscore-dangle": [
      "error",
      { "allowAfterThis": true },
    ],
    "space-before-function-paren": [
      "error",
      "always",
    ],
  },
};
