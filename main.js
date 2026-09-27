// SCM Group Management Services — shared site behavior (no build step, no framework)

document.addEventListener("DOMContentLoaded", function () {
  // Render lucide icons
  if (window.lucide) lucide.createIcons();

  // Mobile nav toggle
  var toggle = document.getElementById("nav-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Highlight active nav link based on current page
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav-link]").forEach(function (link) {
    var linkPage = link.getAttribute("data-nav-link");
    if (linkPage === path || (path === "" && linkPage === "index.html")) {
      link.classList.add("text-brand-orange");
      link.classList.remove("text-brand-blue", "text-white/90");
    }
  });

  // Simple scroll-reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("reveal-visible");
    });
  }

  // Job listing accordion (careers page)
  document.querySelectorAll("[data-job-toggle]").forEach(function (header) {
    header.addEventListener("click", function () {
      var panel = document.getElementById(header.getAttribute("data-job-toggle"));
      var chevron = header.querySelector("[data-chevron]");
      if (!panel) return;
      var isOpen = !panel.classList.contains("hidden");
      panel.classList.toggle("hidden");
      if (chevron) chevron.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
    });
  });

  // Job apply -> prefilled mailto (no backend to receive uploads on a static site)
  document.querySelectorAll("[data-apply-job]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var job = btn.getAttribute("data-apply-job");
      var subject = encodeURIComponent("Application: " + job);
      var body = encodeURIComponent(
        "Hi SCM Group team,\n\nI would like to apply for the " + job + " position.\n\n" +
        "Name:\nPhone:\nYears of experience:\n\n" +
        "(Please attach your resume to this email before sending.)\n\nThank you."
      );
      window.location.href = "mailto:info@scmgroup-services.com?subject=" + subject + "&body=" + body;
    });
  });

  // Contact form -> prefilled mailto (no backend on a static site)
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("cf-name").value.trim();
      var email = document.getElementById("cf-email").value.trim();
      var phone = document.getElementById("cf-phone").value.trim();
      var company = document.getElementById("cf-company").value.trim();
      var service = document.getElementById("cf-service").value.trim();
      var message = document.getElementById("cf-message").value.trim();
      var errorEl = document.getElementById("cf-error");

      if (!name || !email || !message) {
        if (errorEl) errorEl.classList.remove("hidden");
        return;
      }
      if (errorEl) errorEl.classList.add("hidden");

      var subject = encodeURIComponent("Website inquiry" + (service ? " — " + service : ""));
      var bodyLines = [
        "Name: " + name,
        "Email: " + email,
        phone ? "Phone: " + phone : null,
        company ? "Company: " + company : null,
        service ? "Service required: " + service : null,
        "",
        "Message:",
        message,
      ].filter(Boolean);
      var body = encodeURIComponent(bodyLines.join("\n"));
      window.location.href = "mailto:info@scmgroup-services.com?subject=" + subject + "&body=" + body;
    });
  }
});
