module.exports = {
  presets: ['babel-preset-gatsby'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          components: './src/components',
          context: './src/context',
          utils: './src/utils',

          config: './config',
        },
      },
    ],
  ],
};
