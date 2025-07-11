export default function menuMobile() {
    const button = document.querySelector("[data-btn-menu-mobile]");
    const effectMenuMobile = ()=> {
        const element = document.querySelector("[data-menu-mobile]");
        if(element) element.classList.add("animate-slideOut");
    }
    button.addEventListener("click", ()=> document.modalComponent.open('template[data-tpl="menuMobile"]', effectMenuMobile, 200));
}