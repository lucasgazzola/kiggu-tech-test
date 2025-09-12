# Informe Técnico - API Backend

## Introducción

Esta API está desarrollada en Node.js con TypeScript y Express, utilizando Prisma como ORM para la gestión de base de datos PostgreSQL. El objetivo principal es gestionar eventos, usuarios, listas de seguimiento (watchlists) y términos asociados, permitiendo la integración con sistemas de enriquecimiento automático (mock IA y OpenAI).

El proyecto está estructurado siguiendo buenas prácticas de arquitectura, con separación de responsabilidades en controladores, servicios, repositorios y DTOs. Incluye autenticación JWT, validaciones con Zod y manejo centralizado de errores.

## Estructura General

- **src/**: Código fuente principal
  - **controllers/**: Lógica de endpoints
  - **services/**: Reglas de negocio
  - **repositories/**: Acceso a datos
  - **dtos/**: Validaciones y tipos
  - **adapters/**: Integraciones externas (IA)
  - **models/**: Modelos de dominio
  - **routes/**: Definición de rutas
- **prisma/**: Esquema y migraciones de base de datos
- **tests/**: Pruebas unitarias y de integración

## Autenticación

La API utiliza JWT. Para acceder a rutas protegidas, se debe enviar el token en el header:

```
Authorization: Bearer <token>
```

## Endpoints Principales

## Auth

- **POST /auth/register**
  - Registra un nuevo usuario.
  - Body:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string (mínimo 6 caracteres)"
    }
    ```
- **POST /auth/login**
  - Inicia sesión y devuelve un JWT.
  - Body:
    ```json
    {
      "email": "string",
      "password": "string (mínimo 6 caracteres)"
    }
    ```
- **POST /auth/logout**

  - Cierra la sesión del usuario autenticado.
  - Header: Authorization: Bearer {token}
  - Body: `{}`

- **GET /auth/me**

  - Devuelve los datos del usuario autenticado.
  - Header: Authorization: Bearer {token}

- **DELETE /auth/:id** (Solo para test)
  - Elimina el usuario por ID. Solo para pruebas.
  - Header: Authorization: Bearer {token}

## Events

- **POST /event/**
  - Crea un nuevo evento.
  - Body:
    ```json
    {
      "title": "string",
      "description": "string (opcional)",
      "status": "NEW | REVIEWED | CLOSED (opcional)"
    }
    ```
- **POST /event/:id/enrich**
  - Enriquecimiento automático del evento (mock IA/OpenAI).
  - Body:
    ```json
    {
      "summary": "string",
      "severity": "LOW | MED | HIGH | CRITICAL",
      "suggestedAction": "string"
    }
    ```
- **GET /event/:id**
  - Obtiene un evento por ID.
- **GET /event/**
  - Lista todos los eventos.
- **PUT /event/:id**
  - Actualiza los datos de un evento.
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

## EventMatch

- **GET /eventMatch/:id**
  - Obtiene un match por ID.
- **GET /eventMatch/**
  - Lista todos los matches.
- **GET /eventMatch/event/:eventId/watchlists**
  - Lista los matches de watchlists para un evento.
- **GET /eventMatch/watchlist/:watchlistId/events**
  - Lista los matches de eventos para una watchlist.
- **GET /eventMatch/term/:termId**
  - Lista los matches por término.
- **GET /eventMatch/watchlist/:watchlistId**
  - Lista los matches por watchlist.

## Health

- **GET /health/**
  - Verifica el estado básico de la API.
- **GET /health/full**
  - Verifica el estado completo de la API y dependencias.

## Watchlist

- **GET /watchlist/:id**
  - Obtiene una watchlist por ID.
- **GET /watchlist/**
  - Lista todas las watchlists.
- **POST /watchlist/**
  - Crea una nueva watchlist.
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
  - Elimina una watchlist por ID.

## WatchlistTerm

- **GET /watchlistTerm/:id**
  - Obtiene un término por ID.
- **GET /watchlistTerm/**
  - Lista todos los términos.
- **POST /watchlistTerm/**
  - Crea un nuevo término.
  - Body:
    ```json
    {
      "value": "string"
    }
    ```
- **DELETE /watchlistTerm/:id**
  - Elimina un término por ID.

## Consideraciones Técnicas

- Todas las rutas que modifican datos requieren autenticación.
- Los datos se validan con Zod antes de ser procesados.
- El enriquecimiento de eventos puede ser realizado por IA mock o OpenAI, según configuración.
- Prisma gestiona la persistencia y las migraciones.
- El sistema está preparado para escalar y agregar nuevas entidades fácilmente.

## Ejemplo de Flujo

1. El usuario se registra y obtiene un token.
2. Crea una watchlist con términos.
3. Un evento es disparado (simulado) y se asocia a una watchlist si coincide con elgún termino.
4. Enriquecer el evento usando IA.
5. Consultar matches y estado de la API.
