#📌 Validating Requests with Pipes in NestJS
## 🎯 Goal
Understand how pipes work in NestJS and how to use them for data validation and transformation.

## ✅ Why is this important?
Focus Bear’s backend relies on request validation to ensure data consistency and security. NestJS pipes help validate and transform incoming requests before processing them.

## ✅ Tasks
### Research what pipes are in NestJS and how they work
So from what I have learned, pipes in NestJS actually do a lot of things. they are like the frontline worker in the request lifecycle for controllers (just after receiving request).  They handle incoming values by **transforming** the data values to different type or **validating** the incoming data. There's built-in pipes like `ValidationPipe` or `ParseIntPipe` in Nestjs, or you can customise your own pipes. Pipes can be used in different levels, from method to parameter. or even globally.

### Explore built-in pipes like ValidationPipe and ParseIntPipe
In main.ts, I enabled global validation with:
```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}));
```
- whitelist: true removes any fields not defined in DTOs.
- forbidNonWhitelisted: true throws an error if unknown fields are present.
- transform: true automatically transforms input into DTO types.

### Create a custom DTO (Data Transfer Object) and apply class-validator decorators
I created a DTO for posts:
```typescript
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
```
This DTO uses class-validator decorators to enforce that `title` and `content` are non-empty strings.

I applied this DTO in the controller:
```typescript
@Post()
create(@Body() createPostDto: CreatePostDto) {
  return this.postsService.create(createPostDto);
}
```
By adding `@Body(ValidationPipe)` to the method, it automatically validates the incoming request against the `CreatePostDto` schema.

For demoonstration, I tested the API with `curl`:
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "", "content": 123, "extraField": "hello"}'
```
This request should fail validation because:
- `title` is empty.
- `content` is not a string.
- `extraField` is not defined in the DTO.

Therefore, the response should be a 400 Bad Request with validation errors:
```json
{"message":["property extraField should not exist","title should not be empty","content must be a string"],"error":"Bad Request","statusCode":400}%    
```

## ✅ Reflection (nestjs-validation.md)
### What is the purpose of pipes in NestJS?
Pipes in NestJS are used to transform and validate incoming data before it reaches the controller logic. They act as a “gatekeeper” right after the framework receives a request and before handing it off to the controller method.

In my project, I used ValidationPipe to automatically check if incoming request data matches the expected shape and types defined in my DTOs. For example, when a user submits a post with empty fields or extra properties, the pipe stops it right away and returns a meaningful error. This helps catch bad input early, keeping the rest of the application logic safe and clean.

### How does ValidationPipe improve API security and data integrity?
ValidationPipe improves security and data integrity by ensuring that only well-formed, expected data enters the application. It blocks malicious or malformed input at the boundary.

For example, I enabled whitelist, forbidNonWhitelisted, and transform options:
- whitelist strips out unexpected fields
- forbidNonWhitelisted returns an error if extra fields are present
- transform converts string query params or body data to the right types

This kind of strict checking reduces the chance of bugs and also prevents injection attacks by sanitizing inputs before they reach the business logic or database layer. While it doesn’t directly block SQL injection, it does reduce the attack surface significantly.

### What is the difference between built-in and custom pipes?
Built-in pipes like ValidationPipe and ParseIntPipe cover common validation and transformation needs. I used ValidationPipe globally to validate DTOs across my app without repeating logic in every route.

Custom pipes are used when you need specific or complex rules that aren’t covered by the built-ins — for example, validating that a string is a valid postcode format or checking that a user has permission to access a certain resource. Custom pipes give full flexibility because you write the logic yourself.

In this task, I focused on built-in pipes, but I now understand where custom ones would come in handy.

### How do decorators like @IsString() and @IsNumber() work with DTOs?
Decorators like `@IsString()` and `@IsNotEmpty()` from the class-validator library are added to DTO classes to describe what kind of values each property must have.

For example:
```typescript
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
```
This tells NestJS + ValidationPipe that title and content must be a non-empty string. If someone sends an empty string or a number instead, the request will fail validation with a clear error message.
In my project, I used these decorators in CreatePostDto and tested it using curl — and confirmed that invalid data was correctly rejected.