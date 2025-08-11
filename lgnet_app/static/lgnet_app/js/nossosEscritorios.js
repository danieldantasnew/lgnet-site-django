import { createMarkers, initMap, searchDesk } from "./map.js";

let mapInstanceDesk = null;

async function loadMap() {
  let defaultInfoMap = {
    latitude: -7.0322119,
    longitude: -37.2948154,
    address: "Sem informações",
    openingHour: "Sem informações",
    isOpen: false,
    desk: "Patos",
  };

  if (
    typeof maplibregl !== "undefined" &&
    typeof maplibregl.Map == "function" &&
    document.getElementById("map")
  ) {
    mapInstanceDesk = initMap();
    const info = document.querySelector("[data-info-map]");
    const desks = await searchDesk();

    if (desks instanceof Object && Array.isArray(desks)) {
      createMarkers(mapInstanceDesk, desks);
    } else {
      console.error("Não foi possível carregar os escritórios");
    }

    if (info instanceof HTMLDivElement) {
      const closeInfoMap = info.querySelector("[data-close-info-map]");
      if (closeInfoMap) {
        closeInfoMap.addEventListener("click", () => {
          info.classList.add("animate-fadeOut");
          setTimeout(() => {
            info.classList.remove("animate-fadeOut");
            info.classList.add("hidden");
          }, 250);
        });
      }
    }
  }
}

loadMap();
