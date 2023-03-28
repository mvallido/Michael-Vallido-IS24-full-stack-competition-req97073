module.exports = {
    development: {
      url: 'postgres://dbuser:dbpass@db-postgres:5432/dbIS24',
      dialect: 'postgres',
    },
    test: {
      url: 'postgres://dbuser:dbpass@db-postgres:5432/dbIS24',
      dialect: 'postgres',
    },
    production: {
      url: process.env.DATABASE_URL,
      dialect: 'postgres',
    }
  };
  