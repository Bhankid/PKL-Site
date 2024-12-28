
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



document.addEventListener("DOMContentLoaded", function () {
  // Sidebar and section management
  const toggleButton = document.getElementById("toggleButton");
  const sidebar = document.getElementById("sidebar");
  const header = document.querySelector("header");
  const dashboardContainer = document.querySelector(".dashboard-container");
  const closeIcon = document.getElementById("closeIcon");
  const openIcon = document.getElementById("openIcon");
  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  const sections = document.querySelectorAll("main > section");

  // Modal management
  const uploadModal = document.getElementById("uploadModal");
  const updateShipmentModal = document.getElementById("updateShipmentModal");
  const clientModal = document.getElementById("clientModal");

  // Buttons for modals
  const updateButton = document.getElementById("updateButton");
  const openUpdateModal = document.getElementById("openUpdateModal");
  const openClientModal = document.getElementById("openClientModal");
  const closeClientModal = document.getElementById("closeClientModal");
  const addClientButton = document.getElementById("addClientButton");

  // Close buttons for modals
  const closeModal = document.getElementById("closeModal");
  const closeUpdateModal = document.getElementById("closeUpdateModal");

  // Table bodies
  const uploadTableBody = document
    .getElementById("uploadTable")
    .getElementsByTagName("tbody")[0];
  const shipmentTableBody = document
    .getElementById("shipmentTable")
    .getElementsByTagName("tbody")[0];
  const clientTableBody = document
    .getElementById("clientTable")
    .getElementsByTagName("tbody")[0];

  // Show only the upload section by default
  sections.forEach((section) => {
    section.style.display = "none";
  });

  // Check for active tab in localStorage
  const activeTab = localStorage.getItem("activeTab");
  if (activeTab) {
    // Hide all sections
    sections.forEach((section) => {
      section.style.display = "none";
    });
    // Show the active tab section
    document.getElementById(activeTab).style.display = "block";

    // Set the active class on the corresponding sidebar link
    sidebarLinks.forEach((link) => {
      if (link.getAttribute("data-target") === activeTab) {
        link.classList.add("active");
      }
    });
  } else {
    // Default to showing the upload section if no active tab is found
    document.getElementById("upload-section").style.display = "block";
    sidebarLinks[0].classList.add("active"); // Set the first link as active
  }

  // Sidebar link click event
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("data-target");

      // Hide all sections
      sections.forEach((section) => {
        section.style.display = "none";
      });
      document.getElementById(targetId).style.display = "block";

      // Remove active class from all links
      sidebarLinks.forEach((link) => {
        link.classList.remove("active");
      });

      // Add active class to the clicked link
      this.classList.add("active");

      // Store the active tab in localStorage
      localStorage.setItem("activeTab", targetId);

      // Manage modal visibility based on the active tab
      if (targetId !== "upload-section") {
        uploadModal.style.display = "none";
        updateButton.style.display = "none";
      } else {
        updateButton.style.display = "block";
      }

      if (targetId !== "tracking-update-section") {
        updateShipmentModal.style.display = "none";
        openUpdateModal.style.display = "none";
      } else {
        openUpdateModal.style.display = "block";
      }

      if (targetId === "tracking-update-section") {
        document.getElementById("trackingCodeSection").style.display = "block";
      } else {
        document.getElementById("trackingCodeSection").style.display = "none";
      }

      if (targetId !== "customer-section") {
        clientModal.style.display = "none";
        openClientModal.style.display = "none";
      } else {
        openClientModal.style.display = "block";
      }
    });
  });

  // Toggle sidebar visibility
  toggleButton.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
    if (sidebar.classList.contains("collapsed")) {
      closeIcon.style.display = "none";
      openIcon.style.display = "inline";
      header.style.left = "7vw";
      dashboardContainer.style.marginLeft = "7vw";
    } else {
      closeIcon.style.display = "inline";
      openIcon.style.display = "none";
      header.style.left = "20vw";
      dashboardContainer.style.marginLeft = "20vw";
    }
  });

  // Upload modal handlers
  updateButton.addEventListener("click", () => {
    uploadModal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    uploadModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === uploadModal) {
      uploadModal.style.display = "none";
    }
  });

  // Pagination Variables
  let currentPage = 1;
  const imagesPerPage = 5;
  let totalImages = 0;

  // Handle upload button click
  document
    .getElementById("uploadButton")
    .addEventListener("click", async () => {
      const imageUpload = document.getElementById("imageUpload").files[0];
      const imageDescription =
        document.getElementById("imageDescription").value;
      const imageLocation = document.getElementById("imageLocation").value;

      const imageId = document
        .getElementById("uploadButton")
        .getAttribute("data-id");

      const formData = new FormData();
      if (imageUpload) {
        formData.append("image", imageUpload);
      }
      formData.append("description", imageDescription);
      formData.append("location", imageLocation);

      try {
        if (imageId) {
          // Update existing image
          const response = await fetch(`/api/images/${imageId}`, {
            method: "PUT",
            body: JSON.stringify({
              description: imageDescription,
              location: imageLocation,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          if (response.ok) {
            toastr.success(data.message || "Image updated successfully!"); // Show success message
          } else {
            toastr.error(data.message || "Error updating image"); // Show error message
          }
        } else {
          // Upload new image
          const response = await fetch("/api/images", {
            method: "POST",
            body: formData,
          });
         const data = await response.json();
         toastr.success(data.message || "Error uploading image");
        }

        // Clear input fields
        document.getElementById("imageUpload").value = "";
        document.getElementById("imageDescription").value = "";
        document.getElementById("imageLocation").value = "";
        document.getElementById("uploadModal").style.display = "none"; // Close modal

        fetchImages(); // Refresh the image list
      } catch (error) {
        console.error("Error uploading/updating image:", error);
        toastr.error("An error occurred while processing the image."); // Use Toastr for error notification
      }
    });

  // Function to fetch images and handle pagination
  async function fetchImages() {
    try {
      const response = await fetch("/api/images");
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching images:", errorData.error);
        toastr.error(
          "An error occurred while fetching images: " + errorData.error
        ); // Use Toastr for error notification
        throw new Error("Failed to fetch images");
      }

      const images = await response.json();
      console.log("Fetched images:", images);

      // Sort images by createdAt in descending order
      images.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Update pagination variables
      totalImages = images.length;

      // Calculate start and end indices for the current page
      const start = (currentPage - 1) * imagesPerPage;
      const end = start + imagesPerPage;
      const imagesToShow = images.slice(start, end);

      updateImageTable(imagesToShow); // Display images for the current page
      updatePaginationInfo(); // Update pagination buttons
    } catch (error) {
      console.error("Error fetching images:", error);
      toastr.error("An error occurred while fetching images."); // Use Toastr for error notification
    }
  }

  // Function to update the image table
  function updateImageTable(images) {
    const uploadTableBody = document
      .getElementById("uploadTable")
      .getElementsByTagName("tbody")[0];
    uploadTableBody.innerHTML = ""; // Clear existing rows

    images.forEach((image) => {
      const newRow = uploadTableBody.insertRow(); // Create a new row for each image
      const imgElement = document.createElement("img");
      imgElement.src = image.fileUrl; // Use the fileUrl provided by the backend
      imgElement.style.width = "100px";
      imgElement.style.height = "auto";
      newRow.insertCell(0).appendChild(imgElement);
      newRow.insertCell(1).textContent = image.description;
      newRow.insertCell(2).textContent = image.location;

      const actionsCell = newRow.insertCell(3);
      const iconContainer = document.createElement("div");
      iconContainer.style.display = "flex";
      iconContainer.style.gap = "10px";

      // Edit Icon
      const editIcon = document.createElement("i");
      editIcon.className = "fas fa-edit";
      editIcon.style.cursor = "pointer";
      editIcon.addEventListener("click", () => {
        document.getElementById("imageUpload").value = ""; // Clear previous file input
        document.getElementById("imageDescription").value = image.description;
        document.getElementById("imageLocation").value = image.location;
        document
          .getElementById("uploadButton")
          .setAttribute("data-id", image.id); // Store the image ID for updating
        document.getElementById("uploadModal").style.display = "block"; // Show upload modal for editing
      });
      iconContainer.appendChild(editIcon);

      // Delete Icon
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "fas fa-trash";
      deleteIcon.style.cursor = "pointer";
      deleteIcon.addEventListener("click", async () => {
        if (confirm("Are you sure you want to delete this image?")) {
          await fetch(`/api/images/${image.id}`, { method: "DELETE" });
          fetchImages(); // Refresh the image list after deletion
        }
      });
      iconContainer.appendChild(deleteIcon);

      actionsCell.appendChild(iconContainer);
    });
  }

  // Function to update pagination info
  function updatePaginationInfo() {
    document.getElementById(
      "uploadPageInfo"
    ).textContent = `Page ${currentPage} of ${Math.ceil(
      totalImages / imagesPerPage
    )}`;
    document.getElementById("prevUpload").disabled = currentPage === 1;
    document.getElementById("nextUpload").disabled =
      currentPage * imagesPerPage >= totalImages;
  }

  // Event listeners for pagination buttons
  document.getElementById("prevUpload").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchImages();
    }
  });

  document.getElementById("nextUpload").addEventListener("click", () => {
    if (currentPage * imagesPerPage < totalImages) {
      currentPage++;
      fetchImages();
    }
  });

  // Initial fetch of images
  fetchImages();
  

  // Client modal handlers
  openClientModal.addEventListener("click", () => {
    clientModal.style.display = "block";
  });

  closeClientModal.addEventListener("click", () => {
    clientModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === clientModal) {
      clientModal.style.display = "none";
    }
  });

  // Function to fetch and display clients
  async function fetchClients() {
    const clientTableBody = document
      .getElementById("clientTable")
      .getElementsByTagName("tbody")[0];
    clientTableBody.innerHTML = ""; // Clear existing rows

    try {
      const response = await fetch("/api/clients");
      const clients = await response.json();

      clients.forEach((client) => {
        const newRow = clientTableBody.insertRow();
        newRow.innerHTML = `
        <td>${client.name}</td>
        <td>${client.trackingCode}</td>
        <td>${client.email}</td>
        <td>${client.phone}</td>
        <td>${client.address}</td>
        <td>
          <i class="fas fa-edit" style="cursor: pointer;" onclick="alert('Edit functionality not implemented yet.')"></i>
          <i class="fas fa-trash" style="cursor: pointer;" onclick="if(confirm('Are you sure you want to delete this entry?')) this.closest('tr').remove();"></i>
        </td>
      `;
      });
    } catch (error) {
      console.error("Error fetching clients:", error);
      toastr.error("An error occurred while fetching clients."); // Use Toastr for error notification
    }
  }

  // Event listener for adding client details
  addClientButton.addEventListener("click", async () => {
    const name = document.getElementById("clientName").value;
    const trackingCode = document.getElementById("clientTrackingCode").value;
    const email = document.getElementById("clientEmail").value;
    const phone = document.getElementById("clientPhone").value;
    const address = document.getElementById("clientAddress").value;

    // Send a POST request to add the client
    const response = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, trackingCode, email, phone, address }),
    });

   const data = await response.json();
   if (response.ok) {
     toastr.success(data.message || "Client added successfully!"); // Show success message
   } else {
     toastr.error(data.message || "Error adding client"); // Show error message
   }

    // Clear input fields
    document.getElementById("clientName").value = "";
    document.getElementById("clientTrackingCode").value = "";
    document.getElementById("clientEmail").value = "";
    document.getElementById("clientPhone").value = "";
    document.getElementById("clientAddress").value = "";

    // Close the modal
    clientModal.style.display = "none";

    // Refresh the client list
    fetchClients();
  });

  // Initial fetch of existing clients
  fetchClients();

  // Shipment Modal Handlers
  openUpdateModal.addEventListener("click", () => {
    updateShipmentModal.style.display = "block";
  });

  closeUpdateModal.addEventListener("click", () => {
    updateShipmentModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === updateShipmentModal) {
      updateShipmentModal.style.display = "none";
    }
  });

  // Pagination Variables
  let currentShipmentPage = 1;
  const shipmentsPerPage = 10;
  let totalShipments = 0;

  // Submit Update Button Handler
  document
    .getElementById("submitUpdateButton")
    .addEventListener("click", async () => {
      const shipment = {
        shippingCode: document.getElementById("shippingCode").value,
        status: document.getElementById("shippingStatus").value,
        estimatedArrival: document.getElementById("estimatedArrival").value,
        location: document.getElementById("shippingLocation").value,
        destination: document.getElementById("destinationName").value,
        details: document.getElementById("shipmentDetails").value,
      };

      const response = await fetch("/api/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shipment),
      });
     const data = await response.json();
     if (response.ok) {
       toastr.success(data.message || "Shipment updated successfully!"); // Show success message
     } else {
       toastr.error(data.message || "Error updating shipment"); // Show error message
     }

      // Fetch all shipments and update the table
      fetchShipments();

      // Clear the form fields
      document.getElementById("shippingCode").value = "";
      document.getElementById("shippingStatus").value = "";
      document.getElementById("estimatedArrival").value = "";
      document.getElementById("shippingLocation").value = "";
      document.getElementById("destinationName").value = "";
      document.getElementById("shipmentDetails").value = "";

      updateShipmentModal.style.display = "none";
    });

  // Function to update the shipment table with pagination
  function updateShipmentTable(shipments) {
    const shipmentTableBody = document
      .getElementById("shipmentTable")
      .getElementsByTagName("tbody")[0];
    shipmentTableBody.innerHTML = ""; // Clear existing rows

    const start = (currentShipmentPage - 1) * shipmentsPerPage;
    const end = start + shipmentsPerPage;

    // Show only the shipments for the current page
    const shipmentsToShow = shipments.slice(start, end);
    shipmentsToShow.forEach((shipment) => {
      const newRow = shipmentTableBody.insertRow();
      newRow.innerHTML = `
            <td>${shipment.shippingCode}</td>
            <td>${shipment.status}</td>
            <td>${new Date(shipment.estimatedArrival).toLocaleDateString()}</td>
            <td>${shipment.location}</td>
            <td>${shipment.destination}</td>
            <td>${shipment.details}</td>
            <td>
                <i class="fas fa-edit" style="cursor: pointer;" onclick="alert('Edit functionality not implemented yet.')"></i>
                <i class="fas fa-trash" style="cursor: pointer;" onclick="if(confirm('Are you sure you want to delete this entry?')) this.closest('tr').remove();"></i>
            </td>
        `;
    });

    // Update pagination info
    totalShipments = shipments.length;
    document.getElementById(
      "shipmentPageInfo"
    ).textContent = `Page ${currentShipmentPage} of ${Math.ceil(
      totalShipments / shipmentsPerPage
    )}`;
    document.getElementById("prevShipment").disabled =
      currentShipmentPage === 1;
    document.getElementById("nextShipment").disabled =
      currentShipmentPage * shipmentsPerPage >= totalShipments;
  }

  // Event listeners for pagination buttons
  document.getElementById("prevShipment").addEventListener("click", () => {
    if (currentShipmentPage > 1) {
      currentShipmentPage--;
      fetchShipments(); // Fetch shipments again to update the table
    }
  });

  document.getElementById("nextShipment").addEventListener("click", () => {
    if (currentShipmentPage * shipmentsPerPage < totalShipments) {
      currentShipmentPage++;
      fetchShipments(); // Fetch shipments again to update the table
    }
  });

  // Fetch all shipments and display in the table
  async function fetchShipments() {
    const shipmentTableBody = document
      .getElementById("shipmentTable")
      .getElementsByTagName("tbody")[0];

    try {
      const response = await fetch("/api/shipments");
      if (!response.ok) {
        throw new Error("Failed to fetch shipments");
      }

      const shipments = await response.json();
      // Sort shipments by estimatedArrival date in descending order
      shipments.sort(
        (a, b) => new Date(b.estimatedArrival) - new Date(a.estimatedArrival)
      );

      updateShipmentTable(shipments); // Update the table with the fetched shipments
    } catch (error) {
      console.error("Error fetching shipments:", error);
      toastr.error("An error occurred while fetching shipments."); // Use Toastr for error notification
    }
  }

  // Fetch shipments on page load
  fetchShipments();
});

