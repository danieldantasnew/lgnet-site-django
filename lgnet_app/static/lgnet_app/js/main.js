import { darkMode } from "./darkMode.js";
import { modal } from "./modal.js";
import { dropdown } from "./dropdown.js";
import { banners } from "./banners.js";
import { planos } from "./planos.js";
import { selecionar_cidade } from "./selecionarCidade.js";
import acessibilidade from "./acessibilidade.js";
import menuMobile from "./menuMobile.js";

document.addEventListener("DOMContentLoaded", () => {
  const swiperPlanos = new Swiper(".mySwiperPlans", {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-plans-button-next",
      prevEl: ".swiper-plans-button-prev",
    },
    breakpoints: {
    1023: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
  });

  acessibilidade();
  menuMobile()
  darkMode();
  modal();
  dropdown();
  banners();
  planos(swiperPlanos);
  selecionar_cidade(swiperPlanos);
});
