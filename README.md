# Koa2 Boilerplate

Simple Koa 2 starter.
The purpose is to include the minimum Babel plugins required to ensure a fast runtime transformation (useful when using nodemon).

_Including :_ 
- Koa router
- Koa Cors
- Koa BodyParser
- Koa Logger
- Koa Helmet
- Mongoose
- Mongoose Paginate
- Mongoose timestamp
- Mongoose UniqueValidator

## Requirement
We use docker, so please download the last version.

## Usage
```
$ git clone git@github.com:Mathew78540/koa2-boilerplate.git

$ docker-compose up
```

## Test
```
$ npm test
```

## CLI
```
$ npm run cli:routes 'List all routes'
$ npm run cli:generate-service 'Generate a new service'
```
