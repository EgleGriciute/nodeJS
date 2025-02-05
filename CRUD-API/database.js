require("dotenv").config();

// npm i pg/ module responsible for connecting to the database:
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool.on("error", (err, client) => {
  console.error("Something is wrong", err);
  process.exit(-1);
});

module.exports = pool;
