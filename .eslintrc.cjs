/* eslint-env node */
// require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
    root: true,
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },
    extends: ["plugin:vue/strongly-recommended", "eslint:recommended", "@vue/typescript/recommended", "prettier"],
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "prettier/prettier": "error",
        // not needed for vue 3
        "vue/no-multiple-template-root": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
    },
    overrides: [
        {
            files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}"],
            extends: ["plugin:cypress/recommended"],
        },
    ],
}
