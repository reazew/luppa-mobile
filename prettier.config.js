module.exports = {
  printWidth: 150,
  tabWidth: 2,
  bracketSameLine: true,
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
  endOfLine: 'auto',

  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  tailwindAttributes: ['className'],
}
