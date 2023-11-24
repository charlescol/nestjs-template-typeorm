import { registerAs } from "@nestjs/config";
import { join } from "path";

export default registerAs("database", () => ({
  name: "default",
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_ENABLE_SSL === "true"
      ? {
          rejectUnauthorized: false,
        }
      : false,
  logging: process.env.DATABASE_ENABLE_LOGGING === "true",
  entities: [join(__dirname, "../../models/*/", "*.entity.{ts,js}")],
  migrations: [join(__dirname, "migrations/*.ts")],
  migrationsTableName: "migrations",

  autoLoadEntities: true,
  synchronize: false,
  migrationsRun: false,
}));
