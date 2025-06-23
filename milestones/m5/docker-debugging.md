# Docker Debugging
## Debugging & Managing Docker Container
From my understanding, and my previous experience with Docker, I understand that this issue #29 mainly revolves around Docker command line tools for debugging and managing containers. 
- Docker docs: https://docs.docker.com/reference/cli/docker/
### Inspect Containers
Here are some commands that can be useful for inspecting and managing Docker containers:
- [`docker ps`](https://docs.docker.com/reference/cli/docker/container/ls/): List running containers. 
- [`docker inspect`](https://docs.docker.com/reference/cli/docker/inspect/): Display detailed (low-level) information about a container / on Docker objects.

### Learn how to check logs for a running container
- [`docker logs`](https://docs.docker.com/reference/cli/docker/logs/): Fetch the logs of a container. This command is useful for debugging issues within a container.

### Explore how to enter a running container
- [`docker exec -it`](https://docs.docker.com/reference/cli/docker/exec/): Run a command in a running container as a developer debugging from within the container.
    - can run commands like `ls, cat, npm run, etc.` to inspect the container's filesystem and processes.

#### *If you want to debug a container, use [`docker debug`](https://docs.docker.com/reference/cli/docker/debug/)*:
This command is used to debug a running container. It is a replacement for debugging with `docker exec`. It allows you to attach a debugger to the container, which can be useful for diagnosing issues.

### Understand how to remove, restart, and rebuild containers
- [`docker stop`](https://docs.docker.com/reference/cli/docker/container/stop/): Stop a running container.
- [`docker rm`](https://docs.docker.com/reference/cli/docker/container/rm/): Remove one or more containers.
- [`docker compose down [OPTIONS] [SERVICES]`](https://docs.docker.com/reference/cli/docker/compose/down/): Stop and remove containers, networks, images.
- [`docker compose up [OPTIONS] [SERVICE...]`](https://docs.docker.com/reference/cli/docker/compose/up/): Build, (re)create, start, and attach to containers for a service.

### 🤙 Hands-on Practice
To practice these commands, I created a simple Docker container and then use the commands to inspect the container. The container runs a simple python script that prints `*Hello from inside the Docker container!*` to the console. The script is located in the `/docker-logger-demo/app.py` directory of the container.

I built the container using the following command:
```bash
docker build -t logger-demo .
```
*Here I realised that the `.` dot is important as it tells Docker to look for the Dockerfile in the current directory.*

Then I ran the container using:
```bash
docker run -d --name logger-demo-container logger-demo
```
*The `-d` flag runs the container in *detached mode*, and `--name` assigns a name to the container.*

```bash
docker exec -it logger-demo-container /bin/bash
```
*This command opens a bash shell inside the running container, allowing me to inspect the filesystem and processes.*

I then used the following command to check the logs of the container:
```bash
docker logs logger-demo-container
```

I also used the `docker ps` command to list the running containers:
```bash
docker ps
```
or to list all containers (including stopped ones):
```bash
docker ps -a
```

I used the `docker stop` command to stop the container:
```bash
docker stop logger-demo-container
``` 
and then removed it using:
```bash
docker rm logger-demo-container
```
Here I understand that the `docker rm` command only removes stopped containers. If the container is running, I need to stop it first using `docker stop`. If I use `docker compose down` it wil stop and remove all the containers defined in the `docker-compose.yml` file, which is useful for managing multiple containers at once.

### Reflection
#### How can you check logs from a running container?
You can use `docker logs <container_name_or_id>` to check the logs from a running container. This command fetches the logs of the specified container, allowing you to see the output of the processes running inside it.

#### What is the difference between docker exec and docker attach?
Well, [`docker exec`](https://docs.docker.com/reference/cli/docker/compose/exec/) is used to run a new command in a running container, while [`docker attach`](https://docs.docker.com/reference/cli/docker/container/attach/) is used to attach your terminal to a running container's main process. You can see everything that is printed to the terminal of the main process, but you cannot run new commands like you can with `docker exec`.

👉 *It might be safer to use `docker exec` for debugging, as it allows you to quit (using `Ctrl+C`) without affecting the main process of the container, while `docker attach` can disrupt the main process if you quit.* 👈

#### How do you restart a container without losing data?
Use the `docker restart <container_name_or_id>` command to restart a container without losing data. This command stops the container and then starts it again, preserving the data stored in volumes or bind mounts. As long as you don't remove the container or its volumes, the data will remain intact.

#### How can you troubleshoot database connection issues inside a containerized NestJS app?
To be honest, I don't have a confident answer to this question, but I can suggest some general steps:
1. **Check the logs**: Use `docker logs <container_name>` to check the  logs of the container. Look for any error messages related to database connections.
    - If logs indicate a connection error, it might be due to incorrect database credentials or the database service not being available. 
        - If that is the case, check if the database service is running and accessible from the container using `docker ps` if the database is containerised, start it if it is not running. If the database is running on the a different host, use tools like `ping` or `telnet` to check connectivity from the container to the database host and port.

2. **Inspect the environment variables**: Ensure that the database connection details (host, port, username, password) are correctly set in the environment variables of the container. You can use `docker inspect <container_name>` to view the environment variables set for the container.
- If using a `.env` file, ensure it is correctly mounted in the container and that the variables are being read correctly by the application. It is loaded in the `docker-compose.yml` file or Dockerfile.
- If not using a docker-compose file, ensure that the environment variables are passed correctly when running the container using the `-e` flag. E.g.:
```bash
docker run -e DB_HOST=localhost -e DB_PORT=5432 -e DB_USER=user -e DB_PASSWORD=password -d my-nestjs-app
```
3. **Check network connectivity**: If the database is running in a separate container, ensure that both containers are on the same Docker network. You can use `docker network ls` to list networks and `docker network inspect <network_name>` to check which containers are connected to it.
- If the database is running on a different host, ensure that the host is reachable from the container. You can use `docker exec -it <container_name> ping <db_host>` to check connectivity.
4. [**Optional Health checks**](https://docs.nestjs.com/deployment#health-checks): Use @nestjs/terminus to implement health checks for your database connection. This can help you monitor the health of your application and database connection.
5. Use the debugging tools mentioned in this issue #29 to enter the container and run commands to test the database connection manually.