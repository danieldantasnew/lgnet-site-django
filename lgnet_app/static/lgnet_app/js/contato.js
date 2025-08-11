import {
  applyOffSetInMap,
  createMarkers,
  initMap,
  searchDesk,
  updateInfoDesk,
  watchCityChangeForMapUpdate,
} from "./map.js";

let mapInstance = null;
let markerInstance = null;

export async function loadMap() {
  let defaultInfoMap = {
    latitude: -7.0322119,
    longitude: -37.2948154,
    address: "Sem informações",
    openingHour: "Sem informações",
    isOpen: false,
    desk: "Patos",
  };

  let infoMap = null;
  try {
    const localData = localStorage.getItem("data_location");
    if (localData) {
      infoMap = JSON.parse(localData);
      infoMap.latitude = parseFloat(infoMap.latitude);
      infoMap.longitude = parseFloat(infoMap.longitude);
      infoMap = await searchDesk(infoMap.latitude, infoMap.longitude);
    } else {
      throw new Error("Erro ao capturar as coordenadas");
    }
  } catch (erro) {
    infoMap = defaultInfoMap;
  }

  let { latitude, longitude } = infoMap;

  if (mapInstance && markerInstance) {
    mapInstance.setCenter([longitude, latitude]);
    markerInstance.setLngLat([longitude, latitude]);

    const markerElement = markerInstance.getElement();

    if (markerElement) {
      const title = markerElement.querySelector("h3");
      title.innerText = infoMap.desk;
    }

    updateInfoDesk(infoMap);
    applyOffSetInMap(mapInstance, latitude, longitude);
    return;
  } else {
    if (
      typeof maplibregl !== "undefined" &&
      typeof maplibregl.Map == "function" &&
      document.getElementById("map")
    ) {
      mapInstance = initMap();

      createMarkers(mapInstance, [infoMap]);

      updateInfoDesk(infoMap);
      applyOffSetInMap(mapInstance, latitude, longitude);
    }
  }
}

function contato() {
  const inputContato = document.querySelector("[data-form-telefone]");
  const form = document.querySelector("[data-form-contato]");
  let timeoutErro = null;
  let timeOutMensagem = null;

  const fetchApi = async (form) => {
    const formData = new FormData(form);
    const buttonSubmit = form.querySelector('button[type="submit"');
    const sucesso = form.querySelector("[data-mensagem-sucesso]");

    buttonSubmit.innerText = "Enviando...";
    buttonSubmit.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
      });

      if (!response) throw new Error("Erro");
      const json = await response.json();
      form.reset();
      sucesso.innerText = json.mensagem;
    } catch (error) {
      sucesso.innerText = "Erro ao enviar o formulário";
      sucesso.classList.remove("hidden");
    } finally {
      buttonSubmit.innerText = "Enviar mensagem";
      buttonSubmit.disabled = false;
      sucesso.classList.remove("hidden");
      if (timeOutMensagem) clearTimeout(timeOutMensagem);
      timeOutMensagem = setTimeout(() => {
        sucesso.innerText = "";
        sucesso.classList.add("hidden");
      }, 3000);
    }
  };

  if (inputContato) {
    inputContato.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");

      if (value.length > 11) value = value.slice(0, 11);

      if (value.length >= 2 && value.length <= 6)
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      else if (value.length > 6)
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      else if (value.length > 0) value = `(${value.slice(0, 2)}`;

      e.target.value = value;
    });
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const nome = form.elements["nome_completo"].value;
      const telefone = form.elements["telefone"].value;
      const assunto = form.elements["assunto"].value;
      let hasError = false;
      let errorNome = document.getElementById("erro-nome");
      let errorTelefone = document.getElementById("erro-telefone");
      let errorAssunto = document.getElementById("erro-assunto");

      if (timeoutErro) clearTimeout(timeoutErro);

      if (nome.length > 70) {
        errorNome.classList.remove("hidden");
        hasError = true;
      }

      if (assunto.length > 70) {
        errorAssunto.classList.remove("hidden");
        hasError = true;
      }

      if (telefone.length < 11) {
        errorTelefone.classList.remove("hidden");
        hasError = true;
      }

      if (hasError) {
        timeoutErro = setTimeout(() => {
          errorNome.classList.add("hidden");
          errorAssunto.classList.add("hidden");
          errorTelefone.classList.add("hidden");
        }, 7000);
      } else {
        fetchApi(event.target);
      }
    });
  }
  loadMap();
}

watchCityChangeForMapUpdate(map);
contato();
