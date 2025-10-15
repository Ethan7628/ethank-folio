const { Pool } = require('pg');
require('dotenv').config();

// Use DATABASE_URL for Neon or other Postgres providers
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Missing DATABASE_URL in environment. Exiting.');
  process.exit(1);
}

const pool = new Pool({ connectionString });

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
