import { resources, initialState, state } from "./values.js";

export function isInitialValues() {
  return Object.keys(initialState).every(
    (key) => state[key] === initialState[key]
  );
}

export function hiddenRestoreResourcesBtn() {
  const buttons = document.querySelectorAll("[data-btn-restaurar-recursos]");
  buttons.forEach((button) => {
    if (button instanceof HTMLButtonElement) {
      button.classList.add("hidden");
    }
  });
}

function restoreResources() {
  Object.keys(initialState).forEach((key) => {
    state[key] = initialState[key];
  });

  resources.forEach((resource) => resource.reset());

  hiddenRestoreResourcesBtn();
}

export default function showRestoreResourcesBtn() {
  const buttons = document.querySelectorAll("[data-btn-restaurar-recursos]");
  buttons.forEach((button) => {
    if (button instanceof HTMLButtonElement) {
      button.classList.remove("hidden");
      button.classList.add("flex");
      button.addEventListener("click", restoreResources);
    }
  });
}
