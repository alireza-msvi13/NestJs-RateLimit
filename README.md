<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# NestJs-RateLimit

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.0-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Available-blue.svg)](https://www.docker.com/)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![Coverage](https://img.shields.io/badge/Coverage-100%25-success.svg)]()

> **NestJs-RateLimit** is a production-ready backend module that provides an advanced, database-backed rate limiting mechanism for NestJS applications.
It features hierarchical user identification, progressive penalties, and full administrative control over usage limits.

---

## 📘 Overview

The NestJs-RateLimit project implements a fully configurable rate limiting solution based on NestJS Guards, with PostgreSQL persistence to ensure data integrity and scalability.
It supports both authenticated users and anonymous clients, offers smart reset mechanisms, and allows administrators to monitor, reset, or permanently block abusive clients.

The module is ideal for enterprise-grade backends requiring strict control over API traffic without sacrificing flexibility or maintainability.


---

## ⚙️ Core Features

- **Advanced Request Throttling:** Enforces request limits using a custom `RateLimitGuard`.
- **User Identification:** Supports both JWT-based user tracking and IP/device fingerprinting for unauthenticated users.
- **Progressive Penalty System:** Automatically escalates temporary bans into permanent blocks after repeated violations.
- **Smart Window Management:** Rate limit windows automatically reset every seven days, clearing old violations.
- **Decorator-Based Configuration:** Define rate limits directly in controllers using the `@RateLimit()` decorator.
- **Administrative Tools:** Includes API endpoints to view records, manually block or unblock users, and reset violations.
- **Persistent Storage:** Tracks request activity through a dedicated PostgreSQL entity.
- **Comprehensive API Documentation:** Full Swagger integration available at `/v1/api-doc`.

---

## How It Works

- **Client Identification:**  
   Each incoming request is uniquely identified either by a user ID (for authenticated users) or by a hashed fingerprint derived from the client’s IP, browser, and device information.

- **Configuration:**  
   Developers define rate limits per route using a simple decorator:

   ```ts
   @RateLimit({ max: 5, duration: 10 }) // 5 requests per 10 minutes
    ````

- **Request Handling Flow:**

   * The guard intercepts each request and retrieves or creates a rate limit record in the database.
   * The system verifies whether the user or fingerprint is currently blocked.
   * If the user exceeds the defined limit, a violation is recorded, and a temporary block is applied.
   * Repeated violations trigger longer bans until a permanent block is enforced.

- **Penalty Progression:**

  | Violation | Block Duration |
  | --------- | -------------- |
  | 1st       | 10 minutes     |
  | 2nd       | 1 hour         |
  | 3rd       | 6 hours        |
  | 4th       | 1 day          |
  | 5th+      | Permanent ban  |

- **Window Reset:**
  
   Each user’s activity window resets automatically every seven days, clearing temporary violations and restoring access for non-permanently banned users.

---

## 🧱 Data Model

**Entity:** `RateLimitRecord`

| Field            | Description                          |
| ---------------- | ------------------------------------ |
| `identifier`     | Unique user or fingerprint           |
| `endpoint`       | Tracked API route                    |
| `requestCount`   | Number of requests in current window |
| `violationCount` | Number of total violations           |
| `blockStatus`    | None / Temporary / Permanent         |
| `blockExpiresAt` | Timestamp for temporary bans         |
| `windowStart`    | Start of current rate limit window   |

---

## 🧩 Example Usage

```ts
@Controller('contact')
export class ContactController {
  @RateLimit({ max: 3, duration: 10 }) // Allows 3 requests every 10 minutes
  @UseGuards(RateLimitGuard)
  @Post()
  async create(@Body() dto: ContactDto) {
    return this.contactService.create(dto);
  }
}
```
- This setup ensures that excessive requests to the /contact endpoint are automatically throttled, logged, and penalized as necessary.

---

## 🧭 Admin Capabilities

| Endpoint                       | Description         |
| ------------------------------ | ------------------- |
| `GET /rate-limit/records`      | View all records    |
| `POST /rate-limit/block/:id`   | Manually block user |
| `POST /rate-limit/unblock/:id` | Unblock user        |
| `POST /rate-limit/reset/:id`   | Reset violations    |


---

## 🛠️ Installation and Setup

1.Clone the `repo` using the following command:
   ```sh
   git clone https://github.com/alireza-msvi13/NestJs-RateLimit.git
   ```
2.Install all required dependencies using npm:
   ```sh
   npm install
   ```
3.Create .env file and set these
   ```sh
    # APP
    APP_PORT=3000
    NODE_ENV=development

    # DB
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=password
    DB_NAME=rate_limit_db
   ```

3.Start Project with Docker:
   ```sh
   docker-compose up -d
   ```

---

## 📁 Project Structure

```
NestJs-RateLimit/  
├── src/  
│   ├── main.ts                    # Application entry point  
│   ├── app.module.ts              # Root module  
│   ├── app.controller.ts          # Health check endpoints  
│   ├── app.service.ts             # Health check logic  
│   ├── configs/  
│   │   └── typeorm.config.ts      # Database configuration  
│   ├── common/  
│   │   └── swagger/  
│   │       └── swagger.config.ts  # API documentation setup  
│   └── modules/  
│       ├── rate-limit/  
│       │   ├── rate-limit.module.ts  
│       │   ├── rate-limit.service.ts  
│       │   ├── guards/  
│       │   │   └── rate-limit.guard.ts  
│       │   ├── decorators/  
│       │   │   └── rate-limit.decorator.ts  
│       │   └── utils/  
│       │       └── user-agent.utils.ts  
│       └── contact/  
│           ├── contact.module.ts  
│           ├── contact.controller.ts  
│           └── contact.service.ts  
├── test/  
│   └── app.e2e-spec.ts            # End-to-end tests  
├── package.json  
├── nest-cli.json  
├── docker-compose.yml  
└── README.md  
```

---

## 👤 Keep in touch with me

If you have any questions or find any 🪲 you can easily send me a message

<a href="https://t.me/Alireza_msvi13" target="blank"><img align="center" src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" height="30" width="40" /></a>
