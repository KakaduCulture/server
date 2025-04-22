require("reflect-metadata");
require('dotenv').config();

const { AppDataSource } = require("./data-source");
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');
const logger = require('./middlewares/logger');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

console.log("Initializing database connection...");
AppDataSource.initialize()
    .then(() => {
        console.log("database connection successful!");

        // import routes
        app.use('/api', routes);

        // start server
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("database connection error:", error);
    });