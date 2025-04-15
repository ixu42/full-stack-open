# Part 5

In this part the focus is on frontend:
- token-based authentication;
- use of props.children to render nested components and type checking in React components using PropTypes;
- unit tests validating correct functioning of individual components, using Vitest;
- end to end testing with PlayWright to test the system as a whole.

Exercises 5.1-5.23 done.

## UNIT TESTS

1. Navigate to /part5/bloglist-frontend
2. `npm test` to run tests located in /srcs/components

## E2E TESTS

1. Run backend server in /part4 with `npm run start:test`
2. Run frontend server in /part5/bloglist-frontend with `npm run dev`
3. Run e2e tests in /part5/blogs-e2e with `npm test -- --project chromium` (if running a selected project)

Before running the servers, if packages not previously installed, first run `npm install`.