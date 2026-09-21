# EnglishPage - Aplicacion Web Movil e Interactiva de Repaso

Una aplicacion web Single Page Application (SPA) orientada a dispositivos moviles y de escritorio, desarrollada para el aprendizaje activo y repaso de conceptos clave del idioma ingles (gramatica estructurada, expresiones idiomaticas en flashcards 3D, directorio de verbos irregulares y quiz interactivo).

Repositorio GitHub: [https://github.com/JoseGordilloMendoza/englishPage.git](https://github.com/JoseGordilloMendoza/englishPage.git)

---

## Caracteristicas Principales

1. **Arquitectura Single Page Application (SPA) sin Frameworks Pesados**:
   - Enrutamiento por hash instantaneo (`#inicio`, `#gramatica`, `#vocabulario`, `#verbos`, `#quiz`) que alterna las 5 vistas en el DOM sin recargar el navegador.
2. **Enfoque Mobile-First y Responsive Multiplataforma**:
   - Barra de navegacion inferior ergonomica para la zona del pulgar (*Thumb Zone*) en telefonos inteligentes, que conmuta fluidamente a una barra superior fija en computadoras y tabletas.
3. **Flashcards 3D de Vocabulario con Iconografia Vectorial**:
   - Tarjetas interactivas con giro de 180 grados mediante aceleracion por hardware (`transform-style: preserve-3d`, `perspective: 1000px`), insignias conceptuales SVG limpias (sin emojis) y guardado de estado aprendido.
4. **Pronunciacion Nativa con Web Speech API**:
   - Reproduccion de voz nativa en ingles sin archivos de audio externos, empleando la API estandar del navegador con seleccion de voces en-US y en-GB.
5. **Directorio de Verbos Irregulares con Filtrado en Tiempo Real**:
   - Busqueda instantanea por infinitivo, pasado, participio o significado en espanol conforme el usuario escribe.
6. **Modulo de Practica (Quiz Interactivo)**:
   - Evaluacion formativa con temporizador, retroalimentacion pedagogica inmediata, calculo de puntaje y opcion de reintento.
7. **Persistencia Local (`localStorage`)**:
   - Registro permanente de tarjetas aprendidas y progreso del estudiante en el dispositivo sin necesidad de bases de datos remotas.

---

## Estructura del Proyecto

```text
englishPage/
|-- index.html                   # Contenedor raiz semantico con las 5 vistas SPA
|-- package.json                 # Metadatos del proyecto y scripts de ejecucion
|-- vite.config.js               # Configuracion del entorno de desarrollo Vite
|-- README.md                    # Documentacion y guia de despliegue
|-- informe_proyecto_englishpage.pdf # Informe academico formal con capturas
|-- docs/
|   |-- informe.html             # Documento fuente imprimible del informe
|   `-- screenshots/             # Capturas de pantalla en dispositivos moviles y desktop
`-- src/
    |-- css/
    |   |-- variables.css        # Tokens de color HSL, sombras y radios
    |   |-- base.css             # Reseteo responsivo, tipografia y botones
    |   |-- layout.css           # Header, navegacion desktop y barra inferior movil
    |   |-- cards.css            # Flashcards 3D, insignias SVG y tablas adaptativas
    |   `-- main.css             # Importador principal de estilos
    `-- js/
        |-- data.js              # Datos de reglas, vocabulario, verbos y quiz
        |-- icons.js             # Libreria de iconos vectoriales SVG consistentes
        |-- speech.js            # Motor de pronunciacion nativa en ingles
        |-- storage.js           # Gestion de persistencia en localStorage
        |-- navigation.js        # Enrutador reactivo por hash
        |-- render.js            # Inyeccion dinamica en el DOM para cada vista
        `-- main.js              # Punto de entrada de la aplicacion
```

---

## Requisitos y Ejecucion Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) (version 18 o superior recomendada).
- Navegador web moderno (Chrome, Edge, Firefox, Safari).

### Pasos para ejecutar el proyecto:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JoseGordilloMendoza/englishPage.git
   cd englishPage
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre tu navegador en la URL indicada en la consola (por ejemplo, `http://localhost:3001` o `http://localhost:5173`).

4. **Compilar para produccion:**
   ```bash
   npm run build
   ```
   Genera la version optimizada y minificada en la carpeta `dist/`.

---


## Informacion del Autor

- **Estudiante**: Jose Gordillo Mendoza
- **Curso**: Plataformas Emergentes
- **Ano**: 2026
