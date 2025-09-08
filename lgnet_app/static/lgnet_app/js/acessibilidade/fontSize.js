import { state } from "./values.js";
const content = document.querySelectorAll(
  "p, h1, h2, h3, h4, h5, h6, li, a, span, strong, em, td, th, label"
);
const pixels = 2;

export function increaseFont() {
  content.forEach((element) => {
    if (element.closest('[data-dropdown="acessibilidade-modal"]')) return;
    if (
      element.childNodes.length > 0 &&
      element.textContent.trim().length > 0
    ) {
      const style = window.getComputedStyle(element);
      const currentFontSize = parseFloat(style.fontSize);

      element.style.fontSize = currentFontSize + pixels + "px";
    }
  });
}

export function decreaseFont() {
  content.forEach((element) => {
    if (element.closest('[data-dropdown="acessibilidade-modal"]')) return;
    if (
      element.childNodes.length > 0 &&
      element.textContent.trim().length > 0
    ) {
      element.style.removeProperty("font-size");
    }
  });
}

export default function fontSizeActionButton() {
  if (content instanceof NodeList) {
    if (!state.increaseFontSize) {
      state.increaseFontSize = true;
      increaseFont();
    } else {
      state.increaseFontSize = false;
      decreaseFont();
    }
  }
}
