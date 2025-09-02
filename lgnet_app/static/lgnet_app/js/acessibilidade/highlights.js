import { resources, state } from "./values.js";

export function highlightActive(options) {
  const createElementIfNotExists = (button) => {
    const element = document.createElement("div");
    element.setAttribute(`${options.attr}`, "highlight");

    button.classList.add("!shadow-[0_0_0_3px_var(--color-primary-variant)]");
    button.classList.add("dark:!shadow-[0_0_0_3px_var(--color-secondary)]");

    element.className = "flex gap-1 absolute top-3 right-2";
    for (let i = 1; i <= options.numberOfIndicators; i++) {
      const span = document.createElement("span");
      span.setAttribute(`${options.attr}-item-highlight`, `${i}`);
      span.className =
        "h-[6px] w-[6px] rounded-full bg-neutral-300 dark:bg-neutral-500";
      element.appendChild(span);
    }

    button.appendChild(element);

    return element;
  };

  const removeElement = (button, elementHighlight) => {
    button.classList.remove("!shadow-[0_0_0_3px_var(--color-primary-variant)]");
    button.classList.remove("dark:!shadow-[0_0_0_3px_var(--color-secondary)]");

    if (elementHighlight instanceof HTMLDivElement) elementHighlight.remove();
  };

  const addHighLight = (button) => {
    const spans = button.querySelectorAll(`[${options.attr}-item-highlight]`);

    if (spans instanceof NodeList) {
      spans.forEach((span) => {
        span.classList.remove("!bg-primary-variant");
        span.classList.remove("dark:!bg-secondary");

        const itemHighlight = span.getAttribute(
          `${options.attr}-item-highlight`
        );

        if (+itemHighlight == options.stateItem) {
          span.classList.add("!bg-primary-variant");
          span.classList.add("dark:!bg-secondary");
        }
      });
    }
  };

  if (typeof options.attr === "string") {
    const buttons = document.querySelectorAll(`[data-acessibilidade="${options.attr}"]`);

    if (buttons instanceof NodeList) {
      buttons.forEach((button) => {
        if (button instanceof HTMLButtonElement) {
          const isElementExists = button.querySelector(
            `[${options.attr}="highlight"]`
          );

          if (!isElementExists && options.stateItem) {
            createElementIfNotExists(button);
            addHighLight(button);
          } else {
            if (options.stateItem) {
              addHighLight(button);
            } else removeElement(button, isElementExists);
          }
        }
      });
    }
  }
}

export function syncHighlight() {
  resources.forEach((resource) => {
    highlightActive({
      attr: resource.name,
      numberOfIndicators: resource.numberOfIndicators,
      stateItem: state[resource.stateItem],
    });
    
  });
}

function syncAllSameButtonsHighlights() {
  const observer = new MutationObserver(() => {
    syncHighlight();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

syncAllSameButtonsHighlights();