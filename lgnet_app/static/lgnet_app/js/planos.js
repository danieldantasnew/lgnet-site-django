export default function planos(swiperPlanos) {
  const checkDisabledButtons = (parentElement) => {
    const disabledButtons = parentElement.querySelectorAll(
      ".swiper-button-disabled"
    );

    if (disabledButtons) {
      if (disabledButtons.length === 2) {
        parentElement.style.display = "none";
      } else {
        parentElement.style.display = "";
      }
    }
  }

  const navWrapper = document.querySelector("[data-swiper-plans]");
  const swiperChildren = document.querySelector("[data-swiper-children]");

  if (navWrapper) {
    const observer = new MutationObserver(() => {
      swiperPlanos.update();
      checkDisabledButtons(navWrapper);
    });

    observer.observe(navWrapper, {
      attributes: true,
      subtree: true,
      attributeFilter: ["class"],
    });

    observer.observe(swiperChildren, {
      childList: true,
    });
  }

  (() => {
    if(navWrapper) checkDisabledButtons(navWrapper);
  })();
}
