// Event listener for the track button
document
  .getElementById("trackButton")
  .addEventListener("click", async function () {
    const shippingCode = document.getElementById("shippingCode").value;
    const trackingResult = document.getElementById("trackingResult");
    const resultMessage = document.getElementById("resultMessage");
    const shipmentDetails = document.getElementById("shipmentDetails");
    const copyButton = document.getElementById("copyButton");

    if (shippingCode) {
      try {
        // Fetch shipment data from the API
        const response = await fetch(
          `/api/shipments?shippingCode=${shippingCode}`
        );
        const data = await response.json();

        if (response.ok && data.length > 0) {
          const trackingInfo = data[0]; // Assuming the first result is the desired shipment

          resultMessage.textContent = `Tracking Code: ${trackingInfo.shippingCode}`;
          shipmentDetails.innerHTML = `
          <p><strong>Status:</strong> ${trackingInfo.status}</p>
          <p><strong>Estimated Arrival:</strong> ${new Date(
            trackingInfo.estimatedArrival
          ).toLocaleDateString()}</p>
          <p><strong>Current Location:</strong> ${trackingInfo.location}</p>
          <p>${trackingInfo.details}</p>
        `;
          trackingResult.classList.remove("hidden");
          copyButton.classList.remove("hidden");

          // Show success notification
          toastr.success("Shipment details retrieved successfully!");
        } else {
          toastr.error("No shipment found with the provided shipping code.");
        }
      } catch (error) {
        console.error("Error fetching shipment data:", error);
        toastr.error("An error occurred while fetching shipment data.");
      }
    } else {
      toastr.warning("Please enter a valid shipping code.");
    }
  });

// Copy to Clipboard functionality
document.getElementById("copyButton").addEventListener("click", function () {
  const shipmentDetailsText =
    document.getElementById("resultMessage").textContent +
    "\n" +
    document.getElementById("shipmentDetails").innerText;

  navigator.clipboard
    .writeText(shipmentDetailsText)
    .then(() => {
      toastr.success("Shipment details copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      toastr.error("Failed to copy shipment details.");
    });
});

// Toastr configuration
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
