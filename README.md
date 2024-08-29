# NestJS Template

This project is a template for NestJS, tailored for integration with Postgres and a Bitbucket pipeline. It offers a robust starting point and includes fundamental unit tests and end-to-end tests, exemplified through a simple "Hello World" function located in the main application module.

## Dependencies Overview

- **TypeScript** (`5.3.2`): JavaScript superset with static typing.
- **ESLint** (`8.19.0`)/**Prettier** (`2.7.1`): Tools for JavaScript code linting and formatting.
- **Fastify** (`10.2.10`): Web framework for Node.js, emphasizing performance.
- **Swagger** (`7.1.16`): Tools for designing, documenting, and consuming REST APIs.
- **TypeORM** (`0.3.17`): ORM for TypeScript and JavaScript, supporting various SQL databases.
- **Jest** (`28.1.2`): JavaScript testing framework.
- **Joi** (`17.11.0`): Schema description language and data validator for JavaScript.

## Important Considerations

This project is primarily configured for PostgreSQL as the database system and Heroku. Please note:

- **PostgreSQL Dependency**: The project is set up with PostgreSQL integration. Switching to another database system will require reconfiguration of the database connection settings and potentially the data access layer.

- **Heroku Deployment**: Deployment scripts and configurations are tailored for Heroku. If deploying to a different platform, you'll need to modify these deployment settings, including any related environment variables or container registry settings.

### Customizing for Other Technologies
If you plan to use different technologies than PostgreSQL or Heroku, additional configuration steps are essential. This includes updating database configurations, deployment scripts, and other relevant settings to ensure compatibility with your chosen technology stack.


## Key Commands

This project utilizes several `yarn` scripts for efficient development, testing, and deployment:

- `yarn build`: Compiles the application using Nest's build command. This is essential for preparing the application for production deployment.
- `yarn start:dev`: Launches the application in development mode with live reloading, useful for immediate feedback during development.
- `yarn start:prod`: Starts the application in production mode, using the compiled files from the `dist` directory.
- `yarn lint`: Executes ESLint to identify and fix problems in your JavaScript code, promoting code quality and consistency.
- `yarn test`: Runs the Jest test suite, a crucial step for ensuring application functionality.
- `yarn typeorm`: Facilitates TypeORM related operations, key for database entity and migration management.
- `yarn typeorm migration:run`: Executes TypeORM migrations, applying necessary changes to your database schema.

### Recommendations for Testing

It's advisable to establish a secondary database dedicated to testing purposes and to create an `.env.test` file. This approach ensures isolation and consistency during the testing phase. Alternatively, if setting up a separate testing database isn't feasible, consider utilizing the command `yarn run test:container`. This command replicates the infrastructure and conducts tests in an isolated environment, mimicking production conditions closely and ensuring the reliability of your tests.

## Environment Variable Management

The project uses environment variables for configuration, stored in the `/env` folder. Follow these guidelines for setting up and maintaining these variables:

- **.env.local**: For development settings.
- **.env.test**: Configurations for the testing environment.
- **.env.prod**: Environment variables for production.
- **.env.staging**: Settings for the staging environment.

Base your configuration on the `.env.example` provided. Ensure any changes to environment variables are accompanied by corresponding updates in the Joi validation schema within the `config` folder. This step is crucial for maintaining application configuration integrity.

## Project Structure

The organization of the project's source code directories is defined as below:

- `src/configs/*` : This directory contains all the configuration files related to the project. It includes configurations for the database, tests, and various environment files. 
- `src/models/*` : This directory is dedicated to model entities. It defines the data models that the application interacts with, reflecting the structure and relationships of the data used within the project.
- `src/common/*`: Here, you will find common shared files and modules. These are utility files and modules that are used across different parts of the application, providing a centralized location for code that is used frequently throughout the project.
- `src/common/providers/*` : This directory contains files and code related to external providers. It includes integrations and modules for interacting with external services and APIs.
- `test/*`: This directory is set up for configuring and recreating the test environment by the pipeline.


## Pipeline Configuration Overview

The pipeline, configured for Bitbucket CI/CD, automates various stages for the application:

### Defined Pipeline Steps

1. **Start Pipeline**: 
   - Initiates the pipeline, indicating the start on the specific branch.
2. **Execute Tests**: 
   - Sets up Docker Compose and executes tests, including building the test environment and handling test artifacts.
3. **Analyze Repository**: 
   - Installs project dependencies, performs code linting, and conducts security checks.
4. **Compress and Deploy to Heroku Dynos**: 
   - Handles the application build for production and deploys the compressed application to Heroku.
5. **Compress and Deploy to Heroku Container Registry** (Alternative Deployment):
   - Prepares and deploys the application to Heroku as a Docker container.

### Branch-Specific Pipelines
- Customized pipeline configurations for `dev`, `staging`, and `master` branches, each tailored for specific testing and deployment processes.


## Todo
- **Use Heroku Container for Caching in the Pipeline Testing Step**
- **Use BuildKit by adding export PATH=/usr/bin:$PATH in the Pipeline Testing Step**
- **Add Slack Notification for Pipeline Steps**
- **Review and Validate ESLint Rules**


