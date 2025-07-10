import { buscarPlanos } from "./buscarPlanos.js";

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

function cidadeMaisProxima(
  cidadesDisponiveis,
  latitudeCliente,
  longitudeCliente,
  localizacaoTexto,
) {
  let cidadeMaisProxima = null;
  let menorDistancia = Infinity;

  for (const cidade of cidadesDisponiveis) {
    const dist = haversine(
      latitudeCliente,
      longitudeCliente,
      parseFloat(cidade.latitude),
      parseFloat(cidade.longitude)
    );

    if (dist < menorDistancia) {
      menorDistancia = dist;
      cidadeMaisProxima = cidade;
    }
  }

  localStorage.setItem(
    "data_location",
    JSON.stringify({
      id: `${cidadeMaisProxima.id}`,
      city: `${cidadeMaisProxima.city}`,
      state: `${cidadeMaisProxima.state}`,
    })
  );
  buscarPlanos(cidadeMaisProxima.city);
  localizacaoTexto.forEach((item) => (item.innerText = cidadeMaisProxima.text));
  document.modalComponent.close();
}

export function ativarLocalizacao(dropList, localizacaoTexto) {
  const buttonMap = document.querySelector("[data-map]");
  const span = buttonMap.querySelector("[data-map-info]");
  const dataContentInfo = document.querySelector("[data-content-info]");
  const loadingCidade = document.querySelector("[data-loading-cidade]");
  const handleClick = () => {
    const geolocalizacao = navigator.geolocation;
    if (geolocalizacao) {
      dataContentInfo.classList.add("animate-hiddenItem")
      setTimeout(() => {
        loadingCidade.classList.add("animate-fadeIn")
        loadingCidade.style.display = "flex"
      }, 400);

      geolocalizacao.getCurrentPosition((position) => {
        if (position.coords) {
          cidadeMaisProxima(
            dropList,
            position.coords.latitude,
            position.coords.longitude,
            localizacaoTexto,
          );
          window.scrollTo(0,0);
        }
      });
    }
  };

  setTimeout(() => {
    span.classList.add("animate-fadeInOut");
  }, 500);

  buttonMap.addEventListener("click", handleClick);
}
