import {ativarLocalizacao} from "./ativarLocalizacao.js";
import buscarPlanos from "./buscarPlanos.js";

function init(swiperPlanos, dataLocation, localizacao) {
  const dropdown = document.querySelector("[data-dropdown-cidade]");
  const input = document.querySelector("[data-input-cidade]");
  const listDropDown = dropdown.querySelectorAll("li");
  const button = document.querySelector("[data-button-cidade]");
  dataLocation = JSON.parse(localStorage.getItem("data_location"));
  const dropList = Array.from(listDropDown).map((item) => ({
      id: item.dataset.selectedId,
      city: item.dataset.selectedCity,
      state: item.dataset.selectedSigla,
      latitude: item.dataset.selectedLatitude,
      longitude: item.dataset.selectedLongitude,
      text: item.innerText.trim(),
    }));
  ativarLocalizacao(dropList, localizacao);

  if (dataLocation)
    input.value = `${dataLocation.city} - ${dataLocation.state}`;

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

function effectClose() {
  const element = document.querySelector("[data-cidade]");
  if(element) element.classList.add("animate-fadeOut");
}


export default function selecionar_cidade(swiperPlanos) {
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
    document.modalComponent.open('template[data-tpl="bem-vindo"]', effectClose, 200);
    init(swiperPlanos, dataLocation, localizacao);
  }

  localizacao.forEach((item) =>
    item.addEventListener("click", () => {
      document.modalComponent.open('template[data-tpl="selecionar-cidade"]', effectClose, 200);
      init(swiperPlanos, dataLocation, localizacao);
    })
  );
}
