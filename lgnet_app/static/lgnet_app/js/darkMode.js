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

export default function darkMode() {
  document.addEventListener("click", (e) => {
    const onBtn = e.target.closest("[data-dark-on]");
    if (onBtn) {
      addDark();
      return;
    }

    const offBtn = e.target.closest("[data-dark-off]");
    if (offBtn) {
      removeDark();
      return;
    }
  });
}
