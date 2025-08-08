import {
  createMarkers,
  initMap,
  searchDesk,
  watchCityChangeForMapUpdate,
} from "./map.js";

let mapInstanceDesk = null;

async function map() {
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

    mapInstanceDesk = initMap()
    
    const desks = await searchDesk();

    if (desks instanceof Object) {
      createMarkers(mapInstanceDesk, desks);
    }


  }
}

// watchCityChangeForMapUpdate(map);
map();
