import { ConfigModule } from "@nestjs/config";
import postgresConfig from "./postgres.config";

ConfigModule.forRoot({
  isGlobal: true,
  load: [postgresConfig],
});

export default postgresConfig();
