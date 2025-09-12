# Architecture Decision Record (ADR)

## Contexto

Este documento registra las decisiones arquitectónicas clave tomadas para el proyecto Signal Watcher (prueba fullstack Node.js + Next.js).

---

## ADR-001: Stack Tecnológico

**Fecha:** 9 de septiembre de 2025

**Decisión:**
Se utilizará Node.js (Express) para el backend y Next.js para el frontend. La IA se integrará mediante adaptador (real o mock).

**Motivación:**

- Node.js y Next.js son tecnologías modernas, ampliamente soportadas y permiten desarrollo fullstack eficiente.
- El adaptador IA permite flexibilidad entre proveedores reales (OpenAI, Azure, Hugging Face) y modo mock para pruebas.

**Consecuencias:**

- El equipo puede trabajar con JavaScript/TypeScript en todo el stack.
- El despliegue es sencillo en plataformas como Render, Fly.io, Hetzner y Azure.

---

## ADR-002: Estructura de Carpetas

**Decisión:**
Separar backend y frontend en carpetas independientes, siguiendo buenas prácticas de modularidad.

**Motivación:**

- Facilita el mantenimiento y escalabilidad.
- Permite despliegue independiente de cada servicio.

**Consecuencias:**

- Mayor claridad en la organización del código.
- Posibilidad de escalar o migrar cada parte por separado.

---

## ADR-003: Adaptador IA (Real y Mock)

**Decisión:**
Implementar un adaptador para la IA que permita alternar entre proveedor real y modo mock.

**Motivación:**

- Permite desarrollo y pruebas sin coste.
- Facilita la integración con diferentes APIs de IA.

**Consecuencias:**

- El sistema es flexible y portable.
- Se pueden realizar pruebas automatizadas sin depender de servicios externos.

---

## ADR-004: CI/CD

**Decisión:**
Automatizar integración y despliegue continuo usando GitHub Actions (o similar).

**Motivación:**

- Mejora la calidad y velocidad de entrega.
- Reduce errores humanos en el despliegue.

**Consecuencias:**

- Cada cambio se prueba y despliega automáticamente.
- El equipo recibe feedback rápido sobre el estado del proyecto.

---

## ADR-005: Opciones de Despliegue

**Decisión:**
Permitir despliegue en Render, Fly.io, Hetzner y Azure, priorizando Azure por integración con IA.

**Motivación:**

- Flexibilidad para elegir proveedor según necesidades y presupuesto.
- Azure facilita la integración con servicios de IA.

**Consecuencias:**

- El proyecto puede migrar fácilmente entre proveedores.
- Se aprovechan los servicios nativos de cada plataforma.

---

## Futuras decisiones

Este documento se actualizará conforme se tomen nuevas decisiones relevantes.
