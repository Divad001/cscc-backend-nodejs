# CodingSans CodingChallenge 2020 Fall Backend Task

Please use typescript, we included linting and testing in this project.

You can start the project with `yarn start`.
You can check the lint and formatting of the project with `yarn lint`.

If you are using VSCode you can use these extensions:
- https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
- https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

## Task 1

Create a web server

For the web serving part you could use either 
- [Koa](https://koajs.com/)
- [Express](https://expressjs.com/)
- [Fastify](https://www.fastify.io/)

## Task 2

Add a logger

Please include a middleware for logging on all requests
- https://github.com/koajs/logger
- https://github.com/expressjs/morgan

## Task 3

Add an endpoint which will serve the OpenBrewery API

The breweries endpoint ( `GET /breweries` )

The datasource should be the OpenBreweryDB https://www.openbrewerydb.org/

Yoou should forward the requests to the `https://api.openbrewerydb.org/breweries` endpoint.

To fetch the data use either:
- https://github.com/axios/axios
- https://github.com/bitinn/node-fetch

## Task 4

Extend the breweries endpoint with a search query.

The search param should be provided in the query params ( `GET /breweries?query=dog` )

Use the search API to fetch the data `https://api.openbrewerydb.org/breweries/search?query=dog`

## Optional Task

Add Authentication to the server.

The login endpoint ( `POST /login` ) should return a signed JWT token on correct username/password.

The token should be signed with https://github.com/auth0/node-jsonwebtoken and the signing secret should be provided via config.

Username and password should be hard coded in the source code.

The POST request's body should contain `{ username: string, password: string }`.

401 on Bad password or username.

200 on OK, return a JWT.


If the user called any other then `POST /login` or `GET /breweries` return `404`.

## Optional Task 2

Header https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization should contain a valid JWT.

If the user is not authenticated on `GET /breweries` return `401`.
