# Data management with Prisma

## Description

This demo is based on the project 'Data management with TypeORM'
(part of the course Programming 3 at Arteveldehogeschool Gent).
It has been refactored to use [Prisma](https://www.prisma.io/)

## Installation

```bash
$ npm install
$ npx prisma
$ npx prisma migrate dev
```

You should add a .env file containing:

```bash
PORT=3000
DATABASE_URL="file:./dev.db"
```

## Running the App

```bash
$ npm run start
```

## Authors
- Tim De Paepe [@timdpaep](https://github.com/timdpaep)
- Frederick Roegiers [@rogerthat-be](https://github.com/rogerthat-be)
- Refactored by me
