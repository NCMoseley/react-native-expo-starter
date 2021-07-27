module.exports = {
    preset: "jest-expo",
    moduleDirectories: [
        "node_modules",
        "src"
    ],
    transform: {
      "^.+\\.ts?$": "ts-jest",
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.js$": "./node_modules/react-native/jest/preprocessor.js"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test))\\.(jsx?|tsx?)?$",
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
        "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)"
    ],
    moduleNameMapper: {
      "^.+\\.(css|less|scss)$": "identity-obj-proxy"
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "src/components/*.{js,jsx}",
        "!src/components/SideBar.js",
        "!**/setupTests.js",
        "!**/**/*.test.js"
    ],
    coverageDirectory: "coverage",
};
