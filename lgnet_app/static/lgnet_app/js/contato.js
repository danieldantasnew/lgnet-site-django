export default function contato() {
  const inputContato = document.querySelector("[data-form-contato]");
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
}
