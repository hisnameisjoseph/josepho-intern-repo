# Using Interceptors & Middleware in NestJS #36
## Tasks
### Research the difference between interceptors and middleware in NestJS
#### Middleware
Client-side HTTP requests -> Middleware -> Controller -> Response
*Official Docs: [Middleware](https://docs.nestjs.com/middleware)*
- Used to modify the request object, response object, or end the request-response cycle.
- Middleware can be applied globally or to specific routes.
#### Interceptors
Client-side HTTP requests -> Middleware -> Interceptors -> Controller -> Interceptor -> Response
*Official Docs: [Interceptors](https://docs.nestjs.com/interceptors)*
- Interceptors use the RxJS streams to transform the request and response data.
- They can be used for logging, transforming responses, extending basic method behavior, and more.

- Simplified flow:
    ```plaintext
    Client Request →
    Middleware →
        Guards →
        Interceptors →
            Pipes →
            Controller (Route Handler) →
            Interceptors (after controller logic) →
        Exception Filters →
    Response
    ```
### Explore built-in interceptors like ClassSerializerInterceptor
From my understanding, the `ClassSerializerInterceptor` is used to automatically serialize class instances to plain objects, applying transformation rules defined in the class decorators like `@Expose()`, `@Exclude()`, etc. This is useful for controlling what data is sent in the response.
- Here, we learned that `@Exclude()` decorator is from the `class-transformer` package, which is used to exclude properties from the serialized output. When it used with `ClassSerializerInterceptor`, it ensures that only the properties marked with `@Expose()` are included in the response. `@Exclude()` is useful for hiding sensitive information or properties that should not be exposed in the API response.

If `@Exclude()` is on password, it means that:
- password still exists in the database and memory.
- But when the entity is returned as a response, it will not be serialized (i.e., excluded from the JSON output).
### Implement a simple logging interceptor to log request and response data
- So for this task, I created a logging interceptor that logs the method and path of incoming requests, as well as the duration of the request processing. This is useful for debugging and monitoring the performance of your application.
> *you can find the code in the `src/interceptors` directory of the project.*

- After creating the interceptor, I applied it in the Controller-level (`user.controller.ts`) using the `@UseInterceptors()` decorator. This allows the interceptor to be applied only to specific routes or controllers, providing flexibility in how you want to handle logging across your application.

As the result, we tested the interceptor by making a curl request to the `/users` endpoint, and it logged the method, path, and duration of the request processing in the console.


When I was testing the interceptor, I encountered an issue where the NestJS server was not responding to the curl request. After some investigation, I spent a few hours debugging the issue, at the end I used Copilot to help me identify the problem.

#### Here is a summary of what Copillot found and fixed:

Looking at what happened, here's the sequence of events and why your curl initially didn't work:

##### **What went wrong initially:**

1. **TypeScript Compilation Errors:**
   - Your NestJS container kept crashing due to TypeScript strict property initialization errors
   - The container would start but immediately exit because of compilation failures
   - This meant your API server wasn't actually running, even though Docker showed the container as "created"

2. **Port Confusion:**
   - You were using `curl http://localhost:3001/user` which was correct
   - But the API server wasn't running due to the TypeScript errors

3. **Container Status Misleading:**
   - `docker ps` might show containers as "running" briefly, but they were actually crashing and restarting
   - The logs would show the TypeScript compilation errors

#### **What I fixed:**

1. **Fixed TypeScript Configuration:**
   ```typescript
   // Added to tsconfig.json
   "strictPropertyInitialization": false
   ```
   This stopped TypeScript from complaining about uninitialized properties in your User entity.

2. **Rebuilt the Container:**
   ```sh
   docker-compose down
   docker-compose up --build -d
   ```
   This ensured the new TypeScript config was applied.

3. **Verified Data Source and Entities:**
   - Made sure all imports were pointing to the correct User entity
   - Ensured TypeORM configuration was correct

##### **Why it works now:**

- ✅ TypeScript compiles successfully
- ✅ NestJS server starts and stays running
- ✅ Database connection works
- ✅ Seed data is properly inserted
- ✅ API endpoints respond correctly at `localhost:3001`

**The key issue was that your API server wasn't actually running due to compilation errors, not a problem with the curl command or port configuration.**

### Create a middleware function and apply it globally or to specific routes

## Reflection
### What is the difference between an interceptor and middleware in NestJS?
### When would you use an interceptor instead of middleware?
### How does LoggerErrorInterceptor help?