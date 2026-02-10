# Workshop Booking API

Node.js API for booking workshops. Used as a scaffold for the testing handbook.

## Setup

1. Start the database:

```bash
docker compose up -d
```

2. Install dependencies:

```bash
npm install
```

3. Run database migrations:

```bash
npx prisma migrate dev
```

4. Start the development server:

```bash
npm run dev
```

Server runs at http://localhost:3000. Swagger docs at http://localhost:3000/docs.

## Testing

1. Migrate the test database:

```bash
npm run migrate:test
```

2. Run tests:

```bash
npm test
```

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/health` | Health check |
| POST | `/users` | Create user |
| POST | `/workshops` | Create workshop |
| POST | `/bookings` | Create booking |
