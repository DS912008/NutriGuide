// Show the correct form (Sign In or Sign Up)
function showForm(formType) {
    document.getElementById("signin-form").classList.remove("active");
    document.getElementById("signup-form").classList.remove("active");
  
    if (formType === "signin") {
      document.getElementById("signin-form").classList.add("active");
    } else {
      document.getElementById("signup-form").classList.add("active");
    }
  }
  
  // Handle Sign Up
  function handleSignUp(event) {
    event.preventDefault();
  
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
  
    // Save the user data to localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  
    alert("Sign Up successful! Please sign in to access your profile.");
    showForm('signin');
  }
  
  // Handle Sign In
  function handleSignIn(event) {
    event.preventDefault();
  
    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;
  
    // Retrieve stored user data from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
  
    if (username === storedUsername && password === storedPassword) {
      alert("Sign In successful!");
      displayProfile(storedUsername);
    } else {
      alert("Incorrect username or password.");
    }
  }
  
  // Display the user's profile page
  function displayProfile(username) {
    document.getElementById("profile-username").textContent = username;
    document.getElementById("profile-email").textContent = localStorage.getItem("email");
    document.getElementById("profile-password").textContent = localStorage.getItem("password");
  
    // Hide auth section and show profile
    document.getElementById("auth").style.display = "none";
    document.getElementById("profile").style.display = "block";
    document.getElementById("profile-link").style.display = "none";
    document.getElementById("logout-link").style.display = "block";
  }
  
  // Handle Logout
  document.getElementById("logout-link").addEventListener("click", function() {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  
    // Redirect to the home page or reset the UI
    document.getElementById("auth").style.display = "block";
    document.getElementById("profile").style.display = "none";
    document.getElementById("profile-link").style.display = "none";
    document.getElementById("logout-link").style.display = "none";
    alert("You have been logged out.");
  });
  