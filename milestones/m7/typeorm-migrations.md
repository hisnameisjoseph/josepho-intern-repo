# Seeding & Migrations in TypeORM 
## Reflection
### What is the purpose of database migrations in TypeORM?
The purpose of using migrations in TypeORM is to help developers keep track of changes to the database schema (basically the structure of the database) over time. For example, if I want to add a new column or category in a table, I can do that through a migration instead of editing the database manually. It makes updating the database more organised and consistent.

### How do migrations differ from seeding?
From what I understand, **migration** is more about making sure the database structure — like the tables and columns — is created properly (migration itself is about modifying the schema, e.g. creating tables). **Seeding**, on the other hand, is about adding actual data (like dummy records) into the database to test if things work. So migration is about structure, and seeding is about sample data.

### Why is it important to version-control database schema changes?
If something goes wrong, especially when running a wrong query or accidentally changing the schema, the app might break. Version-controlling the database schema makes it easier for developers to roll back or fix mistakes. It also makes sure everyone on the team has the same database structure, even across different machines or environments. This helps prevent bugs and data loss.

### How can you roll back a migration if an issue occurs?
We can use the CLI command like:
```bash
typeorm migration:revert  -- -d src/data-source.ts
```
*In this case, `src/data-source.ts` is the path to the data source file where TypeORM is configured*

This helps undo the last migration if it caused issues. It’s useful for fixing mistakes or testing safely.