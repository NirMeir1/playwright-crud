# Playwright CRUD Automation Framework

This project is an automation framework for testing CRUD (Create, Read, Update, Delete) operations using Playwright with TypeScript.

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd playwright-crud-main
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables in the `.env` file. The default configuration uses a local PostgreSQL database:
    - **DATABASE_URL**: `postgresql://postgres:my_database_pass@localhost:5432/pgexercises?options=-c%20search_path=cd`


## Project Structure

- **`config/`**: Configuration files.
- **`repositories/`**: Database interaction logic.
  - `memberRepository.ts`: Handles member-related CRUD operations.
- **`services/`**: Business logic for managing entities.
  - `memberService.ts`: Handles business logic related to member CRUD operations.
- **`utils/`**: Helper utilities.
  - `dbClient.ts`: Manages database connections.
  - `logger.ts`: Logger utility for tracking events.
  - `testDataFactory.ts`: Generates test data for operations.
- **`tests/`**: Playwright test scripts.
  - `dbTests.spec.ts`: Contains tests for database operations.
- **`test-results/`**: Stores test run results.
  - `.last-run.json`: Tracks the last test execution status.
- **`node_modules/`**: Installed project dependencies.


**Design Patterns Used:**

**Repository Pattern**: Used in repositories/memberRepository.ts to abstract the database interaction layer, allowing for easy maintenance and testing.

**Service Pattern**: Used in services/memberService.ts to encapsulate business logic, making the code more modular and easier to test.

**Singleton Pattern**: Used in dbClient.ts to ensure a single instance of the database connection is used throughout the application.

**Factory Pattern**: Used in testDataFactory.ts to generate test data, allowing for easy creation of various types of test data.


## Running Tests

To run all tests:
```bash
npm test
