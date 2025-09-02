import {state} from "./values.js";

function setSpacing(allText, pixels) {
  allText.forEach((text) => {
    if (text.closest('[data-dropdown="acessibilidade-modal"]')) return;
    if (text.childNodes.length > 0 && text.textContent.trim().length > 0) {
      const style = window.getComputedStyle(text);
      const currentLineHeight = parseFloat(style.lineHeight);
      text.style.lineHeight = currentLineHeight + pixels + "px";
    }
  });
}

function resetSpacing(allText) {
  allText.forEach((text) => {
    if (text.closest('[data-dropdown="acessibilidade-modal"]')) return;
    if (text.childNodes.length > 0 && text.textContent.trim().length > 0) {
      text.style.removeProperty("line-height");
    }
  });
}

export function lineSpacingButton() {
  const allText = document.querySelectorAll("body *");

  switch (state.lineSpacing) {
    case 0:
      state.lineSpacing++;
      setSpacing(allText, 2);
      break;
    case 1:
      state.lineSpacing++;
      setSpacing(allText, 3);
      break;
    case 2:
      state.lineSpacing++;
      setSpacing(allText, 4);
      break;
    default:
      resetSpacing(allText);
      state.lineSpacing = 0;
      break;
  }
}
