# 武士の日記 — Diario del Samurái

Un mini proyecto de JavaScript vanilla para practicar los conceptos básicos del lenguaje, con estética japonesa (blanco / negro / rojo) y modo claro/oscuro.

---

## Vista previa

> Próximamente — podés agregar un screenshot del proyecto aquí

---

## ¿De qué trata?

El Diario del Samurái es una aplicación web donde podés escribir reflexiones del día, asignarles un estado de ánimo (mood), filtrarlas y borrarlas. Todo funciona en el navegador sin necesidad de servidor ni base de datos.

---

## Tecnologías usadas

- HTML5
- CSS3 (variables, flexbox, grid, media queries, animaciones)
- JavaScript vanilla (sin frameworks ni librerías)

---

## Estructura de archivos
```
diario-samurai/
├── index.html     → estructura de la página
├── style.css      → estilos y modo oscuro
└── script.js      → toda la lógica en JavaScript
```

---

## Conceptos de JavaScript practicados

| Concepto | Descripción |
|---|---|
| `let` / `const` | Declaración de variables |
| `Arrays` y `.push()` | Guardar entradas en una lista |
| `Objetos {}` | Cada entrada es un objeto con propiedades |
| `addEventListener` | Detectar clicks del usuario |
| `getElementById` / `querySelectorAll` | Seleccionar elementos del DOM |
| `.textContent` / `.innerHTML` | Modificar texto y HTML en pantalla |
| `.classList.add/remove` | Manejar clases CSS desde JS |
| `.value` | Leer lo que escribe el usuario |
| `.filter()` | Filtrar entradas por mood |
| `.map()` | Transformar el array en HTML |
| `.reduce()` | Sumar el total de palabras |
| `Template literals` | Construir HTML dinámico con variables |
| `Funciones` | Organizar el código en bloques reutilizables |
| `Date` | Obtener y formatear la fecha actual |
| `Booleanos` | Controlar el estado del modo oscuro |

---

## Funcionalidades

- Escribir reflexiones del día con estado de ánimo
- Estadísticas en tiempo real (entradas, mood, palabras)
- Filtrar registros por mood
- Borrar una entrada individual
- Borrar todas las entradas
- Modo claro / oscuro con transición suave
- Diseño responsive para celular y desktop

---

## Cómo correrlo localmente

No necesita instalación. Solo seguí estos pasos:

**1. Clonar el repositorio**
```bash
git clone https://github.com/Miniyonminerat/diario-samurai.git
```

**2. Entrar a la carpeta**
```bash
cd diario-samurai
```

**3. Abrir el proyecto**

Abrí el archivo `index.html` directamente en tu navegador, o si tenés la extensión **Live Server** en VS Code, hacé click derecho sobre `index.html` → *Open with Live Server*.

No requiere Node.js, npm ni ninguna dependencia externa.

---

## Autor

**Juan Diego Monsalve Martinez**
GitHub: [@Miniyonminerat](https://github.com/Miniyonminerat)

---

## Aprendizaje

Este proyecto fue desarrollado como ejercicio práctico para afianzar los fundamentos de JavaScript durante mi proceso de formación como desarrollador fullstack. Cada línea del código está documentada en español para reforzar el aprendizaje.
