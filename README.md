# Proyecto NestJS con JWT, PostgreSQL y Seeding de Datos

Este proyecto está desarrollado con **NestJS** y utiliza **JWT** para la autenticación, **PostgreSQL** como base de datos, y un sistema de seeding de datos para insertar usuarios iniciales.

## Requisitos

- **Node.js** 20 o superior
- **pnpm** para la gestión de paquetes
- **Docker** (para ejecutar PostgreSQL en contenedor)

## Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <nombre_del_proyecto>
   ```

2. **Instalar dependencias**:
   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno para conectar con PostgreSQL y JWT:
   ```env
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=password
   POSTGRES_DB=apuestatotal
   JWT_SECRET=secretKey
   ```

4. **Iniciar un contenedor Docker para PostgreSQL**:
   Si no tienes PostgreSQL en tu máquina local, puedes usar Docker para crear un contenedor:
   ```bash
   docker run --name postgres-container -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=apuestatotal -p 5432:5432 -d postgres:latest
   ```

5. **Iniciar el servidor**:
   Después de configurar las variables de entorno y el contenedor de PostgreSQL, puedes iniciar el servidor con:
   ```bash
   pnpm run start
   ```

## Estructura de Archivos

La estructura del proyecto es la siguiente:

```
src/
├── config/
│   ├── database.config.ts        # Configuración de la base de datos PostgreSQL
│   └── jwt.config.ts             # Estrategia de JWT para autenticación
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts   # Controlador de autenticación
│   │   ├── auth.guard.ts        # Guard de autenticación JWT
│   │   ├── auth.module.ts       # Módulo de autenticación
│   │   ├── auth.service.ts      # Servicio de autenticación
│   ├── seed/
│   │   ├── seed.controller.ts   # Controlador para insertar datos iniciales
│   │   └── seed.module.ts       # Módulo de seeding de datos
│   ├── user/
│   │   ├── user.entity.ts       # Entidad de usuario
│   │   ├── user.module.ts       # Módulo de usuario
│   │   └── user.service.ts      # Servicio de usuario
└── filters/
    └── global-exception.filter.ts # Filtro global de excepciones
```

## Endpoints

- **POST `/auth/login`**: Inicia sesión con las credenciales de usuario (correo y contraseña).
  - **Body**: `{ email: string, password: string }`
  - **Response**: `{ access_token: string }`

- **POST `/auth/register`**: Registra un nuevo usuario (correo, contraseña y rol).
  - **Body**: `{ email: string, password: string, role: UserRoleEnum }`
  - **Response**: `{ access_token: string }`

- **GET `/auth/validate-token`**: Valida el token JWT enviado en el encabezado de la solicitud.
  - **Header**: `Authorization: Bearer <jwt_token>`
  - **Response**: `{ userId: number, role: string }`

- **POST `/seed`**: Inserta datos iniciales para los usuarios (administrador y usuario estándar).
  - **Response**: `{ message: 'Seed data inserted successfully' }`

## Módulos

### AuthModule

El módulo de autenticación se encarga de gestionar el registro y login de usuarios mediante JWT. Este utiliza una estrategia de validación basada en JWT para autenticar a los usuarios.

### UserModule

El módulo de usuario se encarga de gestionar la creación y obtención de usuarios desde la base de datos PostgreSQL.

### SeedModule

El módulo de seeding permite insertar usuarios iniciales en la base de datos para facilitar las pruebas o la configuración inicial.

### GlobalExceptionFilter

Este filtro captura todas las excepciones no controladas y devuelve una respuesta adecuada al cliente con el código de estado y el mensaje correspondiente.

## Variables de Entorno

- **POSTGRES_HOST**: Dirección del host de PostgreSQL (por defecto `localhost`).
- **POSTGRES_PORT**: Puerto de PostgreSQL (por defecto `5432`).
- **POSTGRES_USER**: Usuario de PostgreSQL.
- **POSTGRES_PASSWORD**: Contraseña de PostgreSQL.
- **POSTGRES_DB**: Nombre de la base de datos en PostgreSQL.
- **JWT_SECRET**: Clave secreta para firmar los JWT.

## Desarrollo

Este proyecto usa **pnpm** como gestor de dependencias, y **TypeORM** para la integración con PostgreSQL. Si deseas agregar nuevos módulos o funcionalidades, puedes seguir la estructura de los módulos ya existentes, y añadir controladores, servicios, y entidades según sea necesario.
