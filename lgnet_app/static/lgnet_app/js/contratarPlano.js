export default function contratarPlano() {
  const buttons = document.querySelectorAll("[data-btn-contratar-plano]");
  const effectContratarPlano = () => {
    const element = document.querySelector("[data-contratar-plano]");
    if (element) element.classList.add("animate-fadeOut");
  };

  const handleClick = () => {
    document.modalComponent.open(
      'template[data-tpl="contratar_plano"]',
      effectContratarPlano,
      200
    );
  };
  buttons.forEach((button) => button.addEventListener("click", handleClick));
}
