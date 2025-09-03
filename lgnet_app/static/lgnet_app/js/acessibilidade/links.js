import {state} from "./values.js";
const allLinks = document.querySelectorAll("a");

const classes = [
  "!shadow-[0_0_0_2px_var(--color-secondary-variant)]",
  "!bg-secondary",
  "p-2",
  "hover:!bg-secondary-variant",
  "hover:!text-secondary",
  "!text-secondary-variant",
  "[&>svg]:*:fill-secondary-variant",
  "[&>svg]:**:fill-secondary-variant",
  "[&>svg]:hover:*:fill-secondary",
  "[&>svg]:hover:**:fill-secondary",
  "dark:p-2",
  "dark:!shadow-[0_0_0_2px_var(--color-light-background)]",
  "dark:!bg-primary-variant",
  "dark:!text-light-background",
  "dark:[&>svg]:*:fill-light-background",
  "dark:[&>svg]:**:fill-light-background",
  "dark:hover:[&>svg]:*:fill-primary-variant",
  "dark:hover:[&>svg]:**:fill-primary-variant",
];

function activateHighlightLinks() {
  allLinks.forEach((link) => {
    if (link instanceof HTMLAnchorElement) {
      if(link.querySelector("img")) return;
      classes.forEach((anchor) => link.classList.add(anchor));
    }
  });
}

export function disableHighlightLinks() {
  allLinks.forEach((link) => {
    if (link instanceof HTMLAnchorElement) {
      classes.forEach((anchor) => link.classList.remove(anchor));
    }
  });
}

export default function highlightLinksActionButton() {
  if (allLinks instanceof NodeList) {
    if (!state.highlightLinks) {
      state.highlightLinks = true;
      activateHighlightLinks();
    } else {
      state.highlightLinks = false;
      disableHighlightLinks();
    }
  }
}
