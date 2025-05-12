document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuBtnIcon = menuBtn.querySelector("i");
  
    let isMenuAnimating = false;
  
    menuBtn.addEventListener("click", () => {
      if (isMenuAnimating) return;
      isMenuAnimating = true;
      setTimeout(() => (isMenuAnimating = false), 300);
  
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
    });
  
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        menuBtnIcon.setAttribute("class", "ri-menu-line");
      }
    });
  
    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
      reset: false,
    };
  
    ScrollReveal().reveal(".header__image img", { ...scrollRevealOption, origin: "right" });
    ScrollReveal().reveal(".header__content h1", { ...scrollRevealOption, delay: 500 });
    ScrollReveal().reveal(".header__content h2", { ...scrollRevealOption, delay: 1000 });
    ScrollReveal().reveal(".header__content p", { ...scrollRevealOption, delay: 1500 });
    ScrollReveal().reveal(".header__btn", { ...scrollRevealOption, delay: 2000 });
  
    ScrollReveal().reveal(".about__image img", { ...scrollRevealOption, origin: "left" });
    ScrollReveal().reveal(".about__content .section__header", { ...scrollRevealOption, delay: 500 });
    ScrollReveal().reveal(".about__content p", { ...scrollRevealOption, delay: 1000 });
    ScrollReveal().reveal(".about__btn", { ...scrollRevealOption, delay: 1500 });
  
    ScrollReveal().reveal(".service__card", { duration: 1000, interval: 500 });
    ScrollReveal().reveal(".facility__content .section__header", { ...scrollRevealOption });
    ScrollReveal().reveal(".facility__content p", { ...scrollRevealOption, delay: 500 });
  
    ScrollReveal().reveal(".mentor__card", { ...scrollRevealOption, interval: 500 });
    ScrollReveal().reveal(".banner__content h2", { ...scrollRevealOption });
    ScrollReveal().reveal(".banner__content p", { ...scrollRevealOption, delay: 500 });
  
    // API Sections per Exercise Type
    const exerciseApis = [
      {
        selector: "cardio-exercise",
        url: "4fa47167d7msh656e74ea36f2704p19ea70jsn343d5b1ff0a2", // Cardio exercise API
      },
      {
        selector: "#strength-exercise",
        url: "https://exercisedb-api.vercel.app/exercises?type=strength",
      },
      {
        selector: "#flexibility-exercise",
        url: "https://exercisedb-api.vercel.app/exercises?type=flexibility",
      },
      {
        selector: "#spin-exercise",
        url: "https://exercisedb-api.vercel.app/exercises?type=spin",
      },
    ];
  
    exerciseApis.forEach(({ selector, url }) => {
      const container = document.querySelector(selector);
      if (container) {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              const exerciseList = data.map(
                (item) => `<li><strong>${item.name}</strong>: ${item.instructions}</li>`
              ).join("");
              container.innerHTML = `<ul>${exerciseList}</ul>`;
            } else {
              container.innerHTML = "<p>No exercises found.</p>";
            }
          })
          .catch((error) => {
            container.innerHTML = `<p style="color:red;">Failed to load exercises.</p>`;
            console.error(`Error fetching ${url}:`, error);
          });
      }
    });
  });
  