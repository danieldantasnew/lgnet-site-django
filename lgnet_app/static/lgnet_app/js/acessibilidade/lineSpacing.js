import {state} from "./values.js";
const allText = document.querySelectorAll(
  "p, h1, h2, h3, h4, h5, h6, li, a, span, strong, em, td, th, label"
);

function setSpacing(allText, pixels) {
  allText.forEach((text) => {
    console.log(text)
    if (text.closest('[data-dropdown="acessibilidade-modal"]')) return;
    if (text.childNodes.length > 0 && text.textContent.trim().length > 0) {
      const style = window.getComputedStyle(text);
      const currentLineHeight = parseFloat(style.lineHeight);
      text.style.lineHeight = currentLineHeight + pixels + "px";
    }
  });
}

export function resetLineSpacing() {
  allText.forEach((text) => {
    if (text.closest('[data-dropdown="acessibilidade-modal"]')) return;
    if (text.childNodes.length > 0 && text.textContent.trim().length > 0) {
      text.style.removeProperty("line-height");
    }
  });
}

export function lineSpacingButton() {
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
      resetLineSpacing(allText);
      state.lineSpacing = 0;
      break;
  }
}
