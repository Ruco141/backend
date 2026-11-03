# Backend de gestión de tareas

API REST desarrollada con Node.js y Express para gestionar usuarios y tareas. La persistencia se realiza con MongoDB mediante Mongoose y la autenticación utiliza JSON Web Tokens (JWT).

## Requisitos

- Node.js 18 o superior
- npm
- Una instancia de MongoDB local o MongoDB Atlas

## Instalación

1. Clona el repositorio y entra en el proyecto:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env.local` en la raíz del proyecto:

   ```env
   PORT=5001
   MONGO_DB=mongodb://localhost:27017/tareas
   JWT_SECRET=una-clave-secreta-segura
   ```

4. Inicia el servidor:

   ```bash
   npm start
   ```

   Para desarrollo, con reinicio automático:

   ```bash
   npm run server
   ```

El servidor estará disponible en `http://localhost:5001`.

## Autenticación

Los endpoints protegidos requieren un token JWT en la cabecera:

```http
Authorization: Bearer <token>
```

El token se obtiene al registrarse o iniciar sesión y tiene una duración de 30 días.

## Endpoints

### Usuarios

| Método | Ruta | Autenticación | Descripción |
|---|---|---|---|
| `POST` | `/api/users/register` | No | Registra un usuario |
| `POST` | `/api/users/login` | No | Inicia sesión |
| `GET` | `/api/users/data` | Sí | Devuelve los datos del usuario autenticado |

Ejemplo de registro:

```bash
curl -X POST http://localhost:5001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana","email":"ana@example.com","password":"secreta"}'
```

Ejemplo de inicio de sesión:

```bash
curl -X POST http://localhost:5001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ana@example.com","password":"secreta"}'
```

### Tareas

Todas las rutas de tareas requieren autenticación.

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/tareas` | Lista las tareas del usuario autenticado |
| `POST` | `/api/tareas` | Crea una tarea |
| `PUT` | `/api/tareas/:id` | Actualiza una tarea propia |
| `DELETE` | `/api/tareas/:id` | Elimina una tarea propia |

Ejemplo de creación:

```bash
curl -X POST http://localhost:5001/api/tareas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"descripcion":"Preparar la documentación"}'
```

Ejemplo de actualización:

```bash
curl -X PUT http://localhost:5001/api/tareas/<id> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"descripcion":"Actualizar la documentación"}'
```

## Estructura del proyecto

```text
src/
├── config/          # Configuración y conexión con MongoDB
├── controllers/     # Lógica de usuarios y tareas
├── middleware/      # Autenticación y manejo de errores
├── models/          # Modelos de Mongoose
├── routes/          # Rutas de la API
└── server.js        # Punto de entrada de la aplicación
```

## Tecnologías

- Node.js
- Express 5
- MongoDB y Mongoose
- JSON Web Token
- bcrypt
- dotenv

