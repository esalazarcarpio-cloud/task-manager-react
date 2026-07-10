# Task Manager

Aplicación para realizar tareas, permitiendo crear, consultar, actualizar y eliminar tareas para facilitar la organización y el seguimiento de actividades.

[![CI](https://github.com/esalazarcarpio-cloud/task-manager-react/actions/workflows/ci.yml/badge.svg)](https://github.com/esalazarcarpio-cloud/task-manager-react/actions/workflows/ci.yml)

## 🚀 Instalación local

```bash
git clone https://github.com/esalazarcarpio-cloud/task-manager-react.git
cd task-manager-react
npm install
```

### Variables de entorno

Crea un archivo `.env` en la raíz con las siguientes claves (sin valores reales en este documento):

```env
DATABASE_URL=
JWT_SECRET=
PORT=
```

## 📜 Comandos disponibles

| Comando | Descripción |
|----------|-------------|
| `npm run dev` | Levanta el entorno de desarrollo. |
| `npm run build` | Genera el build de producción. |
| `npm test` | Corre las pruebas automatizadas (**pendiente — Sesión 3**). |

## 🗄️ Base de datos

PostgreSQL con migraciones y seeds gestionados con Prisma (ver Módulo 2).