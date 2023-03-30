module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      description: 'API for managing products',
      version: '1.0.0',
    },
    tags: [
      {
        name: 'Health Check',
        description: 'Endpoints for checking health of server',
      },
      {
        name: 'Products',
        description: 'Endpoints for managing my products',
      },
    ],
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ]
  },
  apis: ['./routes/*.js'],
};
