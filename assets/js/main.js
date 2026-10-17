// Ali Hasnain Academic Theme - Main Interaction Script
document.addEventListener("DOMContentLoaded", function () {
  // 1. Mobile Sidebar Toggle
  const sidebarToggle = document.getElementById("td-sidebar-toggle");
  const sidebarNav = document.getElementById("td-section-nav");
  if (sidebarToggle && sidebarNav) {
    sidebarToggle.addEventListener("click", function () {
      sidebarNav.classList.toggle("collapse");
      sidebarNav.classList.toggle("show");
    });
  }

  // 2. Foldable submenus in sidebar
  const foldables = document.querySelectorAll(".fold-toggle");
  foldables.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const parentLi = this.closest("li");
      const targetUl = parentLi.querySelector("ul");
      if (targetUl) {
        if (targetUl.style.display === "none") {
          targetUl.style.display = "block";
          this.innerHTML = '<i class="fas fa-chevron-down"></i>';
        } else {
          targetUl.style.display = "none";
          this.innerHTML = '<i class="fas fa-chevron-right"></i>';
        }
      }
    });
  });

  // 3. Auto-generate Table of Contents (On this page) in .td-toc
  const content = document.querySelector(".td-content");
  const tocContainer = document.getElementById("td-toc-menu");
  if (content && tocContainer) {
    const headings = content.querySelectorAll("h2, h3");
    if (headings.length > 0) {
      const ul = document.createElement("ul");
      headings.forEach((heading, idx) => {
        if (!heading.id) {
          heading.id = "section-" + idx;
        }
        const li = document.createElement("li");
        if (heading.tagName.toLowerCase() === "h3") {
          li.classList.add("toc-h3");
        }
        const a = document.createElement("a");
        a.href = "#" + heading.id;
        a.textContent = heading.textContent.replace(/#$/, "").trim();
        li.appendChild(a);
        ul.appendChild(li);
      });
      tocContainer.innerHTML = '<div class="td-toc__title">On this page</div>';
      tocContainer.appendChild(ul);

      // ScrollSpy for ToC
      const tocLinks = tocContainer.querySelectorAll("a");
      window.addEventListener("scroll", () => {
        let current = "";
        headings.forEach((heading) => {
          const top = heading.getBoundingClientRect().top;
          if (top < 120) {
            current = heading.id;
          }
        });
        tocLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
          }
        });
      });
    } else {
      const tocCol = document.querySelector(".td-toc");
      if (tocCol) tocCol.style.display = "none";
    }
  }

  // 4. BibTeX toggling
  window.toggleBibtex = function (id) {
    const block = document.getElementById(id);
    if (block) {
      if (block.style.display === "block") {
        block.style.display = "none";
      } else {
        block.style.display = "block";
      }
    }
  };

  // 5. Copy to clipboard
  window.copyText = function (elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      navigator.clipboard.writeText(el.innerText).then(() => {
        alert("Copied to clipboard!");
      });
    }
  };

  // 6. Instant Search Logic
  const searchInput = document.getElementById("site-search-input");
  const modalBackdrop = document.getElementById("search-modal-backdrop");
  const modalInput = document.getElementById("modal-search-input");
  const resultsContainer = document.getElementById("search-results-list");

  function openSearch() {
    if (modalBackdrop && modalInput) {
      modalBackdrop.classList.add("show");
      modalInput.focus();
    }
  }

  function closeSearch() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove("show");
    }
  }

  if (searchInput) {
    searchInput.addEventListener("focus", function () {
      openSearch();
    });
  }

  // Keyboard shortcut: Ctrl+K or '/'
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey && e.key === "k") || (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA")) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === "Escape") {
      closeSearch();
    }
  });

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", function (e) {
      if (e.target === modalBackdrop) {
        closeSearch();
      }
    });
  }

  if (modalInput && resultsContainer && typeof searchIndex !== "undefined") {
    modalInput.addEventListener("input", function () {
      const query = this.value.toLowerCase().trim();
      resultsContainer.innerHTML = "";
      if (!query) return;

      // Adjust relative path if we are in a subfolder
      const pathDepth = (window.location.pathname.match(/\//g) || []).length;
      let prefix = "";
      if (window.location.pathname.includes("/bio_and_cv/") ||
          window.location.pathname.includes("/research/") ||
          window.location.pathname.includes("/pubs/") ||
          window.location.pathname.includes("/software/") ||
          window.location.pathname.includes("/data/") ||
          window.location.pathname.includes("/contact/")) {
        prefix = "../";
      }

      const matches = searchIndex.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );

      if (matches.length === 0) {
        resultsContainer.innerHTML = '<div class="p-3 text-muted text-center">No results found for "' + query + '"</div>';
      } else {
        matches.forEach(item => {
          const div = document.createElement("div");
          div.className = "search-result-item";
          div.innerHTML = `
            <a href="${prefix}${item.url}">${item.title} <span class="badge bg-light text-dark ms-2">${item.category}</span></a>
            <div class="search-result-snippet">${item.content}</div>
          `;
          resultsContainer.appendChild(div);
        });
      }
    });
  }
});
