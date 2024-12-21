document.getElementById("trackButton").addEventListener("click", function () {
  const shippingCode = document.getElementById("shippingCode").value;
  const trackingResult = document.getElementById("trackingResult");
  const resultMessage = document.getElementById("resultMessage");
    const shipmentDetails = document.getElementById("shipmentDetails");
    const copyButton = document.getElementById("copyButton");

 
  if (shippingCode) {
    // Simulated response
    const trackingInfo = {
      code: shippingCode,
      status: "In Transit",
      estimatedArrival: "2025-1-30",
      location: "Port of Tema, Ghana",
      details: "Your shipment is currently on its way to the destination.",
    };

    resultMessage.textContent = `Tracking Code: ${trackingInfo.code}`;
    shipmentDetails.innerHTML = `
            <p><strong>Status:</strong> ${trackingInfo.status}</p>
            <p><strong>Estimated Arrival:</strong> ${trackingInfo.estimatedArrival}</p>
            <p><strong>Current Location:</strong> ${trackingInfo.location}</p>
            <p>${trackingInfo.details}</p>
        `;
      trackingResult.classList.remove("hidden");
      copyButton.classList.remove("hidden");
  } else {
    alert("Please enter a valid shipping code.");
  }
});

// Copy to Clipboard functionality
document.getElementById('copyButton').addEventListener('click', function() {
    const shipmentDetailsText = document.getElementById('resultMessage').textContent + '\n' + 
                                document.getElementById('shipmentDetails').innerText;

    navigator.clipboard.writeText(shipmentDetailsText).then(() => {
        alert('Shipment details copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});
