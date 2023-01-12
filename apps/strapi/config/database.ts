export default ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "strapi_cloud"),
      user: env("DATABASE_USERNAME", "strapi_cloud"),
      password: env("DATABASE_PASSWORD", "strapi_cloud"),
      ssl: env.bool("DATABASE_SSL", false),
    },
  },
});
