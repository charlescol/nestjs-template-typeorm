import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import AppService from "./app.service";

@Controller({ version: "1" })
export default class AppController {
  constructor(private readonly service: AppService) {}

  @HttpCode(200)
  @Get("hello")
  getHello(@Query("name") name?: string): string {
    return this.service.getHello(name);
  }
}
