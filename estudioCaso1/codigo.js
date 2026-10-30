let nombres = ["Maria", "Pedro", "Marco"];
let apellidos = ["Mora Perez", "Sibaja Lopez", "Rojas Castro"];
let notas = [90, 60, 78];

function crearCelda(etiqueta, texto) {
  let celda = document.createElement(etiqueta);
  celda.textContent = texto;
  return celda;
}

function dibujarTabla() {
  let tabla = document.getElementById("tabla");
  tabla.innerHTML = "";

  let encabezado = document.createElement("tr");
  encabezado.appendChild(crearCelda("th", "Nombre"));
  encabezado.appendChild(crearCelda("th", "Apellidos"));
  encabezado.appendChild(crearCelda("th", "Nota"));
  tabla.appendChild(encabezado);

  for (let i = 0; i < notas.length; i++) {
    let fila = document.createElement("tr");
    fila.appendChild(crearCelda("td", nombres[i]));
    fila.appendChild(crearCelda("td", apellidos[i]));

    let celdaNota = crearCelda("td", notas[i]);
    if (notas[i] >= 80) {
      celdaNota.className = "nota-alta";
    }
    if (notas[i] < 65) {
      celdaNota.className = "nota-baja";
    }
    fila.appendChild(celdaNota);

    tabla.appendChild(fila);
  }
}

function calcularResumen() {
  let posMayor = 0;
  let mayor = notas[0];
  let menor = notas[0];
  let suma = 0;

  for (let i = 0; i < notas.length; i++) {
    suma = suma + notas[i];
    if (notas[i] > mayor) {
      mayor = notas[i];
      posMayor = i;
    }
    if (notas[i] < menor) {
      menor = notas[i];
    }
  }

  let promedio = suma / notas.length;
  document.getElementById("resumenMayor").textContent = "Mayor nota: " + nombres[posMayor] + " " + apellidos[posMayor] + " (" + mayor + ")";
  document.getElementById("resumenPromedio").textContent = "Promedio: " + promedio.toFixed(2);
  document.getElementById("resumenMenor").textContent = "Nota mas baja: " + menor;
}

function agregarEstudiante() {
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellidos").value;
  let nota = document.getElementById("nota").value;
  let mensaje = document.getElementById("mensaje");

  if (nombre.trim() == "" || apellido.trim() == "" || nota.trim() == "") {
    mensaje.textContent = "Todos los campos son obligatorios.";
  } else if (Number(nota) < 0 || Number(nota) > 100) {
    mensaje.textContent = "La nota debe estar entre 0 y 100.";
  } else {
    nombres.push(nombre);
    apellidos.push(apellido);
    notas.push(Number(nota));

    dibujarTabla();
    calcularResumen();

    document.getElementById("nombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("nota").value = "";
    mensaje.textContent = "";
  }
}

dibujarTabla();
calcularResumen();
