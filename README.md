# Signal Watcher - Prueba Fullstack Node.js + Next.js

## Descripción

Este proyecto es una solución para la prueba técnica "Signal Watcher", que consiste en crear un sistema donde analistas pueden gestionar listas de observación (marcas, dominios, palabras clave) y recibir eventos simulados. La IA debe resumir el evento, clasificar su severidad y sugerir la siguiente acción.

## Estructura del Proyecto

```
/kiggu-test
│
├── backend/                # API REST con Node.js (Express)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.js
│   ├── tests/
│   ├── package.json
│   └── .env
│
├── frontend/               # Aplicación web con Next.js
│   ├── pages/
│   ├── components/
│   ├── styles/
│   ├── public/
│   ├── utils/
│   ├── tests/
│   ├── package.json
│   └── .env.local
│
├── docs/                   # Documentación técnica y funcional
│   └── README.md
│
├── .gitignore
└── README.md
```

## Funcionalidades principales

- Creación y gestión de listas de observación.
- Simulación y recepción de eventos relevantes.
- Adaptador IA (real o mock) para:
  - Resumir eventos en lenguaje natural.
  - Clasificar severidad (LOW / MED / HIGH / CRITICAL).
  - Sugerir acciones para el analista.
- Visualización de eventos y sugerencias en la interfaz web.

## IA: Adaptador real y mock

- **Real:** Integración con OpenAI, Azure OpenAI, Hugging Face, etc. (puedes usar créditos gratuitos para pruebas).
- **Mock:** Respuestas simuladas para desarrollo y testeo sin coste.
- Alterna entre modos mediante configuración en el backend (`.env`).

## Instrucciones de instalación y ejecución

### Backend

```bash
cd backend
npm install
# Configura variables en .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
# Configura variables en .env.local
npm run dev
```

## Despliegue

- **Render:** Fácil para Node.js y Next.js, solo conectar el repo y configurar variables.
- **Fly.io:** Ideal para apps ligeras, despliegue global, requiere configuración de Dockerfile.
- **Hetzner:** VPS económico, control total, requiere configuración manual (Docker recomendado).
- **Azure:** Integración nativa con servicios de IA, escalabilidad, ideal para empresas.

### Recomendaciones para despliegue

- Mantén las claves y tokens en archivos `.env` y nunca los subas al repositorio.
- Usa Docker para facilitar el despliegue en cualquier plataforma.
- Documenta los pasos específicos para cada proveedor en `/docs/`.

## Testing

- Usa Jest para backend y frontend.
- Incluye tests unitarios y de integración.

## Buenas prácticas

- Modulariza el código (controllers, services, models).
- Documenta endpoints y lógica de negocio.
- Usa control de versiones (Git) y ramas para features/fixes.
- Mantén el README actualizado con cambios relevantes.

## Notas relevantes

- La IA real puede tener límites gratuitos, revisa la documentación del proveedor.
- El modo mock es útil para desarrollo y CI/CD.
- Puedes ampliar la funcionalidad agregando autenticación, logs, dashboards, etc.
- El frontend puede usar Tailwind, Material UI o CSS Modules según preferencia.

## Recursos útiles

- [OpenAI API](https://platform.openai.com/docs)
- [Azure OpenAI](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/)
- [Hugging Face Inference](https://huggingface.co/inference-api)
- [Render](https://render.com/docs/deploy-node-express-app)
- [Fly.io](https://fly.io/docs/)
- [Hetzner Cloud](https://docs.hetzner.com/cloud/)

---

Este README es amplio y editable. Elimina o ajusta secciones según lo que implementes y los requisitos finales.
