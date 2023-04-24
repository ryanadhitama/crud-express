# CRUD using Express

## Tools

- Visual Studio Code

## Extension Visual Studio Code

- Prettier - Code formatter
- GitLens — Git supercharged
- EditorConfig for VS Code

## How to Use

1. Clone this repository
2. Make sure project folder already active at terminal / command line.
3. Run `npm install` to install dependency
4. Run `npm run db:create` to configure db, `npm run db:migrate` to migrate table, `npm run db:seed` to insert initial data into db
5. Run `npm run prepare` to setup husky
6. Run `npm run start` to run project
7. Happy Hacking

## Endpoint list

| Route         | Method   | Description       |
| ------------- | -------- | ----------------- |
| /v1/books     | `GET`    | Get books list    |
| /v1/books/:id | `GET`    | Get book by ID    |
| /v1/books     | `POST`   | Save new book     |
| /v1/books/:id | `PUT`    | Update book by ID |
| /v1/books/:id | `DELETE` | Delete book ID    |

## Swagger

| Route    | Method | Description     |
| -------- | ------ | --------------- |
| /v1/docs | `GET`  | Show swagger UI |
