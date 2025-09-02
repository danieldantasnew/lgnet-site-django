import {state} from "./values.js";

function increaseFont(content, pixels) {
            content.forEach((element)=> {
            if(element.closest('[data-dropdown="acessibilidade-modal"]')) return;
            if(element.childNodes.length > 0 && element.textContent.trim().length > 0) {
                const style = window.getComputedStyle(element);
                const currentFontSize = parseFloat(style.fontSize);

                element.style.fontSize = currentFontSize + pixels + "px"
            }
        });
}

function decreaseFont(content, pixels) {
        content.forEach((element)=> {
            if(element.closest('[data-dropdown="acessibilidade-modal"]')) return;
            if(element.childNodes.length > 0 && element.textContent.trim().length > 0) {
                const style = window.getComputedStyle(element);
                const currentFontSize = parseFloat(style.fontSize);

                element.style.fontSize = currentFontSize - pixels + "px"
            }
        });
}

export default function fontSizeActionButton() {
    const content = document.querySelectorAll("body *");

    if(content instanceof NodeList) {
        if(!state.increaseFontSize) {
            state.increaseFontSize = true;
            increaseFont(content, 2);
        }
        else {
            state.increaseFontSize = false;
            decreaseFont(content, 2);
        }
    }
}