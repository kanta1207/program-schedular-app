# Project Scheduler API

## Project Setup Guide

This guide provides instructions on how to set up the project environment locally using Docker and Docker Compose.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://formulae.brew.sh/formula/docker-compose)

### Configuration

1. Clone the repository to your local machine:

   ```bash
   git clone https://your-repository-url.git
   cd your-repository-directory
   ```

2. Copy the sample environment variables file to create your own `.env` file:
   ```bash
   cp .env.example .env
   ```
3. Open the `.env` file in your editor and update the environment variables to match your local setup. The most important variables to update are:
   - `POSTGRES_USER` - The PostgreSQL username.
   - `POSTGRES_PASSWORD` - The password for the PostgreSQL user.
   - `POSTGRES_DB` - The PostgreSQL database name.
   - `POSTGRES_PORT` - The port on which PostgreSQL will run inside the container.
   - `POSTGRES_PORT_OUTSIDE` - The port on your host machine that will be mapped to `POSTGRES_PORT`.
   - `APP_PORT` - The port on which the application will be accessible from your host machine.

### Building and Running the Project

1. Build the Docker images without using cache (to ensure you get the latest versions of everything):

   ```bash
   docker-compose build --no-cache
   ```

2. Start the containers:

   ```bash
   docker-compose up
   ```

   Alternatively, to run the containers in the background, use:

   ```bash
   docker-compose up -d
   ```

3. The application should now be running and accessible via `http://localhost:<APP_PORT>` (replace `<APP_PORT>` with the value from your `.env` file).

### Stopping the Containers

To stop the containers, use:

```bash
docker-compose down
```

To stop the containers and remove all volumes (which will erase the database), use:

```bash
docker-compose down -v
```
