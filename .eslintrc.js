// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "standard",
    "prettier"
  ],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    indent: ["error", 4],
    quotes: [1, "single"],
    "space-before-blocks": 1,
    eqeqeq: 1,
    "no-multi-spaces": 2,
    "vue/html-indent": 0,
    "vue/singleline-html-element-content-newline": 0,
    "vue/component-name-in-template-casing": 0,
    "vue/html-self-closing": 0,
    "no-tabs": 0,
    "valid-typeof": 1,
    "no-unused-vars": [1, { vars: "all", args: "all" }],
    "no-unreachable": 1,
    "no-console": 1,
    "no-cond-assign": 1,
    "no-constant-condition": 1
  }
};
