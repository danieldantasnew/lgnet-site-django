function perguntasFrequentes() {
    const questions = document.querySelectorAll("[data-ask]");

    const handleIconButton = (button)=> {
        const icon = button.querySelector("i");
        if(icon instanceof HTMLElement) {
            if(icon.classList.contains("fa-plus")) {
                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");
            } 
            else {
                icon.classList.add("fa-plus");
                icon.classList.remove("fa-minus");
            }
        }
    }

    const showDescription = (event)=> {
        const topic = event.currentTarget;
        if(topic instanceof HTMLDivElement) {
            const description = topic.querySelector("[data-description]");
            if(description instanceof HTMLParagraphElement) {
                const isOpen = description.classList.contains("open");
                if (isOpen) {
                    description.style.maxHeight = description.scrollHeight + "px";
                    requestAnimationFrame(() => {
                    description.style.maxHeight = "0";
                    description.classList.remove("opacity-100");
                    });
                } else {
                    description.style.maxHeight = description.scrollHeight + "px";
                    description.classList.add("opacity-100");
                }
                
                description.classList.toggle("open");
            }
            handleIconButton(event.currentTarget);
        }
    }

    if(questions instanceof NodeList) {
        questions.forEach((question)=> {
            if(question instanceof HTMLDivElement) {
                question.addEventListener("click", showDescription)
            }
        })
    }
}

perguntasFrequentes();