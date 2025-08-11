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

async function infoOfDesk(
  infoMap
) {
  const info = document.querySelector("[data-info-map]");
  if (info instanceof HTMLElement) {
    info.classList.add("hidden");
    const address = info.querySelector("[data-endereco]");
    const operation = info.querySelector("[data-funcionamento]");
    const isOpenOrClose = info.querySelector("[data-aberto-fechado]");
    const telephone = info.querySelector("[data-info-telefone]");
    const deskName = info.querySelector("[data-nome-escritorio]");

    let FinalAddress = "";
    if (infoMap.address) FinalAddress = infoMap.address;
    else FinalAddress = await fetchAddress(infoMap.latitude, infoMap.longitude);

    if (
      address instanceof HTMLParagraphElement &&
      isOpenOrClose instanceof HTMLParagraphElement
    ) {
      address.innerText = FinalAddress;
      address.title = FinalAddress;

      isOpenOrClose.innerText = infoMap.isOpen;
      if (infoMap.isOpen.includes("Aberto")) {
        isOpenOrClose.classList.remove("!text-red-600");
        isOpenOrClose.classList.add("!text-green-600");
        isOpenOrClose.classList.add("!dark:text-green-400");
      } else {
        isOpenOrClose.classList.remove("!text-green-600");
        isOpenOrClose.classList.remove("!dark:text-green-400");
        isOpenOrClose.classList.add("!text-red-600");
      }

      info.classList.remove("hidden");
    }

    if(operation instanceof HTMLParagraphElement) {
      operation.innerText = infoMap.openingHour
        ? infoMap.openingHour
        : "Sem informação de horário";
    }

    if(deskName instanceof HTMLParagraphElement) {
      infoMap.desk ? deskName.innerText = infoMap.desk : deskName.innerText = "Sem informação"
    }

    if(telephone instanceof HTMLParagraphElement) {
      infoMap.telephone ? telephone.innerText = infoMap.telephone : telephone.innerText = "Sem informação"
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

function streetViewTooltip(latitude, longitude) {
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

function googleMapsTooltip(latitude, longitude) {
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
  infoOfDesk(infoToMap);
}

export function createFeaturesToMarkers(items) {
  const featuresArray = items.map((item) => ({
    type: "Feature",
    properties: {
      id: item.id,
      address: item.address,
      desk: item.desk,
      latitude: item.latitude,
      longitude: item.longitude,
      telephone: item.telephone,
      isOpen: item.isOpen,
      allSchedules: item.allSchedules,
      openingHour: item.openingHour,
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
    el.style.textAlign = "center";

    el.innerHTML = `
      <div class="relative">
        <h3 class="font-semibold text-primary-variant text-xs text-nowrap text-center
          absolute
          -top-5
          left-[50%]
          translate-x-[-50%]
        ">${marker.properties.desk}</h3> 
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

    el.addEventListener("click", () => {
      updateInfoDesk(marker.properties)
    });

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

      if (title instanceof HTMLHeadingElement && currentZoom < 8) {
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

export function initMap() {
  const map = new maplibregl.Map({
    container: "map",
    center: [-37.2948154, -7.0322119],
    zoom: 8,
    attributionControl: false,
    style: `https://api.maptiler.com/maps/openstreetmap/style.json?key=74jM7R1fOiBt0ecwKxi8`,
  });

  const geolocateControl = new maplibregl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading: true,
  });

  map.addControl(new maplibregl.NavigationControl(), "top-right");
  map.addControl(new maplibregl.FullscreenControl(), "top-right");
  map.addControl(geolocateControl, "top-right");
  map.addControl(
    new maplibregl.AttributionControl({
      compact: true,
    }),
    "top-left"
  );

  return map;
}
