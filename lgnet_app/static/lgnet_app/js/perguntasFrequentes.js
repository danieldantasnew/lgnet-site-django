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
        const topic = event.currentTarget.closest('[data-ask]');
        if(topic instanceof HTMLDivElement) {
            const description = topic.querySelector("[data-description]");
            if(description instanceof HTMLParagraphElement) description.classList.toggle("hidden");
            handleIconButton(event.currentTarget);
        }
    }

    if(questions instanceof NodeList) {
        questions.forEach((question)=> {
            const buttonShow = question.querySelector("[data-action]");
            if(buttonShow instanceof HTMLButtonElement) {
                buttonShow.addEventListener("click", showDescription)
            }
        })
    }
}

perguntasFrequentes();