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
        toastr.success(data.message); // Show success message
        window.location.href = "/api/login"; // Redirect to login page
      } else {
        toastr.error(data.error || "An error occurred during logout"); // Use Toastr for error notification
      }
    });



    // Toastr js
// Initialize an object to store cart items
let cartItems = {};

// Configure Toastr options
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "200",
  hideDuration: "400",
  timeOut: "1500",
  extendedTimeOut: "800",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "slideDown",
  hideMethod: "fadeOut",
  escapeHtml: false,
};