import {state} from "./values.js";

function setSpacing(allText, pixels) {
  allText.forEach((text) => {
    if (text.closest('[data-dropdown="acessibilidade-modal"]')) return;
    if (text.childNodes.length > 0 && text.textContent.trim().length > 0) {
      const style = window.getComputedStyle(text);
      const currentLetterSpacing = parseFloat(style.letterSpacing);
      text.style.letterSpacing = currentLetterSpacing + pixels + "px";
    }
  });
}

function resetSpacing(allText) {
  allText.forEach((text) => {
    if (text.closest('[data-dropdown="acessibilidade-modal"]')) return;
    if (text.childNodes.length > 0 && text.textContent.trim().length > 0) {
      text.style.removeProperty("letter-spacing");
    }
  });
}

export function letterSpacingButton() {
  const allText = document.querySelectorAll("body *");

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
      resetSpacing(allText);
      state.letterSpacing = 0;
      break;
  }
}
