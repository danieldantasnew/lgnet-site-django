import {state} from "./values.js";
const allText = document.querySelectorAll(
  "p, h1, h2, h3, h4, h5, h6, li, a, span, strong, em, td, th, label"
);

function addBold() {
  allText.forEach((text) => {
    if (text.closest('[data-dropdown="acessibilidade-modal"]')) return;
    if (text.childNodes.length > 0 && text.textContent.trim().length > 0) {
      text.classList.add("!font-black", "!font-helvetica");
    }
  });
}

export function removeBold() {
  allText.forEach((text) => {
    if (text.closest('[data-dropdown="acessibilidade-modal"]')) return;
    if (text.childNodes.length > 0 && text.textContent.trim().length > 0) {
      text.classList.remove("!font-black", "!font-helvetica");
    }
  });
}

export default function hightlightLettersActionButton() {
  if (allText instanceof NodeList) {
    if (!state.highlightLetters) {
      state.highlightLetters = true;
      addBold();
    } else {
      state.highlightLetters = false;
      removeBold();
    }
  }
}
