async function fetchQuestions() {
  try {
    const response = await fetch("api/perguntas-frequentes/");
    if (!response.ok) throw new Error("Erro ao buscar perguntas");
    return await response.json();
  } catch (error) {
    return error.message;
  }
}

const addQuestions = (container, questions) => {
  container.innerHTML = "";
  if (questions.length == 0) {
    container.innerHTML += `<p class="text-center font-medium text-lg">Sem resultados</p>`;
    return;
  }
  questions.forEach((question) => {
    container.innerHTML += `
            <div data-ask="${question.id}" class="cursor-pointer p-4 bg-neutral-50 dark:bg-neutral-800 rounded-sm">
                <div class="flex justify-between">
                    <h3 class="text-sm sm:!text-[16px] text-neutral-950 dark:text-neutral-50 font-semibold">${question.question}</h3>
                    <button class="
                        cursor-pointer
                        p-[10px] 
                        mr-2
                        h-3 
                        w-3 
                        rounded-full 
                        border-2 
                        text-neutral-900
                        dark:text-neutral-50
                        border-neutral-900 
                        dark:border-neutral-100
                        bg-transparent 
                        flex 
                        justify-center 
                        items-center 
                        hover:bg-primary-variant 
                        hover:text-light-background
                        dark:hover:bg-secondary 
                        dark:hover:text-secondary-variant
                    ">
                        <i class="fa-solid fa-plus text-sm"></i>
                    </button>
                </div>
                <p data-description  
                class="
                    max-w-220 
                    text-neutral-500 
                    font-medium 
                    text-sm
                    sm:text-[16px]
                    mt-3
                    max-h-0 
                    opacity-0 
                    overflow-hidden 
                    transition-all 
                    duration-400 
                    ease-[cubic-bezier(0.075,0.82,0.165,1)]
                    dark:text-neutral-200
                ">
                    ${question.answer}
                </p>
            </div>
            `;
  });
  const asks = container.querySelectorAll("[data-ask]");
  if (asks instanceof NodeList) {
    asks.forEach((ask) => ask.addEventListener("click", showDescription));
  }
};

const handleSearchInput = (container, questions) => {
  const input = document.querySelector("[data-input-search]");
  const handleChange = (event) => {
    const { value } = event.target;
    const regex = new RegExp(value, "i");

    addQuestions(
      container,
      questions.filter((question) => regex.test(question.question))
    );
  };

  if (input instanceof HTMLInputElement) {
    input.addEventListener("input", handleChange);
  }
};

const handleIconButton = (button) => {
  const icon = button.querySelector("i");
  if (icon instanceof HTMLElement) {
    if (icon.classList.contains("fa-plus")) {
      icon.classList.remove("fa-plus");
      icon.classList.add("fa-minus");
    } else {
      icon.classList.add("fa-plus");
      icon.classList.remove("fa-minus");
    }
  }
};

const showDescription = (event) => {
  const topic = event.currentTarget;
  if (topic instanceof HTMLDivElement) {
    const description = topic.querySelector("[data-description]");
    if (description instanceof HTMLParagraphElement) {
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
};

async function perguntasFrequentes() {
  const divQuestions = document.querySelector("[data-questions]");
  const questions = await fetchQuestions();
  let questionsToSearch = questions.slice();

  if (
    divQuestions instanceof HTMLDivElement &&
    Array.isArray(questionsToSearch)
  ) {
    addQuestions(divQuestions, questionsToSearch);
  }
  handleSearchInput(divQuestions, questionsToSearch);
}

perguntasFrequentes();
