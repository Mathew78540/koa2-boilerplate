/**
 * Link to the app(s)
 */
export const appConf = {
  apiPort: process.env.API_PORT || 8080,
  jsonWebToken: process.env.JSON_WEB_TOKEN || 'jsonwebtoken',
};

/**
 * Link to mongo
 */
export const mongoConf = {
  host: process.env.DB_MONGO_HOST || '127.0.0.1',
  port: process.env.DB_MONGO_PORT || 27017,
  name: process.env.DB_MONGO_DB_NAME || `seekube-${process.env.NODE_ENV}`,
  user: process.env.DB_MONGO_USER || null,
  pass: process.env.DB_MONGO_PASS || null,
  options: process.env.DB_MONGO_OPTIONS || '',
};

/**
 * Cors
 */
export const corsConf = {
  origin: true,
};

export default {
  appConf,
  mongoConf,
  corsConf,
};
