import { join } from "path";
import { config } from "dotenv";
import CustomNamingStrategy from "./customNamingStrategy";
import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

config();

export default registerAs(
  "database",
  () =>
    ({
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
      synchronize: true,
      migrationsRun: false,
      namingStrategy: new CustomNamingStrategy(),
      cli: {
        migrationsDir: join(__dirname, "/migrations"),
      },
      keepConnectionAlive: true,
    } as TypeOrmModuleOptions)
);
