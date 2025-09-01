import { highlightActive, state } from "./acessibilidade.js";

function addBold(allText) {
  allText.forEach((text) => {
    if (text.closest('[data-dropdown="acessibilidade-modal"]')) return;
    if (text.childNodes.length > 0 && text.textContent.trim().length > 0) {
      text.classList.add("font-black", "font-helvetica");
    }
  });
}

function removeBold(allText) {
  allText.forEach((text) => {
    if (text.closest('[data-dropdown="acessibilidade-modal"]')) return;
    if (text.childNodes.length > 0 && text.textContent.trim().length > 0) {
      text.classList.remove("font-black", "font-helvetica");
    }
  });
}

export default function hightlightLettersActionButton() {
  const allText = document.querySelectorAll("body *");

  if (allText instanceof NodeList) {
    if (!state.highlightLetters) {
      state.highlightLetters = true;
      addBold(allText);
    } else {
      state.highlightLetters = false;
      removeBold(allText);
    }

    highlightActive({
      attr: "data-acessibilidade-bold",
      numberOfIndicators: 1,
      stateItem: state.highlightLetters,
    });
  }
}
