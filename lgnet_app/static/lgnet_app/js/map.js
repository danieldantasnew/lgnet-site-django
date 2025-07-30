function googleMapsTooltip(latitude, longitude) {
  const button = document.querySelector("[data-btn-tooltip-map]");
  const handleClick = (e) => {
    window.open(
      `https://www.google.com/maps?q=${latitude},${longitude}`,
      "_blank"
    );
  };

  if (button) button.addEventListener("click", handleClick);
}

export function map() {
  let {latitude, longitude} = JSON.parse(localStorage.getItem("data_location")) || {
    latitude: -7.0322119,
    longitude: -37.2948154,
  };
  const map = new maplibregl.Map({
    container: "map",
    center: [longitude, latitude],
    zoom: 18,
    attributionControl: false,
    style: {
      version: 8,
      sources: {
        osm: {
          type: "raster",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 250,
          attribution:
            'LGNET | © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
      },
      layers: [
        {
          id: "osm",
          type: "raster",
          source: "osm",
        },
      ],
    },
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

  const marker = new maplibregl.Marker({ element: el })
    .setLngLat([longitude, latitude])
    .addTo(map);

  map.addControl(new maplibregl.NavigationControl(), "top-right");
  map.addControl(
    new maplibregl.AttributionControl({
      compact: true,
    }),
    "top-left"
  );

  googleMapsTooltip(latitude, longitude);
}

map();
