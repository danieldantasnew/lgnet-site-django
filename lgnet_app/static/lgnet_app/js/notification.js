let notificationTimeout = null;
let currentNotification = null;

function colorTypeOfNotification(type) {
    if(type == "error") return "#e7000b "
    else if(type == "success") return "#00a63e"
    else if(type == "alert") return "oklch(76.9% 0.188 70.08)"
    else return "#171717"
}

export function notification(message, typeNotification) {
    const container = document.querySelector("[data-notification]");
    const clone = container.content.cloneNode(true);
    
    const newNotification = clone.querySelector("[data-notification-content]");
    
    if(currentNotification) {
        currentNotification.remove();
        clearTimeout(notificationTimeout);
    }
    
    if(newNotification instanceof HTMLDivElement) {
        if(typeNotification) newNotification.style.backgroundColor = `${ colorTypeOfNotification(typeNotification)}`;
        const content = newNotification.querySelector("p");
        if(content instanceof HTMLParagraphElement) {
            content.innerText = message ? message : "Esta é uma notificação";
        }
    }
    
    currentNotification = newNotification;
    document.body.appendChild(clone);
    
    if(notificationTimeout) clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
        currentNotification.classList.remove('animate-slideTop');
        currentNotification.classList.add('animate-slideBottom');
        setTimeout(() => {
            newNotification.remove();
        }, 100);
        currentNotification = null;
    }, 3000);
}