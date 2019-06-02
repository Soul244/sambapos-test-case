module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "linebreak-style": 0,
    "no-underscore-dangle": 0,
    "react/no-array-index-key": 0,
    "react/jsx-filename-extension":0,
    "no-shadow":0,
    "react/forbid-prop-types":0,
    "class-methods-use-this":0,
    "react/no-multi-comp":0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "camelcase": 0
  },
  plugins: [
    'react',
  ],
};