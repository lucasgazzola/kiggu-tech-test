# Architecture Decision Record (ADR)

## Contexto

Este documento registra todas las decisiones arquitectónicas clave tomadas para el proyecto Signal Watcher (prueba fullstack Node.js + Next.js). El objetivo es garantizar modularidad, escalabilidad, mantenibilidad y facilidad de testing, cubriendo tanto backend como frontend.

---

## ADR-001: Stack Tecnológico

**Decisión:**
Node.js (Express + TypeScript) para el backend y Next.js (React + TypeScript) para el frontend. Prisma como ORM, Redis para cache, y adaptador IA (mock/real).

**Motivación:**

- Stack moderno, productivo y ampliamente soportado.
- Permite desarrollo fullstack con un solo lenguaje (TypeScript).
- Prisma y Redis facilitan escalabilidad y performance.
- Adaptador IA permite alternar entre proveedores reales y mock.

**Consecuencias:**

- El equipo puede trabajar con JavaScript/TypeScript en todo el stack.
- El despliegue es sencillo en plataformas cloud y on-premise.

---

## ADR-002: Estructura de Carpetas y Capas

**Decisión:**
Separar backend y frontend en carpetas independientes. El backend se organiza en capas: controllers, services, repositories, adapters, dtos, mappers, middlewares, models, config, containers, tests. El frontend se organiza en app, components, contexts, hooks, lib, public, types.

**Motivación:**

- Facilita el mantenimiento, la escalabilidad y el testing.
- Permite despliegue y evolución independiente de cada servicio.
- Cada capa tiene una responsabilidad clara y desacoplada.

**Consecuencias:**

- Mayor claridad y organización del código.
- Posibilidad de escalar, migrar o refactorizar cada parte por separado.

---

## ADR-003: Modularización y Patrones

**Decisión:**
Aplicar modularización estricta por capas y patrones: Adapter para IA y cache, Repository para acceso a datos, DTOs validados con Zod, interfaces para servicios y repositorios, DI para testabilidad.

**Motivación:**

- Desacoplar dependencias y facilitar el testing.
- Permitir sustitución de implementaciones (ej: cambiar IA, cache, DB).
- Mejorar la mantenibilidad y extensibilidad.

**Consecuencias:**

- El sistema es flexible y portable.
- Se pueden realizar pruebas automatizadas y mocks fácilmente.

---

## ADR-004: Adaptador IA (Real y Mock)

**Decisión:**
Implementar un adaptador para la IA que permita alternar entre proveedor real (OpenAI, Azure, etc.) y modo mock, configurable por variable de entorno.

**Motivación:**

- Permite desarrollo y pruebas sin coste ni dependencias externas.
- Facilita la integración con diferentes APIs de IA.

**Consecuencias:**

- El sistema es flexible y portable.
- Las respuestas de IA pueden ser simuladas para testing y CI/CD.

---

## ADR-005: Abstracción por Interfaces

**Decisión:**
Definir interfaces para servicios, repositorios, adaptadores y clientes externos (ej: cache, IA, DB), facilitando el desacoplamiento y la extensión futura.

**Motivación:**

- Permite sustituir implementaciones sin modificar el core.
- Facilita el testing y la integración de mocks.

**Consecuencias:**

- El código es más mantenible y escalable.
- Se pueden agregar nuevas integraciones fácilmente.

---

## ADR-006: Validación y DTOs

**Decisión:**
Utilizar DTOs validados con Zod en middlewares antes de llegar a controllers, asegurando payloads seguros y mensajes claros de error.

**Motivación:**

- Evitar errores de datos y mejorar la DX.
- Validación declarativa y tipada.

**Consecuencias:**

- Menos bugs y mayor robustez en la API.

---

## ADR-007: Cache desacoplado (Redis/Memory)

**Decisión:**
Implementar adaptador para Redis con fallback a memoria, usando interfaces y DI.

**Motivación:**

- Mejorar performance y escalabilidad.
- Permitir desarrollo y test sin Redis real.

**Consecuencias:**

- El sistema es rápido y flexible.
- El cache puede ser mockeado en tests.

---

## ADR-008: Observabilidad y Logging

**Decisión:**
Endpoints de healthcheck, logging estructurado y centralizado, traceId en logs, métricas básicas.

**Motivación:**

- Facilitar monitoreo, debugging y trazabilidad.

**Consecuencias:**

- Mejor visibilidad en producción y troubleshooting.

---

## ADR-009: Manejo centralizado de errores

**Decisión:**
Middleware global de errores y logs estructurados, mapeando excepciones de dominio, HTTP y base de datos.

**Motivación:**

- Mejorar la experiencia de desarrollo y la robustez.

**Consecuencias:**

- Respuestas consistentes y fácil mantenimiento.

---

## ADR-010: Seguridad

**Decisión:**
JWT para autenticación, bcrypt para hashing, validación de payloads, CORS y separación de rutas públicas/privadas.

**Motivación:**

- Proteger endpoints sensibles y datos de usuario.

**Consecuencias:**

- API segura y lista para producción.

---

## ADR-011: Testing y Cobertura

**Decisión:**
Tests unitarios y de integración con Jest y Supertest en backend, y React Testing Library en frontend. Mock de IA y cache para pruebas.

**Motivación:**

- Garantizar calidad y evitar regresiones.

**Consecuencias:**

- Desarrollo confiable y rápido.

---

## ADR-012: CI/CD

**Decisión:**
Automatizar integración y despliegue continuo usando GitHub Actions. Build, test y deploy automático en Azure Web App.

**Motivación:**

- Mejorar la calidad y velocidad de entrega.
- Reducir errores humanos en el despliegue.

**Consecuencias:**

- Cada cambio se prueba y despliega automáticamente.

---

## ADR-013: Opciones de Despliegue

**Decisión:**
Permitir despliegue en Render, Fly.io, Hetzner y Azure, priorizando Azure por integración con IA.

**Motivación:**

- Flexibilidad para elegir proveedor según necesidades y presupuesto.
- Azure facilita la integración con servicios de IA.

**Consecuencias:**

- El proyecto puede migrar fácilmente entre proveedores.

---

## ADR-014: Frontend Moderno y Modular

**Decisión:**
Next.js con App Router, componentes modulares, contextos para auth, hooks personalizados, tipado estricto, UI profesional y feedback visual inmediato.

**Motivación:**

- Mejor experiencia de usuario y mantenibilidad.
- Facilidad para agregar nuevas vistas y funcionalidades.

**Consecuencias:**

- Frontend listo para producción y fácil de escalar.

---

## ADR-015: Configuración y Variables de Entorno

**Decisión:**
Centralizar configuración en archivos `.env` y `.env.local`, nunca subir secretos al repo.

**Motivación:**

- Seguridad y facilidad de despliegue.

**Consecuencias:**

- Proyecto seguro y portable.

---

## Futuras decisiones

Este documento se actualizará conforme se tomen nuevas decisiones relevantes. Se recomienda considerar arquitectura hexagonal, rate limiting, OpenAPI/Swagger y distributed tracing si el proyecto escala.
