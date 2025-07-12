import { toggleDark } from "./darkMode.js";
import addMatchMedia from "./matchMedia.js";

export default function acessibilidade() {
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

    const contrastButton = document.querySelector(
      "[data-contraste-acessibilidade]"
    );
    contrastButton.addEventListener("click", toggleDark);
  });
}
