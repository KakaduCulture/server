// ==================== Global Dependencies ====================
require("reflect-metadata");
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

// ==================== Database Initialization ====================
const { AppDataSource } = require("./data-source");

// ==================== Custom Middlewares =========================
const { httpLogger } = require('./middlewares/logger');

// ==================== Routes =====================================
const routes = require('./routes');
 // why this file know ./routes to connect with index.js

// ==================== Global Middleware Setup ====================
app.use(cors());
app.use(helmet());
app.use(hpp({}));
app.use(rateLimit({                    // Rate Limiting
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);

// ==================== Start App after DB Connection ====================
console.log("Initializing database connection...");
AppDataSource.initialize()
    .then(() => {
        console.log("database connection successful!");

        // Register all API routes
        app.use('/api', routes);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
        });
    })
    .catch((error) => {
        console.log("database connection error:", error);
    });