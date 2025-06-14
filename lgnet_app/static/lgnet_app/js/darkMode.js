document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const checkbox = document.querySelector("[data-dark] input[type='checkbox']");

  if (checkbox) {
    const isDark = localStorage.getItem("theme") === "dark";
    if (isDark) {
      html.classList.add("dark");
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    });
  }
});
