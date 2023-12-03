/* eslint-disable no-console */
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import JestService from "@providers/jest/jest.service";
import AppService from "@src/app.service";

/**
 * Suite of tests for the User Controller.
 */
describe("AppService Test", () => {
  let app: NestFastifyApplication;
  let service: AppService;

  /* Set up the application before running any tests */
  beforeAll(async () => {
    try {
      const appContext = await JestService.getE2EApp();
      app = appContext.app;
      service = app.get<AppService>(AppService);
    } catch (error) {
      console.error("Error during test setup:", error);
      /* Rethrow to prevent further tests from running */
      throw error;
    }
  });

  /* Group tests for the getHello method */
  describe("getHello", () => {
    /* Test case: Valid name should return a greeting message */
    it("Should say hello", async () => {
      expect(service.getHello("John")).toBe(`Hello World John!`);
    });

    /* Test case: Invalid name should throw an error */
    it("Should not say hello", async () => {
      expect(() => service.getHello("John123")).toThrowError();
    });
  });

  /* Clean up after all tests have run */
  afterAll(async () => {
    await JestService.closeApp(app);
  });
});
