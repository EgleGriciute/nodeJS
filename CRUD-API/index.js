require("dotenv").config();
const express = require("express");
const pool = require("./database.js");
const app = express();

// Middleware
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Utility function to handle errors
const handleError = (res, error) =>
  res.status(400).json({ error: error.message });

// ---- User Routes ---- //

// Fetch all users
app.get("/users", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM users");
    res.status(200).json(results.rows);
  } catch (err) {
    handleError(res, err);
  }
});

// Fetch user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(results.rows[0]);
  } catch (err) {
    handleError(res, err);
  }
});

// Insert new user
app.post("/users", async (req, res) => {
  try {
    const { id, username, password } = req.body;

    if (!id || !username || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const results = await pool.query(
      'INSERT INTO users (id, username, "password") VALUES ($1, $2, $3) RETURNING *',
      [id, username, password]
    );

    res.status(201).json(results.rows[0]);
  } catch (err) {
    handleError(res, err);
  }
});

// Update user by ID
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    const results = await pool.query(
      'UPDATE users SET username = $1, "password" = $2 WHERE id = $3 RETURNING *',
      [username, password, id]
    );

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(results.rows[0]);
  } catch (err) {
    handleError(res, err);
  }
});

// Delete user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: results.rows[0] });
  } catch (err) {
    handleError(res, err);
  }
});

// ---- Product Routes ---- //

// Fetch all products
app.get("/products", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM products");
    res.status(200).json(results.rows);
  } catch (err) {
    handleError(res, err);
  }
});

// Fetch product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(results.rows[0]);
  } catch (err) {
    handleError(res, err);
  }
});

// Insert new product
app.post("/products", async (req, res) => {
  try {
    const { id, title, description, price } = req.body;

    if (!id || !title || !description || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const results = await pool.query(
      "INSERT INTO products (id, title, description, price) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, title, description, price]
    );

    res.status(201).json(results.rows[0]);
  } catch (err) {
    handleError(res, err);
  }
});

// Update product by ID
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;

    const results = await pool.query(
      "UPDATE products SET title = $1, description = $2, price = $3 WHERE id = $4 RETURNING *",
      [title, description, price, id]
    );

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(results.rows[0]);
  } catch (err) {
    handleError(res, err);
  }
});

// Delete product by ID
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product deleted", product: results.rows[0] });
  } catch (err) {
    handleError(res, err);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
