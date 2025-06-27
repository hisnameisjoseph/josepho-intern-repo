# Setting up NestJS
## Tasks
### Research the steps to set up a new NestJS project
I set up [NestJS CLI tool](https://docs.nestjs.com) globally in my system using the command:
```bash
npm install -g @nestjs/cli
```
and created a new NestJS project in my m6 directory, using:
```bash
nest new nestjs-demo
```
### Install required dependencies and initialize a NestJS project
After running the command, the NestJS CLI tool prompted me to choose a package manager. I selected `npm`, and it scaffolded a new NestJS project with the necessary files and directories. I noticed that now I have a directory named `nestjs-demo` in my m6 directory, which contains files like `package.json`, `tsconfig.json`, and a basic application structure (src, test).
```bash
(base) hisnameisjoseph@Mac m6 % nest new nestjs-demo
✨  We will scaffold your app in a few seconds..

✔ Which package manager would you ❤️  to use? npm
CREATE nestjs-demo/.prettierrc (51 bytes)
CREATE nestjs-demo/README.md (5028 bytes)
CREATE nestjs-demo/eslint.config.mjs (836 bytes)
CREATE nestjs-demo/nest-cli.json (171 bytes)
CREATE nestjs-demo/package.json (2037 bytes)
CREATE nestjs-demo/tsconfig.build.json (97 bytes)
CREATE nestjs-demo/tsconfig.json (544 bytes)
CREATE nestjs-demo/src/app.controller.ts (274 bytes)
CREATE nestjs-demo/src/app.module.ts (249 bytes)
CREATE nestjs-demo/src/app.service.ts (142 bytes)
CREATE nestjs-demo/src/main.ts (228 bytes)
CREATE nestjs-demo/src/app.controller.spec.ts (617 bytes)
CREATE nestjs-demo/test/jest-e2e.json (183 bytes)
CREATE nestjs-demo/test/app.e2e-spec.ts (674 bytes)

▹▹▹▹▹ Installation in progress... ☕

🚀  Successfully created project nestjs-demo
👉  Get started with the following commands:

$ cd nestjs-demo
$ npm run start

                                         
                          Thanks for installing Nest 🙏
                 Please consider donating to our open collective
                        to help us maintain this package.
                                         
                                         
               🍷  Donate: https://opencollective.com/nest
```
As shown above, the NestJS CLI tool prompts for a package manager choice, and I selected `npm`. The CLI then scaffolded a new NestJS project with the necessary files and directories.
### Explore the default project structure (modules, controllers, services, main.ts)
#### **`main.ts`**: 
    ```ts
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';

    async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);
    }
    bootstrap();
    ```
    When inspecting the code above, I noticed that the default port is `3000`, which is in the `main.ts` file, which is the entry point of the application. The `main.ts` file is responsible for bootstrapping the NestJS application. It also imports the root module `AppModule` and starts the application on a specified port (default is 3000).

#### **`app.module.ts`**: 
The file is the root module of the application, and it imports the `AppController` and `AppService`.
```ts
    import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';

    @Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
    })
    export class AppModule {}
```
- A decorator `@Module` is used to define the module, which includes the controllers and providers.
- `imports: []` is an array that can be used to import other modules. Right now, it is empty.
- `controllers: [AppController]` is an array that lists the controllers for this module. In this case, it includes the `AppController`. It registers the controller(s) that handle incoming HTTP requests.
- `providers: [AppService]` is an array that lists the providers for this module. In this case, it includes the `AppService`. It registers the service(s) that provide business logic and data access.
> So `main.ts` is the entry point of the application, `app.module.ts` is the root module that imports controllers and providers, and it sets up the application structure. It uses `AppController` to handle incoming requests and `AppService` to provide business logic.

#### **`app.controller.ts`**: 
This file defines the `AppController`, which handles incoming HTTP requests. It has a single route defined:
```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

    @Controller()
    export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
```

- `@Controller()`: This decorator defines the base route for the controller. It tells NestJS that this class is a controller (handles routes).
- `constructor`: Injects the `AppService` (using dependency injection) to use its methods.
- `@Get()`: This decorator defines a GET route for the base path ("/"). It maps the method to the HTTP GET request.
- `getHello()`: This method (handler function) returns a string "Hello World!" when the GET request is made to the base path ("/").
#### **`app.service.ts`**
This file defines the `AppService`, which provides business logic and data access. It has a single method:
```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }
}
```
- `@Injectable()`: Tells NestJS: "This class is a provider and can be injected into other classes."
- `export class AppService`: Defines the `AppService` class. It is exported so it can be used in other files like `app.controller.ts`.
- `getHello()`: This method returns the string "Hello World!". It is called by the `AppController` when a GET request is made to the base path ("/").

### Run the application and verify the setup
I ran the NestJS application using the command:
```bash
npm run start:dev
[3:06:39 PM] Starting compilation in watch mode...

[3:06:40 PM] Found 0 errors. Watching for file changes.

[Nest] 59142  - 06/27/2025, 3:06:40 PM     LOG [NestFactory] Starting Nest application...
[Nest] 59142  - 06/27/2025, 3:06:40 PM     LOG [InstanceLoader] AppModule dependencies initialized +5ms
[Nest] 59142  - 06/27/2025, 3:06:40 PM     LOG [RoutesResolver] AppController {/}: +2ms
[Nest] 59142  - 06/27/2025, 3:06:40 PM     LOG [RouterExplorer] Mapped {/, GET} route +1ms
[Nest] 59142  - 06/27/2025, 3:06:40 PM     LOG [NestApplication] Nest application successfully started +1ms
```
This command starts the application in development mode, allowing for live reloading on file changes. The output shows that the application is running on `http://localhost:3000`, which is a "Hello World" application by default.

## Reflection
#### What files are included in a default NestJS project?
The default NestJS project includes the following files:
- `package.json`: Contains project metadata and dependencies.
- `tsconfig.json`: TypeScript configuration file.
- `tsconfig.build.json`: TypeScript configuration for building the project.
- `nest-cli.json`: Configuration file for the NestJS CLI.
- `src/`: Directory containing the source code.
    - `src/main.ts`: Entry point of the application.
    - `src/app.module.ts`: Root module of the application.
    - `src/app.controller.ts`: Controller handling incoming requests.
    - `src/app.service.ts`: Service providing business logic.
    - `src/app.controller.spec.ts`: Test file for the `AppController`.

#### How does main.ts bootstrap a NestJS application?
The file tells NestJS to create the application instance using the `AppModule` and starts listening on a specified port (default is 3000). It uses the `NestFactory.create()` method to create the application instance and then calls `app.listen()` to start the server.
> The `??` operator is used to provide a default value of `3000` if the `PORT` environment variable is not set.

#### What is the role of AppModule in the project?
`AppModule` is the root module of the application. It's like the main organiser that brings together different parts of the application. It imports controllers and providers, which are essential for handling requests and providing business logic. In this case, it imports `AppController` to handle incoming HTTP requests and `AppService` to provide the "Hello World!" response.
#### How does NestJS structure help with scalability?
NestJS promotes a modular architecture, allowing developers to organise code into modules. Each module can encapsulate related components, making it easier to manage and scale the application. This structure also facilitates code reuse and separation of concerns, as developers can create feature-specific modules that can be developed and tested independently.