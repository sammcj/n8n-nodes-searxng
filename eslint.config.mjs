/**
 * @type {import('eslint').ESLint.ConfigData}
 */
export default {
  root: true,

  env: {
    browser: true,
    es6: true,
    node: true,
  },

  parser: "@typescript-eslint/parser",

  parserOptions: {
    project: ["./tsconfig.json"],
    sourceType: "module",
    extraFileExtensions: [".json"],
  },

  ignorePatterns: [
    ".eslintrc.js",
    "**/*.js",
    "**/node_modules/**",
    "**/dist/**",
  ],

  overrides: [
    {
      files: ["package.json"],
      plugins: ["eslint-plugin-n8n-nodes-base"],
      extends: ["plugin:n8n-nodes-base/community"],
      rules: {
        "n8n-nodes-base/community-package-json-name-still-default": "off",
      },
    },
    {
      files: ["./credentials/**/*.ts"],
      plugins: ["eslint-plugin-n8n-nodes-base"],
      rules: {
        "n8n-nodes-base/cred-class-field-documentation-url-missing": "off",
        "n8n-nodes-base/cred-class-field-documentation-url-miscased": "off",
        "n8n-nodes-base/cred-filename-against-convention": "off",
      },
    },
    {
      files: ["./nodes/**/*.ts"],
      plugins: ["eslint-plugin-n8n-nodes-base"],
      extends: ["plugin:n8n-nodes-base/nodes"],
      rules: {
        "n8n-nodes-base/node-execute-block-missing-continue-on-fail": "off",
        "n8n-nodes-base/node-resource-description-filename-against-convention": "off",
        "n8n-nodes-base/node-param-fixed-collection-type-unsorted-items": "off",
      },
    },
  ],
};