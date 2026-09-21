# EnglishPage 🇬🇧 - Aplicación Web Móvil e Interactiva de Repaso

Una aplicación web Single Page Application (SPA) orientada a dispositivos móviles, diseñada para el estudio y repaso de conceptos clave del idioma inglés (gramática, vocabulario y verbos irregulares).

Construida íntegramente con **HTML5 semántico, CSS3 puro con animaciones 3D y Vanilla JavaScript modular (ES6+)**, utilizando **Vite** como entorno de desarrollo ligero.

---

## 🌟 Características Principales

1. **Arquitectura SPA sin frameworks**:
   - Transiciones instantáneas entre las 5 vistas (`#inicio`, `#gramatica`, `#vocabulario`, `#verbos`, `#acerca-de`) sin recargar el navegador.
2. **Flashcards 3D de Vocabulario**:
   - Tarjetas interactivas con giro de 180° (`transform: rotateY(180deg)` y `perspective: 1000px`) que revelan la traducción en español y ejemplos prácticos.
3. **Pronunciación con Web Speech API Nativa**:
   - Cada tarjeta de vocabulario, ejemplo gramatical y verbo irregular cuenta con un botón de altavoz (🔊) que reproduce la pronunciación nativa en inglés.
4. **Buscador en Tiempo Real de Verbos Irregulares**:
   - Directorio completo con las 3 formas verbales (*Infinitive*, *Past Simple*, *Past Participle*) y traducción, filtrable al instante mientras se escribe.
5. **Persistencia Local (`localStorage`)**:
   - Permite marcar tarjetas de vocabulario como aprendidas (★) y visualiza el progreso global en la pantalla de Inicio.
6. **Enfoque Mobile-First**:
   - Menú hamburguesa desplegable accesible y barra de navegación táctil inferior en teléfonos móviles, adaptándose fluidamente a múltiples columnas en tabletas y computadoras.

---

## 📂 Estructura del Proyecto

```text
englishPage/
├── index.html                   # Documento semántico con las 5 secciones SPA
├── package.json                 # Configuración de Vite y scripts de ejecución
├── vite.config.js               # Configuración del servidor de desarrollo
├── .gitignore                   # Exclusión de node_modules y dist
├── README.md                    # Documentación del proyecto
└── src/
    ├── css/
    │   ├── variables.css        # Paleta de colores, sombras y tokens visuales
    │   ├── base.css             # Reseteo CSS, tipografía Google Fonts y botones
    │   ├── layout.css           # Header, navegación responsive, drawer y transiciones
    │   ├── cards.css            # Flashcards 3D, tarjetas de gramática y lista de verbos
    │   └── main.css             # Agregador principal de estilos
    └── js/
        ├── data.js              # Base de datos local (reglas, flashcards y verbos)
        ├── speech.js            # Utilidad de pronunciación nativa (Web Speech API)
        ├── storage.js           # Manejo de persistencia local (localStorage)
        ├── render.js            # Inyección dinámica en el DOM de las 5 vistas
        ├── navigation.js        # Enrutador SPA por hash y menú móvil hamburguesa
        └── main.js              # Punto de entrada principal
```

---

## 🚀 Requisitos y Ejecución Local

### Prerrequisitos
- Tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior).

### Pasos para iniciar el entorno de desarrollo:

1. Clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd englishPage
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor local:
   ```bash
   npm run dev
   ```
   Abre tu navegador en `http://localhost:3000` para interactuar con la aplicación.

4. Compilar para producción:
   ```bash
   npm run build
   ```

---

## 📋 Mapeo de Requerimientos Cumplidos

| Código | Requerimiento | Implementación |
| :--- | :--- | :--- |
| **RF-01** | Navegación de Vistas | Enrutador SPA por Hash (`navigation.js`) que alterna las 5 vistas sin recargar. |
| **RF-02** | Renderizado Dinámico Vocabulario | Lectura de `data.js` e inyección en el DOM de flashcards interactivas (`render.js`). |
| **RF-03** | Renderizado de Listas | Generación dinámica de reglas gramaticales y catálogo de verbos irregulares. |
| **RF-04** | Interacción de Tarjetas (Flip) | Animación 3D con `perspective` y `transform: rotateY(180deg)` al hacer clic o tocar. |
| **RF-05** | Menú Móvil Desplegable | Menú hamburguesa interactivo con transición animada y cierre táctil. |
| **RNF-01** | Responsive Mobile First | Grid adaptable: 1 columna en celular y expansión a 2-3 columnas en escritorio. |
| **RNF-02** | Rendimiento y Ligereza | Cero frameworks CSS y cero librerías JS externas. 100% nativo. |
| **RNF-03** | Modularidad del Código | Aislamiento estricto de datos en `data.js` separado de la lógica de renderizado. |
