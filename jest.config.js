module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js', "jest-allure/dist/setup"],
    moduleNameMapper: { "\\.(css|less)$": "<rootDir>/styleMock.js", "^.+\\.svg$": "<rootDir>/svgTransform.js" },
    reporters: [
        "default",
        "jest-allure"
    ],
    testRunner: 'jest-jasmine2',
    //maxWorkers: '50%',
};              