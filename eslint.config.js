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
      "semi": ["error", "always"],
      "quotes": ["error", "single"]
    }
  }
];
