const express = require('express');
const cors = require('cors');
const swaggerjsdoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')
const swaggerOptions = require('../swaggerOptions')
const productRoutes = require('../routes/products')
const healthRoutes = require('../routes/health')

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/health', healthRoutes);

app.use('/api/product', productRoutes);

const swaggerDocs = swaggerjsdoc(swaggerOptions);
app.use('/api/api-docs', swaggerui.serve, swaggerui.setup(swaggerDocs));

app.listen(port, () => console.log(`Server started on port ${port}`));