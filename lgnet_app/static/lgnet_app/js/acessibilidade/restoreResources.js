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
    button.classList.add("!opacity-100");

    if (timeoutAnimation) clearTimeout(timeoutAnimation);

    timeoutAnimation = setTimeout(() => {
      button.classList.add("animate-slideTop");
      button.classList.add("hidden");
      button.classList.remove("animate-fadeOut");
    }, 180);
  }
}

export const lastState = {
  readerMode: 3,
  stopSounds: true,
  highlightLinks: true,
  hiddenImgs: true,
  increaseFontSize: true,
  highlightLetters: true,
  letterSpacing: 3,
  lineSpacing: 3,
};

function restoreResources() {
  Object.keys(lastState).forEach((key) => {
    state[key] = lastState[key];
  });

  resources.forEach((resource)=> resource.action());

  hiddenRestoreResourcesBtn();
}

export default function showRestoreResourcesBtn() {
  if (button instanceof HTMLButtonElement) {
    button.classList.remove("hidden");
    button.addEventListener("click", restoreResources);
  }
}
