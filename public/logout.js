// document.getElementById("logoutButton").addEventListener("click", function () {
//   // Redirect to the login page or perform any other action
//   window.location.href = "login.html"; // Change this to your login page URL
// });


  document
    .getElementById("logoutButton")
    .addEventListener("click", async () => {
      const response = await fetch("/api/logout", { method: "POST" });
      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Show success message
        window.location.href = "/api/login"; // Redirect to login page
      } else {
        alert(data.error || "An error occurred during logout");
      }
    });