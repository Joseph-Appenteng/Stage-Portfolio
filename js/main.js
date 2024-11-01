function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}


document.getElementById("toggle-projects-btn").addEventListener("click", function () {
  const hiddenProjects = document.querySelector(".hidden-projects");
  const btn = document.getElementById("toggle-projects-btn");

  if (hiddenProjects.style.display === "none" || hiddenProjects.style.display === "") {
    hiddenProjects.style.display = "flex";
    btn.textContent = "Less Projects";
  } else {
    hiddenProjects.style.display = "none";
    btn.textContent = "Bekijk meer Projecten";
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.animate-section');

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          } else {
              entry.target.classList.remove('visible');
          }
      });
  }, {
      threshold: 0.1 // Trigger when 10% of the element is visible
  });

  sections.forEach(section => {
      observer.observe(section);
  });
});
