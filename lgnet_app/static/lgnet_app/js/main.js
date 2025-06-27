document.addEventListener("DOMContentLoaded", () => {
  // Dark mode
  (function () {
    const html = document.documentElement;
    const darkOn = document.querySelector("[data-dark-on]");
    const darkOff = document.querySelector("[data-dark-off]");
    const isDark = localStorage.getItem("theme") === "dark";

    if (isDark) {
      html.classList.add("dark");
    }

    if (darkOn) {
      darkOn.addEventListener("click", () => {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
      });
    }

    if (darkOff) {
      darkOff.addEventListener("click", () => {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
      });
    }
  })();

  // Modal
  (function () {
    const modal = document.querySelector("[data-modal]");

    if (!modal) return;

    const createDom = (html) => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = html;

      const element = wrapper.firstElementChild;
      return element;
    };

    const open = (html) => {
      modal.innerHTML = "";
      modal.appendChild(createDom(html));
      modal.classList.remove("hidden");
    };

    const close = () => {
      modal.classList.add("hidden");
    };

    modal.addEventListener("click", (e) => {
      close();
    });

    document.modalComponent = {
      open,
      close,
    };
  })();

  // Dropdown
  (function () {
    const button = document.querySelector("[data-dropdown='button']");
    const dropdown = document.querySelector("[data-dropdown='dropdown']");
    const close = document.querySelector("[data-dropdown='close']");

    let outsideClickHandler = null;

    const openDropdown = () => {
      dropdown.classList.remove("hidden");

      outsideClickHandler = (event) => {
        if (
          !dropdown.contains(event.target) &&
          !button.contains(event.target)
        ) {
          dropdown.classList.add("hidden");
          document.removeEventListener("click", outsideClickHandler);
          outsideClickHandler = null;
        }
      };

      setTimeout(() => {
        document.addEventListener("click", outsideClickHandler);
      }, 0);
    };

    const closeDropdown = () => {
      dropdown.classList.add("hidden");

      if (outsideClickHandler) {
        document.removeEventListener("click", outsideClickHandler);
        outsideClickHandler = null;
      }
    };

    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = dropdown.classList.contains("hidden");
      isHidden ? openDropdown() : closeDropdown();
    });

    if (close) {
      close.addEventListener("click", closeDropdown);
    }
  })();

  // Swiper
  (function () {
    const progressCircle = document.querySelector(".autoplay-progress svg");
    const progressContent = document.querySelector(".autoplay-progress span");
    var swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        autoplayTimeLeft(s, time, progress) {
          progressCircle.style.setProperty("--progress", 1 - progress);
          progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        },
      },
    });
  })();

  //Selecionar Cidade
  (function () {
    const localizacao = document.querySelectorAll("[data-local]");
    const modal = document.querySelector("[data-modal]");

    const handleClick = ()=> {
        modal.classList.remove("hidden")
    }
    localizacao.forEach((item) => item.addEventListener("click", handleClick));
  })();
});
