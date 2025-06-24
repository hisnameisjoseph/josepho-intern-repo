# Docker Setup
## Tasks:
### Install and Verify Docker on your local machine
I have installed Docker on my local machine during university. For macOs, I installed Docker Desktop, which is a GUI application that provides an easy way to manage Docker containers and images. 
```bash
docker --version
Docker version 24.0.6, build ed223bc
docker compose version
Docker Compose version v2.21.0-desktop.1
```

### Learn key Docker commands
- [`docker ps`](https://docs.docker.com/reference/cli/docker/ps/): List running containers. This command is useful for checking the status of your containers. This is the equivalent of `docker container ls` or `docker ls`.
- [`docker stop`](https://docs.docker.com/reference/cli/docker/container/stop/): Stop a running container. This command is useful for stopping containers that are no longer needed.
- [`docker rm`](https://docs.docker.com/reference/cli/docker/container/rm/): Remove one or more containers. This command is useful for cleaning up containers that are no longer needed.
- [`docker logs`](https://docs.docker.com/reference/cli/docker/logs/): Fetch the logs of a container. This command is useful for debugging issues within a container.

### What is Docker Compose?
From my understanding, Docker Compose is a tool for defining and managing multi-container Docker applications using a YAML file (`docker-compose.yml`). It allows you to define the services, networks, and volumes required for your application in a single file, making it easier to manage complex applications with multiple containers. 

So instead of running multiple `docker run` commands, you can define all your services in a `docker-compose.yml` file and then use `docker compose` commands to run all the services at once. This is particularly useful for applications that require multiple services to work together.

Here is an example of a simple `docker-compose.yml` file:
```yaml
version: '3.8'

services:
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: secret

  redis:
    image: redis

  app:
    build: .
    depends_on:
      - db
      - redis
```
As you can see, this file defines three services: `db`, `redis`, and `app`. The `db` service uses the `postgres` image, the `redis` service uses the `redis` image, and the `app` service is built from the current directory. The `app` service depends on both the `db` and `redis` services, meaning that they will be started before the `app` service. This docker compose file can be used to start all three services with a single command: `docker compose up`.

## Reflection
#### What is the difference between docker run and docker-compose up?
- `docker run` is used to start **a single container** using an image and optional configuration flags. You must run it **once for each service**, manage their networking manually, and set environment variables individually.
- `docker-compose up`, which is now called `docker compose up`, on the other hand, starts **multiple containers** defined in a single `docker-compose.yml` file. It automatically sets up networking between them, manages service dependencies, and allows configuration in one place, as I mentioned earlier.

#### How does Docker Compose help when working with multiple services?
Docker Compose makes it easier to:
- Define all services (e.g. backend API, database, cache) in a single `docker-compose.yml`
- Automatically link containers on a shared network
- Set environment variables and volumes in one place
- Use `depends_on` to control startup order
- Simplify the workflow with commands like:
  - `docker compose up`
  - `docker compose down`
  - `docker compose logs`

> 🚀 Ideal for microservices or full-stack apps where backend + DB + Redis + frontend all run in separate containers.

#### What commands can you use to check logs from a running container?
- Check logs from A running container:
```bash
docker logs <container_name_or_id>
``` 
- Check logs from a specific service in a Docker Compose project:
```bash
docker compose logs               # Shows logs for all services in a Compose project
docker compose logs <service>    # Logs for a specific service
```
- Follow logs in real-time:
```bash
docker logs -f <container_name_or_id>
```
- For Docker Compose, you can also use:
```bash
docker compose logs -f <service>
```
#### What happens when you restart a container? Does data persist?
The data in a container persists if it is stored in a volume or bind mount. When you restart a container using `docker restart <container_name_or_id>`, the container stops and then starts again, but the data in volumes or bind mounts remains intact.

> *Restarting a container will change the container's running state.* 