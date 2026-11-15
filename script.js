/* =========================================================
   Online Resume - Sharjeel Ahmed
   Web Engineering | Assignment 1 | Iqra University
   Interactive features implemented with plain JavaScript:
     1. Mobile navigation menu
     2. Scroll spy (active navigation link)
     3. Reading progress bar
     4. Dark / light theme switch (saved in localStorage)
     5. Typing animation in the hero section
     6. Animated statistic counters
     7. Animated skill bars
     8. Project category filter
     9. Scroll reveal animations
    10. Contact form validation
    11. Back-to-top button
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Mobile navigation menu ---------- */
  const menuBtn  = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  menuBtn.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.classList.toggle("open", isOpen);
    menuBtn.setAttribute("aria-expanded", isOpen);
  });

  // close the menu after a link is clicked (small screens)
  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuBtn.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", false);
    });
  });

  /* ---------- 2 & 3. Scroll spy + progress bar ---------- */
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".nav-link");
  const progress = document.getElementById("scrollProgress");
  const toTop    = document.getElementById("toTop");

  function onScroll() {
    const y = window.scrollY;

    // reading progress
    const docHeight = document.body.scrollHeight - window.innerHeight;
    progress.style.width = (docHeight > 0 ? (y / docHeight) * 100 : 0) + "%";

    // active link
    let current = "home";
    sections.forEach(function (sec) {
      if (y >= sec.offsetTop - 140) current = sec.id;
    });
    links.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });

    // back to top button
    toTop.classList.toggle("show", y > 420);
  }

  window.addEventListener("scroll", onScroll);
  onScroll();

  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 4. Dark / light theme ---------- */
  const themeBtn = document.getElementById("themeBtn");

  // restore the theme chosen on the previous visit
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      const isDark = document.body.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  /* ---------- 5. Typing animation ---------- */
  const typedEl = document.getElementById("typed");
  const words   = ["Full Stack Developer", "React & Node.js Developer", "Mobile App Developer"];
  let wordIndex = 0, charIndex = 0, deleting = false;

  function typeEffect() {
    const word = words[wordIndex];
    typedEl.textContent = deleting
      ? word.substring(0, charIndex--)
      : word.substring(0, charIndex++);

    let speed = deleting ? 55 : 110;

    if (!deleting && charIndex > word.length) {
      deleting = true;
      speed = 1400;                       // pause at the end of a word
    } else if (deleting && charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      charIndex = 0;
      speed = 300;
    }
    setTimeout(typeEffect, speed);
  }
  typeEffect();

  /* ---------- 6 & 7. Counters and skill bars (run once visible) ---------- */
  function animateCounter(el) {
    const target  = parseInt(el.dataset.target, 10);
    const decimal = el.dataset.decimal;          // for values such as 1.5
    let value = 0;
    const step = Math.max(target / 40, 0.05);

    const timer = setInterval(function () {
      value += step;
      if (value >= target) {
        value = target;
        clearInterval(timer);
        el.textContent = decimal ? target + "." + decimal : target;
        return;
      }
      el.textContent = Math.floor(value);
    }, 35);
  }

  const statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll(".counter").forEach(function (el) {
    statObserver.observe(el);
  });

  const barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + "%";
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll(".bar-fill").forEach(function (el) {
    barObserver.observe(el);
  });

  /* ---------- 8. Project filter ---------- */
  const filterBtns = document.querySelectorAll(".filter");
  const projects   = document.querySelectorAll(".project");
  const emptyMsg   = document.getElementById("emptyMsg");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      const category = btn.dataset.filter;
      let visibleCount = 0;

      projects.forEach(function (project) {
        const match = category === "all" || project.dataset.cat === category;
        project.classList.toggle("hide", !match);
        if (match) visibleCount++;
      });

      emptyMsg.classList.toggle("show", visibleCount === 0);
    });
  });

  /* ---------- 9. Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---------- 10. Contact form validation ---------- */
  const form       = document.getElementById("contactForm");
  const nameInput  = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const msgInput   = document.getElementById("message");
  const successMsg = document.getElementById("successMsg");

  function setError(input, errorId, message) {
    document.getElementById(errorId).textContent = message;
    input.classList.toggle("invalid", message !== "");
    return message === "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();               // handled by JavaScript, no page reload
    successMsg.textContent = "";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

    const validName = setError(nameInput, "nameError",
      nameInput.value.trim().length < 3 ? "Please enter at least 3 characters." : "");

    const validEmail = setError(emailInput, "emailError",
      !emailPattern.test(emailInput.value.trim()) ? "Please enter a valid email address." : "");

    const validMsg = setError(msgInput, "messageError",
      msgInput.value.trim().length < 10 ? "Message must be at least 10 characters." : "");

    if (validName && validEmail && validMsg) {
      successMsg.textContent = "Thank you " + nameInput.value.trim() + "! Your message has been recorded.";
      form.reset();
      setTimeout(function () { successMsg.textContent = ""; }, 6000);
    }
  });

  // clear an error as soon as the user starts correcting the field
  [nameInput, emailInput, msgInput].forEach(function (input) {
    input.addEventListener("input", function () {
      input.classList.remove("invalid");
      document.getElementById(input.id + "Error").textContent = "";
    });
  });

  /* ---------- 11. Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

});
