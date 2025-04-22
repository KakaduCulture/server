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
   
   > You should change `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` to your own values.

3. **Create a project folder named codeupnt**
   ```bash
    #Mac/Linux
    mkdir codeupnt
    cd codeupnt
   
    #Windows
    mkdir %USERPROFILE%\Desktop\codeupnt
    cd %USERPROFILE%\Desktop\codeupnt
    ```

3. **Clone the backend server project to your local machine**

   ```bash
   git clone https://github.com/KakaduCulture/server.git
   cd server
   git pull
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
   > The `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` values are the username, password, and database name you just created in the step 2.

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


## Test
You can test the server by sending a GET request to the `/api` endpoint using Postman or your browser:

```bash
http://localhost:10000/api/users
```

## 🐘 View Database Using DBeaver

1. Visit the official DBeaver website:  
   https://dbeaver.io/download/

2. Download and install **DBeaver Community Edition** (it's free).

3. Open DBeaver, click the **Add Database Connection** button (first icon in the left toolbar).

4. Choose **PostgreSQL** from the list.

5. In the main connection setup page:
   - Change **Database** from `postgres` to `mydatabase`
   - Set **Username** to `daniel`
   - Set **Password** to `daniel123` (or whatever you set in Step 2)

6. Click **Finish**

7. In the left sidebar, expand the following path to view your tables and data:

   ```
   Databases > mydatabase > Schemas > public > Tables
   ```

You will now be connected to your local PostgreSQL database and can view, browse, and edit your tables and data.