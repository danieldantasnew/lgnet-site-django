export function modal() {
  const modal = document.querySelector("[data-modal]");

  if (!modal) return;

  function openModal(templateId) {
    const tpl = document.querySelector(templateId);
    if (!tpl) return;

    const clone = tpl.content.cloneNode(true);

    modal.innerHTML = "";
    modal.appendChild(clone);
    modal.classList.remove("hidden");
  }

  function closeModal() {
    modal.classList.add("hidden");
    modal.innerHTML = "";
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.modalComponent = {
    open: openModal,
    close: closeModal,
  };
}
