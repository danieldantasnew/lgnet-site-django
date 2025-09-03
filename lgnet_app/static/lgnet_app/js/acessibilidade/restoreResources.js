import {resources, initialState, state} from "./values.js";

let timeoutAnimation = null;
const button = document.querySelector("[data-btn-restaurar-recursos]");

export function isInitialValues() {
  return Object.keys(initialState).every(
    (key) => state[key] === initialState[key]
  );
}

export function hiddenRestoreResourcesBtn() {
  if (button instanceof HTMLButtonElement) {
    button.classList.remove("animate-slideTop");
    button.classList.add("animate-fadeOut");

    if (timeoutAnimation) clearTimeout(timeoutAnimation);

    timeoutAnimation = setTimeout(() => {
      button.classList.add("animate-slideTop");
      button.classList.remove("flex");
      button.classList.add("hidden");
      button.classList.remove("animate-fadeOut");
    }, 180);
  }
}

function restoreResources() {
  Object.keys(initialState).forEach((key) => {
    state[key] = initialState[key];
  });

  resources.forEach((resource)=> resource.reset());

  hiddenRestoreResourcesBtn();
}

export default function showRestoreResourcesBtn() {
  if (button instanceof HTMLButtonElement) {
    button.classList.remove("hidden");
    button.classList.add("flex");
    button.addEventListener("click", restoreResources);
  }
}
