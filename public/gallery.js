const tabs = document.querySelectorAll(".tab");
const galleries = document.querySelectorAll(".gallery");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs and galleries
    tabs.forEach((t) => t.classList.remove("active"));
    galleries.forEach((g) => g.classList.remove("active"));

    // Add active class to clicked tab and corresponding gallery
    tab.classList.add("active");
    document.getElementById(tab.dataset.target).classList.add("active");
  });
});
