/* eslint-disable no-console */
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import JestService from "@providers/jest/jest.service";

/**
 * Suite of tests for the User Controller.
 */
describe("AppController E2E Tests", () => {
  let app: NestFastifyApplication;

  /* Set up the application before running any tests */
  beforeAll(async () => {
    try {
      const appContext = await JestService.getE2EApp();
      app = appContext.app;
    } catch (error) {
      console.error("Error during test setup:", error);
      /* Rethrow to prevent further tests from running */
      throw error;
    }
  });

  /* Group tests for the /GET /api/hello endpoint */
  describe("/GET /api/hello", () => {
    /* Utility function to test the hello endpoint */
    async function verifyHello(
      name: string,
      expectedStatus: number
    ): Promise<void> {
      try {
        const response = await app.inject({
          method: "GET",
          url: `/api/hello?name=${name}`,
        });

        expect(response.statusCode).toBe(expectedStatus);
      } catch (error) {
        console.error(`Error testing /api/hello with name=${name}:`, error);
        throw error;
      }
    }

    /* Test case: Valid name should return status 200 */
    it("Should say hello", async () => {
      await verifyHello("John", 200);
    });

    /* Test case: Invalid name should return status 400 */
    it("Should not say hello", async () => {
      await verifyHello("John123", 400);
    });
  });

  /* Clean up after all tests have run */
  afterAll(async () => {
    await JestService.closeApp(app);
  });
});
