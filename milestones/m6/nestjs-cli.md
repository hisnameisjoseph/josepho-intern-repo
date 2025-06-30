# CLI for NestJS

## Tasks
For this task, I explored how to use the NestJS CLI to generate components (scaffolding parts of the application).

> In the nestjs-demo repo, I used CLI commands to generate the `dogs` module, controller, and service.
``` bash
nest g module dogs
nest g controller dogs
nest g service dogs
```
> This created a dog directory under `src/` with all the files structured automatically, the structure and logic are similar to the `cats` module we created in the previous issue. The generated files for the `dogs` module also include `.spec.ts` files for testing, which we can skip by using the `--no-spec` flag.

> By using `npm run start` or `npm run start:dev`, I can run the application and access the `/dogs` route, which will return a response from the `DogsService` (in real-world examples) or directly get a message from the controller (what I did).

#### Explore additional CLI commands like nest generate and nest build
I understand that `nest generate` is a powerful command that can create various components in a NestJS application, such as modules, controllers, services, and more. It can be used as a shorthand for `nest g`, and it helps in quickly scaffolding the application structure. The example commands I used above demonstrate how to generate a module, controller, and service for the `dogs` feature.

`nest build` is another command that compiles the application into a distributable format, which is useful for production deployment. It ensures that Node.js can run the application by transpiling TypeScript code into JavaScript.


## Reflections
#### How does the NestJS CLI help streamline development?
I think the CLI helps with saving time and effort by automating the creation of classes (controllers, services, modules, etc.) and ensuring that the code follows NestJS conventions. It also helps in maintaining a consistent structure across the application.

#### What is the purpose of nest generate?
`nest generate` or `nest g` is a command used to create new components in a NestJS application. It can quickly creates parts of the application by using predefined templates. Generating components like controllers and services using the CLI ensures that they are set up correctly as it automatically wires them into the module.
> Supporting *feature-based folders* structure

#### How does using the CLI ensure consistency across the codebase?
Same structure and naming conventions every time a new component is generated. With the consistent structure, it become easier to navigate with higher maintainability and readability (especially when working in teams).

#### What types of files and templates does the CLI create by default?
Depending on the type, the CLI can generate:
- `.module.ts` files for modules by using `nest g module <name>`
- `.service.ts` and `.service.spec.ts` for services by using `nest g service <name>`
- `.controller.ts` and `.controller.spec.ts` for controllers by using `nest g controller <name>`
    - Here, from the previous issue, we use the `--no-spec` flag to skip the creation of test files.
- It also supports DTOs, classes, interfaces, enums, and full REST resources with `nest g resource`.