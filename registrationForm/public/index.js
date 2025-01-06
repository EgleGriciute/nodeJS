const form = document.getElementById("signupForm");
const errorMessageDiv = document.getElementById("errorMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Prepare form data
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Reset error message on each form submission attempt
  errorMessageDiv.style.display = "none";
  errorMessageDiv.textContent = "";

  // Validation
  let errorMessages = [];

  // Validate username
  if (!data.username || data.username.length < 3 || data.username.length > 30) {
    errorMessages.push("Username must be between 3 and 30 characters.");
  }

  // Validate email
  if (
    !data.email ||
    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.email)
  ) {
    errorMessages.push("Please enter a valid email address.");
  }

  // Validate age
  if (!data.age || data.age < 18 || data.age > 120) {
    errorMessages.push("Age must be between 18 and 120.");
  }

  // Validate phone number (with the format +3706 followed by 7 digits)
  if (!data.phoneNumber || !/^\+3706\d{7}$/.test(data.phoneNumber)) {
    errorMessages.push(
      "Phone number must be in the format: +3706 followed by 7 digits."
    );
  }

  // Validate password
  if (
    !data.password ||
    data.password.length < 8 ||
    !/[A-Z]/.test(data.password) ||
    !/[a-z]/.test(data.password) ||
    !/\d/.test(data.password) ||
    !/[^A-Za-z0-9]/.test(data.password)
  ) {
    errorMessages.push(
      "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character."
    );
  }

  // Validate password confirmation
  if (data.password !== data["validate-password"]) {
    errorMessages.push("Passwords do not match.");
  }

  // If there are any validation errors, display them
  if (errorMessages.length > 0) {
    errorMessageDiv.textContent = errorMessages.join(" ");
    errorMessageDiv.style.display = "block"; // Show the error message
    return; // Stop the form submission
  }

  // If no validation errors, send data to server
  fetch("/sign_up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Redirect to signup_success.html on successful registration
        window.location.href = "/signup_success.html"; // Redirect to signup_success.html
      } else {
        window.location.href = "/signup_success.html";
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      errorMessageDiv.textContent =
        "An unexpected error occurred. Please try again.";
      errorMessageDiv.style.display = "block";
    });
});
