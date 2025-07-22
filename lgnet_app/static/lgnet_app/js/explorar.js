export default function explorar() {
  const swiper = new Swiper(".mySwiperExplorar", {
    spaceBetween: 30,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper-explorar-button-next",
      prevEl: ".swiper-explorar-button-prev",
    },
  });
}

