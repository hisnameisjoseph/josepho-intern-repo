# Using Docker for NestJS Development
[Documentation - NestJS Deployment](https://docs.nestjs.com/deployment)

## Tasks
### Research how to create a Dockerfile for a NestJS app
I reviewed the official NestJS documentation and found a basic Dockerfile example using a single-stage build (only one `FROM` statement).

```dockerfile
# Use the official Node.js image as the base image
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
```
this works for basic use, but it includes all source files and dependencies, which can lead to larger image sizes. 

To optimise the image size, I created a multi-stage Dockerfile that separates the build and runtime environments (unlike single-stage where all files are included in one `FROM` statement). This approach allows me to copy only the necessary files into the final image, reducing its size significantly.

### Modify docker-compose.yml to run NestJS alongside PostgreSQL
I created a `docker-compose.yml` file (with the help of ChatGPT) to define the services for my NestJS application and PostgreSQL database. This file allows me to run both services together, manage their dependencies, and expose the necessary ports for communication.
```yaml
# docker-compose.yml
version: '3.8'

services:
  nestjs:
    build: .
    container_name: nestjs-app
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgres://postgres:postgres@postgres:5432/mydb
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run start:dev

  postgres:
    image: postgres:15
    container_name: postgres-db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```   
> This file defines two containers, sets environment variables for DB access, and mounts volumes to allow live development.

### Test the setup by running both containers and checking API connectivity
I can test the setup by running the following command in the terminal:

```bash
docker compose up --build
```
This command starts both the NestJS and PostgreSQL containers. I can then check the API connectivity by sending requests to the NestJS application, which should be accessible at `http://localhost:3000`.
- Routes like /dogs and /cats returned correct responses. 
- Both containers ran successfully by using `docker ps` to check their status.
- Logs can be checked using `docker compose logs -f` to follow the services logs in real-time.



## Reflection

### How does a Dockerfile define a containerized NestJS application?
A Dockerfile defines a containerised NestJS application by specifying a Node.js environment, installing dependencies, building the app, and setting the command to run it. This ensures that the application runs consistently across different environments.

### What is the purpose of a multi-stage build in Docker?
To create smaller and more optimised images and improve build efficiency. By using multiple stages, you can separate the build environment from the runtime environment, allowing us to include only the necessary files and dependencies in the final image.

### How does Docker Compose simplify running multiple services together?
Using a YAML file, it handles the orchestration of containers, networking, and dependencies, making it easier to spin up complex applications with multiple services, by using a single command (`docker compose up`).

### How can you expose API logs and debug a running container?
Using commands like `docker-compose logs -f` to check real-time logs, or `docker exec -it <container_name> sh` to open a shell inside the running container. This allows us to inspect logs, check the container’s environment, and run debugging commands directly.
