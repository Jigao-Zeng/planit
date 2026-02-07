# Planit

Planit is a simple calendar + todo app with:

- A React + Vite frontend in `planit-client`
- A .NET 8 Web API backend in `server`
- SQLite for persistence

### Live URLs

- Frontend: https://planit-web-l2qi.onrender.com
- API: https://planit-api-fgze.onrender.com

## Local Development

### Backend

```bash
cd server
dotnet restore
dotnet run
```

By default the API listens on `http://localhost:5075`.

### Frontend

```bash
cd planit-client
npm install
npm run dev
```

Set the API base URL for the frontend:

```bash
VITE_API_BASE_URL=http://localhost:5075
```

## Production Deployment (Render)

This repo includes a `render.yaml` Blueprint that creates:

- `planit-api` (Docker Web Service)
- `planit-web` (Static Site)

### Deploy with Blueprint

1. Render Dashboard → **New** → **Blueprint**
2. Select this repo
3. Blueprint path: `render.yaml`
4. Apply

### Set Environment Variables

#### planit-api

- `ConnectionStrings__Default` = `Data Source=/tmp/todo.db` (free tier, ephemeral)
- `AllowedOrigins` = `https://planit-web-l2qi.onrender.com`
- `AllowAnyOrigin` = `true` (optional; remove once stable)

#### planit-web

- `VITE_API_BASE_URL` = `https://planit-api-fgze.onrender.com`

After changing env vars, redeploy each service.

### Notes

- Free Render services do **not** support disks. `/tmp/todo.db` is ephemeral and resets on redeploy.
- For persistence, upgrade the API service and mount a disk at `/var/data`, then set:
  - `ConnectionStrings__Default` = `Data Source=/var/data/todo.db`

## Health Check

The API exposes:

```
GET /health
```

Response:

```json
{ "status": "ok" }
```
