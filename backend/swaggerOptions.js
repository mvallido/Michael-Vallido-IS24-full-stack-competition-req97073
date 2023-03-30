module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product API",
      description: "API for managing products",
      version: "1.0.0"
    },
    tags: [
      {
        name: "Health Check",
        description: "Endpoints for checking health of server"
      },
      {
        name: "Products",
        description: "Endpoints for managing my products"
      }
    ],
    servers: [{
      url: "http://localhost:3000",
      description: "Local server"
    }],
    components: {
      schemas: {
        ProductInput: {
          type: "object",
          properties: {
            productName: {
              type: "string",
              description: "The name of the product"
            },
            productOwnerName: {
              type: "string",
              description: "The name of the product owner"
            },
            scrumMasterName: {
              type: "string",
              description: "The name of the scrum master"
            },
            Developers: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The names of the developers"
            },
            startDate: {
              type: "string",
              format: "date",
              description: "The start date of the project (YYYY-MM-DD)"
            },
            methodology: {
              type: "string",
              description: "The development methodology used for the project"
            }
          },
          required: ["productName", "productOwnerName", "scrumMasterName", "Developers", "startDate", "methodology"]
        },
        ProductId: {
          type: "string",
          description: "The ID of a product"
        },
        Product: {
          type: "object",
          properties: {
            productId: {
              $ref: "#/components/schemas/ProductId"
            },
            productName: {
              type: "string",
              description: "The name of the product"
            },
            productOwnerName: {
              type: "string",
              description: "The name of the product owner"
            },
            scrumMasterName: {
              type: "string",
              description: "The name of the scrum master"
            },
            Developers: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The names of the developers"
            },
            startDate: {
              type: "string",
              format: "date",
              description: "The start date of the project (YYYY-MM-DD)"
            },
            methodology: {
              type: "string",
              description: "The development methodology used for the project"
            }
          },
          required: ["productId", "productName", "productOwnerName", "scrumMasterName", "Developers", "startDate", "methodology"]
        }
      }
    }
  },
  apis: ['./routes/*.js'],
}
