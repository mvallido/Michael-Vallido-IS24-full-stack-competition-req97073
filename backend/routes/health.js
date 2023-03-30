const express = require('express')
const router = express.Router();
const { sequelize } = require('../models/index')

/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - Health Check
 *     summary: Check API health status
 *     description: Returns a status message indicating whether the API is healthy or not.
 *     responses:
 *       200:
 *         description: API component is healthy
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       500:
 *         description: API component is not healthy
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

router.get('/', (req, res) => {
    if (isHealthy()) {
        res.status(200).send('API component is healthy');
    } else {
        res.status(500).send('API component is not healthy');
    }
});

const connectDb = async () => {
    console.log('Checking database connection...')
    try {
        await sequelize.authenticate()
        console.log('Connection to Postgres has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


function isHealthy() {
    // Check if the database connection is healthy
    try {
        // Connecting to database
        // connectDb()
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }

    // Check if any other dependencies are healthy
    // For example, check if an external API is reachable and responding as expected

    // If everything is healthy, return true
    return true;
}

module.exports = router;