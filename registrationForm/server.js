const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(bodyParser.json()); // Middleware to parse JSON data
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// POST route to handle signup
app.post("/sign_up", (req, res) => {
  const { username, email, age, phoneNumber, password, validatePassword } =
    req.body;

  // Log the received data
  console.log("Received data:", req.body); // This will print the JSON data to the console

  // Validation checks
  if (username.length < 3 || username.length > 30) {
    return res.json({ error: "Username must be between 3 and 30 characters." });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.json({ error: "Please enter a valid email address." });
  }

  if (age < 18 || age > 120) {
    return res.json({ error: "Age must be between 18 and 120." });
  }

  const phoneRegex = /^\+3706\d{7}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.json({
      error: "Phone number must be in the format: +3706xxxxxxxx.",
    });
  }

  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/\d/.test(password) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    return res.json({
      error:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  if (password !== validatePassword) {
    return res.json({ error: "Passwords do not match." });
  }

  // Simulate successful registration (no database interaction)
  return res.json({ success: true });
});

// Serve the homepage (index.html)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Serve the success page
app.get("/signup_success", (req, res) => {
  res.sendFile(__dirname + "/public/signup_success.html");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
