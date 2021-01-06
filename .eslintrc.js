module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential"
    // '@vue/standard'
  ],
  rules: {
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false }
    ],
    "vue/no-unused-components": [
      "error",
      {
        ignoreWhenBindingPresent: true
      }
    ],
    "vue/no-parsing-error": [
      2,
      {
        "x-invalid-end-tag": false
      }
    ],
    "vue/no-unused-components": [
      "error",
      {
        ignoreWhenBindingPresent: true
      }
    ],
    "no-debugger": "off",
    "no-unused-vars": "warn",
    "vue/no-unused-vars": "off"
  },
  plugins: ["vue"],
  parserOptions: {
    parser: "babel-eslint"
  }
};
