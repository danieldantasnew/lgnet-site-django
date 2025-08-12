let notificationTimeout = null;
let currentNotification = null;

export function notification(text, color) {
    const container = document.querySelector("[data-notification]");
    const clone = container.content.cloneNode(true);
    
    const newNotification = clone.querySelector("[data-notification-content]");
    
    if(currentNotification) {
        currentNotification.remove();
        clearTimeout(notificationTimeout);
    }
    
    if(newNotification instanceof HTMLDivElement) {
        if(color) newNotification.style.backgroundColor = `${color}`;
        const content = newNotification.querySelector("p");
        if(content instanceof HTMLParagraphElement) {
            content.innerText = text ? text : "Esta é uma notificação";
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