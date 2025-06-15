# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker Desktop - [Download & Install Docker Desktop](https://docs.docker.com/desktop/uninstall/).

## Downloading

```
git clone https://github.com/BodnarAlex/2025Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

1. Just in case, I returned `.env` from `.gitignore`, so now you don't have to create it. This is bad practice, but at the same time it protects you from an inattentive reviewer.

2. Don't forget to clear your entire workspace from containers, images, variables. Anything can affect the process.

You can do it in the Docker Desktop or enter the command
```
docker system prune -a
```

3. Be sure to check the free space on your computer. 3 gigabytes can quickly run out and lead to an error.

4. I recommend starting with the command -

```
npm run docker:down
```

It will remove the migration, clean the containers if they are not frozen.
If the container is frozen, then delete it manually in the Docker table, in the containers section, and also delete the /migrations folder

5. The second command -
```
npm run migration:full
```
It raises the pg image, generates and runs migrations. Sometimes it can freeze a little - restart it again.

6. Command
```
npm run docker:compose

```
Will run compose and start the server

7. At this stage, you need to open another terminal and now you can check what you need; tests, images, containers.

The default port is 4000. However, you can copy the .env and create your own /env to set any port as your default

To check the work, swagger, tests, you need to leave the server open.
Work in another terminal tab.

8. If the commands are over-processed and Docker Desktop is not responding or no longer opens, rebooting the computer will help

## Testing

After application running open new terminal and enter:

To run all tests for Home Library Service: Part 1

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

Optional for first week check:
- `npm test -- test/albums.e2e.spec.ts`
- `npm test -- test/users.e2e.spec.ts`
- `npm test -- test/artists.e2e.spec.ts`
- `npm test -- test/tracks.e2e.spec.ts`
- `npm test -- test/favorites.e2e.spec.ts`

### Auto-fix and format

There are no errors when working with these scripts.

```
npm run lint
```

```
npm run format
```

### Postman

If you want to test the functionality of the application, use REST in Postman.
Enter your endpoint, for example, `http://localhost:4000/favs/track`.
Enter the desired action and body, and then send.

### Swagger

OpenAPI spec in doc folder corresponds with assignment

You can look at the default swagger of this app on this path
`http://localhost:4000/doc`

If you changed the port in ENV, then insert your port for correct operation
`http://localhost:PORT/doc`

In this way, you can directly use entities and actions to test the work.

### Docker

Link to the image in DockerHub - https://hub.docker.com/r/bodnaralex/2025q2-service-app/tags

To manually clean up all Docker resources (stopped containers, unused images, volumes, networks) use:

```
docker system prune -a
```

To list all Docker images available on your system.Here you can make sure that the image size is less than 500MB

```
docker images
```

Other commands can be called from a script:
- Stop and remove all containers, volumes, and images associated with the project - `npm run docker:down`
- Run containers with docker-compose in development mode - `npm run docker:compose`

### Scanning

Runs a security check on Docker images using Docker Scout. This script scans containers and displays the presence of vulnerabilities, and reports any issues found.

```
npm run docker:scan

```

### Migrations

- Migrations are stored in the src/migrations folder.

- When running `docker:down` , migrations are automatically removed `(del-cli "src/migrations/*.ts")` to avoid conflicts when running again.

- If the container is stuck, migrations can be manually removed from the `src/migrations` folder.

Other commands can be called from a script:
- Start a container with Postgres and generate a migration - `npm run migration:generate`
- Apply all migrations to the database - `migration:prep`
- Generate a migration and apply all migrations at once (full cycle) - `migration:full`
- Roll back the last migration - `npm run migration:revert`

### Logging and error handling

For check uncaughtException and unhandledRejection.

Use the lines below in main.ts file after listening on the port, on line 62.

```
  setTimeout(() => {
    Promise.reject(new Error('Test unhandled rejection'));
  }, 3000);

  setTimeout(() => {
    console.log('Throwing uncaught error...');
    throw new Error('Test uncaught exception');
  }, 3000);
```
