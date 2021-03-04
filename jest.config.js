// jest.config.js
module.exports = {
    verbose: true,
    preset: 'ts-jest',
    moduleFileExtensions: ["js", "jsx", "json", "vue"],
    transform: {
        "^.+\\.vue$": "vue-jest",
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
            "jest-transform-stub",
        "^.+\\.(js|jsx)?$": "babel-jest",
        '^.+\\.ts?$': 'ts-jest',
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    testRegex: './resources/js/__tests__/.*.spec.ts$',
    transformIgnorePatterns: [
        "/node_modules/(?!MODULE_NAME_HERE).+\\.js$"
    ]
};
