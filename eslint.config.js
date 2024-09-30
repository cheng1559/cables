import antfu from '@antfu/eslint-config';

export default antfu({
    stylistic: {
        indent: 4,
        quotes: 'single',
    },
    svelte: true,
    typescript: true,
    rules: {
        'style/semi': 0,
        'unused-imports/no-unused-vars': ['error', {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
        }],
        'no-console': 'off',
    },
});
