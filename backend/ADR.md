# Architectural Decision Record (ADR)

## Contexto

Este backend fue diseñado para la prueba técnica Signal Watcher (Full-Stack AI-first), priorizando modularidad, escalabilidad y mantenibilidad. Cada capa está desacoplada y testeable, facilitando la integración de IA, cache, observabilidad y la extensión futura.

---

## Decisiones principales y patrones arquitectónicos

### 1. Modularización por capas y patrones

- Controllers, services, repositories, mappers, DTOs, middlewares y adapters.
- Dependency Injection (DI) para testabilidad y flexibilidad.
- Adapter pattern para IA y cache.
- DTOs validados con Zod.
- Repository pattern para acceso a datos.
- Middleware para validación, autenticación, logging y errores.
- **Alternativas consideradas:**
  - Arquitectura monolítica tradicional (descartada por baja escalabilidad y testabilidad).
  - Arquitectura hexagonal (Ports & Adapters): evaluada y descartada por falta de tiempo y complejidad extra para la prueba técnica. Se priorizó una modularidad clara y rápida de implementar.

### 2. Abstracción por interfaces

- **Motivo:** Permitir el desacoplamiento y la fácil sustitución de implementaciones (ej: cache, IA, repositorios).
- **Implementación:** Interfaces para servicios, repositorios y adaptadores, facilitando el testing y la extensión futura.
- **Alternativas consideradas:** Implementaciones directas (descartadas por baja testabilidad y flexibilidad).

### 3. Validación con Zod y DTOs

- **Motivo:** Validar payloads de forma segura y declarativa, evitando errores de datos y mejorando la DX.
- **Implementación:** DTOs validados en middlewares antes de llegar a controllers, con mensajes claros de error.
- **Alternativas consideradas:** Validación manual o con Joi (Zod elegido por mejor integración con TypeScript y DX).

### 4. Cache desacoplado (Redis/Memory)

- **Motivo:** Mejorar performance y escalabilidad, permitiendo fallback en desarrollo/test.
- **Implementación:** Adaptador para Redis con fallback a memoria, usando interfaces y DI.
- **Alternativas consideradas:** Cache directo en servicios (descartado por baja flexibilidad y testabilidad).

### 5. Integración IA desacoplada

- **Motivo:** Permitir cambiar entre OpenAI y Azure sin modificar el core, y facilitar el test con mocks.
- **Implementación:** Adapter pattern para IA, con mock para test y configuración por env.
- **Alternativas consideradas:** Integración directa (descartada por baja flexibilidad y vendor lock-in).

### 6. Observabilidad y métricas

- **Motivo:** Facilitar monitoreo, debugging y trazabilidad.
- **Implementación:** Endpoints de healthcheck, métricas y traceId en logs. Logging estructurado y centralizado.
- **Alternativas consideradas:** Logs simples (descartados por baja visibilidad en producción y troubleshooting).

### 7. Manejo centralizado de errores

- **Motivo:** Mejorar la experiencia de desarrollo y la robustez, evitando duplicidad y respuestas inconsistentes.
- **Implementación:** Middleware global de errores y logs estructurados, mapeando excepciones de dominio, HTTP y base de datos.
- **Alternativas consideradas:** Manejo ad-hoc en cada endpoint (descartado por inconsistencia y dificultad de mantenimiento).

### 8. Seguridad

- **Motivo:** Proteger endpoints sensibles y datos de usuario.
- **Implementación:** JWT, bcrypt, validación de payloads, CORS y separación de rutas públicas/privadas.
- **Alternativas consideradas:** Sesiones tradicionales (descartadas por menor escalabilidad en microservicios y cloud).

### 9. Testing y cobertura

- **Motivo:** Garantizar calidad y evitar regresiones.
- **Implementación:** Tests unitarios y de integración con Jest y Supertest, cubriendo todos los endpoints y flujos principales.
- **Alternativas consideradas:** Tests manuales (descartados por baja confiabilidad y velocidad de desarrollo).

### 10. Escalabilidad y extensibilidad

- **Motivo:** Permitir agregar nuevas entidades, servicios o integraciones sin romper el core.
- **Implementación:** Modularidad estricta, interfaces y DI, siguiendo principios SOLID y Clean Architecture.
- **Alternativas consideradas:** Código acoplado y sin interfaces (descartado por dificultad de mantenimiento y extensión).

---

## Futuras mejoras

- Implementar rate limiting y protección anti-abuso.
- Mejorar la trazabilidad con distributed tracing.
- Integrar tests E2E y cobertura automática.
- Documentar OpenAPI/Swagger.
- Refactorizar hacia arquitectura hexagonal si el proyecto escala o requiere mayor desacoplamiento.

---

## Referencias

- [Azure: Architecture decision record](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record)
- [Hexagonal Architecture](https://www.geeksforgeeks.org/system-design/hexagonal-architecture-system-design/)
