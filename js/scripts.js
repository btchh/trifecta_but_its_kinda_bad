$(document).ready(function () {
  $.validator.addMethod(
    "alphanumeric",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
    },
    "Username must contain only letters and numbers (no spaces or special characters)"
  );

  $("#login").validate({
    rules: {
      username: {
        required: true,
        minlength: 5,
      },
      password: {
        required: true,
        minlength: 8,
      },
    },
    messages: {
      username: {
        required: "Please enter your username",
        minlength: "Username must be at least 5 characters",
        maxlength: "Username must not exceed 20 characters",
      },
      password: {
        required: "Please enter your password",
        minlength: "Password must be at least 8 characters",
      },
    },
    errorClass: "text-danger",
    errorElement: "small",
    submitHandler: function (form) {
      const username = $("#username").val();
      const password = $("#password").val();

      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

      if (currentUser.username === username) {
        localStorage.setItem("loggedInUser", username);

        alert("Login successful! Welcome back, " + currentUser.fullname + "!");
        window.location.href = "./dashboard.html";
      } else {
        alert("Invalid username or password!");
      }
    },
  });
});

$(document).ready(function () {
  $.validator.addMethod(
    "alphanumeric",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
    },
    "Username must contain only letters and numbers (no spaces or special characters)"
  );

  $.validator.addMethod(
    "strongPassword",
    function (value, element) {
      return this.optional(element) || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
    },
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  );

  $("#register").validate({
    rules: {
      username: {
        required: true,
        alphanumeric: true,
        minlength: 5,
        maxlength: 20,
      },
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        strongPassword: true,
        minlength: 8,
      },
    },
    messages: {
      username: {
        required: "Please enter a username",
        minlength: "Username must be at least 5 characters",
        maxlength: "Username must not exceed 20 characters",
      },
      email: {
        required: "Please enter your email",
        email: "Please enter a valid email address",
      },
      password: {
        required: "Please enter a password",
        minlength: "Password must be at least 8 characters",
      },
    },
    errorClass: "text-danger",
    errorElement: "small",
    submitHandler: function (form) {
      const username = $("#username").val();
      const email = $("#email").val();

      const userData = {
        username: username,
        email: email,
        registeredAt: new Date().toISOString(),
      };

      localStorage.setItem("currentUser", JSON.stringify(userData));

      alert("Registration successful! Welcome " + username + "!");
      window.location.href = "./dashboard.html";
    },
  });
});

$(document).ready(function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  // Always show welcome message + profile (no if/else hiding)
  $("#welcomeMessage").text("Welcome, " + (currentUser.username || "Guest") + "!");
  $("#displayUsername").text(currentUser.username || "N/A");
  $("#displayEmail").text(currentUser.email || "N/A");

  // Logout functionality
  $("#logoutBtn, #logoutBtn2").click(function () {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("currentUser");
    alert("You have been logged out!");
    window.location.href = "./login.html";
  });
});
