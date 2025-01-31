# Full Stack Authentication App

A modern full-stack authentication application built with Next.js 14 and Hono.

## Project Structure

```
.
├── client/          # Next.js 15 frontend application
└── server/          # Hono Bun backend API
```

## Features

- 🔐 Secure authentication with JWT
- 🔑 Session management
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 🚀 Fast and lightweight API with Hono
- 🗃️ PostgreSQL database with Drizzle ORM
- 📱 Responsive design
- 🔒 Protected routes

## Tech Stack

### Frontend (client/)

- Next.js 15
- React Query
- Tailwind CSS
- shadcn/ui
- TypeScript
- Axios

### Backend (server/)

- Hono
- Drizzle ORM
- PostgreSQL
- Bun
- TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- Bun
- Neon PostgreSQL database

### Setting up the Backend

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
bun install
```

3. Copy the environment example file:

```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:

```
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_jwt_secret
```

5. Run database migrations:

```bash
bun run db:migrate
```

6. Start the development server:

```bash
bun run dev
```

The server will start on http://localhost:4444

### Setting up the Frontend

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Copy the environment example file:

```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:4444
```

5. Start the development server:

```bash
npm run dev
```

The client will start on http://localhost:3000

## API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /auth/profile` - Get user profile (protected)

### Health Check

- `GET /health` - API health check

## License

MIT
