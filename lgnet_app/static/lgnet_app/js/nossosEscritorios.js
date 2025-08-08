import {
  createMarkers,
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
    mapInstanceDesk = new maplibregl.Map({
      container: "map",
      center: [-37.2948154, -7.0322119],
      zoom: 19,
      attributionControl: false,
      style: `https://api.maptiler.com/maps/openstreetmap/style.json?key=74jM7R1fOiBt0ecwKxi8`,
    });
    
    const desks = await searchDesk();

    if (desks instanceof Object) {
      createMarkers(mapInstanceDesk, desks);
    }

    const geolocateControl = new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    mapInstanceDesk.addControl(new maplibregl.NavigationControl(), "top-right");
    mapInstanceDesk.addControl(geolocateControl, "top-right");
    mapInstanceDesk.addControl(
      new maplibregl.AttributionControl({
        compact: true,
      }),
      "top-left"
    );
  }
}

// watchCityChangeForMapUpdate(map);
map();
