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
  document.getElementById("upload-section").style.display = "block";

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

  // Handle upload button click
  document.getElementById("uploadButton").addEventListener("click", () => {
    const imageUpload = document.getElementById("imageUpload").files[0];
    const imageDescription = document.getElementById("imageDescription").value;
    const imageLocation = document.getElementById("imageLocation").value;

    if (imageUpload && imageDescription && imageLocation) {
      const newRow = uploadTableBody.insertRow();
      const imgElement = document.createElement("img");
      imgElement.src = URL.createObjectURL(imageUpload);
      imgElement.style.width = "100px";
      imgElement.style.height = "auto";
      newRow.insertCell(0).appendChild(imgElement);
      newRow.insertCell(1).textContent = imageDescription;
      newRow.insertCell(2).textContent = imageLocation;

      const actionsCell = newRow.insertCell(3);
      const iconContainer = document.createElement("div");
      iconContainer.style.display = "flex";
      iconContainer.style.gap = "10px";

      const editIcon = document.createElement("i");
      editIcon.className = "fas fa-edit";
      editIcon.style.cursor = "pointer";
      editIcon.addEventListener("click", () =>
        alert("Edit functionality not implemented yet.")
      );
      iconContainer.appendChild(editIcon);

      const deleteIcon = document.createElement("i");
      deleteIcon.className = "fas fa-trash";
      deleteIcon.style.cursor = "pointer";
      deleteIcon.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this entry?")) {
          uploadTableBody.deleteRow(newRow.rowIndex - 1);
        }
      });
      iconContainer.appendChild(deleteIcon);

      actionsCell.appendChild(iconContainer);

      document.getElementById("imageUpload").value = "";
      document.getElementById("imageDescription").value = "";
      document.getElementById("imageLocation").value = "";

      uploadModal.style.display = "none";
    } else {
      alert("Please fill in all fields and select an image.");
    }
  });

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

  // Event listener for adding client details
  addClientButton.addEventListener("click", () => {
    const name = document.getElementById("clientName").value;
    const email = document.getElementById("clientEmail").value;
    const phone = document.getElementById("clientPhone").value;
    const address = document.getElementById("clientAddress").value;
    const clientTrackingCode =
      document.getElementById("clientTrackingCode").value;

    const newRow = clientTableBody.insertRow();
    newRow.innerHTML = `
            <td>${name}</td>
             <td>${clientTrackingCode}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>${address}</td>
            <td>
                <i class="fas fa-edit" style="cursor: pointer;" onclick="alert('Edit functionality not implemented yet.')"></i>
                <i class="fas fa-trash" style="cursor: pointer;" onclick="if(confirm('Are you sure you want to delete this entry?')) this.closest('tr').remove();"></i>
            </td>
        `;

    document.getElementById("clientName").value = "";
    document.getElementById("clientEmail").value = "";
    document.getElementById("clientPhone").value = "";
    document.getElementById("clientAddress").value = "";
    document.getElementById("clientTrackingCode").value = "";

    clientModal.style.display = "none";
  });

  clientTableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-client")) {
      const row = event.target.closest("tr");
      clientTableBody.deleteRow(row.rowIndex - 1);
    }
  });

  // Update shipment modal handlers
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

  document
    .getElementById("submitUpdateButton")
    .addEventListener("click", () => {
      const shippingCode = document.getElementById("shippingCode").value;
      const shippingStatus = document.getElementById("shippingStatus").value;
      const estimatedArrival =
        document.getElementById("estimatedArrival").value;
      const shippingLocation =
        document.getElementById("shippingLocation").value;
      const destinationName = document.getElementById("destinationName").value;
      const shipmentDetails = document.getElementById("shipmentDetails").value;

      if (
        shippingCode &&
        shippingStatus &&
        estimatedArrival &&
        shippingLocation &&
        destinationName
      ) {
        const newRow = shipmentTableBody.insertRow();
        newRow.innerHTML = `
                <td>${shippingCode}</td>
                <td>${shippingStatus}</td>
                <td>${estimatedArrival}</td>
                <td>${shippingLocation}</td>
                <td>${destinationName}</td>
                <td>${shipmentDetails}</td>
                <td>
                    <i class="fas fa-edit" style="cursor: pointer;" onclick="alert('Edit functionality not implemented yet.')"></i>
                    <i class="fas fa-trash" style="cursor: pointer;" onclick="if(confirm('Are you sure you want to delete this entry?')) this.closest('tr').remove();"></i>
                </td>
            `;

        document.getElementById("shippingCode").value = "";
        document.getElementById("shippingStatus").value = "";
        document.getElementById("estimatedArrival").value = "";
        document.getElementById("shippingLocation").value = "";
        document.getElementById("destinationName").value = "";
        document.getElementById("shipmentDetails").value = "";

        updateShipmentModal.style.display = "none";
      } else {
        alert("Please fill in all required fields.");
      }
    });
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
document.getElementById("generateTrackingCodeButton").addEventListener("click", generateTrackingCode);


// Event listener for the sign-up form
document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Handle sign-up logic here
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("Sign Up:", { username, email, password });
  });

// Event listener for the login form
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Handle login logic here
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("Login:", { email, password });
  });

// Event listener for the image upload button
document.getElementById("uploadButton").addEventListener("click", function () {
  const fileInput = document.getElementById("imageUpload");
  const file = fileInput.files[0];
  if (file) {
    // Handle image upload logic here
    console.log("Image Uploaded:", file.name);
  } else {
    console.log("No file selected for upload.");
  }
});

// Event listener for the shipment update button
document.getElementById("updateButton").addEventListener("click", function () {
  const shippingCode = document.getElementById("shippingCode").value;
  const shippingStatus = document.getElementById("shippingStatus").value;
  const estimatedArrival = document.getElementById("estimatedArrival").value;
  const shippingLocation = document.getElementById("shippingLocation").value;
  const destinationName = document.getElementById("destinationName").value;
  const shipmentDetails = document.getElementById("shipmentDetails").value;

  // Handle shipment update logic here
  console.log("Shipment Updated:", {
    shippingCode,
    shippingStatus,
    estimatedArrival,
    shippingLocation,
    destinationName,
    shipmentDetails,
  });
});

// Event listener for adding client details
document
  .getElementById("addClientButton")
  .addEventListener("click", function () {
    const clientName = document.getElementById("clientName").value;
    const clientEmail = document.getElementById("clientEmail").value;
    const clientPhone = document.getElementById("clientPhone").value;
    const clientAddress = document.getElementById("clientAddress").value;

    // Handle adding client logic here
    console.log("Client Added:", {
      clientName,
      clientEmail,
      clientPhone,
      clientAddress,
    });
  });

// Event listener for the image upload button
document.getElementById("uploadButton").addEventListener("click", function () {
  const fileInput = document.getElementById("imageUpload");
  const formData = new FormData();
  formData.append("image", fileInput.files[0]);

  fetch("http://localhost:5000/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
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
    shipmentDetails,
  };

  fetch("http://localhost:5000/shipping", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shipmentData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error("Error updating shipment:", error);
    });
});
