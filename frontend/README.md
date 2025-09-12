# Signal Watcher — Frontend

Este proyecto implementa el frontend de la prueba técnica Full-Stack Node.js + Next.js (AI-first) para el caso Signal Watcher. A continuación se detalla todo lo relevante para la evaluación.

## Descripción General

### Arquitectura y Tecnologías

- **Next.js (App Router)**: Estructura moderna con rutas en `app/`, SSR y server actions.
- **TypeScript**: Tipado estricto en todos los componentes y hooks.
- **Tailwind CSS + shadcn/ui**: Estilos profesionales, minimalistas y coherentes.
- **Componentes modulares**: Navbar, Cards, Badges, Dialogs, formularios y layouts reutilizables.

### Funcionalidades

- **Registro y Login**:

  - El usuario puede crear una cuenta (no requiere validación de email).
  - Flujo de login y registro con validación, feedback de errores y estados de carga.
  - Una vez logueado, accede al dashboard y puede probar todo el flujo.

- **Dashboard**:

  - Vista principal con estadísticas de listas y eventos.
  - Acceso rápido a la creación de listas y visualización de eventos.

- **Watchlists (Listas de observación)**:

  - CRUD completo: crear, editar, eliminar y visualizar listas.
  - Agregar términos monitoreados (marca, dominio, palabra clave).
  - Visualización de eventos relacionados a cada lista.

- **Eventos**:

  - Listado de eventos con filtros por severidad y búsqueda por texto.
  - Visualización de cada evento en detalle.
  - Botón para simular evento y para enriquecer con IA.

- **Detalle de evento**:

  - Muestra resumen generado por IA, severidad y acción sugerida.
  - Relación con listas de observación (badges destacados y navegables).
  - Botón para enriquecer el evento con IA en tiempo real.

- **Integración IA**:

  - El usuario puede simular y enriquecer eventos.
  - La IA resume el evento, clasifica la severidad y sugiere la acción.
  - El flujo es inmediato y visible en la interfaz.

- **Manejo de errores y carga**:
  - Spinners, toasts y mensajes claros en cada acción.
  - Validaciones en formularios y feedback visual.

### Flujo de Usuario

1. **Registro**: El usuario crea una cuenta (sin validación de email).
2. **Login**: Accede con sus credenciales.
3. **Dashboard**: Visualiza estadísticas y accede a listas/eventos.
4. **Crear Watchlist**: Agrega una lista con términos monitoreados.
5. **Simular Evento**: Crea un evento desde la interfaz de eventos.
6. **Enriquecer Evento**: Usa el botón de IA para obtener resumen, severidad y acción sugerida.
7. **Navegación**: Puede ver detalles de eventos y listas, y navegar entre ellos.

### Buenas Prácticas y Valor Añadido

- **Tipado estricto y sin warnings de ESLint**.
- **Manejo de errores robusto y feedback visual inmediato**.
- **Interfaz profesional, minimalista y lista para producción**.
- **Relaciones claras entre listas y eventos, permitiendo trazabilidad y análisis cruzado**.
- **Código limpio, modular y fácil de mantener**.
