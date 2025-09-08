import { state } from "./values.js";
const allImages = document.querySelectorAll("[data-img]");

function createDivPlaceholderFromImage(image) {
  const placeholder = document.createElement("div");
  placeholder.className = "img-placeholder";

  const computed = getComputedStyle(image);

  for (let i = 0; i < computed.length; i++) {
    const prop = computed[i];
    placeholder.style[prop] = computed.getPropertyValue(prop);
  }

  placeholder.style.backgroundColor = "rgba(90,90,90,0.2)";

  image.insertAdjacentElement("afterend", placeholder);

  image.style.display = "none";

  return placeholder;
}

export function hiddenImage() {
  allImages.forEach((image) => {
    if (image instanceof HTMLImageElement) {
      setTimeout(() => {
        createDivPlaceholderFromImage(image);
      }, 100);
    }
  });
}

export function showImage() {
  allImages.forEach((image) => {
    if (image instanceof HTMLImageElement) {
      image.style.display = "";
      if (
        image.nextElementSibling &&
        image.nextElementSibling.classList.contains("img-placeholder")
      ) {
        image.nextElementSibling.remove();
      }
    }
  });
}

export default function hiddenImagesActionButton() {
  if (!state.hiddenImgs) {
    state.hiddenImgs = true;
    hiddenImage();
  } else {
    state.hiddenImgs = false;
    showImage();
  }
}
