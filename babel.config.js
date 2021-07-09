module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@controllers': './src/controllers',
        '@database': './src/database',
        '@routes': './src/routes',
        '@views': './src/views',
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
