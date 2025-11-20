const form = document.getElementById("registrationForm");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");
const successMessage = document.getElementById("success-message");

// Regular expressions
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9]{10}$/;
const strongPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

// Helper function to show error
function showError(input, message) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");
  input.classList.add("invalid");
  input.classList.remove("valid");
  errorMessage.textContent = message;
}

// Helper function to show success
function showSuccess(input) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");
  input.classList.remove("invalid");
  input.classList.add("valid");
  errorMessage.textContent = "";
}

// Real-time Validation
fullname.addEventListener("input", () => {
  if (fullname.value.trim() === "") {
    showError(fullname, "Full name is required");
  } else {
    showSuccess(fullname);
  }
});

email.addEventListener("input", () => {
  if (!email.value.match(emailPattern)) {
    showError(email, "Please enter a valid email");
  } else {
    showSuccess(email);
  }
});

password.addEventListener("input", () => {
  if (!password.value.match(strongPassword)) {
    showError(password, "Min 8 chars, include uppercase, number & special char");
  } else {
    showSuccess(password);
  }
});

phone.addEventListener("input", () => {
  if (!phone.value.match(phonePattern)) {
    showError(phone, "Phone must be 10 digits");
  } else {
    showSuccess(phone);
  }
});

// On Form Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Trigger validation manually
  fullname.dispatchEvent(new Event("input"));
  email.dispatchEvent(new Event("input"));
  password.dispatchEvent(new Event("input"));
  phone.dispatchEvent(new Event("input"));

  // Check if all inputs are valid
  const isValid =
    fullname.classList.contains("valid") &&
    email.classList.contains("valid") &&
    password.classList.contains("valid") &&
    phone.classList.contains("valid");

  if (isValid) {
    successMessage.textContent = "🎉 Registration Successful!";
    form.reset();

    // Remove green borders after submission
    [fullname, email, password, phone].forEach((input) =>
      input.classList.remove("valid")
    );
  } else {
    successMessage.textContent = "";
  }
});