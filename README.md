# FHIR DATA QUEUES

## Description

This is a project to process FHIR data from bundles to a queue.This queue can then be consumed to load the data into a FHIR server. The project is built using NestJS and experimented with 3 databases (Postgres, MongoDB, Cassandra). 

The implementations are the same, the only difference is the underlying database. For your own implementation, you can decide to use any of the three databases.

A cron job is used to process the data from the queue. The cron job is scheduled to run every 1 minutes. The cron job is implemented using `node-schedule` module.

You can change the cron job to run at any interval you want. You can also change the implementation to use any other cron job module.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Stay in touch

- Author - [Adenle Abiodun](https://github.com/abbeyseto)

## License

Nest is [MIT licensed](LICENSE).
