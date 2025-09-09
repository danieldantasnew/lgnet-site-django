import { state } from "./values.js";
const allImages = document.querySelectorAll("[data-img]");
const carousel = document.querySelectorAll('[ data-wrapper-img="carousel"]');

export function hiddenImage() {
  allImages.forEach((image) => {
    if (image instanceof HTMLImageElement) {
      image.classList.add("!opacity-0");
      if (carousel) {
        carousel.forEach((element) => {
          element.classList.add("bg-neutral-200/20", "dark:bg-neutral-600/20");
        });
      }
    }
  });
}

export function showImage() {
  allImages.forEach((image) => {
    if (image instanceof HTMLImageElement) {
      image.classList.remove("!opacity-0");
      if (carousel) {
        carousel.forEach((element) => {
          element.classList.remove(
            "bg-neutral-200/20",
            "dark:bg-neutral-600/20"
          );
        });
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
