import { join } from "path";
import { config } from "dotenv";
import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import CustomNamingStrategy from "./customNamingStrategy";

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
      synchronize: false,
      migrationsRun: false,
      namingStrategy: new CustomNamingStrategy(),
      cli: {
        migrationsDir: join(__dirname, "/migrations"),
      },
      keepConnectionAlive: true,
    } as TypeOrmModuleOptions)
);
