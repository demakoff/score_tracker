/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    moduleNameMapper: {
        // if your using tsconfig.paths thers is no harm in telling jest
        '@/(.*)$': '<rootDir>/$1',
    },
    // to obtain access to the matchers.
    setupFilesAfterEnv: ['./tests/setupTests.ts'],

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    modulePaths: ['<rootDir>'],
    testEnvironment: 'jsdom',
    transform: {
        // This is necessary because next.js forces { "jsx": "preserve" }, but
        // ts-jest appears to require { "jsx": "react-jsx" }
        '^.+\\.[jt]sx?$': [
            'ts-jest',
            {
                tsconfig: {
                    jsx: 'react-jsx',
                },
            },
        ],
    },
};