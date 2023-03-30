const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');
var _ = require('lodash');

const generateFakeData = () => {
  const products = [];

  for (let i = 0; i < 40; i++) {
    const productId = faker.datatype.uuid().substring(0, 8);
    const productName = faker.commerce.productName();
    const productOwnerName = faker.name.fullName();
    const scrumMasterName = faker.name.fullName();
    const Developers = _.times(5, faker.name.fullName);
    const startDate = faker.date.past(1).toISOString().substring(0, 10);
    const methodology = faker.helpers.arrayElement(['Agile', 'Waterfall']);
    products.push({
      productId,
      productName,
      productOwnerName,
      scrumMasterName,
      Developers,
      startDate,
      methodology,
    });
  }
  return products;
};

let db = generateFakeData();

/**
 * @swagger
 * /api/product:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get a list of products
 *     description: Returns a paginated list of products
 *     parameters:
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: The number of products to return per page
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: The page number to return
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search for products by Scrum Master name or Developer name
 *     responses:
 *       200:
 *         description: A paginated list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCount:
 *                   type: integer
 *                   description: The total number of products in the database
 *                 pageNumber:
 *                   type: integer
 *                   description: The current page number
 *                 pageSize:
 *                   type: integer
 *                   description: The number of products per page
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                         description: The ID of the product
 *                       productName:
 *                         type: string
 *                         description: The name of the product
 *                       productOwnerName:
 *                         type: string
 *                         description: The full name of the product owner
 *                       scrumMasterName:
 *                         type: string
 *                         description: The full name of the Scrum Master
 *                       Developers:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: The full names of the Developers working on the product
 *                       startDate:
 *                         type: string
 *                         format: date
 *                         description: The start date of the product
 *                       methodology:
 *                         type: string
 *                         description: The development methodology used for the product
 *                 hidePagination:
 *                   type: boolean
 *                   description: A flag indicating whether to hide the pagination UI
 */

router.get('/', (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 10; // default to 10
  const pageNumber = parseInt(req.query.pageNumber) || 1; // default to 1
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  let products = db;

  // Filter products by search query
  const searchQuery = req.query.search;
  if (searchQuery) {
    products = db.filter((product) => {
      const scrumMasterName = product.scrumMasterName.toLowerCase();
      const developerNames = Array.isArray(product.Developers)
        ? product.Developers.filter((name) =>
            name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];
      return (
        scrumMasterName.includes(searchQuery.toLowerCase()) ||
        developerNames.length > 0
      );
    });
  }

  // Get paginated products
  products = products.slice(startIndex, endIndex);

  const hidePagination = !!searchQuery; // Add flag to indicate whether pagination should be displayed or not

  res.json({
    totalCount: db.length,
    pageNumber,
    pageSize,
    items: products,
    hidePagination, // Add the flag to the response object
  });
});

/**
 * @swagger
 * /api/product:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     description: Creates a new product with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: The ID of the newly created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductId'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

router.post('/', (req, res) => {
  const new_product = req.body;
  new_product.productId = faker.datatype.uuid();
  new_product.startDate = new Date(new_product.startDate)
    .toISOString()
    .split('T')[0];
  db.push(new_product);
  res.json(new_product.productId);
});

/**
 * @swagger
 * /api/product/{productId}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get a product by ID
 *     description: Returns a product object with the specified ID
 *     parameters:
 *       - name: productId
 *         in: path
 *         description: ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product object with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product with the specified ID not found
 */

router.get('/:productId', (req, res) => {
  const productId = req.params.productId;
  const productIndex = db.findIndex((p) => p.productId === productId);
  if (productIndex === -1) {
    res.sendStatus(404);
  } else {
    res.json(db[productIndex]);
  }
});

/**
 * @swagger
 * /api/product/{productId}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Updates a product by ID
 *     description: Updates a product in the database with the specified ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

router.put('/:productId', (req, res) => {
  const productId = req.params.productId;
  const productIndex = db.findIndex((p) => p.productId === productId);
  if (productIndex === -1) {
    res.sendStatus(404);
  } else {
    db[productIndex] = {
      ...db[productIndex],
      ...req.body,
    };
    res.json(db[productIndex]);
  }
});

/**
 * @swagger
 *
 * /api/product/{productId}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product by ID
 *     description: Deletes a product with the specified ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         description: ID of the product to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */

router.delete('/:productId', (req, res) => {
  const productId = req.params.productId;
  const productIndex = db.findIndex((p) => p.productId === productId);

  if (productIndex === -1) {
    res.sendStatus(404);
  } else {
    db.splice(productIndex, 1);
    res.sendStatus(204);
  }
});

module.exports = router;
