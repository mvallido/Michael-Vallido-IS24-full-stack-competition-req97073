const express = require('express');
const { faker } = require('@faker-js/faker');
const { sequelize } = require('../models/index')

const app = express();
const port = process.env.PORT || 3000;

let db = [];

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
