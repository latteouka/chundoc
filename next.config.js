const withNextra = require("nextra")({
  latex: true,
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});

module.exports = withNextra();
