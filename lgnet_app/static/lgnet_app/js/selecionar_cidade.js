import { buscarPlanos } from "./buscarPlanos.js";

export function selecionar_cidade(swiperPlanos) {
  const localizacao = document.querySelectorAll("[data-local]");
  let dataLocation = JSON.parse(localStorage.getItem("data_location"));
  if (dataLocation) {
    localizacao.forEach(
      (item) =>
        (item.innerText = `${dataLocation.city} - ${dataLocation.state}`)
    );
    buscarPlanos(`${dataLocation.city}`);
  } else {
    buscarPlanos("Patos");
    document.modalComponent.open("#tpl-bem-vindo");
    init();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // buscarPlanos("Ouro Branco") Atualiza os planos mas não atualiza os nomes;
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
        },
        function (error) {
          console.error("Erro ao obter localização:", error);
        }
      );
    }
  }

  localizacao.forEach((item) =>
    item.addEventListener("click", () => {
      document.modalComponent.open("#tpl-selecionar-cidade");
      init();
    })
  );

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
        swiperPlanos.slideTo(0);
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
    listDropDown.forEach((item) => item.addEventListener("click", handleInput));
    input.addEventListener("change", checkInputField);
    input.addEventListener("click", handleClick);
    input.addEventListener("input", (e) => {
      handleChange(e);
      handleClick(e);
    });
  }
}
