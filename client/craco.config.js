module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const isEnvDevelopment = env === 'development';

      // Remove all existing babel-loader rules
      webpackConfig.module.rules = webpackConfig.module.rules.filter(rule => {
        if (Array.isArray(rule.oneOf)) {
          rule.oneOf = rule.oneOf.filter(oneOfRule => {
            return !(oneOfRule.loader && oneOfRule.loader.includes('babel-loader'));
          });
          return rule.oneOf.length > 0; // Keep the oneOf rule if it still has other loaders
        }
        return true;
      });

      // Add our custom babel-loader rule
      webpackConfig.module.rules.push({
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            require.resolve('@babel/preset-react'),
            require.resolve('@babel/preset-typescript'),
          ],
          // No react-refresh/babel plugin here
          cacheDirectory: true,
          cacheCompression: false,
          compact: !isEnvDevelopment,
        },
      });

      // Remove ReactRefreshWebpackPlugin from webpackConfig.plugins
      webpackConfig.plugins = webpackConfig.plugins.filter(
        (plugin) =>
          !(plugin.constructor && plugin.constructor.name === 'ReactRefreshWebpackPlugin')
      );

      console.log('Modified webpackConfig:', JSON.stringify(webpackConfig, null, 2));
      return webpackConfig;
    },
  },
};