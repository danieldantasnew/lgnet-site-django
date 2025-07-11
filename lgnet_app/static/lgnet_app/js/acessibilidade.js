export default function acessibilidade() {
    const button = document.querySelector("[data-btn-acessibilidade]");
    const effectAcessibilidade = ()=> {
        const element = document.querySelector("[data-menu-acessibilidade-mobile]");
        if(element) element.classList.add("animate-slideOut");
    }
    button.addEventListener("click", ()=> document.modalComponent.open('template[data-tpl="acessibilidade"]', effectAcessibilidade, 200));
}