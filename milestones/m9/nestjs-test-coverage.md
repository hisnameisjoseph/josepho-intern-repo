# Understanding the Focus Bear Coverage Bar & Writing Meaningful Tests (#16)

## ✅ Tasks

### Research how Jest generates test coverage reports in NestJS
I found that Jest generates test coverage reports by instrumenting the code and tracking which lines are executed during testing. Like using the command lines `jest --coverage` or `npm test -- --coverage`. I found this tutorial helpful for setting up NestJS Jest: [Jest testing: A complete tutorial](https://www.testim.io/blog/jest-testing-a-helpful-introductory-tutorial/)

### Run the test suite and view the test coverage report
This is the test coverage report for my m9-demo
```bash
(base) hisnameisjoseph@dyn-118-139-59-138 m9-demo % npm run test:cov

> m9-demo@0.0.1 test:cov
> jest --coverage

 PASS  src/math/math.service.spec.ts
 PASS  src/app.controller.spec.ts
--------------------|---------|----------|---------|---------|-------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------|---------|----------|---------|---------|-------------------
All files           |   48.64 |        0 |   66.66 |   44.44 |                   
 src                |      52 |        0 |      75 |   47.36 |                   
  app.controller.ts |     100 |      100 |     100 |     100 |                   
  app.module.ts     |       0 |      100 |     100 |       0 | 1-11              
  app.service.ts    |     100 |      100 |     100 |     100 |                   
  main.ts           |       0 |        0 |       0 |       0 | 1-8               
 src/math           |      50 |      100 |     100 |      50 |                   
  math.module.ts    |       0 |      100 |     100 |       0 | 1-7               
  math.service.ts   |     100 |      100 |     100 |     100 |                   
 src/utils          |       0 |      100 |       0 |       0 |                   
  add.ts            |       0 |      100 |       0 |       0 | 1-2               
--------------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        4.097 s
Ran all test suites.
```
As you can see, all tests have been passed successfully.
### Identify untested areas and write additional tests to improve coverage
As I added a function called subtract in math.service.ts, I need to write tests for it in math.service.spec.ts.

```ts
    sub(a: number, b: number): number {
        return a - b;
    }
```
Here is my implementation for the test, written in math.service.spec.ts:
```ts
it('should subtract two numbers', () => {
    expect(service.sub(5, 3)).toBe(2);
    expect(service.sub(-1, -1)).toBe(0);
  });
```

### Research the concept of "meaningful test assertions" and why high coverage can sometimes be misleading

### Refactor a weak test to ensure it has proper assertions

## ✅ Reflection (nestjs-test-coverage.md)
### What does the coverage bar track, and why is it important?
### Why does Focus Bear enforce a minimum test coverage threshold?
### How can high test coverage still lead to untested functionality?
### What are examples of weak vs. strong test assertions?
### How can you balance increasing coverage with writing effective tests?
