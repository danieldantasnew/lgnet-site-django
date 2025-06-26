document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("[data-dropdown='button']");
  const dropdown = document.querySelector("[data-dropdown='dropdown']");
  const close = document.querySelector("[data-dropdown='close']");

  let outsideClickHandler = null;

  const openDropdown = () => {
    dropdown.classList.remove("hidden");

    outsideClickHandler = (event) => {
      if (
        !dropdown.contains(event.target) &&
        !button.contains(event.target)
      ) {
        dropdown.classList.add("hidden");
        document.removeEventListener("click", outsideClickHandler);
        outsideClickHandler = null;
      }
    };

    setTimeout(() => {
      document.addEventListener("click", outsideClickHandler);
    }, 0);
  };

  const closeDropdown = () => {
    dropdown.classList.add("hidden");

    if (outsideClickHandler) {
      document.removeEventListener("click", outsideClickHandler);
      outsideClickHandler = null;
    }
  };

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = dropdown.classList.contains("hidden");
    isHidden ? openDropdown() : closeDropdown();
  });

  if (close) {
    close.addEventListener("click", closeDropdown);
  }
});
