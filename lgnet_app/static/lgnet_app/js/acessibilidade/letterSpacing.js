import {state} from "./values.js";
const allText = document.querySelectorAll(
  "p, h1, h2, h3, h4, h5, h6, li, a, span, strong, em, td, th, label"
);

function setSpacing(allText, pixels) {
  allText.forEach((text) => {
    if (text.closest('[data-dropdown="acessibilidade-modal"]')) return;
    if (text.childNodes.length > 0 && text.textContent.trim().length > 0) {
      text.style.letterSpacing = `${pixels}px`;
    }
  });
}

export function resetLetterSpacing() {
  allText.forEach((text) => {
    if (text.closest('[data-dropdown="acessibilidade-modal"]')) return;
    if (text.childNodes.length > 0 && text.textContent.trim().length > 0) {
      text.style.removeProperty("letter-spacing");
    }
  });
}

export function applyInitStateOfLetter() {
  switch (state.letterSpacing-1) {
    case 1:
      setSpacing(allText, 3);
      break;
    case 2:
      setSpacing(allText, 4);
      break;
    default:
      setSpacing(allText, 2);
      break;
  }
}

export function letterSpacingButton() {
  switch (state.letterSpacing) {
    case 0:
      state.letterSpacing++;
      setSpacing(allText, 2);
      break;
    case 1:
      state.letterSpacing++;
      setSpacing(allText, 3);
      break;
    case 2:
      state.letterSpacing++;
      setSpacing(allText, 4);
      break;
    default:
      resetLetterSpacing(allText);
      state.letterSpacing = 0;
      break;
  }
}
