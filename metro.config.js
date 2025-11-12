// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Force jose to use browser version
  if (moduleName.startsWith('jose')) {
    const browserPath = moduleName.replace(
      /^jose/,
      'jose/dist/browser'
    );
    return context.resolveRequest(context, browserPath, platform);
  }

  // Default resolution
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;