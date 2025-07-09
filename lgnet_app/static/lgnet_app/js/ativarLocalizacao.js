export function ativarLocalizacao(dropList) {
  console.log(dropList)
  const buttonMap = document.querySelector("[data-map]");
  const span = buttonMap.querySelector("[data-map-info]");
  const handleClick = () => {
    const localizacao = navigator.geolocation;
    if(localizacao) {
        localizacao.getCurrentPosition((position)=> {
            if(position.coords) {
                console.log("Latitude: ", position.coords.latitude)
                console.log("Longitude: ", position.coords.longitude)
            }
        })
    }
  };

  
  setTimeout(() => {
    span.classList.add("animate-fadeInOut");
  }, 500);
  buttonMap.addEventListener("click", handleClick);
}
