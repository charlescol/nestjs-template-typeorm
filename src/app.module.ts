import { ConfigModule, ConfigService } from "@nestjs/config";
import AppService from "./app.service";
import AppController from "./app.controller";
import * as path from "path";
import { Module } from "@nestjs/common/decorators";
import { TypeOrmModule } from "@nestjs/typeorm";
import globalConfig from "@configs/global.config";
import postgresConfig from "@configs/database/postgres.config";

const ENV = process.env.NODE_ENV || "local";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [globalConfig, postgresConfig],
      envFilePath: path.resolve(process.cwd(), "env", `.env.${ENV}`),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get("database"),
      }),
    }),
  ],
})
export default class AppModule {}
