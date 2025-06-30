# Understanding Modules, Controllers, and Services in NestJS
In the previous issue, issue #43, we have already touched on the basic structure of a NestJS application. In this issue, we will explore more about the architecture of NesrtJS, focusing on modules, controllers, and services.

## Tasks
### Understand how NestJS uses decorators (@Module(), @Controller(), @Injectable())
- `@Module()`: Groups related components (controllers, providers, etc.) together, defining the context in which they operate. It is like a logical *feature* bundle.
- `@Controller()`: Defines a controller that handles incoming (HTTP) requests and returns responses. It is responsible for processing user input and returning the appropriate output.
    - Receives requests -> delegates work (to services) -> returns responses
- `@Injectable()`: Marks a class as a provider that can be injected into other classes. It is used to define services that can be shared across the application. Services and other providers are decorated with `@Injectable()` to make them available for dependency injection.
    - `@Provider()`: Anything that can be injected (services, repositories, helpers, etc.) is a provider. It holds the business logic or shared resources.
    - Services are a common type of provider, encapsulating business logic and data access.

### Example of a Simple NestJS Application Structure

#### Steps - Structure the Application
So I created a simple NestJS application to demonstrate the architecture (routing and features) of NestJS. The application consists of the following files and folders in the nestjs-demo repository:

```
src/
 └── cats/
     ├── cats.module.ts
     ├── cats.controller.ts
     └── cats.service.ts
 └── main.ts
 └── app.module.ts
 └── app.controller.ts
 └── app.service.ts
```
#### Steps - CLI Commands
With the CLI commands (we already had the ~package.json~ file):
```bash
nest g module cats
nest g controller cats --no-spec
nest g service cats --no-spec
```
> `--no-spec` is used to skip the creation of test files, as we are focusing on the architecture here.
Here I generated three claases files:
- `cats.module.ts`: Defines the Cats module, grouping the controller and service.
- `cats.controller.ts`: Handles incoming requests related to cats.
- `cats.service.ts`: Contains the business logic for handling cats.

#### Steps - Wire them up
✅ Summary of What I Did to Make localhost:3000/cats Work

To make sure http://localhost:3000/cats works as expected, I:
1. Updated `cats.service.ts`
    - Added a `findAll()` method that returns a string (e.g. 'Meow from service').
2. Edited `cats.controller.ts`
    - Imported `@Get` and `CatsService` from `@nestjs/common`.
    - Used constructor injection to add `CatsService` to the controller.
    - Added a `@Get()` route handler called `getAllCats()` that returns `this.catsService.findAll()`.
    ``` typescript
    @Controller('cats')
    export class CatsController {
        constructor(private readonly catsService: CatsService) {}

        @Get()
        getAllCats(): string {
            return this.catsService.findAll();
        }
    }
    ```
3. Checked `cats.module.ts`
   - Confirmed it includes both the controller and the service in the `@Module` decorator.
4. Verified `app.module.ts`
   - Ensured `CatsModule` is imported in the imports array so the /cats route is active.

After these changes, I ran npm run start and confirmed that visiting http://localhost:3000/cats returns the expected response from the service.

### Explore how NestJS handles dependency injection with providers
[Custom Providers](https://docs.nestjs.com/fundamentals/custom-providers)
First thing I tried was to create a mock version of the `CatsService` to test the controller without relying on the actual service implementation. This is useful for unit testing and isolating components.
In the `cats.controller.spec.ts` file, I created a mock service:
```typescript
const mockCatsService = {
    findAll: jest.fn(() => 'Mocked cats list 🐱',
};
```
With providers, I can replace the actual `CatsService` with this mock in the testing module:
```typescript
@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: CatsService, // Token
      useValue: mockCatsService, // Literal value to inject
    },
  ],
})
export class CatsModule {}
```
This way, when the `CatsController` is instantiated, it receives the mock service instead of the real one. This allows me to test the controller's behavior independently of the service's implementation.
> *Visiting http://localhost:3000/cats will return the mocked response, as the controller is using the mock service.*

From the previous section, we learned that NestJS handles dependency injection using providers. The most common form is the standard provider, where a service class (e.g. `CatsService`) is registered in a module and can be injected into controllers or other services via constructor injection.

NestJS also supports custom providers, like using `useValue` to provide a literal value or `useFactory` to create a provider dynamically by using a factory function.

In my example, I used `useValue` to provide a mock implementation of the `CatsService` for testing purposes.

### Reflection
#### What is the purpose of a module in NestJS?
A class annotated with the `@Module()` decorator. It acts as a container for related components, such as controllers and providers (services). Modules help organise the application into blocks of functionality, making it easier to manage and scale.

#### How does a controller differ from a provider?
A controller in NestJS is responsible for handling incoming HTTP requests and returning responses. It acts as an interface between the client and the application. On the other hand, a provider (usually a service) contains the business logic and data access code. Controllers delegate tasks to providers to keep their code focused on request handling.

#### Why is dependency injection useful in NestJS?
Dependency injection (DI) is useful in NestJS because it promotes loose coupling between components. By injecting dependencies (e.g., services) into controllers or other providers, NestJS makes it easy to swap implementations, such as using mock services for testing (my example above). DI also simplifies the management of shared resources and improves code maintainability.

#### How does NestJS ensure modularity and separation of concerns?
Each module encapsulates related components (controllers, providers) and can be imported or exported as needed. This structure allows developers to organise their code logically, making it easier to understand, test, and maintain. Additionally, the use of decorators (the `@` tag) and metadata helps NestJS manage dependencies and lifecycle events effectively.
