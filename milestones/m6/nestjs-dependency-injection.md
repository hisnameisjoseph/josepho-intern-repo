# NestJS Dependency Injection

## Tasks
### Research how dependency injection works in NestJS
From my understanding, DI in NestJS is a design pattern that allows classes to receive their dependencies from an external source rather than creating them internally. This promotes loose coupling and enhances testability. So instead of creating instances of dependencies (*your own tools*), you define them as providers (*rather than the class creating it by itself*).

NestJS uses providers and the `@Injectable()` decorator to manage dependencies. As we mentioned in the previous issue, Providers can be services, repositories, or any class that can be injected into other classes.

### Understand the role of providers and the @Injectable() decorator
**Providers:** any classes that can be injected into other classes. They are defined using the `@Injectable()` decorator, which marks a class as a provider that can be managed by NestJS's dependency injection system. This allows NestJS to automatically resolve and inject dependencies when needed.

### Explore how services are injected into controllers
So in the previous issue, we created a service called `CatsService`. To inject this service into a controller, we can use the `@Injectable()` decorator on the service class and then inject it into the controller's **constructor**.

- 💡 Why this works:
    - The `@Injectable()` decorator tells NestJS: “This class can be injected as a dependency.”
    - By placing `CatsService` in the constructor of `CatsController`, you’re telling NestJS: “When you create this controller, please give me an instance of `CatsService`.”
    - NestJS’s dependency injection container looks at the `@Module` config, finds the `CatsService` in the providers, and wires it up.

> Here's an additional source that explains how to inject services into controllers in NestJS: [NestJS Documentation - Dependency Injection](https://github.com/nestjs/docs.nestjs.com/blob/master/content/fundamentals/dependency-injection.md?plain=1&utm_source=chatgpt.com)

### Investigate different provider scopes (SINGLETON, REQUEST, TRANSIENT)
In the nutshell, **Singleton** creates a single instance of the provider that shared across the entire application. **Request** creates a new instance for each incoming HTTP request, and **Transient** creates a new instance every time it (the provider) is injected.

> Readings: [Injection Scopes](https://docs.nestjs.com/fundamentals/injection-scopes)

## Reflections
### How does dependency injection improve maintainability?
- Decoupling components
- Flexibility in swapping implementations
- Easier refactoring
- Enhance readability, maintainability, and testability

Modular, flexible and maintainable codebase is easier to understand and modify, which is crucial for long-term project success (especially in large applications).

### What is the purpose of the @Injectable() decorator?
- **Marks the class as a provider** that can be easily managed by NestJS's dependency injection system.
- Scope management: It allows you to define the scope of the provider (e.g., singleton, request, transient).
- Metadata: It can also hold additional metadata about the provider, such as its dependencies.
- Enables **Automatic Dependency Resolution**: NestJS can handle the creation (instantiation) and injection of the provider into other classes for the developer, reducing boilerplate code.

### What are the different types of provider scopes, and when would you use each?
- **Singleton (DEFAULT)**: Use when you want a single instance of the provider shared across the entire application. Ideal for services that maintain state (shared state), stateless services, or configuration.
    - Shared state: The provider maintains some state that should be consistent across the application.
    - Stateless services: The provider does not maintain any state and can be reused across the application, just logic. (e.g., database connection, validation, logging service, etc.)
    ``` typescript
    @Injectable()
    export class CatsService {
        // This service can be injected into controllers or other services
    }
    ```
- **Request**: Use when you want a new instance of the provider for each incoming HTTP request. This is useful for request-scoped services that should not share state between requests.
    ``` typescript
    @Injectable({ scope: Scope.REQUEST })
    export class CatsService {
        // This service can be injected into controllers or other services
    }
    ```
- **Transient**: Use when you want a new instance of the provider **every time** it is injected. This is useful for lightweight, stateless services.
    ``` typescript
    @Injectable({ scope: Scope.TRANSIENT })
    export class CatsService {
        // This service can be injected into controllers or other services
    }
    ``` 

### How does NestJS automatically resolve dependencies?
According to [NestJS Documentation](https://docs.nestjs.com/modules), every Nest application has at least one module, the root module, which serves as the starting point for Nest to build the application graph. This graph is an internal structure that Nest uses to resolve relationships and dependencies between modules and providers.
![NestJS module graph](image.png)

- Class Registration via Modules: NestJS uses the metadata defined in decorators like `@Injectable()`, `@Module()`, and others to understand how to wire up the dependencies.
- Constructor Injection: When a class is instantiated, NestJS looks at its constructor parameters (which you declare). If they are decorated with `@Inject()`, it knows to inject the corresponding provider.
    ```typescript
    constructor(private readonly catsService: CatsService) {}
    ```
    - Here, `catsService` is a dependency that NestJS will automatically resolve and inject when creating an instance of the class. It has the @Injectable() decorator, so NestJS knows it can provide an instance of `CatsService` when needed. 
    > *If the service is available and marked as @Injectable(), it creates or retrieves the appropriate instance depending on its scope (Singleton, Request, Transient).*
- The scopes (Singleton, Request, Transient) determine how and when these instances are created and shared.

To summarise, NestJS auto-resolves dependencies by combining metadata from decorators, TypeScript’s type system, and its DI container to instantiate and inject classes where needed — without manual wiring.
