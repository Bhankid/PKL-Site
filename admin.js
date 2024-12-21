// // Event listener for the sign-up form
// document
//   .getElementById("signupForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     // Handle sign-up logic here
//     const username = document.getElementById("username").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     console.log("Sign Up:", { username, email, password });
//   });

// // Event listener for the login form
// document
//   .getElementById("loginForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     // Handle login logic here
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     console.log("Login:", { email, password });
//   });

// // Event listener for the image upload button
// document.getElementById("uploadButton").addEventListener("click", function () {
//   const fileInput = document.getElementById("imageUpload");
//   const file = fileInput.files[0];
//   if (file) {
//     // Handle image upload logic here
//     console.log("Image Uploaded:", file.name);
//   } else {
//     console.log("No file selected for upload.");
//   }
// });

// // Event listener for the shipment update button
// document.getElementById("updateButton").addEventListener("click", function () {
//   const shippingCode = document.getElementById("shippingCode").value;
//   const shippingStatus = document.getElementById("shippingStatus").value;
//   const estimatedArrival = document.getElementById("estimatedArrival").value;
//   const shippingLocation = document.getElementById("shippingLocation").value;
//   const destinationName = document.getElementById("destinationName").value;
//   const shipmentDetails = document.getElementById("shipmentDetails").value;

//   // Handle shipment update logic here
//   console.log("Shipment Updated:", {
//     shippingCode,
//     shippingStatus,
//     estimatedArrival,
//     shippingLocation,
//     destinationName,
//     shipmentDetails,
//   });
// });

// // Event listener for adding client details
// document
//   .getElementById("addClientButton")
//   .addEventListener("click", function () {
//     const clientName = document.getElementById("clientName").value;
//     const clientEmail = document.getElementById("clientEmail").value;
//     const clientPhone = document.getElementById("clientPhone").value;
//     const clientAddress = document.getElementById("clientAddress").value;

//     // Handle adding client logic here
//     console.log("Client Added:", {
//       clientName,
//       clientEmail,
//       clientPhone,
//       clientAddress,
//     });
//   });


// Event listener for the image upload button
document.getElementById("uploadButton").addEventListener("click", function () {
    const fileInput = document.getElementById("imageUpload");
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error uploading image:', error);
    });
});

// Event listener for the shipment update button
document.getElementById("updateButton").addEventListener("click", function () {
    const shippingCode = document.getElementById("shippingCode").value;
    const shippingStatus = document.getElementById("shippingStatus").value;
    const estimatedArrival = document.getElementById("estimatedArrival").value;
    const shippingLocation = document.getElementById("shippingLocation").value;
    const destinationName = document.getElementById("destinationName").value;
    const shipmentDetails = document.getElementById("shipment Details").value;

    const shipmentData = {
        shippingCode,
        shippingStatus,
        estimatedArrival,
        shippingLocation,
        destinationName,
        shipmentDetails
    };

    fetch('http://localhost:5000/update-shipment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(shipmentData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error updating shipment:', error);
    });
});