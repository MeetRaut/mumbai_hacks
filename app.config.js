import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiBaseUrl: process.env.API_BASE_URL,
      apiBaseUrl2: process.env.API_BASE_URL2,
    },
  };
};