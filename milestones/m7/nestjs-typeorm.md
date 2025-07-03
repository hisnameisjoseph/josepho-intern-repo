# Connecting to PostgreSQL with TypeORM in NestJS
## Reflection
### How does @nestjs/typeorm simplify database interactions?
From my understanding, `@nestjs/typeorm` acts like a bridge between NestJS and the TypeORM library. It helps integrate database functionality more easily into the application. As a developer, I don’t need to write raw SQL queries manually. Instead, I can define the database structure using classes called entities, and TypeORM handles the communication with the database behind the scenes — including tasks like querying data or setting up relationships between tables.

The integration also makes it easier to:
- Register the database connection once in the app module
- Inject repositories or services wherever needed using decorators
- Perform CRUD operations directly using repository methods

At first, I was confused because I thought it was similar to something like pandas in Python, which also works with data — but now I understand that `@nestjs/typeorm` is actually used to connect and interact with the actual database, not just manipulate data.
### What is the difference between an entity and a repository in TypeORM?
From what I’ve learned, an **Entity** is like a class that defines the structure of the database table. For example, I created a User entity with fields like id, name, email, and isActive. This helps define what kind of data each user entry should include.

A **Repository**, on the other hand, is used to perform actions on that table — like finding users, saving a new user, or deleting one. I think of the entity as the structure and the repository as the actions.

To be honest, I’m still trying to understand what exactly a repository looks like in code. I’ve used methods like find() and create() in services, so I assume that’s how the repository is being used under the hood. But I’d like to explore this more to see what the actual repository file or object looks like in practice.

### How does TypeORM handle migrations in a NestJS project?
I didn’t work directly with migrations in this issue, but from what I read on the TypeORM GitHub page, migrations are used to track and apply schema changes over time. You can generate a migration using the CLI, and it will create a file that describes what changes should be made to the database.

The idea is to avoid syncing the schema automatically in production (since that can be risky). Instead, migrations help you version and apply changes in a more controlled way, making the schema consistent across different environments. I think the commands look something like:
```bash
typeorm migration:generate -n MigrationName
typeorm migration:run
```
I haven’t tried this yet, but I understand it’s important when working on a real team project with shared databases.

### What are the advantages of using PostgreSQL over other databases in a NestJS app?
To be honest, I haven’t worked with other databases in NestJS, so I can’t compare from experience. But I’ve heard about PostgreSQL before, and from this project, I noticed a few benefits:
- It works really well with Docker — it was easy to spin up a local PostgreSQL server using docker-compose
- It’s a relational database, so it’s great for storing structured data like users, posts, etc.
- Using entities in TypeORM maps really nicely to PostgreSQL tables, which makes the logic easier to follow
- PostgreSQL supports a strong type system, which seems to fit well with NestJS and TypeScript
- It has good support in the Node.js ecosystem, which is probably why Focus Bear uses it

Overall, even though I’m still new to both NestJS and PostgreSQL, this experience has helped me get more comfortable with the basic setup and how backend services interact with a real database that runs in Docker containers.

