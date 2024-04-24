const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '170603',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'projectBE'
});
module.exports = {
  query: (text, params) => pool.query(text, params)
};
