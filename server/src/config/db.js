const knex = require('knex');
const knexfile = require('../../config/knexfile');

const environment = process.env.NODE_ENV || 'development';
const config = knexfile[environment];

const db = knex(config);

const connectDB = async () => {
  try {
    await db.raw('SELECT 1');
    console.log(`PostgreSQL Connected: ${config.connection}`);
  } catch (error) {
    console.error(`Error connecting to PostgreSQL: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB, db };
