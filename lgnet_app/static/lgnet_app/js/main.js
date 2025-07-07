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

    function openModal(templateId) {
      const tpl = document.querySelector(templateId);
      if (!tpl) return;

      const clone = tpl.content.cloneNode(true);

      modal.innerHTML = "";
      modal.appendChild(clone);
      modal.classList.remove("hidden");
    }

    function closeModal() {
      modal.classList.add("hidden");
      modal.innerHTML = "";
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.modalComponent = {
      open: openModal,
      close: closeModal,
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

  // Swiper Banners
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

  // Swiper Planos
  (function () {
    var swiper = new Swiper(".mySwiperPlans", {
      slidesPerView: 4,
      spaceBetween: 30,
      navigation: {
        nextEl: ".swiper-plans-button-next",
        prevEl: ".swiper-plans-button-prev",
      },
    });

    function checkDisabledButtons(parentElement) {
      const disabledButtons = parentElement.querySelectorAll(
        ".swiper-button-disabled"
      );

      if (disabledButtons.length === 2) {
        parentElement.style.display = "none";
      } else {
        parentElement.style.display = "";
      }
    }

    const navWrapper = document.querySelector("[data-swiper-plans]");
    const observer = new MutationObserver(() =>
      checkDisabledButtons(navWrapper)
    );

    observer.observe(navWrapper, {
      attributes: true,
      subtree: true,
      attributeFilter: ["class"],
    });

    (() => {
      checkDisabledButtons(navWrapper);
    })();
  })();

  //Modal Selecionar Cidade
  (function () {
    const localizacao = document.querySelectorAll("[data-local]");
    let dataLocation = JSON.parse(localStorage.getItem("data_location"));
    if (dataLocation) {
      localizacao.forEach(
        (item) =>
          (item.innerText = `${dataLocation.city} - ${dataLocation.state}`)
      );
      buscarPlanos(`${dataLocation.city}`)
    }
    else {
      document.modalComponent.open("#tpl-bem-vindo");
      init();
    }

    localizacao.forEach((item) =>
      item.addEventListener("click", () => {
        document.modalComponent.open("#tpl-selecionar-cidade");
        init();
      })
    );

    function buscarPlanos(cidade) {
      const container = document.getElementById("planos-container");

      fetch(`/api/planos/?cidade=${encodeURIComponent(cidade)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao buscar dados.");
          }
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            container.innerHTML = `<p>${data.error}</p>`;
            return;
          }

          if (data.length === 0) {
            container.innerHTML =
              "<p>Nenhum plano disponível nesta cidade.</p>";
            return;
          }

          let html = "";

          data.sort((planoA, planoB)=> planoA.ordem - planoB.ordem).forEach((plano) => {
            html += `
              <div class="swiper-slide max-w-[280px] !mx-4 !bg-transparent">
                <div
                  class="rounded-lg bg-[#ffffff] shadow-[0_0_1px_1.5px_rgba(0,0,0,.1)] overflow-hidden flex flex-col gap-4 dark:bg-dark-variant dark:shadow-[0_0_1px_1.5px_rgb(255,255,255)]"
                >
                  <div class="px-4 py-6">
                    <div
                      class="flex items-center justify-center h-9 w-9 p-1 rounded-full bg-neutral-100 *:text-primary-variant-2 *:text-xl dark:bg-dark-variant-2 dark:*:text-[#ffffff]"
                    >
                      ${plano.icone}
                    </div>
                    <h3
                      class="text-sm mt-3 font-semibold text-primary-variant-2 w-full dark:text-secondary text-left"
                    >
                      ${plano.categoria}
                    </h3>
                    <p
                      class="text-4xl mt-[1px] font-semibold tracking-tight text-primary-variant dark:text-[#ffffff] text-left"
                    >
                      ${plano.plano}
                    </p>
                    <p class="pb-2 text-neutral-400 text-xs text-left">100% Fibra óptica</p>
                    <div class="h-[2px] w-full bg-neutral-200 rounded-full"></div>
                    <ul
                      role="list"
                      class="mt-5 space-y-2 font-normal text-neutral-500 text-sm dark:text-[#ffffff] *:flex *:items-center *:gap-x-2"
                    >
                      ${plano.vantagens.map((vantagem)=> {
                        return `                      
                          <li>
                            <span
                              class="*:text-[17px] *:fill-neutral-500 **:fill-neutral-500 h-5 w-5 flex items-center justify-center *:h-full *:w-full dark:*:fill-[#ffffff] dark:**:fill-[#ffffff]"
                              >${vantagem.icone}</span
                            >
                            <p>${vantagem.nome}</p>
                          </li>`
                      }).join("")}
                    </ul>
                  </div>
                  <a
                    href="#"
                    class="bg-primary-variant hover:bg-primary-hover text-[#ffffff] text-center text-xl py-3 mt-6 font-semibold transition-colors dark:bg-secondary dark:text-dark-variant dark:hover:bg-secondary-hover"
                    >Assine já</a
                  >
                </div>
              </div>
              `;
          });

          container.innerHTML = html;
        })
        .catch((error) => {
          console.error(error);
          container.innerHTML = "<p>Erro ao carregar planos.</p>";
        });
    }

    function init() {
      const dropdown = document.querySelector("[data-dropdown-cidade]");
      const input = document.querySelector("[data-input-cidade]");
      const buttonsModal = document.querySelectorAll("[data-close-modal]");
      const listDropDown = dropdown.querySelectorAll("li");
      const button = document.querySelector("[data-button-cidade]");
      dataLocation = JSON.parse(localStorage.getItem("data_location"));

      if (dataLocation)
        input.value = `${dataLocation.city} - ${dataLocation.state}`;

      buttonsModal.forEach((item) =>
        item.addEventListener("click", () => {
          document.modalComponent.close();
        })
      );

      const hideDropdown = () => {
        dropdown.classList.add("hidden");
        document.removeEventListener("click", handleClickOutModal);
      };

      const handleInput = (e) => {
        if (e.target.innerText) {
          input.value = e.target.innerText;
          hideDropdown();
        }
        checkInputField();
      };

      const handleClickOutModal = (e) => {
        if (!dropdown.contains(e.target) && !input.contains(e.target)) {
          hideDropdown();
        }
      };

      const handleClick = () => {
        dropdown.classList.remove("hidden");
        document.addEventListener("click", handleClickOutModal);
      };

      const checkInputField = () => {
        const listItems = Array.from(listDropDown).map((item) =>
          item.innerText.trim()
        );

        if (!input.value || !listItems.includes(input.value)) {
          input.classList.add("error");
          input.nextElementSibling.style.color = "oklch(50.5% 0.213 27.518)";
        } else {
          input.classList.remove("error");
          input.nextElementSibling.style.color = "#6a7282";
        }
      };

      const handleSubmit = (e) => {
        checkInputField();
        const dropList = Array.from(listDropDown).map((item) => ({
          id: item.dataset.selectedId,
          city: item.dataset.selectedCity,
          state: item.dataset.selectedSigla,
          text: item.innerText.trim(),
        }));

        const selected = dropList.find((item) => item.text == input.value);

        if (selected) {
          localizacao.forEach((item) => (item.innerText = input.value));
          input.value = `${selected.city} - ${selected.state}`;
          localStorage.setItem(
            "data_location",
            JSON.stringify({
              id: `${selected.id}`,
              city: `${selected.city}`,
              state: `${selected.state}`,
            })
          );
          document.modalComponent.close();
          buscarPlanos(selected.city);
        }
      };

      const handleChange = (e) => {
        checkInputField();
        const value = e.target.value.trim();

        const normalize = (str) =>
          str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

        if (value === "") {
          listDropDown.forEach((li) => {
            li.classList.remove("hidden");
          });
          return;
        }

        const valueNormalized = normalize(value);

        listDropDown.forEach((li) => {
          const liNormalized = normalize(li.innerText);

          if (liNormalized.includes(valueNormalized)) {
            li.classList.remove("hidden");
          } else {
            li.classList.add("hidden");
          }
        });
      };

      button.addEventListener("click", handleSubmit);
      listDropDown.forEach((item) =>
        item.addEventListener("click", handleInput)
      );
      input.addEventListener("change", checkInputField);
      input.addEventListener("click", handleClick);
      input.addEventListener("input", (e) => {
        handleChange(e);
        handleClick(e);
      });
    }
  })();
});
