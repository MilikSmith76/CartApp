# Cart UI

This Next.JS application is a frontend UI used for adding groceries to Carts. This UI can also retrieve, create, update, and delete both groceries and carts.

## URL

When this application is live it can be seen [here](http://localhost:3000/).

## Local Dev Setup

* Copy the contents of `.example-env` to `.env`.

* Update the values in `.env` to better match your needs.

** (Note): ** This can be ignored if the Docker Compose environment is being used.

## How To Run

* Run `npm install` to install all dependencies.

* Run `npm run build` to build the project.

  * If any changes are made after building, this command must be reused to have changes reflected in a production run.

* Run `npm run start` to run the project in a production capacity.

This application can be run in a development capacity using `npm run dev`. Using this command skips the need to build the project and actively displays changes on saving of files.

** (Note): ** Run `npm run dev` for development runs of the application. This command automatically pulls in changes so they can be rendered in the UI.

** (Note): ** This project was built using Node version 22.22.0 and NPM version 10.9.3.

## Environment Variables

* `API_HOST`: The host for the Cart API. The Default should be `http://localhost:8000/api` (if a copied version of `.example-env` is used).

## How to lint and format

This application supports linting and code formating by ESlint, Prettier, and Perfectionist.

### How to lint

* Run `npm run lint`.

### How to automatically fix lint errors

* Run `npm run fix`.

### How to check for code formating errors

* Run `npm run prettier`.

### How to format code

* Run `npm run prettify`.

### How to automatically fix lint errors and format code

* Run `npm run format`.

## Testing

This application supports Jest for Unit testing and Cypress for E2E and Component testing.

### How to run Unit tests

* Run `npm run test`.

### How to run E2E tests

* Run `npm run e2e`.

** (Note): ** `npm run e2e:headless` can be used for running the tests without the GUI.

### How to Component tests

* Run `npm run component`.

** (Note): ** `npm run component:headless` can be used for running the tests without the GUI.
