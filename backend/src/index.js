const express = require('express');
const cors = require('cors');
const { faker } = require('@faker-js/faker');
const { sequelize } = require('../models/index')

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(cors(corsOptions));

let db = [];

// Generating 40 products
for (let i = 0; i < 40; i++) {
  // Generate a random product ID
  const productId = faker.datatype.uuid();

  // Generate random product name, owner name, and scrum master name
  const productName = faker.commerce.productName();
  const productOwnerName = faker.name.fullName();
  const scrumMasterName = faker.name.fullName();

  // Generate an array of random developer names
  const Developers = [];
  for (let i = 0; i < 5; i++) {
    Developers.push(faker.name.fullName());
  }

  // Generate a random start date
  const startDate = faker.date.past(1).toISOString().substring(0, 10);

  // Generate a random methodology
  const methodology = faker.random.word();

  db.push({
    productId,
    productName,
    productOwnerName,
    Developers,
    scrumMasterName,
    startDate,
    methodology,
  })
}

app.use(express.json());

app.get('/health', (req, res) => {
  if(isHealthy()){
    res.status(200).send('API component is healthy');
  }else{
    res.status(500).send('API component is not healthy');
  }
});

app.get('/api/product', (req, res) => {
  res.json(db);
});

app.post('/api/product', (req, res) => {
  const new_product = req.body;
  db.push(new_product);
  res.json(new_product);
});

app.put('/api/product/:productId', (req, res) => {
  const productId = req.params.productId;
  const productIndex = db.findIndex(p => p.productId === productId);
  if (productIndex === -1) {
    res.sendStatus(404);
  } else {
    db[productIndex] = { ...db[productIndex], ...req.body };
    res.json(db[productIndex]);
  }
});

app.delete('/api/product/:productId', (req, res) => {
  const productId = req.params.productId;
  const productIndex = db.findIndex(p => p.productId === productId);

  if (productIndex === -1) {
    res.sendStatus(404);
  } else {
    db.splice(productIndex, 1);
    res.sendStatus(204);
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));

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

// (async () => {
//   await connectDb()
//   app.get('/', (req, res) => {
//     res.send("Root");
//   });
//   app.use('/api/test', require('../routes/users'));
//   app.listen(port, () => console.log(`Server started on port ${port}`));
// })();
