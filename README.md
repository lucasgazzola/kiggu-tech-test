# Signal Watcher - Prueba Fullstack Node.js + Next.js

## Descripción General

Este proyecto es una solución fullstack para la prueba técnica "Signal Watcher". Permite a analistas gestionar listas de observación (marcas, dominios, palabras clave) y recibir eventos simulados. La IA (mockeada) resume los eventos, clasifica su severidad y sugiere acciones, todo visualizado en una interfaz web moderna.

## Estructura del Proyecto

```
/kiggu-test
│
├── backend/                # API REST con Node.js (Express + Prisma)
│   ├── src/                # Código fuente principal
│   │   ├── adapters/       # Adaptadores IA (mock y OpenAI)
│   │   ├── clients/        # Cliente Redis
│   │   ├── config/         # Configuración (DB, logger, env)
│   │   ├── containers/     # Inyección de dependencias
│   │   ├── controllers/    # Lógica de endpoints
│   │   ├── dtos/           # Data Transfer Objects
│   │   ├── exceptions/     # Manejo de errores
│   │   ├── mappers/        # Mapeo de entidades
│   │   ├── middlewares/    # Middlewares (auth, validación)
│   │   ├── models/         # Modelos de datos
│   │   ├── repositories/   # Acceso a datos (Prisma)
│   │   ├── routes/         # Definición de rutas
│   │   ├── services/       # Lógica de negocio
│   │   ├── types/          # Tipos y enums
│   │   └── app.ts, server.ts
│   ├── prisma/             # Esquema y migraciones de base de datos
│   ├── tests/              # Tests unitarios e integración (Jest)
│   ├── .env                # Variables de entorno
│   ├── package.json
│   └── README.md
│
├── frontend/               # Aplicación web con Next.js + React
│   ├── app/                # Estructura de rutas y páginas
│   ├── components/         # Componentes reutilizables (UI, dashboard, eventos)
│   ├── contexts/           # Contextos globales (Auth)
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilidades, API client, mockData
│   ├── public/             # Recursos estáticos
│   ├── types.ts            # Tipos globales
│   ├── .env.local          # Variables de entorno frontend
│   ├── package.json
│   └── README.md
│
├── .github/workflows/      # CI/CD con GitHub Actions (deploy Azure)
├── ADR.md                  # Decisiones de arquitectura
├── azure-appservice.yaml   # Configuración Azure
├── README.md               # Documentación principal
└── prueba_fullstack.pdf    # Enunciado original de la prueba
```

## Backend

- **Node.js + Express:** API RESTful modularizada.
- **Prisma:** ORM para acceso a base de datos y migraciones.
- **Estructura limpia:** Separación por controladores, servicios, modelos, repositorios y rutas.
- **Autenticación:** Middleware para proteger endpoints.
- **Tests:** Cobertura con Jest.
- **Configuración:** Variables en `.env` y `.env.example`.
- **Adaptador IA:** Dos modos:
  - **Mock:** Simula respuestas de IA (resumen, severidad, acción) para desarrollo y testing.
  - **OpenAI:** Preparado para integración real, pero actualmente se usa solo el mock (no se encontró API gratuita funcional).
- **Prisma:** Migraciones y esquema en `/prisma`.

## Frontend

- **Next.js + React:** SPA con rutas protegidas y dashboard.
- **Componentes reutilizables:** UI, gráficos, timeline de eventos, badges de severidad, etc.
- **Contexto de autenticación:** Manejo de sesión y protección de rutas.
- **Consumo de API:** Utilidades para interactuar con el backend.
- **Mock de datos:** Para desarrollo rápido y pruebas sin backend.
- **Estilos:** CSS global y componentes UI personalizados.
- **Tests:** Preparado para testing con Jest y React Testing Library.

## IA Mockeada

- **Motivo:** No se encontró API gratuita de IA que permita resumir eventos y clasificar severidad sin coste.
- **Implementación:** El backend alterna entre adaptador real (OpenAI) y mock mediante variable de entorno. Actualmente está configurado en modo mock.
- **Ventajas:** Permite desarrollo, testing y despliegue sin depender de servicios externos ni incurrir en gastos.
- **Limitaciones:** Las respuestas de IA son simuladas y no reflejan inteligencia real.

## CI/CD y Despliegue

- **GitHub Actions:** Workflow para build, test y despliegue automático en Azure Web App.
- **Azure:** Configuración lista para despliegue en la nube (ver `.github/workflows/main_kiggu-test-backend.yml`).
- **Variables sensibles:** Todas las claves y tokens se mantienen en archivos `.env` y nunca se suben al repositorio.

## Testing

- **Backend:** Tests unitarios y de integración con Jest.
- **Frontend:** Preparado para tests de componentes y lógica.
- **Cobertura:** Reportes generados en `/backend/coverage`.

## Buenas Prácticas

- Código modular y desacoplado.
- Documentación de endpoints y lógica de negocio.
- Uso de control de versiones y ramas para features/fixes.
- Separación clara entre frontend y backend.
- Uso de mock para IA y datos en desarrollo/testing.
- Configuración de CI/CD para despliegue automatizado.

## Recomendaciones

- Si se dispone de una API de IA gratuita en el futuro, solo cambiar la configuración en el backend para usar el adaptador real.
- Para despliegue en otros proveedores (Render, Fly.io, Hetzner), agregar Dockerfile y documentar pasos específicos.
- Mantener actualizado el README y ADR.md con cambios relevantes.

## Recursos Útiles

- [OpenAI API](https://platform.openai.com/docs)
- [Azure OpenAI](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/)
- [Prisma](https://www.prisma.io/docs/)
- [Next.js](https://nextjs.org/docs)
- [Render](https://render.com/docs/deploy-node-express-app)
- [Fly.io](https://fly.io/docs/)
- [Hetzner Cloud](https://docs.hetzner.com/cloud/)

---
