let mapInstance = null;
let markerInstance = null;

async function fetchAddress(latitude, longitude) {
  let FinalAddress = "";
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );

    if (!response) throw new Error("Não foi possível localizar o endereço");
    const { display_name } = await response.json();

    FinalAddress = `${display_name}.`;
  } catch (error) {
    FinalAddress = error.message;
  }

  return FinalAddress;
}

async function infoMap(latitude, longitude) {
  const info = document.querySelector("[data-info-map]");
  if (info instanceof HTMLElement) {
    info.classList.add("hidden");
    const address = info.querySelector("div > p");
    let FinalAddress = await fetchAddress(latitude, longitude);
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

function googleMapsTooltip(latitude, longitude) {
  const button = document.querySelector("[data-btn-tooltip-map]");

  if (button instanceof HTMLButtonElement) {
    button.setAttribute("data-latitude", latitude);
    button.setAttribute("data-longitude", longitude);

    button.removeEventListener("click", handleClick);
    button.addEventListener("click", handleClick);
  }
}

export function map() {
  let defaultCoords = {
    latitude: -7.0322119,
    longitude: -37.2948154,
  };

  let coords = null;
  try {
    coords = JSON.parse(localStorage.getItem("data_location"));
    if (coords) {
      coords.latitude = parseFloat(coords.latitude);
      coords.longitude = parseFloat(coords.longitude);
    } else {
      throw new Error("Erro ao capturar as coordenadas");
    }
  } catch (erro) {
    coords = defaultCoords;
  }

  let { latitude, longitude } = coords;

  if (mapInstance && markerInstance) {
    mapInstance.setCenter([longitude, latitude]);
    markerInstance.setLngLat([longitude, latitude]);

    googleMapsTooltip(latitude, longitude);
    infoMap(latitude, longitude);
    return;
  } else {
    if (
      typeof maplibregl !== "undefined" &&
      typeof maplibregl.Map == "function" &&
      document.getElementById("map")
    ) {
      mapInstance = new maplibregl.Map({
        container: "map",
        center: [longitude, latitude],
        zoom: 18,
        attributionControl: false,
        style: `https://api.maptiler.com/maps/openstreetmap/style.json?key=74jM7R1fOiBt0ecwKxi8`,
      });

      const el = document.createElement("div");
      el.className = "marker-wrapper";
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.position = "relative";
      el.innerHTML = `
        <div class="
          absolute 
          top-0 
          left-0 
          w-11 
          h-11 
          z-10 
          bg-size-[100%_100%] 
          bg-[url('../images/mapPin.svg')]
        ">
        </div>
      `;

      markerInstance = new maplibregl.Marker({ element: el })
        .setLngLat([longitude, latitude])
        .addTo(mapInstance);

      mapInstance.addControl(new maplibregl.NavigationControl(), "top-right");
      mapInstance.addControl(
        new maplibregl.AttributionControl({
          compact: true,
        }),
        "top-left"
      );

      googleMapsTooltip(latitude, longitude);
      infoMap(latitude, longitude);
    }
  }
}

map();
