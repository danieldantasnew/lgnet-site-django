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
  longitudeCliente
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

    console.log(dist)

    if (dist < menorDistancia) {
      menorDistancia = dist;
      cidadeMaisProxima = cidade;
    }
  }

  console.log("Cidade mais próxima:", cidadeMaisProxima);
  console.log("Distância em km:", menorDistancia.toFixed(2));
  //Agora é só setar no localStorage, atualizar os planos da cidade e fechar o modal
}

export function ativarLocalizacao(dropList) {
  const buttonMap = document.querySelector("[data-map]");
  const span = buttonMap.querySelector("[data-map-info]");
  const handleClick = () => {
    const geolocalizacao = navigator.geolocation;
    if (geolocalizacao) {
      geolocalizacao.getCurrentPosition((position) => {
        if (position.coords) {
          cidadeMaisProxima(
            dropList,
            position.coords.latitude,
            position.coords.longitude
          );
        }
      });
    }
  };

  setTimeout(() => {
    span.classList.add("animate-fadeInOut");
  }, 500);
  buttonMap.addEventListener("click", handleClick);
}
