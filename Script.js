// ============================================================
// VARIABLES GLOBALES
// ============================================================

// "let" declara una variable que puede cambiar de valor después
// "const" declara una variable que NO puede cambiar

// Array vacío donde se guardarán todas las entradas del diario
let entradas = [];

// String vacío: guarda el mood que el usuario seleccionó
let moodSeleccionado = "";

// String: guarda el filtro activo, empieza en "Todos"
let filtroActivo = "Todos";

// Boolean: guarda si el modo oscuro está activo o no
// false = modo claro (por defecto), true = modo oscuro
let modoOscuro = false;

// ============================================================
// SELECCIONAR ELEMENTOS DEL DOM
// ============================================================
// Antes de manipular cualquier elemento HTML desde JS
// primero hay que "agarrarlo" con getElementById o querySelector

// getElementById() busca UN elemento por su id=""
const htmlRaiz      = document.getElementById("html-raiz");
// htmlRaiz apunta al <html> — JS le agrega/quita la clase "oscuro"

const inputTexto    = document.getElementById("input-texto");
const btnGuardar    = document.getElementById("btn-guardar");
const btnBorrarTodo = document.getElementById("btn-borrar-todo");
const btnTema       = document.getElementById("btn-tema");
const listaEntradas = document.getElementById("lista-entradas");
const statTotal     = document.getElementById("total-entradas");
const statMood      = document.getElementById("total-mood");
const statPalabras  = document.getElementById("total-palabras");

// querySelectorAll() busca TODOS los elementos que coincidan con el selector CSS
// Devuelve una NodeList (lista de elementos) que podemos recorrer con forEach
const botonesMood   = document.querySelectorAll(".boton-mood");
const botonesFiltro = document.querySelectorAll(".boton-filtro");

// ============================================================
// EVENTO: CAMBIAR MODO CLARO / OSCURO
// ============================================================

btnTema.addEventListener("click", function() {

  // El operador ! invierte un booleano: !false = true, !true = false
  // Cada vez que se hace click alternamos entre true y false
  modoOscuro = !modoOscuro;

  if (modoOscuro) {
    // classList.add() agrega una clase CSS al elemento
    // Al agregar "oscuro" al <html>, el CSS activa :root.oscuro
    // y todos los var(--color-...) cambian automáticamente
    htmlRaiz.classList.add("oscuro");

    // textContent cambia el texto visible del botón
    btnTema.textContent = "🌙"; // Modo oscuro activo → mostramos luna
  } else {
    // classList.remove() quita una clase CSS del elemento
    // Al quitar "oscuro", vuelven los colores de :root (modo claro)
    htmlRaiz.classList.remove("oscuro");

    btnTema.textContent = "☀️"; // Modo claro activo → mostramos sol
  }
});

// ============================================================
// EVENTOS EN BOTONES DE MOOD
// ============================================================
// forEach() recorre cada elemento de la NodeList
// y ejecuta una función por cada uno

botonesMood.forEach(function(boton) {

  // addEventListener("click", función) escucha el evento click
  boton.addEventListener("click", function() {

    // dataset.mood lee el atributo data-mood="..." del HTML
    moodSeleccionado = boton.dataset.mood;

    // Quitamos "activo" de TODOS los botones de mood
    botonesMood.forEach(function(b) {
      b.classList.remove("activo");
    });

    // Agregamos "activo" solo al botón clickeado
    boton.classList.add("activo");

    // Actualizamos la tarjeta de estadística
    statMood.textContent = moodSeleccionado;
  });
});

// ============================================================
// EVENTO: GUARDAR ENTRADA
// ============================================================

btnGuardar.addEventListener("click", function() {

  // .value lee el contenido de un input o textarea
  const texto = inputTexto.value;

  // .trim() elimina espacios al inicio y al final del string
  // Si después de trim() está vacío, el usuario no escribió nada
  if (texto.trim() === "") {
    alert("¡Escribe algo antes de guardar!");
    // return detiene la función aquí, no sigue ejecutando
    return;
  }

  if (moodSeleccionado === "") {
    alert("Seleccioná tu estado de ánimo.");
    return;
  }

  // Creamos un objeto con los datos de la nueva entrada
  // Un objeto es una colección de propiedades: { clave: valor }
  const nuevaEntrada = {
    id: Date.now(),             // Date.now() = milisegundos actuales, número único
    texto: texto.trim(),        // Texto sin espacios sobrantes
    mood: moodSeleccionado,     // Mood elegido
    fecha: obtenerFechaActual() // Llamamos a nuestra función de fecha
  };

  // .push() agrega el objeto al FINAL del array
  entradas.push(nuevaEntrada);

  // Limpiamos el textarea
  inputTexto.value = "";

  // Reseteamos el mood
  moodSeleccionado = "";
  botonesMood.forEach(function(b) {
    b.classList.remove("activo");
  });

  // Actualizamos la pantalla
  renderizarLista();
  actualizarStats();
});

// ============================================================
// EVENTO: BORRAR TODAS LAS ENTRADAS
// ============================================================

btnBorrarTodo.addEventListener("click", function() {

  // confirm() muestra una ventana con Aceptar/Cancelar
  // Retorna true si el usuario acepta, false si cancela
  const confirmado = confirm("¿Seguro que querés borrar todas las entradas?");

  if (confirmado) {
    // Vaciamos el array asignándole un array vacío
    entradas = [];

    renderizarLista();
    actualizarStats();
  }
});

