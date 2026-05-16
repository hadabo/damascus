import globals from "globals";

export default [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.mocha
      }
    },
    rules: {
      "semi": ["error", "never"],
      "quotes": ["error", "single"]
    }
  }
];
