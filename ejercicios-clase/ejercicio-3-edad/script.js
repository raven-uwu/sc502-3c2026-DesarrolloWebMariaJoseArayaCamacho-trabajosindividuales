document.getElementById("formulario").addEventListener("submit", function (evento) {
  evento.preventDefault();
  let edad = Number(document.getElementById("edad").value);

  if (edad > 18) {
    document.getElementById("mensaje").textContent = "Eres mayor de edad.";
  } else {
    document.getElementById("mensaje").textContent = "Eres menor de edad.";
  }
});
