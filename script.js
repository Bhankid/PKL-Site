let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlides() {
  slides.forEach((slide) => {
    slide.style.display = "none";
  });
  slides[slideIndex].style.display = "block";
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[slideIndex].classList.add("active");

  // Add animation/translate effect
  slides[slideIndex].style.transform = `translateX(0)`;
  slides[slideIndex].style.transition = `transform 1.5s ease-in-out`;

  // Remove animation/translate effect from previous slide
  if (slideIndex > 0) {
    slides[slideIndex - 1].style.transform = `translateX(-100%)`;
    slides[slideIndex - 1].style.transition = `transform 1s ease-in-out`;
  }
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlides();
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlides();
}

function currentSlide(index) {
  slideIndex = index - 1;
  showSlides();
}

setInterval(nextSlide, 8000);

// Add event listeners to the dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide(index + 1);
  });
});

// Add event listeners to the next and previous buttons
document.querySelector(".prev").addEventListener("click", prevSlide);
document.querySelector(".next").addEventListener("click", nextSlide);

// Initialize the slideshow
showSlides();
