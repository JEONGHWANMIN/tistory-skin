document.addEventListener("DOMContentLoaded", function () {
  // Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const icon = themeToggle.querySelector("i");

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
    // Save theme preference
    localStorage.setItem(
      "theme",
      body.classList.contains("light-mode") ? "light" : "dark"
    );
  });

  // Load saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }

  // Category Menu Animation
  const categoryItems = document.querySelectorAll(".main-nav > ul > li");
  categoryItems.forEach((item) => {
    const subMenu = item.querySelector("ul");
    if (subMenu) {
      item.addEventListener("click", (e) => {
        if (e.target.tagName === "A" && e.target.nextElementSibling) {
          e.preventDefault();
          subMenu.style.display =
            subMenu.style.display === "none" ? "block" : "none";
          item.classList.toggle("active");
        }
      });
    }
  });

  // Highlight current category
  const currentPath = window.location.pathname;
  document.querySelectorAll(".main-nav a").forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
      // Expand parent category if it's a subcategory
      const parentLi = link.closest("li.has-children");
      if (parentLi) {
        parentLi.querySelector("ul").style.display = "block";
        parentLi.classList.add("active");
      }
    }
  });

  // Lazy Loading for Images
  const lazyImages = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));

  // Search Results Highlighting
  const highlightSearchResults = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");

    if (searchQuery) {
      const postContents = document.querySelectorAll(".post-content");
      const regex = new RegExp(searchQuery, "gi");

      postContents.forEach((content) => {
        const text = content.innerHTML;
        content.innerHTML = text.replace(
          regex,
          (match) => `<mark>${match}</mark>`
        );
      });
    }
  };

  // Call highlight function if we're on search results page
  if (window.location.href.includes("search")) {
    highlightSearchResults();
  }

  // Smooth Page Load Animation
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease-in";
    document.body.style.opacity = "1";
  }, 0);
});
