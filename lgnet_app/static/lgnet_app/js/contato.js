export default function contato() {
  const inputContato = document.querySelector("[data-form-telefone]");
  let timeoutErro = null;
  if (inputContato) {
    inputContato.addEventListener("input", function (e) {
      let v = e.target.value.replace(/\D/g, "");

      if (v.length > 11) v = v.slice(0, 11);

      if (v.length >= 2 && v.length <= 6)
        v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
      else if (v.length > 6)
        v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
      else if (v.length > 0) v = `(${v.slice(0, 2)}`;

      e.target.value = v;
    });
  }

  const fetchApi = async (form) => {
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
      });

      if(!response) throw new Error("Erro");
      const json = await response.json();
      console.log(json);
    } catch (error) {}
  };

  const form = document.querySelector("[data-form-contato]");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const nome = form.elements["nome_completo"].value;
      const telefone = form.elements["telefone"].value;
      const assunto = form.elements["assunto"].value;
      let hasError = false;
      let errorNome = document.getElementById("erro-nome");
      let errorTelefone = document.getElementById("erro-telefone");
      let errorAssunto = document.getElementById("erro-assunto");

      if (nome.length > 70) {
        errorNome.classList.remove("hidden");
        hasError = true;
      }

      if (assunto.length > 70) {
        errorAssunto.classList.remove("hidden");
        hasError = true;
      }

      if (telefone.length < 11) {
        errorTelefone.classList.remove("hidden");
        hasError = true;
      }

      if (hasError) {
        if (timeoutErro) clearTimeout(timeoutErro);
        timeoutErro = setTimeout(() => {
          errorNome.classList.add("hidden");
          errorAssunto.classList.add("hidden");
          errorTelefone.classList.add("hidden");
        }, 7000);
      } else {
        fetchApi(event.target);
      }
    });
  }
}
