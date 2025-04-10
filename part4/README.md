# Part 4

This part explores topics like structure of backend application, testing, user administration and token-based authentication.

Exercises 4.1-4.23 done.

## SETUP

1. Go to the project root (where this README.md is located).
2. Run `npm install` to install required dependencies.
3. Create an .env file, and add `PORT`, `MONGODB_URI`, `JWT_SECRET_KEY` key-value pairs.

## USAGE

- `npm start`: start the server in production mode.
- `npm run dev`: start the server in development mode.
- `npm run test -- --test-concurrency=1`: run all tests in the tests directory.
- `npm run test -- tests/{test_file_name}`: run all tests in a specific test file.
- `npm run test -- --test-name-pattern="{pattern}"`: run all tests whose description includes the pattern.
