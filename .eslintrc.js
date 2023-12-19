module.exports = {
    'extends': ['next/core-web-vitals', 'eslint:recommended'],
    'rules': {
        'quotes': ['error', 'single'],
        // we want to force semicolons
        'semi': ['error', 'always'],
        // we use 4 spaces to indent our code
        'indent': ['error', 4],
        // we want to avoid extraneous spaces
        'no-multi-spaces': ['error']
    },
    'env': {
        'jest': true
    }
};