// ============================================================
// EVENTOS EN BOTONES DE FILTRO
// ============================================================

botonesFiltro.forEach(function(boton) {
  boton.addEventListener("click", function() {

    // Guardamos el filtro elegido leyendo data-filtro="..."
    filtroActivo = boton.dataset.filtro;

    // Desactivamos todos los filtros visualmente
    botonesFiltro.forEach(function(b) {
      b.classList.remove("activo");
    });

    // Activamos solo el clickeado
    boton.classList.add("activo");

    // Re-dibujamos la lista con el filtro aplicado
    renderizarLista();
  });
});

// ============================================================
// FUNCIÓN: OBTENER FECHA FORMATEADA
// ============================================================
// "function nombre() {}" declara una función reutilizable
// Podemos llamarla desde cualquier parte del código

function obtenerFechaActual() {
  // new Date() crea un objeto con la fecha y hora exacta ahora
  const ahora = new Date();

  // toLocaleDateString() convierte el objeto a string legible
  // "es-CO" = formato colombiano
  return ahora.toLocaleDateString("es-CO", {
    day: "2-digit",   // Día: "07"
    month: "short",   // Mes abreviado: "jul."
    year: "numeric",  // Año: "2025"
    hour: "2-digit",  // Hora: "03"
    minute: "2-digit" // Minutos: "45"
  });
}

// ============================================================
// FUNCIÓN: CONTAR PALABRAS
// ============================================================

function contarPalabras(texto) {
  // .split(" ") divide el string en array usando el espacio como separador
  // "hola mundo" → ["hola", "mundo"]
  // .filter() conserva solo los elementos que cumplan la condición
  // Filtramos strings vacíos que aparecen con dobles espacios
  // .length retorna cuántos elementos tiene el array
  return texto.split(" ").filter(function(palabra) {
    return palabra.length > 0;
  }).length;
}

// ============================================================
// FUNCIÓN: BORRAR UNA ENTRADA INDIVIDUAL
// ============================================================

function borrarEntrada(id) {
  // .filter() crea un NUEVO array conservando solo lo que cumple la condición
  // Conservamos todo EXCEPTO la entrada con ese id
  // !== significa "estrictamente diferente de"
  entradas = entradas.filter(function(entrada) {
    return entrada.id !== id;
  });

  renderizarLista();
  actualizarStats();
}

// ============================================================
// FUNCIÓN: ACTUALIZAR ESTADÍSTICAS
// ============================================================

function actualizarStats() {
  // .length retorna la cantidad de elementos del array
  statTotal.textContent = entradas.length;

  // .reduce() recorre el array acumulando un valor
  // Parámetros: función(acumulado, elementoActual), valorInicial
  const totalPalabras = entradas.reduce(function(acumulado, entrada) {
    return acumulado + contarPalabras(entrada.texto);
  }, 0); // 0 es el valor inicial del acumulado

  statPalabras.textContent = totalPalabras;

  // Si no quedan entradas reseteamos el mood a "—"
  if (entradas.length === 0) {
    statMood.textContent = "—";
  }
}

// ============================================================
// FUNCIÓN PRINCIPAL: RENDERIZAR LA LISTA
// ============================================================
// "Renderizar" = construir y mostrar el HTML en pantalla con JS

function renderizarLista() {

  // Variable que guardará las entradas a mostrar según el filtro
  let entradasVisibles;

  if (filtroActivo === "Todos") {
    // Sin filtro: mostramos todas las entradas
    entradasVisibles = entradas;
  } else {
    // Con filtro: solo las entradas que coincidan con el mood
    entradasVisibles = entradas.filter(function(entrada) {
      return entrada.mood === filtroActivo;
    });
  }

  // Si no hay entradas visibles mostramos mensaje vacío
  if (entradasVisibles.length === 0) {
    listaEntradas.innerHTML = '<div class="vacio">Ningún registro aquí aún...</div>';
    return; // Salimos de la función
  }

  // .slice() crea una copia del array sin modificar el original
  // .reverse() invierte el orden → las más recientes aparecen primero
  // .map() transforma cada elemento en otra cosa
  // Aquí transformamos cada objeto "entrada" en un string de HTML
  const htmlEntradas = entradasVisibles.slice().reverse().map(function(entrada) {

    const palabras = contarPalabras(entrada.texto);

    // Template literal: string con comillas invertidas ``
    // Permite escribir en múltiples líneas e insertar variables con ${}
    // Operador ternario: condición ? siVerdadero : siFalso
    return `
      <div class="entrada">
        <div class="entrada-header">
          <span class="badge-mood">${entrada.mood}</span>
          <span class="entrada-fecha">${entrada.fecha}</span>
        </div>
        <p class="entrada-texto">${entrada.texto}</p>
        <div class="entrada-footer">
          <span class="palabras-count">
            ${palabras} ${palabras === 1 ? "palabra" : "palabras"}
          </span>
          <button class="btn-borrar-entrada" onclick="borrarEntrada(${entrada.id})">
            Borrar
          </button>
        </div>
      </div>
    `;

  // .join("") une todos los strings del array en uno solo sin separador
  }).join("");

  // innerHTML asigna el HTML generado al contenedor de la lista
  listaEntradas.innerHTML = htmlEntradas;
}

// ============================================================
// INICIO: se ejecuta al cargar la página
// ============================================================

renderizarLista(); // Dibuja la lista (vacía al inicio)
actualizarStats(); // Muestra las estadísticas iniciales en 0
