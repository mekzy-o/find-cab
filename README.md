# Find a Cab API
[![Maintainability](https://api.codeclimate.com/v1/badges/177b32320654d2db3f10/maintainability)](https://codeclimate.com/github/mekzy-o/find-cab/maintainability)
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)

This repository houses code for [Find a Cab](https://find-cab.herokuapp.com/api/v1/docs)'s backend.

## Table of Contents

- [Find a Cab](#address-book)
  - [Table of Contents](#table-of-contents)
  - [About the Project](#about-the-project)
    - [HTTP Response Codes](#http-response-codes)
    - [Sample HTTP Response](#sample-http-response)
  - [Project Payload](#project-payload)
  - [Getting Started](#getting-started)
    - [Dependencies](#dependencies)
    - [Getting the Source](#getting-the-source)
    - [Installation & Usage](#installation-usage)
    - [Running Tests](#running-tests)
  - [How to Get Help](#how-to-get-help)
  - [Contributing](#contributing)
  - [License](#license)
  - [Authors](#authors)

## About the Project

This is a simple RESTful API for finding a cab (4km away from you) service. Part of an online assessment for [Chekkit Technologies](https://chekkitapp.com/about-us) Backend Engineer Position. 

It allows a user to:
- Register a new account pending verification.
- Log in to the verified account.
- Share/create their location with the platform

It allows non-authenticated passengers to:
- Enter a location (latitude, longitude) and search for available cabs 4km or less around them 


### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `400` `Bad Request` There was a problem with the request (security, malformed)
- `401` `Unauthorized` The supplied API credentials are invalid
- `403` `Forbidden` The credentials provided do not have permissions to access the requested resource
- `404` `Not Found` An attempt was made to access a resource that does not exist in the API
- `500` `Server Error` An error on the server occurred

### Sample HTTP Response

The API response, to the best of my ability, is structure after JSEnd specifications.

- For a `success` response, the server will return a response of this format:

```
{
  "status": "success",
  "message": "success message from the API server"
  "data": { ... }
}
```

- For an `error` response, the server will return a response of this format. The `trace` key in the `error` object is returned if `NODE_ENV === development`.

```
{
  "status": "error",
  "message":"error message from API server"
  "data": {
    "trace": {
      "statusCode": <status-code>
    }
  }
}
```

## Project Status


## Project Payload

- [Project Entities Model](https://dbdiagram.io/d/60eb4c897e498c3bb3f164a7)
- [API on Staging Environment](https://find-cab.herokuapp.com/api/v1)
- [API Documentation](https://find-cab.herokuapp.com/api/v1/docs)

## Getting Started

### Dependencies

This project uses [Express.js](https://expressjs.com/). It has the following dependencies:

- [Node.js](https://nodejs.org/en/download)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL Database](https://www.postgresql.org/download/)
- [Sequelize](https://sequelize.org)

### Third party Services

- [Docker](https://www.docker.com) for containerization of application.
- [Heroku](https://www.heroku.com/) for hosting the API.

### Getting the Source

This project is hosted on [Github](https://github.com/mekzy/find-cab). You can clone this project directly using this command:

```sh
git clone https://github.com/mekzy/find-cab.git
```

### Installation & Usage

- Create a PostgreSQL database by running the `cmd` below:

```sh
createdb -h localhost -p 5432 -U postgres <database_name>
```

- After cloning the repository, create a `.env` file from `.env.example` and set your local `.env.` variable(s).

```sh
cp .env.example .env
```
- Install the dependencies

```sh
yarn install
```
- Run migration

```sh
yarn run migrate
```
- You can run the server using

```sh
yarn run start:dev
```
- Other `npm` or `yarn` scripts are also available for handling database migration and database seeding:
  - `db:rollback`: undoes the effect of `npm run migrate`,
  -  `migrate:seed`: "seeds the database if there's a seed file"

### Running Tests

To run tests, run

```sh
yarn run test
```

## How to Get Help

Notice a bug? Please open an issue. Need more clarification on any part of the code base? Contact [Emeka Ofe](https://github.com/mekzy-o).

## Contributing

To contribute to this project, start by raising an issue. There are issue templates for bug and feature request. Once this issue has been agreed upon, you can create a feature or hotfix branch off develop or master (for hotfix) and raise PR. There is also a PR template.

## License

This project is licensed under the [MIT License]('https://opensource.org/licenses/MIT')

## Authors

- **[Emeka Ofe](https://github.com/mekzy-o)** - _Initial work_