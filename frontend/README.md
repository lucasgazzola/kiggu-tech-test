lucasgazzola: Armá un readme con la documentación de todas las rutas de mi api. Con sus respectivos bodys para que funcione la request.

GitHub Copilot: Aquí tienes la documentación de las rutas de tu API, incluyendo los bodys necesarios para cada request:

---

# Documentación de Rutas API

## Auth

- **POST /auth/register**
  - Body:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string (mínimo 6 caracteres)"
    }
    ```
- **POST /auth/login**
  - Body:
    ```json
    {
      "email": "string",
      "password": "string (mínimo 6 caracteres)"
    }
    ```
- **POST /auth/logout**

  - Header: Authorization: Bearer {token}
  - Body: `{}`

- **GET /auth/me**

  - Header: Authorization: Bearer {token}

- **DELETE /auth/:id** (Solo para test)
  - Header: Authorization: Bearer {token}

---

## Events

- **POST /events/**
  - Body:
    ```json
    {
      "title": "string",
      "description": "string (opcional)",
      "status": "NEW | REVIEWED | CLOSED (opcional)"
    }
    ```
- **POST /events/:id/enrich**
- **GET /events/:id**
- **GET /events/**
- **PUT /events/:id**
  - Body:
    ```json
    {
      "title": "string (opcional)",
      "watchlistId": "uuid (opcional)",
      "date": "date (opcional)",
      "location": "string (opcional)",
      "description": "string (opcional)",
      "status": "NEW | REVIEWED | CLOSED (opcional)",
      "severity": "LOW | MED | HIGH | CRITICAL (opcional)",
      "summary": "string (opcional)",
      "suggestedAction": "string (opcional)"
    }
    ```

---

## event-matches

- **GET /event-matches/:id**
- **GET /event-matches/**
- **GET /event-matches/events/:eventId/watchlists**
- **GET /event-matches/watchlist/:watchlistId/events**
- **GET /event-matches/term/:termId**
- **GET /event-matches/watchlist/:watchlistId**

---

## Health

- **GET /health/**
- **GET /health/full**

---

## Watchlist

- **GET /watchlist/:id**
- **GET /watchlist/**
- **POST /watchlist/**
  - Body:
    ```json
    {
      "name": "string",
      "description": "string (opcional)",
      "ownerId": "uuid",
      "terms": [{ "value": "string" }]
    }
    ```
- **DELETE /watchlist/:id**

---

## WatchlistTerm

- **GET /watchlist-terms/:id**
- **GET /watchlist-terms/**
- **POST /watchlist-terms/**
  - Body:
    ```json
    {
      "value": "string"
    }
    ```
- **DELETE /watchlist-terms/:id**

---
