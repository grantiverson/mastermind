module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true,
    },
    extends: [
        "plugin:jsdoc/recommended",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "airbnb",
        "airbnb/hooks",
        "prettier",
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["jsdoc", "react", "prettier"],
    rules: {
        "prettier/prettier": ["error"],
        "react/function-component-definition": [
            "error",
            { namedComponents: "arrow-function" },
        ],
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
        "react/jsx-props-no-spreading": "off",
        "no-underscore-dangle": "off",
    },
};
