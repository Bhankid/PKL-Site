const sidebar = document.querySelector(".sidebar");
const toggleButton = document.querySelector("#open");
const closeButton = document.querySelector(".close");

toggleButton.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  sidebar.classList.remove("close");
});

closeButton.addEventListener("click", () => {
  sidebar.classList.remove("open");
  sidebar.classList.toggle("close");
});

// let slideIndex = 0;
// const slides = document.querySelectorAll(".slide");
// const dots = document.querySelectorAll(".dot");

// function showSlides() {
//   slides.forEach((slide) => {
//     slide.style.display = "none";
//   });
//   slides[slideIndex].style.display = "block";
//   dots.forEach((dot) => dot.classList.remove("active"));
//   dots[slideIndex].classList.add("active");

//   // Add animation/translate effect
//   slides[slideIndex].style.transform = `translateX(0)`;
//   slides[slideIndex].style.transition = `transform 1.5s ease-in-out`;

//   // Remove animation/translate effect from previous slide
//   if (slideIndex > 0) {
//     slides[slideIndex - 1].style.transform = `translateX(-100%)`;
//     slides[slideIndex - 1].style.transition = `transform 1s ease-in-out`;
//   }
// }

// function nextSlide() {
//   slideIndex = (slideIndex + 1) % slides.length;
//   showSlides();
// }

// function prevSlide() {
//   slideIndex = (slideIndex - 1 + slides.length) % slides.length;
//   showSlides();
// }

// function currentSlide(index) {
//   slideIndex = index - 1;
//   showSlides();
// }

// setInterval(nextSlide, 8000);

// // Add event listeners to the dots
// dots.forEach((dot, index) => {
//   dot.addEventListener("click", () => {
//     currentSlide(index + 1);
//   });
// });

// // Add event listeners to the next and previous buttons
// document.querySelector(".prev").addEventListener("click", prevSlide);
// document.querySelector(".next").addEventListener("click", nextSlide);

// // Initialize the slideshow
// showSlides();

// main slider

const slider = document.querySelector(".main-slider");

let autoplayTimeout;
let autoplayRunning = false;

function activate(e) {
  const items = document.querySelectorAll(".item");
  const slider = document.querySelector(".main-slider");

  if (e.target.matches(".next")) {
    const currentItem = slider.querySelector(".item:first-child");
    slider.append(currentItem);
  } else if (e.target.matches(".prev")) {
    const currentItem = slider.querySelector(".item:last-child");
    slider.prepend(currentItem);
  }
}

function autoplay() {
  if (autoplayRunning) return;
  autoplayRunning = true;

  const items = document.querySelectorAll(".item");
  const slider = document.querySelector(".main-slider");

  const currentItem = slider.querySelector(".item:first-child");
  slider.append(currentItem);

  autoplayTimeout = setTimeout(() => {
    autoplayRunning = false;
    autoplay();
  }, 5000);
}

// Add event listeners for the navigation buttons
document.querySelector(".prev").addEventListener("click", activate);
document.querySelector(".next").addEventListener("click", activate);

// Start autoplay
autoplay();

// Partner heading
document.addEventListener("DOMContentLoaded", () => {
  const text = "In Partnership With"; // The text to type
  const typingElement = document.getElementById("typing-effect");
  const cursor = document.createElement("span");
  cursor.className = "typing-cursor"; // Add cursor class
  typingElement.appendChild(cursor); // Append cursor to the heading

  let index = 0; // Current index of the text
  let isDeleting = false; // Flag to check if we are deleting

  function type() {
    if (isDeleting) {
      // Remove a character
      typingElement.textContent = text.substring(0, index--);
      if (index < 0) {
        isDeleting = false; // Start typing again
        index = 0; // Reset index for typing
        setTimeout(type, 500); // Pause before typing
      } else {
        setTimeout(type, 100); // Continue deleting
      }
    } else {
      // Add a character
      typingElement.textContent = text.substring(0, index + 1);
      if (index === text.length - 1) {
        isDeleting = true; // Start deleting
        setTimeout(type, 1000); // Pause before deleting
      } else {
        index++; // Increment index for the next character
        setTimeout(type, 150); // Continue typing
      }
    }
  }

  type(); // Start the typing effect
});

