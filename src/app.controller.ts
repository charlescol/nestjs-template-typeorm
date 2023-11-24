import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Query,
} from "@nestjs/common";
import AppService from "./app.service";

@Controller()
export default class AppController {
  constructor(private readonly service: AppService) {}

  @ApiOperation({
    summary: "Create a 'Hello World' greeting message.",
    description:
      "Generates a greeting message. If a valid name is provided, it returns 'Hello World [name]!'. If the name is invalid, it throws a BadRequestException.",
  })
  @ApiResponse({
    status: 200,
    description:
      "Successfully generated 'Hello World' message with the provided valid name.",
    type: String,
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request: The provided name did not pass validation.",
    type: BadRequestException,
  })
  @ApiQuery({
    name: "name",
    required: false,
    description:
      "The name to be included in the greeting message. Should be a valid string without special characters.",
    type: String,
  })
  @HttpCode(200)
  @Get("hello")
  getHello(@Query("name") name?: string): string {
    return this.service.getHello(name);
  }
}
