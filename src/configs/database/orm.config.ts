import { ConfigModule } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import * as path from "path";
import postgresConfig from "./postgres.config";

ConfigModule.forRoot({
  isGlobal: true,
  load: [postgresConfig],
  envFilePath: path.resolve(
    process.cwd(),
    "env",
    `.env.${process.env.NODE_ENV || "local"}`
  ),
});

const PostgresDataSource = new DataSource(
  postgresConfig() as DataSourceOptions
);

export default PostgresDataSource;