// Generate tracking code functionality
function generateTrackingCode() {
  const randomCode = `PKL-${Math.random()
    .toString(36)
    .slice(2, 10)
    .toUpperCase()}`;
  document.getElementById("trackingCodeInput").value = randomCode; // Set the generated code in the input field
}

// Add event listener for the generate tracking code button
document
  .getElementById("generateTrackingCodeButton")
  .addEventListener("click", generateTrackingCode);

document
  .getElementById("logoutLink")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior
    document.getElementById("logoutDialog").classList.remove("hidden"); // Show the dialog
  });

document.getElementById("yesButton").addEventListener("click", function () {
  window.location.href = "/api/logout"; // Redirect to the logout page
});

document.getElementById("noButton").addEventListener("click", function () {
  document.getElementById("logoutDialog").classList.add("hidden"); // Close the dialog
});

// Event listener for the sign-up form
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

// // Event listener for the image upload button
// document.getElementById("uploadButton").addEventListener("click", function () {
//   const fileInput = document.getElementById("imageUpload");
//   const formData = new FormData();
//   formData.append("image", fileInput.files[0]);

//   fetch("http://localhost:5000/upload", {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.message);
//     })
//     .catch((error) => {
//       console.error("Error uploading image:", error);
//     });
// });

// // Event listener for the shipment update button
// document.getElementById("updateButton").addEventListener("click", function () {
//   const shippingCode = document.getElementById("shippingCode").value;
//   const shippingStatus = document.getElementById("shippingStatus").value;
//   const estimatedArrival = document.getElementById("estimatedArrival").value;
//   const shippingLocation = document.getElementById("shippingLocation").value;
//   const destinationName = document.getElementById("destinationName").value;
//   const shipmentDetails = document.getElementById("shipment Details").value;

//   const shipmentData = {
//     shippingCode,
//     shippingStatus,
//     estimatedArrival,
//     shippingLocation,
//     destinationName,
//     shipmentDetails,
//   };

//   fetch("http://localhost:5000/shipping", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(shipmentData),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.message);
//     })
//     .catch((error) => {
//       console.error("Error updating shipment:", error);
//     });
// });


// Toastr js
// Initialize an object to store cart items
let cartItems = {};