// Get the scroll to top button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show the button when scrolling down
window.onscroll = function () {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const windowHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / windowHeight) * 100;

  // Show or hide the button based on scroll position and screen width
  if (scrollTop > 100 && window.innerWidth > 768) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

// Scroll to top function
scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scroll effect
  });
});

// Get the current year
const currentYear = new Date().getFullYear();

document.getElementById("current-year").textContent = currentYear;

// Fetch images data
document.addEventListener("DOMContentLoaded", async () => {
  const imageContainer = document.getElementById("imageContainer");

  try {
    const response = await fetch("/api/images"); // Fetch images from the endpoint
    const images = await response.json(); // Parse the JSON response

    // Loop through the images and create HTML elements
    images.forEach((image, index) => {
      // Create a card for each image
      const card = document.createElement("div");
      card.className = "card";
      card.setAttribute(
        "data-aos",
        index % 2 === 0 ? "fade-down-right" : "fade-down-left"
      ); // Alternate animation

      const img = document.createElement("img");
      img.alt = image.description;
      img.height = 400;
      img.src = `/${image.filePath}`; // Adjust the path as necessary
      img.width = 600;

      const cardContent = document.createElement("div");
      cardContent.className = "card-content";

      const cardTitle = document.createElement("div");
      cardTitle.className = "card-title";
      cardTitle.innerHTML = `${image.description} <a href="#" class="read-more">Read More</a>`;

      const cardLocation = document.createElement("div");
      cardLocation.className = "card-location";
      cardLocation.textContent = image.location;

      const cardIcons = document.createElement("div");
      cardIcons.className = "card-icons";
      cardIcons.innerHTML = `
    <a href="https://twitter.com" target="_blank" aria-label="Twitter">
        <i class="fa-brands fa-x-twitter"></i>
    </a>
    <a href="https://wa.me" target="_blank" aria-label="WhatsApp">
        <i class="fab fa-whatsapp"></i>
    </a>
    <a href="https://facebook.com" target="_blank" aria-label="Facebook">
        <i class="fab fa-facebook-f"></i>
    </a>
    <a href="https://tiktok.com" target="_blank" aria-label="TikTok">
        <i class="fab fa-tiktok"></i>
    </a>
    <a href="https://instagram.com" target="_blank" aria-label="Instagram">
        <i class="fab fa-instagram"></i>
    </a>
    <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
        <i class="fab fa-linkedin-in"></i>
    </a>
`;

      // Append elements to the card
      cardContent.appendChild(cardTitle);
      cardContent.appendChild(cardLocation);
      cardContent.appendChild(cardIcons);
      card.appendChild(img);
      card.appendChild(cardContent);

      // Append the card to the image container
      imageContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching images:", error);
  }
});

document
  .getElementById("bookingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect form data
    const { clientName, clientEmail, appointmentDate, appointmentTime } =
      event.target.elements;

    // Create a message for WhatsApp
    const message =
      `Appointment Booking:\n` +
      `Name: ${clientName.value}\n` +
      `Email: ${clientEmail.value}\n` +
      `Date: ${appointmentDate.value}\n` +
      `Time: ${appointmentTime.value}\n`;

    const whatsappNumber = "233244664816";

    // Create a WhatsApp URL with the message
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank");

    // Show the success modal
    document.getElementById("successModal").style.display = "block";
  });

// Close the modal when the close button is clicked
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("successModal").style.display = "none";
});

// Close the modal when clicking outside of the modal content
window.addEventListener("click", function (event) {
  const modal = document.getElementById("successModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
