import { NestFastifyApplication } from "@nestjs/platform-fastify";
// eslint-disable-next-line import/no-extraneous-dependencies
import { TestingModule } from "@nestjs/testing";

export type E2eApp = {
  app: NestFastifyApplication;
  appModule: TestingModule;
  versionManagerQueueMock?: jest.SpyInstance;
};

export type MockQueue = {
  add: jest.Mock<any, any>;
  process: jest.Mock<any, any>;
  close: jest.Mock<any, any>;
  getJobs: jest.Mock<any, any>;
};
