import { addDark, removeDark } from "./highContrast.js";
import {
  addSpeechSynthesisFastMode,
  addSpeechSynthesisNormalMode,
  addSpeechSynthesisSlowMode,
  removeSpeechSynthesis,
  speakMessageClicked,
} from "./speechSynthesis.js";
import addMatchMedia from "../matchMedia.js";

function readerWebSite(readerMode) {
  const buttonReader = document.querySelector("[data-acessibilidade-leitor]");

  if (buttonReader instanceof HTMLButtonElement) {
    buttonReader.addEventListener("click", () => {
      switch (readerMode) {
        case 0:
          addSpeechSynthesisNormalMode();
          readerMode += 1;
          break;
        case 1:
          addSpeechSynthesisFastMode();
          readerMode += 1;
          break;
        case 2:
          addSpeechSynthesisSlowMode();
          readerMode += 1;
          break;
        case 3:
          removeSpeechSynthesis();
          readerMode += 1;
          break;

        default:
          readerMode = 0;
          break;
      }
    });
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
  let readerMode = 0;
  dropdownAcessibilidade();
  acessibilidadeMobile();
  readerWebSite(readerMode);

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

    if (!e.target.closest("[data-acessibilidade-leitor]") && readerMode !== 3 && readerMode !== 4) {
      speakMessageClicked(e);
      return;
    }
  });
}
