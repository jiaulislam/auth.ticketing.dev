# Auth Service

Enterprise-grade authentication microservice for the Ticketing.dev platform. Built with Node.js, TypeScript, Express, and Prisma ORM. Provides secure user registration, login, JWT-based authentication, and user management APIs.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Docker Usage](#docker-usage)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [Testing](#testing)
- [Migrations](#migrations)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User registration and login
- JWT authentication and refresh
- Password hashing and validation
- Prisma ORM with PostgreSQL
- Centralized error handling
- Modular service and route structure
- Dockerized for production
- Environment-based configuration
- Linting and formatting (ESLint, Prettier)

## Tech Stack

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- Docker
- JWT (jsonwebtoken)
- bcrypt

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Docker & Docker Compose (for containerized setup)
- PostgreSQL database

### Installation

1. Clone the repository:

   ```sh
   git clone <repo-url> auth-service
   cd auth-service
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Copy the example environment file and configure variables:

   ```sh
   cp .env.example .env
   # Edit .env as needed
   ```

4. Run database migrations:

   ```sh
   npx prisma migrate deploy
   ```

5. Start the service:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

## Environment Variables

See [.env.example](./.env.example) for all required variables. Key variables include:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for signing JWT tokens
- `PORT` - Port to run the service
- `NODE_ENV` - Environment (development/production)
- `KAFKA_BOOTSTRAP_SERVERS` - Kafka Bootstrap Servers
- `KAFKA_CLIENT_ID` - Unique client id

## Docker Usage

Build and run the service with Docker:

```sh
docker build -t auth-service .
docker run --env-file .env -p 4000:4000 auth-service
```

Or use Docker Compose (see root `docker-compose.yml`):

```sh
docker-compose up auth-service
```

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT
- `GET /api/auth/me` - Get current user info (requires JWT)
- `POST /api/auth/logout` - Logout user
- `GET /api/users/:id` - Get user by ID

> See `src/routes/` for full route definitions.

## Development

- Lint: `npm run lint`
- Format: `npm run format`
- Dev server: `npm run dev`
- Build: `npm run build`

## Testing

> Add your test strategy here (e.g., Jest, Supertest)

## Migrations

- Create migration: `npx prisma migrate dev --name <migration_name>`
- Deploy migrations: `npx prisma migrate deploy`
- Prisma Studio: `npx prisma studio`

## Security

- Passwords hashed with bcrypt
- JWT tokens signed with strong secret
- Sensitive config via environment variables
- Follows best practices for error handling and input validation

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](./LICENSE)
