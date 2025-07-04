#📌 Validating Requests with Pipes in NestJS
## 🎯 Goal
Understand how pipes work in NestJS and how to use them for data validation and transformation.

## ✅ Why is this important?
Focus Bear’s backend relies on request validation to ensure data consistency and security. NestJS pipes help validate and transform incoming requests before processing them.

## ✅ Tasks
### Research what pipes are in NestJS and how they work
So from what I have learned, pipes in NestJS actually do a lot of things. they are like the frontline worker in the request lifecycle for controllers (just after receiving request). 

They handle incoming values by **transforming** the data values to different type or **validating** the incoming data. 

There's built-in pipes like `ValidationPipe` or `ParseIntPipe` in Nestjs, or you can customise your own pipes. Pipes can be used in different levels, from method to parameter. or even globally.

### Explore built-in pipes like ValidationPipe and ParseIntPipe

### Create a custom DTO (Data Transfer Object) and apply class-validator decorators

### Use a global validation pipe to enforce DTO validation across the app

## ✅ Reflection (nestjs-validation.md)
### What is the purpose of pipes in NestJS?
### How does ValidationPipe improve API security and data integrity?
### What is the difference between built-in and custom pipes?
### How do decorators like @IsString() and @IsNumber() work with DTOs?