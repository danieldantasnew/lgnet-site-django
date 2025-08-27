import { addDark, removeDark } from "./highContrast.js";
import { readerWebSite, speakMessageClicked } from "./readingMode.js";
import addMatchMedia from "../matchMedia.js";

function syncAllHighlights(state) {
  const observer = new MutationObserver(() => {
    const buttons = document.querySelectorAll("[data-acessibilidade-leitor]");
    if (buttons.length) {
      highlightActive({
        attr: "data-acessibilidade-leitor",
        numberOfIndicators: 3,
        stateItem: state.readerMode,
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

export function highlightActive(options) {
  const createElementIfNotExists = (button) => {
    const element = document.createElement("div");
    element.setAttribute(`${options.attr}`, "highlight");

    button.classList.add("!shadow-[0_0_0_3px_var(--color-primary-variant)]");
    button.classList.add("dark:!shadow-[0_0_0_3px_var(--color-secondary)]");

    element.className = "flex gap-1 absolute top-3 right-2";
    for (let i = 1; i <= options.numberOfIndicators; i++) {
      const span = document.createElement("span");
      span.setAttribute(`${options.attr}-item-highlight`, `${i}`);
      span.className =
        "h-[6px] w-[6px] rounded-full bg-neutral-300 dark:bg-neutral-500";
      element.appendChild(span);
    }

    button.appendChild(element);

    return element;
  };

  const removeElement = (button, elementHighlight) => {
    button.classList.remove("!shadow-[0_0_0_3px_var(--color-primary-variant)]");
    button.classList.remove("dark:!shadow-[0_0_0_3px_var(--color-secondary)]");

    if (elementHighlight instanceof HTMLDivElement) elementHighlight.remove();
  };

  const addHighLight = (button) => {
    const spans = button.querySelectorAll(`[${options.attr}-item-highlight]`);

    if (spans instanceof NodeList) {
      spans.forEach((span) => {
        span.classList.remove("!bg-primary-variant");
        span.classList.remove("dark:!bg-secondary");

        const itemHighlight = span.getAttribute(
          `${options.attr}-item-highlight`
        );

        if (+itemHighlight == options.stateItem) {
          span.classList.add("!bg-primary-variant");
          span.classList.add("dark:!bg-secondary");
        }
      });
    }
  };

  if (typeof options.attr === "string") {
    const buttons = document.querySelectorAll(`[${options.attr}]`);

    if (buttons instanceof NodeList) {
      buttons.forEach((button) => {
        if (button instanceof HTMLButtonElement) {
          const isElementExists = button.querySelector(
            `[${options.attr}="highlight"]`
          );

          if (!isElementExists && options.stateItem) {
            createElementIfNotExists(button);
            addHighLight(button);
          } else {
            if (options.stateItem) {
              addHighLight(button);
            } else removeElement(button, isElementExists);
          }
        }
      });
    }
  }
}

function expandModalAcessibilidade(dropdown) {
  const expand = document.querySelector('[data-acessibilidade="expandir"]');
  const handleExpand = (event) => {
    const icon = expand.querySelector("i");
    if (icon) {
      if (dropdown.classList.contains("!w-126")) {
        dropdown.classList.remove("!w-126");
        icon.className = "fa-solid fa-up-right-and-down-left-from-center";
      } else {
        dropdown.classList.add("!w-126");
        icon.className = "fa-solid fa-down-left-and-up-right-to-center";
      }
    }
  };

  if (expand instanceof HTMLSpanElement) {
    expand.addEventListener("click", handleExpand);
  }
}

function dropdownAcessibilidade() {
  const button = document.querySelector(
    '[data-dropdown="acessibilidade-open"]'
  );
  const dropdown = document.querySelector(
    '[data-dropdown="acessibilidade-modal"]'
  );
  const close = document.querySelector(
    '[data-dropdown="acessibilidade-close"]'
  );

  let outsideClickHandler = null;

  const closeDropdown = () => {
    dropdown.classList.add("animate-fadeOut");
    setTimeout(() => {
      dropdown.classList.add("hidden");
      dropdown.classList.remove("animate-fadeOut");
    }, 300);

    if (outsideClickHandler) {
      document.removeEventListener("click", outsideClickHandler);
      outsideClickHandler = null;
    }
  };

  const openDropdown = () => {
    dropdown.classList.remove("hidden");

    outsideClickHandler = (event) => {
      if (!dropdown.contains(event.target) && !button.contains(event.target)) {
        closeDropdown();
        document.removeEventListener("click", outsideClickHandler);
        outsideClickHandler = null;
      }
    };

    setTimeout(() => {
      document.addEventListener("click", outsideClickHandler);
    }, 0);
  };

  if (
    button instanceof HTMLButtonElement &&
    dropdown instanceof HTMLDivElement
  ) {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = dropdown.classList.contains("hidden");
      isHidden ? openDropdown() : closeDropdown();
    });
    expandModalAcessibilidade(dropdown);
  }

  if (close instanceof HTMLSpanElement) {
    close.addEventListener("click", closeDropdown);
  }
}

function acessibilidadeMobile() {
  const isMobileFunc = () => {
    const isMobile = addMatchMedia("max-width: 1023px");
    if (!isMobile) {
      document.modalComponent.close();
      window.removeEventListener("resize", isMobileFunc);
    }
  };
  const effectAcessibilidade = () => {
    const element = document.querySelector("[data-menu-acessibilidade-mobile]");
    if (element) element.classList.add("animate-slideOut");
  };
  const button = document.querySelector("[data-btn-acessibilidade]");
  button.addEventListener("click", () => {
    window.addEventListener("resize", isMobileFunc);
    document.modalComponent.open(
      'template[data-tpl="acessibilidade"]',
      effectAcessibilidade,
      200
    );
  });
}

export default function initAcessibilidade() {
  const state = { readerMode: null };
  dropdownAcessibilidade();
  acessibilidadeMobile();
  readerWebSite(state);
  syncAllHighlights(state);

  document.addEventListener("click", (e) => {
    const onBtn = e.target.closest("[data-dark-on]");
    if (onBtn) {
      addDark();
      return;
    }

    const offBtn = e.target.closest("[data-dark-off]");
    if (offBtn) {
      removeDark();
      return;
    }

    if (!e.target.closest("[data-acessibilidade-leitor]") && state.readerMode) {
      speakMessageClicked(e);
      return;
    }
  });
}
