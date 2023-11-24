import { BadRequestException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";

@Injectable()
export default class AppService {
  /**
   * Generates a 'Hello World' greeting.
   *
   * This function returns a greeting message that includes a provided name.
   * It validates the name against a regular expression to ensure it contains
   * only valid characters (letters, apostrophes, hyphens, and spaces). If the
   * name is invalid or not provided, it throws a BadRequestException.
   *
   * @author Charles COLELLA
   * @date 23/11/2023
   * @param {string} [name] - Optional name to be included in the greeting.
   * @return {string} Greeting message. Throws BadRequestException for invalid or missing name.
   * @memberof AppService
   */
  getHello(name?: string): string {
    const nameRegex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
    if (!name || !nameRegex.test(name))
      throw new BadRequestException("Invalid name");

    return `Hello World ${name}!`;
  }
}
