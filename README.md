# Express + PostgreSQL Backend Setup

This guide helps you run a full Express.js + PostgreSQL backend on your local machine using Docker.

---

## Full Setup Instructions

1. **Install Docker**

   Download and install Docker Desktop from:  
   https://www.docker.com/products/docker-desktop/

2. **Open your terminal app (Terminal on macOS/Linux or CMD on Windows), then run:**

   Pull the latest PostgreSQL image:
   ```bash
   docker pull postgres:latest
   ```

   Start a PostgreSQL container:
   ```bash
   docker run --name my-postgres -e POSTGRES_PASSWORD=daniel123 -e POSTGRES_USER=daniel -e POSTGRES_DB=mydatabase -p 5432:5432 -v postgres-data:/var/lib/postgresql/data -d postgres:latest
   ```
   
   > You can change `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` to your own values if needed.
   
3. **Clone the backend server project to your local machine**

   ```bash
   git clone https://github.com/KakaduCulture/server.git
   cd server
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Create a `.env` file inside the `server` folder with the following content:**

   ```env
   PORT=10000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=daniel
   DB_PASSWORD=daniel123
   DB_NAME=mydatabase
   ```

6. **Start the development server**

   Run the following in your terminal:

   ```bash
   npm run dev
   ```

   You should see:

   ```
   database connection successful!
   Server is running at http://localhost:10000
   ```

---

## ✅ Done!

Your backend server is now running locally and connected to a PostgreSQL database inside Docker. You can start building APIs and testing endpoints.
