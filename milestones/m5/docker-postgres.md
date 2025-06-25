# PostgreSQL in Docker
## Tasks
### Research how to run PostgreSQL in a Docker container
Useful resource: [PostgreSQL in Docker](https://www.datacamp.com/tutorial/postgresql-docker)
So from my understanding, PostgreSQL is a powerful relational database server. As I have seen in a lot of Docker Compose files, it is often used with other services like Redis (cache) and NestJS (API server). Usually the PostgreSQL service is defined in a `docker-compose.yml` file, which specifies the image to use, environment variables for configuration, and volumes for data persistence.

### Set up a docker-compose.yml file to run PostgreSQL
I created a `docker-compose.yml` file to run PostgreSQL at the folder `docker-postgres-demo` with the help of AI. Here is the content of the file:

```yaml
# Docker Compose file for running a local PostgreSQL container
# For Compose file versioning: https://docs.docker.com/compose/compose-file/compose-versioning/

version: "3.8"  # Defines the version of the Docker Compose file format. 3.8 is widely supported.

services:
  db:
    image: postgres  # Pulls the official PostgreSQL image from Docker Hub
    restart: always  # Automatically restarts the container if it crashes or the system reboots
    environment:
      POSTGRES_USER: myuser       # Sets the default PostgreSQL user
      POSTGRES_PASSWORD: mypassword  # Sets the password for the user
      POSTGRES_DB: mydb           # Creates a default database named 'mydb'
    volumes:
      - ./data:/var/lib/postgresql/data  
        # Maps a local directory (./data) to the container's data directory
        # This ensures that database data persists even if the container is removed or recreated

# 🔗 More about how and why Docker Compose versioning works:
# https://docs.docker.com/compose/intro/history/
```

Some of the key points of understanding this file:
- **Compose File Version:**  
  The file uses version `3.8` because it is widely supported and compatible with most Docker Compose features. (See [Compose version history](https://docs.docker.com/compose/intro/history/).)

- **Official PostgreSQL Image:**  
  The `image: postgres` line pulls the official PostgreSQL image from Docker Hub, ensuring I get a reliable and up-to-date database server.

- **Automatic Restarts:**  
  The `restart: always` option ensures the PostgreSQL container will automatically restart if it crashes or if the system reboots, improving reliability.

- **Environment Variables:**  
  The `environment` section sets up the default database user, password, and database name using `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB`.

- **Data Persistence:**  
  The `volumes` section maps a local `./data` directory to the container’s data directory. This ensures that database data persists even if the container is removed or recreated.  
  If the `./data` directory does not exist, Docker Compose will *automatically create it* the first time you run the service.

- **Service Name:**  
  The service is named `db`, making it easy to reference from other services in the same Compose file (e.g., an API server).

### Connect to the running PostgreSQL instance using a database client (e.g., pgAdmin, psql)
First time running the PostgreSQL container:
![First Docker PostgreSQL Container Command in Terminal](<Screenshot 2025-06-25 at 2.00.24 pm.png>)
So what it happened is that, the Docker pulls the postgres image from Docker Hub, creates a container named `docker-postgres-demo-db-1`, and a local directory `data` is created automatically to store the database files.

And we use the `docker ps` command to check the running containers:
``` bash
(base) hisnameisjoseph@Mac docker-postgres-demo % docker compose ps
NAME                        IMAGE      COMMAND                           SERVICE   CREATED         STATUS         PORTS
docker-postgres-demo-db-1   postgres   "docker-entrypoint.sh postgres"   db        2 minutes ago   Up 2 minutes   5432/tcp
```
As you can see, the container is running and listening on port `5432/tcp`, which is the default port for PostgreSQL.

``` bash
(base) hisnameisjoseph@Mac docker-postgres-demo % docker exec -it docker-postgres-demo-db-1 psql \
-U myuser -d mydb
psql (17.5 (Debian 17.5-1.pgdg120+1))
Type "help" for help.

mydb=# SELECT 'It works!' AS greeting;
 greeting  
-----------
 It works!
(1 row)
```
So I used the `docker exec` command to connect to the running PostgreSQL container and run the `psql` command-line client. I specified the user `myuser` and the database `mydb`. Then I ran a simple SQL query to check if it works, and it returned the expected result.
Then, I use `SELECT 'It works!' AS greeting;` to return a greeting message, which is a common practice to test if the database connection is successful.

*I use `\q` to exit the `psql` client.*

### Explore how volumes persist PostgreSQL data across container restarts
The `volumes` section in the `docker-compose.yml` file maps a local directory (`./data`) to the container's data directory (`/var/lib/postgresql/data`). This means that any data stored in the PostgreSQL database will be saved in the local `data` directory on your host machine.
This allows the data to persist even if the container is stopped or removed. When you restart the container, PostgreSQL will read the data from the local directory, ensuring that your database remains intact.

- Any database changes made inside the container (like CREATE TABLE, INSERT, etc.) are saved to the mounted volume.
- Because the actual database files live in ./data on your local machine, even if the container is deleted and re-created, the data will still persist.

### Reflection
#### What are the benefits of running PostgreSQL in a Docker container?
Running PostgreSQL in a Docker container makes setup much easier. I don't need to install the database directly on my local machine. It also ensures a consistent environment, which is useful when working in a team. Everyone can use the same Docker image and version for configuration, reducing compatibility problems. Plus, Docker makes it easy to start, stop, or rebuild the service quickly during development or testing.

#### How do Docker volumes help persist PostgreSQL data?
Docker volumes allow the container to store database files outside of its internal file system. In my `docker-compose.yml`, I linked the container’s PostgreSQL data directory (`/var/lib/postgresql/data`) to a local `./data` folder. This means:

- Data I insert into PostgreSQL is saved to my local machine
- Even if the container is stopped or removed, the data remains intact
- The `./data` folder acts as persistent storage for the PostgreSQL service

This approach is essential for maintaining a reliable development setup where I don’t lose data across container restarts or rebuilds.

#### How can you connect to a running PostgreSQL container?
To connect to the PostgreSQL container, I used the `psql` command-line tool. After running `docker-compose up`, I connected like this:

```bash
docker exec -it <container_name_or_id> psql -U myuser -d mydb
```
To get into the interactive PostgreSQL shell and execute SQL commands, I can run them directly in the `psql` shell. For example, I can run `SELECT 'It works!' AS greeting;` to test the connection (as I mentioned above). This command returns a simple message if the connection is successful.
