# Docker Introduction
Docker is a platform that allows developers to automate the deployment of applications inside lightweight, portable containers. These containers can run on any system that has Docker installed, making it easier to ensure consistency across different environments. It improves the development workflow by allowing developers to package applications with all their dependencies, ensuring that they run the same way regardless of where they are deployed.

## Tasks
### Understand What Docker Is and How It differs from Virtual Machines
- **Docker**: A platform for developing, shipping, and running applications in containers.
    - **Containers**: Lightweight, portable, and self-sufficient units that package an application and its dependencies together. They share the host OS kernel but run in isolated user spaces.
    - **Images**: Read-only templates used to create containers. They contain the application code, libraries, and dependencies needed to run the application.
    - **Dockerfile**: A text file that contains a series of instructions on how to build a Docker image. It specifies the base image, application code, dependencies, and configuration settings.
    - **Docker Hub**: A cloud-based registry for sharing Docker images. It allows users to find and download pre-built images or upload their own images for others to use.
    > **Use Cases**: Docker is commonly used for **microservices architecture**, continuous integration/continuous deployment (CI/CD) pipelines, and simplifying development environments.
- **Virtual Machines (VMs)**: Emulate entire hardware systems (full OS and runs on hypervisors like VirtualBox or VMware), running multiple OS instances on a single physical machine.
- **Key Differences**:
    - **Resource Efficiency**: Docker containers share the host OS kernel, making them more lightweight and faster to start than VMs, which require a full OS for each instance.
    - **Isolation**: Containers provide process-level isolation, while VMs provide hardware-level isolation.
    - **Portability**: Docker containers can run on any system with Docker installed, while VMs are tied to the hypervisor and the underlying hardware.
### Understand the Benefits of Using Docker in a Backend Environment
- Consistent development and deployment environments
- Easy onboarding with shared Docker images
- Simplified dependency management and isolation
- Scalable and flexible with orchestration tools (e.g., Kubernetes)
- Streamlined deployment and testing (Docker Compose)
- Version control and easy rollback for images
- Access to a large ecosystem of pre-built images (Docker Hub)

### How Containers Help Maintain Consistency Across Environments
- Using Docker images and containers ensures applications run the same way in development, testing, and production across all machines. 
    - Versioned images allow easy rollback to previous versions. 
    - Containers provide isolated environments, preventing dependency and configuration conflicts, so applications like Node.js or Python run consistently regardless of the host OS.

### Review how Focus Bear uses Docker in backend services
I don't have access to the internal repo of Focus Bear at the moment, but I understand that Focus Bear uses Docker, especially Docker Compose for the backend services. Docker Compose allows developers to manage PostgreSQL, Redis, NestJS API and other services in a single configuration file with defined dependencies and environment variables. This setup ensures that all services can be started, stopped, and managed together by using simple `docker compose` commands.

### How does Docker differ from a virtual machine?
Docker containers run on the hostOS and share the host OS kernel, while VM run a full OS on a hypervisor like VirtualBox or VMware. This makes Docker much more lightweight and faster to start (you can simply use `docker run` to start a container). 
### Why is containerization useful for a backend like Focus Bear’s?
Containerisation is ideal for Focus Bear's backend because it allows for consistent environments across development, testing, and production. It also lets developers to run multiple services (like PostgreSQL, Redis, and NestJS Backend API) in isolated environments with pre-defined dependencies, making it easier to manage, debug and scale the application. Docker Compose simplifies the orchestration of these services, allowing developers to define how they interact in a single configuration file.
### How do containers help with dependency management?
Each container includes only the libraries and tools needed for that service (e.g., specific versions of Node.js or Python). This avoids conflicts with system-level dependencies and makes the project easier to set up and maintain. 
> *For example, different versions of Node.js can be run in different containers without interfering with each other.*

### What are the potential downsides of using Docker?
- **Resource Overhead:** Running many containers can consume significant system resources, especially on limited hardware.
- **Security Risks:** Containers share the host OS kernel, so a vulnerability in the kernel can affect all containers.
- **Networking Complexity:** Managing container networking and communication can be complex, especially in large systems.
- **Persistent Data Management:** Handling data persistence and storage across container restarts or updates requires extra setup and configuration.
- **Learning Curve:** Docker and container orchestration tools (like Docker Compose or Kubernetes) have a learning curve for new users.