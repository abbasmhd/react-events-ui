module.exports = {
    eslint: {
      // Warning: Dangerously allow production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    env: {
      API_URL: 'https://localhost:44397',
      API_PAGESIZE: 250,
    },
  }