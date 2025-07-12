export function modal() {
  const modal = document.querySelector("[data-modal]");

  if (!modal) return;
  let callback = null;
  let timeout = 0;

  function openModal(templateId, func=null, time=0) {
    const tpl = document.querySelector(templateId);
    if (!tpl) return;

    const clone = tpl.content.cloneNode(true);

    modal.innerHTML = "";
    modal.appendChild(clone);
    modal.classList.remove("hidden");
    callback = func;
    timeout = time;
  }

  function closeModal(func=null) {
    if(callback && typeof callback === "function") {
      callback();
    }

    if(func && typeof func === "function") {
      func();
    }

    setTimeout(() => {
      modal.classList.add("hidden");
      modal.innerHTML = "";
      callback = null;
      timeout = 0;
    }, timeout);
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
