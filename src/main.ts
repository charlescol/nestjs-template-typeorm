import { NestFactory } from "@nestjs/core";
import AppModule from "./app.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common/pipes";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: 50048576 })
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix("api");

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Project")
    .setDescription("Project API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  if (process.env.DISABLE_SWAGGER !== "true") {
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("swagger", app, document);
  }

  if (process.env.DISABLE_APP_ADDRESS_LISTENING === "true") {
    await app.listen(3000);
  } else {
    await app.listen(3000, process.env.HOSTNAME || "");
  }
}

bootstrap();
