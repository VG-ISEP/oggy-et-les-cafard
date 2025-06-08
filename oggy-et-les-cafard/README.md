# Oggy et les Cafards – Backend Service Deployment

This project is the backend service of the **Oggy et les Cafards** application, built with Spring Boot and PostgreSQL. It provides REST APIs for managing users, conversations, messages, and friendships in the application.

## 🛠️ Prerequisites

Before you begin, make sure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- A reverse proxy such as [Traefik](https://doc.traefik.io/traefik/) configured if you want to expose services via custom domains

## 📦 Clone the Repository

```bash
git clone https://github.com/VG-ISEP/oggy-et-les-cafard.git
cd oggy-et-les-cafard/oggy-et-les-cafard
```

## 🚀 Start the Services

Run the following command from the root directory:

```bash
docker compose -f Docker/docker-compose.yml up -d --build
```

This will start:

- A **PostgreSQL** database
- **pgAdmin** (accessible at `https://hingage-pgadmin.muchosalexis.fr`)
- The **backend-service** Spring Boot application (accessible at `https://hingage-backend.muchosalexis.fr`)

Make sure the `postgres` network is already created as an external Docker network (required by `docker-compose.yml`):

```bash
docker network create postgres
```

## 🗃️ Default Credentials

**PostgreSQL**
- Username: `postgres`
- Password: `oggyetles`

**pgAdmin**
- Email: `pgadmin4@pgadmin.org`
- Password: `admin`

## 📝 Environment Variables

Environment variables can be configured in your shell or via `.env`:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=oggyetles
PGADMIN_DEFAULT_EMAIL=pgadmin4@pgadmin.org
PGADMIN_DEFAULT_PASSWORD=admin
PGADMIN_PORT=5050
```

## 📁 Project Structure

```
oggy-et-les-cafard/
├── Backend-Service/             # Spring Boot source code
├── Docker/                      # Docker Compose configuration
├── README.md
└── pom.xml                      # Parent Maven POM
```

## 🧪 API Endpoints

Once deployed, the backend is accessible at:

```
https://hingage-backend.muchosalexis.fr
```

Swagger or OpenAPI documentation is integrated and can be accessed at!

```
https://hingage-backend.muchosalexis.fr/swagger-ui/index.html
```

---

Happy hingaging!