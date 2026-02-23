// ===== Config =====
const EMAIL = "gustavojv_maia@outlook.com"; // troque para o e-mail que você quer exibir
const LINKEDIN = "https://www.linkedin.com/in/gustavo-jv-maia/";
const GITHUB = "https://github.com/gugamaia";

// ===== Elements =====
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const navLinks = document.querySelectorAll(".nav__link");

const btnReveal = document.getElementById("btnRevealEmail");
const btnCopy = document.getElementById("btnCopyEmail");
const emailValue = document.getElementById("emailValue");
const toast = document.getElementById("toast");

const filterSelect = document.getElementById("filterSelect");
const projects = document.querySelectorAll(".project");

const year = document.getElementById("year");

// ===== Helpers =====
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ===== Menu mobile =====
if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("isOpen");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((a) => {
    a.addEventListener("click", () => {
      if (menu.classList.contains("isOpen")) {
        menu.classList.remove("isOpen");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// ===== Email reveal/copy =====
if (btnReveal && btnCopy && emailValue) {
  btnReveal.addEventListener("click", () => {
    emailValue.textContent = EMAIL;
    btnCopy.disabled = false;
    showToast("E-mail exibido. Você já pode copiar.");
  });

  btnCopy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      showToast("E-mail copiado para a área de transferência ✅");
    } catch {
      // fallback
      const temp = document.createElement("input");
      temp.value = EMAIL;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      temp.remove();
      showToast("E-mail copiado ✅");
    }
  });
}

// ===== Project filter =====
if (filterSelect) {
  filterSelect.addEventListener("change", () => {
    const value = filterSelect.value; // all | frontend | backend | fullstack

    projects.forEach((card) => {
      const tags = (card.getAttribute("data-tags") || "").split(" ");
      const show = value === "all" || tags.includes(value);
      card.style.display = show ? "" : "none";
    });

    showToast(value === "all" ? "Mostrando todos os projetos" : `Filtro aplicado: ${value}`);
  });
}

// ===== Footer year =====
if (year) year.textContent = new Date().getFullYear();

// ===== Optional: normalize links if you want to update in one place =====
// (Mantido simples; links já estão no HTML)