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

- **POST /event/**
  - Body:
    ```json
    {
      "title": "string",
      "description": "string (opcional)",
      "status": "NEW | REVIEWED | CLOSED (opcional)"
    }
    ```
- **POST /event/:id/enrich**
  - Body:
    ```json
    {
      "summary": "string",
      "severity": "LOW | MED | HIGH | CRITICAL",
      "suggestedAction": "string"
    }
    ```
- **GET /event/:id**
- **GET /event/**
- **PUT /event/:id**
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

## EventMatch

- **GET /eventMatch/:id**
- **GET /eventMatch/**
- **GET /eventMatch/event/:eventId/watchlists**
- **GET /eventMatch/watchlist/:watchlistId/events**
- **GET /eventMatch/term/:termId**
- **GET /eventMatch/watchlist/:watchlistId**

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

- **GET /watchlistTerm/:id**
- **GET /watchlistTerm/**
- **POST /watchlistTerm/**
  - Body:
    ```json
    {
      "value": "string"
    }
    ```
- **DELETE /watchlistTerm/:id**

---
