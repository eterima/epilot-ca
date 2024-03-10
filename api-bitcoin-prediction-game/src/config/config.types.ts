export type AppConfig = {
  NODE_ENV: string;
  ENV_NAME: 'local' | 'testing' | 'staging' | 'production' | 'elysium';

  // Database
  MONGO_DB_USERNAME: string;
  MONGO_DB_PASSWORD: string;

  // JWT
  JWT_SECRET: string;
};
