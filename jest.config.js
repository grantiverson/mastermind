module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.js",
        "!src/**/index.js",
        "!src/**/*.stories.js",
    ],
    coverageThreshold: {
        global: {
            statements: 59.68,
            branches: 68,
            lines: 62.39,
            functions: 56.81,
        },
    },
    moduleNameMapper: {
        "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
    },
    setupFilesAfterEnv: ["<rootDir>jest-setup.js"],
    testEnvironment: "jsdom",
};
