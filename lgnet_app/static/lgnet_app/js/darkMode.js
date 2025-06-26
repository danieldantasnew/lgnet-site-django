document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const darkOn = document.querySelector("[data-dark-on]");
  const darkOff = document.querySelector("[data-dark-off]");
  const isDark = localStorage.getItem("theme") === "dark";
      
  if (isDark) {
    html.classList.add("dark");
  }

  if(darkOn) {
    darkOn.addEventListener("click", ()=> {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
    })
  }

  if(darkOff) {
    darkOff.addEventListener("click", ()=> {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
    })
  }
});
