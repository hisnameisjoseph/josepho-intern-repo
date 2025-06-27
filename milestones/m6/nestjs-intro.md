# NestJS Introduction!
## Tasks
### NestJS VS Express.js
| Feature                | NestJS                              | Express.js                  |
|------------------------|-------------------------------------|-----------------------------|
| Architecture           | Modular, opinionated (Built-in support for Model-View-Controller, DI, etc) | Minimal, unopinionated      |
| TypeScript Support     | Built-in                            | Optional (via @types/express) based on JavaScript|
| Learning Curve         | Steeper (more concepts) but well-documented             | Easier for beginners (relatively simpler)        |
| Middleware             | Uses Express under the hood          | Native                      |
| CLI Tools              | Powerful Nest CLI                   | Basic CLI                   |
| Testing Support        | Integrated testing tools (Jest)    | Minimal testing libraries (e.g., Mocha, Chai), need to wire up manually |
| Use Case               | Large-scale, enterprise apps and microservices        | Simple APIs (Micro APIs), prototypes, microservices  |

[Differences between NestJS and Express.js](https://www.geeksforgeeks.org/blogs/expressjs-vs-nestjs-5-differences-that-you-should-know/)


### Explore NestJS Modular Architecture
#### What Makes NestJS Modules Special?

- NestJS uses modules to organise code into logical feature areas (e.g., Users, Auth, Products).
- Each module is defined using the `@Module()` decorator, listing its own controllers and providers.
- **Providers** registered in a module are encapsulated by default but can be **exported** for reuse in other modules.
- Modules are **singletons** by default. (Providers instantiated by a module are singletons (one per importing app), while the module class itself is just metadata.)
- You can define **global modules** using `@Global()` but should do so carefully.
- **Dynamic modules** can be configured at runtime using `.forRoot()`, useful for flexible setups.
- NestJS’s modular system helps make applications **scalable**, **maintainable**, and **easy to test**.

📖 Learn more: [NestJS Modules Docs](https://docs.nestjs.com/modules)

- [**Modules**](https://docs.nestjs.com/modules): 
    - A class that encapsulates related components, controllers, and services. It is annotated with the `@Module()` decorator.
    - **Root Module**: The main module of the application, typically named `AppModule`, which imports other modules and serves as the entry point.
    - **Feature Modules**: Modules that encapsulate specific features or functionalities of the application, allowing for better organisation and separation of concerns.
    - **Shared Modules**: Modules that can be imported by other modules to share common functionality (e.g., utility functions, constants).
    - **Global Modules**: Modules that are available throughout the application without needing to import them in every module. Unlike Angular's `providers` that are registered globally, NestJS modules can be made global by using the `@Global()` decorator. NestJS modules encapsulate providers inside the module scope.
    - **Re-exporting Modules**: Modules can re-export providers from other modules, making them available to any module that imports the re-exporting module.
    - **Dynamic Modules**: Modules that can be configured at runtime, allowing for more flexible and reusable components.
- [**Controllers**](https://docs.nestjs.com/controllers):
Controllers handle incoming requests and return responses. They are defined using the `@Controller()` decorator and can have multiple routes.
    - **@Controller()**: Decorator that defines a controller class and base route path.
    - **Route Handlers**: Methods within the controller that handle specific HTTP requests (e.g., `@Get()`, `@Post()`, `@Put()`, `@Delete()`, etc.).
- [**Services**](https://docs.nestjs.com/providers):
Services are classes that encapsulate business logic and can be injected into controllers or other services. They are defined using the `@Injectable()` decorator. Classes like Services, Repositories, and Factories are all considered **Providers** in NestJS.
    - **Example**: User management service, calculation service, API calls, etc.

    Injecting **providers** into controllers or other providers in NestJS is done through dependency injection, and this works by using the @Injectable() decorator. This decorator tells NestJS that the class can be managed by its internal dependency injection system. In other words, providers are classes—such as services, repositories, or factories—that can be injected and shared across the application. Once marked with @Injectable(), these providers can be automatically instantiated and injected wherever needed.

#### *I asked ChatGPT to explain some of the terms for the sections above, and here are the responses:*
| Term               | Explanation | Think of it as... |
|--------------------|-------------|-------------------|
|Singleton| Only one instance of a class is created and shared across the application. | A single person in charge of a task, ensuring consistency. |
|Decorator| A special function that modifies the behavior of a class or method. | A label that adds extra information or functionality to a class or method. |
|Module| A folder-level **box** that groups related files (controllers, services, etc.) together. So you can plug the whole box into the app. | A box that contains everything needed for a specific feature or functionality, like a Lego block: snap it once, everything inside comes with it. |
|Controller| A class that handles incoming requests and returns responses (answers HTTP requests). | A receptionist who takes questions from outside and passes them to the appropriate department. |
|Provider| A class that does work (business logic, DB calls, etc.) and can be injected into controllers or other providers. **Provider** is the generic NestJS term for any class that can be injected. A **service** is the most common type of provider. | A worker who does the actual tasks, like the employee who actually updates the spreadsheet or sends the email. |
|Guard| A class that checks if a request is allowed to proceed (like a security guard). | A little bouncer that allows/denies people to enter a building. |
|Pipe| A class that transforms data before it reaches the controller (like a filter). A Pre-processor that cleans or modifies data before it gets to the main process. | A funnel with a filter that ensures only the right data gets through. |
|Interceptor| A class that can modify the request and response objects (like a middleware). Runs **around** the route handler to log, transform, or time it. | Bubble-wrap around a parcel: you can tag, inspect, or re-pack the response. |
|Middleware| A function that runs before the request reaches the controller (like a pre-check). Runs in the request pipeline. | A security guard who checks bags before letting people into a concert. |
|Factory| A class that creates instances of other classes, often after configuration (e.g. reading env variables). | A custom coffee order: the machine builds the drink on demand instead of handing you a pre-made bottle. |
|Encapsulation| The principle of keeping the internal workings of a module hidden from the outside. Outsiders can only use *public interface* you expose. | A black box: you know what goes in and what comes out, but not how it works inside. |
|Decoupling| The practice of separating different parts of the application to reduce dependencies. | Phone + Bluetooth speaker: change the phone model, speaker still works. |
|Dependency Injection| A design pattern where classes receive their dependencies from an external source rather than creating them internally (so instead of a class making or importing what it needs). | Ordering groceries online; you don’t farm tomatoes yourself – they arrive at your door. |

##### Visual Flow of NestJS Request Handling
```mermaid
    A[Incoming HTTP request] 
    A --> B[Middleware]     // runs first
    B --> C[Guard]          // checks access control
    C --> D[Pipe]           // validates and transforms input
    D --> E[Controller]     // handles request
```
### Why DI (dependency Injection) is Important in NestJS?
The modular architecture of NestJS relies heavily on dependency injection (DI) to manage the relationships between different components. DI helps to keep the codebase clean, maintainable, and testable. Here are some key reasons why DI is important in NestJS:
- **Loose Coupling**: DI allows components to be loosely coupled, meaning they can be developed, tested, and maintained independently. This makes it easier to change or replace components without affecting the entire application.
- **Reusability**: By injecting dependencies, you can easily reuse components across different parts of the application. E.g. shared logic or services can be injected into multiple controllers or other providers.
- **Testability**: DI makes it easier to write unit tests for components by allowing you to mock dependencies. This means you can test a component in isolation without needing to set up its dependencies
- **Clean Code**: Developers don't have to manage the lifecycle of dependencies manually. Instead, NestJS takes care of creating and injecting instances, leading to cleaner and more readable code.
> In summary, **Dependency Injection** is a core principle of NestJS that enables modularity, maintainability, and testability in applications. It allows developers to focus on building features without worrying about how dependencies are created or managed. NestJS provides the wiring and configuration needed to make DI work seamlessly, making it a powerful tool for building scalable applications.

### Find out how decorators (@Controller(), @Injectable()) work in NestJS
Decorators in NestJS are special annotations that add metadata to classes, methods, or properties so that NestJS can understand how to handle them (*they are like labels or tags that tell NestJS what to do with the class or method*). They are a key part of the framework's design, enabling features like dependency injection, routing, and more.
- **@Controller()**: This decorator marks a class as a controller, which handles incoming requests (e.g. HTTP requests) and returns responses. It can also define a base route for the controller.
    - **Example**: 
        ```typescript
        import { Controller, Get } from '@nestjs/common';

        @Controller('cats')
        export class CatsController {
        @Get()
        findAll() {
            return [];
        }
        }
        ```
- **@Injectable()**: This decorator marks a class as a provider, which can be injected into other classes (like controllers or other providers). It tells NestJS that this class can be managed by its DI system.
    - **Example**: 
        ```typescript
        import { Injectable } from '@nestjs/common';

        @Injectable()
        export class CatsService {
        findAll() {
            return [];
        }
        }
        ```
- **@Get()**, **@Post()**, etc.: These decorators are used within controllers to define specific HTTP routes and methods. They map HTTP requests to controller methods.
## Reflection

### What are the key differences between NestJS and Express.js?
Like I mentioned earlier, NestJs and Express.js are both Node,js frameworks used to build web applications, but they have different philosophies and features. Here are the key differences:
- **NestJS** is a **fully-featured, opinionated framework** that provides a modular architecture, built-in support for dependency injection, and a powerful CLI. It is designed for building large-scale applications and microservices.
- **Express.js** is a **minimal, unopinionated framework** that provides a simple way to create web applications and APIs. It is lightweight and flexible, allowing developers to choose their own architecture and libraries.
### Why does NestJS use decorators extensively?
Decorators help organise and label code in a readable way, so NestJS can connect everything automatically. It keeps the architecture clean and reduces boilerplate.
> ***Boilerplate**: Repetitive code that is needed to set up a framework or library but doesn't contribute to the core functionality.*
### How does NestJS handle dependency injection?
Dependency Injection (DI) in NestJS means that instead of creating instances of services manually, you let NestJS provide them for you. This helps keep the code clean, reduces coupling, and makes testing easier because dependencies can be swapped out with mock versions.

- 🧠 Analogy: Think of building a restaurant:
    - Decorator = Labels on rooms: “This is the kitchen”, “This is the storage room”, “This is the cashier”. It tells the builder (NestJS) how to set up the space.
    - DI = Instead of each room going to buy its own tools (e.g. the kitchen buying its own stove), there’s a central system that gives each room what it needs, already configured.
### What benefits does modular architecture provide in a large-scale app?
Better organisation, reusability, team collaboration, easier testing, and scalability. Each module can be developed independently (like lego blocks 🤩), making it easier to manage complex applications.