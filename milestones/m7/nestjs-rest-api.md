# Creating REST API with NestJS

## Tasks
### Research how REST APIs are structured in NestJS
Useful resources: [NestJs Course for Beginners - Create a REST API](https://youtu.be/GHTA143_b-s?si=f3Ito2kc6BgXofC7)

#### Step 1: Create a new NestJS project
Use CLI in Terminal to create a new NestJS project in milestones/m7 directory:
```bash
npm i -g @nestjs/cli
nest new nestjs-rest-api
cd nestjs-rest-api
```
#### Step 2: Create a Module
By following the course, first, we created a Module (`Auth`):
```bash
(base) hisnameisjoseph@Mac josepho-intern-repo % cd milestones/m7/nestjs-rest-api
(base) hisnameisjoseph@Mac nestjs-rest-api % nest g module auth
CREATE auth/auth.module.ts (81 bytes)
(base) hisnameisjoseph@Mac nestjs-rest-api % nest g controller auth --no-spec
CREATE auth/auth.controller.ts (97 bytes)
UPDATE auth/auth.module.ts (166 bytes)
(base) hisnameisjoseph@Mac nestjs-rest-api % nest g service auth --no-spec
CREATE auth/auth.service.ts (88 bytes)
UPDATE auth/auth.module.ts (240 bytes)
```
in our `nestjs-rest-api` directory. This module contains a controller and a service.

### Create a controller with basic CRUD routes (or Create, Read, Update, Delete - GET, POST, PUT, DELETE)
*Here, I noticed that later the tasks in this issue required us creating a controller with basic CRUD routes, so I created another controller and service in the `nestjs-rest-api` directory, by using:*
```bash
nest g resource posts --no-spec
✔ What transport layer do you use? REST API
✔ Would you like to generate CRUD entry points? Yes
...
✔ Packages installed successfully.
```
This command generates a new resource with a controller and service for handling posts. From my understanding, this command is a shorthand for creating a module, controller and service with CRUD operations (which includes the necessary DTOs and entities).


### Use a service to handle business logic
In the generated `posts.service.ts`, I can see that it has methods for creating, finding, updating, and deleting posts. The service is where the business logic resides, separate from the controller.
I added a simple in-memory array to store posts and implemented the `create` (POST), `findAll` (GET), `findOne` (GET), `update` (PATCH), and `remove` (DELETE) methods to manage posts:
```typescript
// Same as the generated code, but with a simple in-memory array
import { Post } from './entities/post.entity';

// everything else is the same
@Injectable()
export class PostsService {
  private posts: Post[] = []; // Temporary in-memory DB

  create(createPostDto: CreatePostDto) {
    const post = { id: Date.now(), ...createPostDto };
    this.posts.push(post);
    return post;
  }

  // Keep the rest of the methods from the simplified version
  // but use the DTO types from the generated version
}
```
We also edited the `create-post.dto.ts` to include validation using class-validator:
```typescript
export class CreatePostDto {}
```
to this:
```typescript
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;
}
```
And adding the `ValidationPipe` in the `main.ts` file to enable validation globally:
```typescript
import { ValidationPipe } from '@nestjs/common';
// other imports

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());  // Enable validation
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```
*Here I make sure to install the necessary packages for validation:*
```bash
npm install class-validator class-transformer
```
### Test the endpoints using a tool like Postman or cURL
#### For `auth` module:
I test the endpoints using Postman by using the POST request to `http://localhost:3000/auth/signup` with the following JSON body:
```json
{ "email": "test@test.com", "password": "123" }
```
And the response I got was: 
```json
{
    "msg": "User created!",
    "user": {
        "email": "test@test.com",
        "password": "123"
    }
}
```
Similarly, when I tested the signin endpoint with the same body, I got:
```json
{
    "msg": "Logged in!",
    "user": {
        "email": "test@test.com",
        "password": "123"
    }
}
```
#### For `posts` module:

##### POST
I tested the `create` endpoint using CURL:
```bash
curl -X POST http://localhost:3000/posts \
> -H "Content-Type: application/json" \
> -d '{"title": "My First Post", "content": "Hello World!"}'
```
*here the id is a timestamp, which is used as a unique identifier for the post.*
And the response I got was:
```json
{"id":1751435278676,"title":"My First Post","content":"Hello World!"}
```
##### POST with validation error
I also tried posting that triggers a validation error, by sending an short title:
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "Hi"}'
```
And the response I got was:
```json
{"message":["content must be a string"],"error":"Bad Request","statusCode":400}
```
##### GET
I also tested the `findAll` endpoint using CURL after adding another post:
```bash
curl -X GET http://localhost:3000/posts
```
And the response I got was:
```json
[{"id":1751438056125,"title":"My First Post","content":"Hello World"},{"id":1751438105445,"title":"My Second Post","content":"Bye World"}]
```
##### PUT (Update)
I tested the `update` endpoint using CURL:
```bash
curl -X PATCH http://localhost:3000/posts/1751438056125 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title", "content": "New content for id: 1751438056125"}'
```
And the response I got was:
```json
{"id":1751438056125,"title":"Updated Title","content":"New content for id: 1751438056125"}
```
##### DELETE
Using CURL to test the `remove` endpoint:
```bash
(base) hisnameisjoseph@Mac nestjs-rest-api % curl -X DELETE http://localhost:3000/posts/1751438056125
```
And the response I got was:
```json
This action removes a #1751438056125 post
```

## Reflection
### What is the role of a controller in NestJS?
From my understanding, Controllers in NestJS are the entry points for handling incoming (HTTP) requests. In this issue, I implemented controllers called `auth` and `posts` to handle user authentication and post management, respectively. Each controller **defines routes** that map to specific HTTP methods (GET, POST, etc.) and delegates the actual business logic to services. Controllers aren't the ones that handle the logic; they just route the requests to the appropriate service methods. The ones that handle the logic are the services (`auth.service.ts` and `posts.service.ts` in my case).

### How should business logic be separated from the controller?
As I mentioned above, business logic should live in **services**. 
In my `nestjs-rest-api` project:
- **Controllers** (`auth.controller.ts` and `posts.controller.ts`) 
  - Handle incoming requests (parse request bodies, query parameters, etc.)
  - Route them (call them like `this.authService.signup(...)`) to the appropriate service methods.
  - Return responses to the client.
- **Services** (`auth.service.ts` and `posts.service.ts`) contain the actual business logic and interact with the database (in this case, a simple in-memory array) or other external APIs.
  - Data validation using DTOs (Data Transfer Objects) is also handled in the service layer, often with the help of validation pipes.
  - Like in my `posts.service.ts`, I implemented methods like `create`, `findAll`, `findOne`, `update`, and `remove` to manage posts and use in-memory array operations to simulate database interactions.
  - If connecting to a real database, services would typically use repositories or ORM (Object-Relational Mapping) libraries to perform CRUD operations.

### Why is it important to use services instead of handling logic inside controllers?
- **Separation of Concerns**: Services allow you to separate the business logic from the request handling logic (modular, testable). Especially when working with complex applications, it helps developers easily identify and navigate the different parts of the application.
- **Reusability**: By placing business logic in services, you can reuse that logic across different controllers or even different parts of your application without duplicating code - i.e., multiple controllers can use the same service.
- **Maintainability**: If I need to change the business logic (in this case, maybe switching from an in-memory array to a real database), you only have to do it in one place (the service), rather than in every controller that uses that logic.

### How does NestJS automatically map request methods (GET, POST, etc.) to handlers?
Use decorators like `@Get()`, `@Post()`, `@Put()` (or `@Patch()`), and `@Delete()` in the controller to define the HTTP method for each route. It can automatically map incoming requests to the appropriate handler methods in the controller.
E.g. when I use curl to send a POST request to `http://localhost:3000/posts`, NestJS looks for a method in the `PostsController` decorated with `@Post()` and calls that `create` method, passing the request data to it.

Key takeaway: The decorators in NestJS are a powerful way to define routes and their corresponding HTTP methods, making it easy to create RESTful APIs.
- Controllers: route requests
- Services: handle business logic (CRUD operations)
- Decorators define routes (API endpoints) and HTTP methods
