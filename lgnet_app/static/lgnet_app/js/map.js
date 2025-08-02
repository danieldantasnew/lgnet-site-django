export async function searchDesk(latitude, longitude) {
  if (latitude && longitude) {
    try {
      const response = await fetch(
        `/api/escritorios/?latitude=${latitude}&longitude=${longitude}`
      );
      if (!response.ok) throw new Error("Falha na requisição");
      const json = await response.json()
      console.log(json)
      return json; //Formato Temporário para verificar como estará os dados na segunda em horário de expediente.
    } catch (error) {
      console.error(error.message);
    }
  } else {
    try {
      const response = await fetch("/api/escritorios/");
      if (!response.ok) throw new Error("Falha na requisição");
      return await response.json();
    } catch (error) {
      console.error(error.message);
    }
  }
}

export async function fetchAddress(latitude, longitude) {
  let FinalAddress = "";
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );

    if (!response.ok) throw new Error("Não foi possível localizar o endereço");
    const { display_name } = await response.json();

    FinalAddress = display_name ? `${display_name}.` : "Endereço não encontrado.";
  } catch (error) {
    FinalAddress = error.message;
  }

  return FinalAddress;
}

export async function infoMap(latitude, longitude, textAddressLocalApi) {
  const info = document.querySelector("[data-info-map]");
  if (info instanceof HTMLElement) {
    info.classList.add("hidden");
    const address = info.querySelector("div > p");
    
    let FinalAddress = "";
    if (textAddressLocalApi) FinalAddress = textAddressLocalApi;
    else FinalAddress = await fetchAddress(latitude, longitude);

    if (address instanceof HTMLParagraphElement) {
      address.innerText = FinalAddress;
      address.title = FinalAddress;
      info.classList.remove("hidden");
    }
  }
}

function handleClick(e) {
  const btn = e.currentTarget;
  const latitude = btn.getAttribute("data-latitude");
  const longitude = btn.getAttribute("data-longitude");

  if (latitude && longitude) {
    window.open(
      `https://www.google.com/maps?q=${latitude},${longitude}`,
      "_blank"
    );
  }
}

export function googleMapsTooltip(latitude, longitude) {
  const button = document.querySelector("[data-btn-tooltip-map]");

  if (button instanceof HTMLButtonElement) {
    button.setAttribute("data-latitude", latitude);
    button.setAttribute("data-longitude", longitude);

    button.removeEventListener("click", handleClick);
    button.addEventListener("click", handleClick);
  }
}