export async function searchDesk(latitude, longitude) {
  if (latitude && longitude) {
    try {
      const response = await fetch(
        `/api/escritorios/?latitude=${latitude}&longitude=${longitude}`
      );
      if (!response.ok) throw new Error("Falha na requisição");
      return await response.json();
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

    FinalAddress = display_name
      ? `${display_name}.`
      : "Endereço não encontrado.";
  } catch (error) {
    FinalAddress = error.message;
  }

  return FinalAddress;
}

export async function infoMap(
  latitude,
  longitude,
  textAddressLocalApi,
  textOperationApi,
  isOpenText,
) {
  const info = document.querySelector("[data-info-map]");
  if (info instanceof HTMLElement) {
    info.classList.add("hidden");
    const address = info.querySelector("div > [data-endereco]");
    const operation = info.querySelector("div > [data-funcionamento]");
    const isOpenOrClose = info.querySelector("div > [data-aberto-fechado]");

    let FinalAddress = "";
    if (textAddressLocalApi) FinalAddress = textAddressLocalApi;
    else FinalAddress = await fetchAddress(latitude, longitude);

    if (
      address instanceof HTMLParagraphElement &&
      operation instanceof HTMLParagraphElement &&
      isOpenOrClose instanceof HTMLParagraphElement
    ) {
      address.innerText = FinalAddress;
      address.title = FinalAddress;
      operation.innerText = textOperationApi
        ? textOperationApi
        : "Sem informação de horário";

      isOpenOrClose.innerText = isOpenText;
      if(isOpenText.includes("Aberto")) {
        isOpenOrClose.classList.remove("text-red-600");
        isOpenOrClose.classList.add("text-green-600");
        isOpenOrClose.classList.add("dark:text-green-400");
      }

      else {
        isOpenOrClose.classList.remove("text-green-600");
        isOpenOrClose.classList.remove("dark:text-green-400");
        isOpenOrClose.classList.add("text-red-600");
      }
      
      info.classList.remove("hidden");
    }
  }
}

function handleClickStreetView(e) {
  const btn = e.currentTarget;
  const latitude = btn.getAttribute("data-latitude");
  const longitude = btn.getAttribute("data-longitude");

  if (latitude && longitude) {
    window.open(
      `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${latitude},${longitude}&heading=45&pitch=10&fov=80`,
      "_blank"
    );
  }
}

export function streetViewTooltip(latitude, longitude) {
  const button = document.querySelector("[data-btn-tooltip-street-view]");

  if (button instanceof HTMLButtonElement) {
    button.setAttribute("data-latitude", latitude);
    button.setAttribute("data-longitude", longitude);

    button.removeEventListener("click", handleClickStreetView);
    button.addEventListener("click", handleClickStreetView);
  }
}

function handleClickGoogleMaps(e) {
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

    button.removeEventListener("click", handleClickGoogleMaps);
    button.addEventListener("click", handleClickGoogleMaps);
  }
}
