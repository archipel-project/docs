/** @type{import('nextra').NextraConfig} */
const config = {
  theme: './src/theme/index.tsx',
  themeConfig: './theme.config.tsx',
  staticImage: true
}

const withNextra = require('nextra')(config)

module.exports = withNextra()