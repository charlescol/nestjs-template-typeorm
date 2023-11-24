import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import AppService from "./app.service";

@Controller()
export default class AppController {
  constructor(private readonly service: AppService) {}

  @ApiOperation({ summary: "Create a 'Hello World' greeting message." })
  @ApiResponse({
    status: 200,
    description: "Successfully generated 'Hello World' message",
  })
  @ApiResponse({
    status: 200,
    description: "Did not validate the provided name",
  })
  @HttpCode(200)
  @Get("hello")
  getHello(@Query("name") name?: string): string {
    return this.service.getHello(name);
  }
}
