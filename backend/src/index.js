const express = require('express');
const { faker } = require('@faker-js/faker');
// const { sequelize } = require('../models/index')

const app = express();
const port = process.env.PORT || 3000;

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

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send('API component is healthy');
});

// Route to get all users
app.get('/api/test', (req, res) => {
  res.json(db);
});

app.listen(port, () => console.log(`Server started on port ${port}`));

// const connectDb = async () => {
//   console.log('Checking database connection...')

//   try {
//     await sequelize.authenticate()
//     console.log('Connection to Postgres has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// (async () => {
//   await connectDb()

//   app.get('/', (req, res) => {
//     res.send("Root");
//   });
  
//   app.use('/api/test', require('../routes/users'));
  
//   app.listen(port, () => console.log(`Server started on port ${port}`));
// })();
