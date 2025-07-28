export default function contratarPlano() {
  const buttons = document.querySelectorAll("[data-btn-contratar-plano]");
  const effectContratarPlano = () => {
    const element = document.querySelector("[data-contratar-plano]");
    if (element) element.classList.add("animate-fadeOut");
  };

  const handleClick = (e) => {
    document.modalComponent.open(
      'template[data-tpl="contratar_plano"]',
      effectContratarPlano,
      200
    );

    const handleLinkWhatsapp = (event, parentElement)=> {
      const contato = parentElement.dataset.planoContato;
      const mensagem = parentElement.dataset.planoMensagem;
      const link = event.currentTarget;

      if(link && link instanceof HTMLAnchorElement) {
        link.href = `https://wa.me/${contato}?text=${mensagem}`;
        link.target = '_blank';
        document.modalComponent.close();
      }
    }

    const anchorWhatsapp = document.querySelector("[data-link-whatsapp]")
    if(anchorWhatsapp) {
      const parentElement = e.currentTarget.parentElement
      anchorWhatsapp.addEventListener("click", (event)=> handleLinkWhatsapp(event, parentElement))
    }
  };
  buttons.forEach((button) => button.addEventListener("click", handleClick));
}
