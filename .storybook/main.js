module.exports = {
    addons: [
        "@storybook/addon-essentials",
        {
            name: "@storybook/addon-styling",
            options: {
                sass: {
                    // Require your Sass preprocessor here
                    implementation: require("sass"),
                },
            },
        },
    ],
    core: {
        builder: "@storybook/builder-webpack5",
    },
    framework: "@storybook/react",
    stories: ["../src/**/*.stories.js"],
};
