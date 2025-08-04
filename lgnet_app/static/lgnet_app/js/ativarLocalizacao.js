import buscarPlanos from "./buscarPlanos.js";
import { map } from "./contato.js";

async function encontrarCidadeMaisProxima(latCliente, longCliente) {
  const response = await fetch(`/api/cidade-proxima/?latitude=${latCliente}&longitude=${longCliente}`);
  const data = await response.json();

  return data;
}

function salvarCidadeNoStorage(cidade) {
  localStorage.setItem(
    "data_location",
    JSON.stringify({
      id: String(cidade.id),
      city: cidade.city,
      state: cidade.state,
      latitude: cidade.latitude,
      longitude: cidade.longitude,
      text: cidade.text,
    })
  );
  map();
}

function atualizarUIComCidade(cidade, localizacaoTexto, loadingCidade) {
  const firstDiv = loadingCidade.querySelector("div");
  const success = loadingCidade.querySelector("[data-success-cidade]");
  const successCityInfo = loadingCidade.querySelector("[data-success-cidade] strong");

  successCityInfo.innerText = cidade.text;
  firstDiv.classList.add("hidden");
  buscarPlanos(cidade.city);
  localizacaoTexto.forEach((item) => (item.innerText = cidade.text));
  success.style.display = "flex";

  setTimeout(() => {
    document.modalComponent.close();
  }, 3000);
}

async function cidadeMaisProxima(
  latitudeCliente,
  longitudeCliente,
  localizacaoTexto,
  loadingCidade
) {
  const cidade = await encontrarCidadeMaisProxima(
    latitudeCliente,
    longitudeCliente
  );

  if (cidade) {
    salvarCidadeNoStorage(cidade);
    atualizarUIComCidade(cidade, localizacaoTexto, loadingCidade);
  }
}

async function getLocation(
  localizacaoTexto,
  dataContentInfo,
  loadingCidade
) {
  try {
    dataContentInfo.classList.add("animate-hiddenItem");

    setTimeout(() => {
      loadingCidade.classList.add("animate-fadeIn");
      loadingCidade.style.display = "flex";
    }, 400);

    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    if (position.coords) {
      cidadeMaisProxima(
        position.coords.latitude,
        position.coords.longitude,
        localizacaoTexto,
        loadingCidade
      );
      window.scrollTo(0, 0);
    }
  } catch (error) {
    console.error("Erro ao obter localização:", error);
    loadingCidade.classList.remove("animate-fadeIn");
    loadingCidade.style.display = "none";
    dataContentInfo.classList.remove("animate-hiddenItem");
  }
}

export function ativarLocalizacao(localizacaoTexto) {
  const buttonMap = document.querySelector("[data-map]");
  const span = buttonMap.querySelector("[data-map-info]");
  const dataContentInfo = document.querySelector("[data-content-info]");
  const loadingCidade = document.querySelector("[data-loading-cidade]");

  const handleClick = () =>
    getLocation(localizacaoTexto, dataContentInfo, loadingCidade);

  setTimeout(() => {
    span.classList.add("animate-fadeInOut");
  }, 500);

  buttonMap.addEventListener("click", handleClick);
}
