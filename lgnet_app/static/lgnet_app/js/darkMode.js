const html = document.documentElement;

export function addDark() {
  html.classList.add("dark");
  localStorage.setItem("theme", "dark");
}

export function removeDark() {
  html.classList.remove("dark");
  localStorage.setItem("theme", "light");
}

export function toggleDark() {
  if (html.classList.contains("dark")) removeDark();
  else addDark();
}

export function darkMode() {
  const darkOn = document.querySelector("[data-dark-on]");
  const darkOff = document.querySelector("[data-dark-off]");
  const isDark = localStorage.getItem("theme") === "dark";

  if (isDark) {
    html.classList.add("dark");
  }

  if (darkOn) {
    darkOn.addEventListener("click", addDark);
  }

  if (darkOff) {
    darkOff.addEventListener("click", removeDark);
  }
}
