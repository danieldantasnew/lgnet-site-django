import modal from "./modal.js";
import selecionar_cidade from "./selecionarCidade.js";
import menuMobile from "./menuMobile.js";
import ativarAcessibilidade from "./acessibilidade/acessibilidade.js";

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

  ativarAcessibilidade();
  menuMobile();
  modal();
  selecionar_cidade();
});
