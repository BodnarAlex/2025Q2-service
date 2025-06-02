# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/BodnarAlex/2025Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

The default port is 4000. However, you can copy the .env and create your own /env to set any port as your default

To check the work, swagger, tests, you need to leave the server open.
Work in another terminal tab.

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