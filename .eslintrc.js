module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/require-default-prop": "error",
    "vue/require-prop-types": "error",
    "vue/attributes-order": "error",
    "vue/order-in-components": "error"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
