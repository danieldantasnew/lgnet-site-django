export function watchCityChangeForMapUpdate(callback) {
  const handleChange = () => {
    callback();
  };

  const cityElement = document.querySelector("[data-local]");

  const observer = new MutationObserver(handleChange);
  observer.observe(cityElement, {
    subtree: true,
    characterData: true,
    childList: true,
  });

  return observer;
}

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

export async function infoOfDesk(
  latitude,
  longitude,
  textAddressLocalApi,
  textOperationApi,
  isOpenText
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
      if (isOpenText.includes("Aberto")) {
        isOpenOrClose.classList.remove("text-red-600");
        isOpenOrClose.classList.add("text-green-600");
        isOpenOrClose.classList.add("dark:text-green-400");
      } else {
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

export function applyOffSetInMap(mapInstance, latitude, longitude) {
  mapInstance.easeTo({
    center: [longitude, latitude],
    offset: [0, -100],
    duration: 1000,
  });
}

export function updateInfoDesk(infoToMap) {
  googleMapsTooltip(infoToMap.latitude, infoToMap.longitude);
  streetViewTooltip(infoToMap.latitude, infoToMap.longitude);
  infoOfDesk(
    infoToMap.latitude,
    infoToMap.longitude,
    infoToMap.address,
    infoToMap.openingHour,
    infoToMap.isOpen
  );
}

export function createFeaturesToMarkers(items) {
  const featuresArray = items.map((item) => ({
    type: "Feature",
    properties: {
      message: `${item.desk}`,
      iconSize: [60, 60],
    },
    geometry: {
      type: "Point",
      coordinates: [item.longitude, item.latitude],
    },
  }));

  const geojson = {
    type: "FeatureCollection",
    features: featuresArray,
  };

  return geojson;
}

export function createMarkers(mapInstance, items) {
  const geojson = createFeaturesToMarkers(items);

  geojson.features.forEach((marker) => {
    const el = document.createElement("div");
    el.className = "marker-wrapper";
    el.style.width = "32px";
    el.style.height = "32px";
    el.style.cursor = "pointer";
    el.style.textAlign = "center"

    el.innerHTML = `
      <div class="relative">
        <h3 class="font-medium text-dark-variant text-sm text-nowrap text-center
          absolute
          -top-6
          left-[50%]
          translate-x-[-50%]
        ">${marker.properties.message}</h3> 
        <div class="
          w-11 
          h-11 
          z-10 
          bg-size-[100%_100%] 
          bg-[url('../images/mapPin.svg')]
        ">
        </div>
      </div>
    `;

    const markerEl = new maplibregl.Marker({ element: el })
      .setLngLat(marker.geometry.coordinates)
      .addTo(mapInstance);

    hiddenLabelMarker(markerEl, mapInstance);
    centerMarker(
      markerEl,
      mapInstance,
      marker.geometry.coordinates[1],
      marker.geometry.coordinates[0]
    );
  });
}

export function hiddenLabelMarker(markerInstance, mapInstance) {
  mapInstance.on("zoom", () => {
    const currentZoom = mapInstance.getZoom();
    const markerElement = markerInstance.getElement();

    if (markerElement) {
      const title = markerElement.querySelector("h3");

      if (title instanceof HTMLHeadingElement && currentZoom < 14) {
        title.classList.add("hidden");
      } else {
        title.classList.remove("hidden");
      }
    }
  });
}

export function centerMarker(markerInstance, mapInstance, latitude, longitude) {
  const markerElement = markerInstance.getElement();

  if (markerElement && markerElement instanceof HTMLDivElement) {
    markerElement.addEventListener("click", () => {
      mapInstance.easeTo({
        center: [longitude, latitude],
        zoom: 19,
        offset: [0, -100],
      });
    });
  }
}
