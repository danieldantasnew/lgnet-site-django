import modal from "./modal.js";
import selecionar_cidade from "./selecionarCidade.js";
import menuMobile from "./menuMobile.js";
import ativarAcessibilidade from "./acessibilidade/acessibilidade.js";
import animations  from "./animations.js";

document.addEventListener("DOMContentLoaded", () => {
  ativarAcessibilidade();
  menuMobile();
  modal();
  selecionar_cidade();
  animations();
});
