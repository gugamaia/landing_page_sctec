const EMAIL = "gustavo@email.com"; // troque aqui

const btnReveal = document.getElementById("btnRevealEmail");
const btnCopy = document.getElementById("btnCopyEmail");
const emailValue = document.getElementById("emailValue");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

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
    // fallback simples caso o clipboard não funcione
    const temp = document.createElement("input");
    temp.value = EMAIL;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
    showToast("E-mail copiado ✅");
  }
});