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
};