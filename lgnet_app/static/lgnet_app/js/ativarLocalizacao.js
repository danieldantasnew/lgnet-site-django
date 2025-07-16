import buscarPlanos from "./buscarPlanos.js";

function haversine(lat1, lon1, lat2, lon2) {
  const toRadians = (angle) => (angle * Math.PI) / 180;

  const R = 6371; // Raio da Terra em km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function encontrarCidadeMaisProxima(cidades, latCliente, longCliente) {
  let cidadeMaisProxima = null;
  let menorDistancia = Infinity;

  for (const cidade of cidades) {
    const dist = haversine(
      latCliente,
      longCliente,
      parseFloat(cidade.latitude),
      parseFloat(cidade.longitude)
    );

    if (dist < menorDistancia) {
      menorDistancia = dist;
      cidadeMaisProxima = cidade;
    }
  }

  return cidadeMaisProxima;
}

function salvarCidadeNoStorage(cidade) {
  localStorage.setItem(
    "data_location",
    JSON.stringify({
      id: String(cidade.id),
      city: cidade.city,
      state: cidade.state,
    })
  );
}

function atualizarUIComCidade(cidade, localizacaoTexto, loadingCidade) {
  const firstDiv = loadingCidade.querySelector("div");
  const success = loadingCidade.querySelector("[data-sucess-cidade]");
  const successCityInfo = loadingCidade.querySelector("[data-sucess-cidade] strong");

  successCityInfo.innerText = cidade.text;
  firstDiv.classList.add("hidden");
  buscarPlanos(cidade.city);
  localizacaoTexto.forEach((item) => (item.innerText = cidade.text));
  success.style.display = "flex";

  setTimeout(() => {
    document.modalComponent.close();
  }, 3000);
}

function cidadeMaisProxima(
  cidadesDisponiveis,
  latitudeCliente,
  longitudeCliente,
  localizacaoTexto,
  loadingCidade
) {
  const cidade = encontrarCidadeMaisProxima(
    cidadesDisponiveis,
    latitudeCliente,
    longitudeCliente
  );

  if (cidade) {
    salvarCidadeNoStorage(cidade);
    atualizarUIComCidade(cidade, localizacaoTexto, loadingCidade);
  }
}

async function getLocation(
  dropList,
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
        dropList,
        position.coords.latitude,
        position.coords.longitude,
        localizacaoTexto,
        loadingCidade
      );
      window.scrollTo(0, 0);
    }
  } catch (error) {
    console.log("Erro ao obter localização:", error);
    loadingCidade.classList.remove("animate-fadeIn");
    loadingCidade.style.display = "none";
    dataContentInfo.classList.remove("animate-hiddenItem");
  }
}

export function ativarLocalizacao(dropList, localizacaoTexto) {
  const buttonMap = document.querySelector("[data-map]");
  const span = buttonMap.querySelector("[data-map-info]");
  const dataContentInfo = document.querySelector("[data-content-info]");
  const loadingCidade = document.querySelector("[data-loading-cidade]");

  const handleClick = () =>
    getLocation(dropList, localizacaoTexto, dataContentInfo, loadingCidade);

  setTimeout(() => {
    span.classList.add("animate-fadeInOut");
  }, 500);

  buttonMap.addEventListener("click", handleClick);
}
