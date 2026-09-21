/**
 * EnglishPage - DOM Rendering Engine
 * Genera e inyecta dinámicamente el contenido de las vistas del sistema.
 */

import { grammarRules, flashcardsVocab, verbList } from './data.js';
import { speakText } from './speech.js';
import { isCardMastered, toggleCardMastered, getStudyStats } from './storage.js';
import { navigateToView } from './navigation.js';

let currentVocabFilter = 'all'; // 'all' | 'pending' | 'mastered'
let currentVerbSearch = '';

/**
 * Renderiza el panel de inicio / dashboard con métricas dinámicas y recomendaciones.
 */
export function renderDashboard() {
  const container = document.getElementById('inicio-content');
  if (!container) return;

  const stats = getStudyStats(flashcardsVocab.length, verbList.length, grammarRules.length);

  // Seleccionar una expresión aleatoria como "Frase del día"
  const randomCard = flashcardsVocab[Math.floor(Math.random() * flashcardsVocab.length)];

  container.innerHTML = `
    <!-- Hero Banner -->
    <div class="dashboard-hero">
      <div class="hero-badge">🚀 Tu tutor móvil de inglés</div>
      <h1 class="hero-title">Domina el inglés paso a paso</h1>
      <p class="hero-subtitle">
        Repasa reglas gramaticales clave, practica con flashcards interactivas en 3D y consulta el catálogo de verbos irregulares.
      </p>
      <div class="hero-actions">
        <button class="btn btn-primary" id="btn-start-vocab">
          <span>🃏 Practicar Flashcards</span>
        </button>
        <button class="btn btn-secondary" id="btn-view-grammar">
          <span>📖 Ver Gramática</span>
        </button>
      </div>
    </div>

    <!-- Estadísticas de Aprendizaje -->
    <div class="stats-grid">
      <div class="stat-card" data-target="vocabulario">
        <div class="stat-icon-wrapper bg-indigo">
          <span class="stat-icon">🃏</span>
        </div>
        <div class="stat-info">
          <span class="stat-value">${stats.totalVocab}</span>
          <span class="stat-label">Flashcards</span>
        </div>
        <div class="stat-badge">${stats.masteredCount} dominadas</div>
      </div>

      <div class="stat-card" data-target="verbos">
        <div class="stat-icon-wrapper bg-emerald">
          <span class="stat-icon">⚡</span>
        </div>
        <div class="stat-info">
          <span class="stat-value">${stats.totalVerbs}</span>
          <span class="stat-label">Verbos Irregulares</span>
        </div>
        <div class="stat-badge">Con audio 🔊</div>
      </div>

      <div class="stat-card" data-target="gramatica">
        <div class="stat-icon-wrapper bg-amber">
          <span class="stat-icon">📚</span>
        </div>
        <div class="stat-info">
          <span class="stat-value">${stats.totalGrammar}</span>
          <span class="stat-label">Temas Clave</span>
        </div>
        <div class="stat-badge">B1 & B2</div>
      </div>
    </div>

    <!-- Barra de Progreso Global -->
    <div class="progress-section card-box">
      <div class="progress-header">
        <span class="progress-title">Progreso de vocabulario memorizado</span>
        <span class="progress-percentage">${stats.progressPercent}%</span>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar-fill" style="width: ${stats.progressPercent}%"></div>
      </div>
      <p class="progress-caption">
        ${stats.masteredCount} de ${stats.totalVocab} tarjetas marcadas como dominadas. ¡Sigue así!
      </p>
    </div>

    <!-- Frase del Día -->
    <div class="daily-phrase card-box">
      <div class="daily-phrase-header">
        <span class="badge-tag">💡 Expresión Recomendada</span>
        <button class="btn-icon" id="btn-daily-audio" aria-label="Escuchar pronunciación">
          🔊
        </button>
      </div>
      <h3 class="daily-phrase-en">${randomCard.en}</h3>
      <p class="daily-phrase-phonetic">${randomCard.phonetic}</p>
      <p class="daily-phrase-es">"${randomCard.es}"</p>
      <div class="daily-phrase-example">
        <span class="example-label">Ejemplo:</span>
        <span class="example-text">"${randomCard.example}"</span>
      </div>
    </div>
  `;

  // Listeners de botones dentro del dashboard
  document.getElementById('btn-start-vocab')?.addEventListener('click', () => navigateToView('vocabulario'));
  document.getElementById('btn-view-grammar')?.addEventListener('click', () => navigateToView('gramatica'));
  document.getElementById('btn-daily-audio')?.addEventListener('click', () => speakText(randomCard.en));

  // Tarjetas clickeables hacia sus secciones
  container.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-target');
      if (target) navigateToView(target);
    });
  });
}

/**
 * Renderiza la vista de Gramática (Lista estructurada de reglas).
 */
export function renderGrammar() {
  const container = document.getElementById('grammar-content');
  if (!container) return;

  const cardsHtml = grammarRules.map((item, index) => `
    <article class="grammar-card">
      <div class="grammar-card-header">
        <div class="grammar-number">0${index + 1}</div>
        <div class="grammar-title-group">
          <span class="level-badge">${item.level}</span>
          <h2 class="grammar-topic">${item.topic}</h2>
        </div>
      </div>

      <div class="grammar-body">
        <div class="grammar-rule-block">
          <span class="rule-icon">📌</span>
          <p class="grammar-rule-text">${item.rule}</p>
        </div>

        <div class="grammar-formula-box">
          <span class="formula-label">Estructura:</span>
          <code>${item.formula}</code>
        </div>

        <div class="grammar-example-box">
          <div class="example-header">
            <span class="example-tag">Ejemplo práctico</span>
            <button class="btn-icon btn-sm btn-grammar-audio" data-speech="${item.example.split('(')[0].trim()}" aria-label="Escuchar ejemplo">
              🔊
            </button>
          </div>
          <p class="grammar-example-text">${item.example}</p>
        </div>
      </div>
    </article>
  `).join('');

  container.innerHTML = `
    <div class="section-intro">
      <h1 class="section-title">Reglas Gramaticales Estructurales</h1>
      <p class="section-description">
        Repasa las estructuras más desafiantes y comunes del inglés en niveles intermedios y avanzados.
      </p>
    </div>
    <div class="grammar-list">
      ${cardsHtml}
    </div>
  `;

  // Asignar audio a los ejemplos
  container.querySelectorAll('.btn-grammar-audio').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-speech');
      if (text) speakText(text);
    });
  });
}

/**
 * Renderiza la vista de Vocabulario (Flashcards 3D interactivas).
 */
export function renderVocabulary() {
  const container = document.getElementById('vocab-content');
  if (!container) return;

  // Filtrado de tarjetas
  const filteredCards = flashcardsVocab.filter(card => {
    const isMastered = isCardMastered(card.id);
    if (currentVocabFilter === 'mastered') return isMastered;
    if (currentVocabFilter === 'pending') return !isMastered;
    return true;
  });

  const cardsHtml = filteredCards.length > 0
    ? filteredCards.map(card => {
        const mastered = isCardMastered(card.id);
        return `
          <div class="flashcard-scene">
            <div class="flashcard-inner ${mastered ? 'is-mastered' : ''}" data-card-id="${card.id}" tabindex="0" role="button" aria-label="Tarjeta interactiva para ${card.en}. Toca para girar.">
              
              <!-- Front Face (Inglés) -->
              <div class="flashcard-face flashcard-front">
                <div class="card-top-bar">
                  <span class="category-pill">${card.category}</span>
                  <div class="card-actions">
                    <button class="btn-icon btn-card-audio" data-speech="${card.en}" aria-label="Escuchar pronunciación" title="Escuchar">
                      🔊
                    </button>
                    <button class="btn-icon btn-card-master ${mastered ? 'active' : ''}" data-card-id="${card.id}" aria-label="Marcar como aprendida" title="Marcar como aprendida">
                      ${mastered ? '★' : '☆'}
                    </button>
                  </div>
                </div>

                <div class="card-center">
                  <h2 class="card-word">${card.en}</h2>
                  <span class="card-phonetic">${card.phonetic}</span>
                </div>

                <div class="card-bottom">
                  <span class="flip-hint">👆 Toca para ver traducción</span>
                </div>
              </div>

              <!-- Back Face (Español y Ejemplo) -->
              <div class="flashcard-face flashcard-back">
                <div class="card-top-bar">
                  <span class="meaning-pill">Traducción</span>
                  <button class="btn-icon btn-card-audio" data-speech="${card.example}" aria-label="Escuchar ejemplo en inglés" title="Escuchar ejemplo">
                    🔊
                  </button>
                </div>

                <div class="card-center">
                  <h3 class="card-meaning">${card.es}</h3>
                  <div class="card-example-box">
                    <span class="example-quote">"${card.example}"</span>
                  </div>
                </div>

                <div class="card-bottom">
                  <span class="flip-hint">👆 Toca para volver</span>
                </div>
              </div>

            </div>
          </div>
        `;
      }).join('')
    : `
      <div class="empty-state">
        <span class="empty-icon">📂</span>
        <p class="empty-text">No hay tarjetas en este filtro.</p>
      </div>
    `;

  container.innerHTML = `
    <div class="section-intro">
      <h1 class="section-title">Flashcards 3D de Vocabulario</h1>
      <p class="section-description">
        Toca cualquier tarjeta para girarla y descubrir su traducción y ejemplo. Presiona 🔊 para escucharla o ☆ para marcarla como dominada.
      </p>

      <!-- Barra de Filtros -->
      <div class="filter-pills" role="tablist">
        <button class="filter-pill ${currentVocabFilter === 'all' ? 'active' : ''}" data-filter="all">
          Todas (${flashcardsVocab.length})
        </button>
        <button class="filter-pill ${currentVocabFilter === 'pending' ? 'active' : ''}" data-filter="pending">
          Pendientes
        </button>
        <button class="filter-pill ${currentVocabFilter === 'mastered' ? 'active' : ''}" data-filter="mastered">
          Dominadas
        </button>
      </div>
    </div>

    <!-- Grid de Tarjetas -->
    <div class="flashcards-grid">
      ${cardsHtml}
    </div>
  `;

  // Asignar listeners de filtros
  container.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      currentVocabFilter = btn.getAttribute('data-filter') || 'all';
      renderVocabulary();
      renderDashboard(); // actualizar progreso si aplica
    });
  });

  // Asignar interacción de giro 3D (Flip Card)
  container.querySelectorAll('.flashcard-inner').forEach(card => {
    const toggleFlip = (e) => {
      // Si el clic fue en un botón de acción (audio o favorito), no voltear la tarjeta
      if (e.target.closest('.btn-icon')) return;
      card.classList.toggle('flipped');
    };

    card.addEventListener('click', toggleFlip);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFlip(e);
      }
    });
  });

  // Asignar audio a las tarjetas
  container.querySelectorAll('.btn-card-audio').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-speech');
      if (text) speakText(text);
    });
  });

  // Asignar toggle de "Mastered"
  container.querySelectorAll('.btn-card-master').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cardId = btn.getAttribute('data-card-id');
      if (cardId) {
        toggleCardMastered(cardId);
        renderVocabulary();
        renderDashboard();
      }
    });
  });
}

/**
 * Renderiza la vista de Verbos Irregulares (Directorio con búsqueda en tiempo real).
 */
export function renderVerbs() {
  const container = document.getElementById('verbs-content');
  if (!container) return;

  const query = currentVerbSearch.toLowerCase().trim();
  const filteredVerbs = verbList.filter(v => {
    if (!query) return true;
    return (
      v.inf.toLowerCase().includes(query) ||
      v.past.toLowerCase().includes(query) ||
      v.part.toLowerCase().includes(query) ||
      v.es.toLowerCase().includes(query)
    );
  });

  const cardsHtml = filteredVerbs.length > 0
    ? filteredVerbs.map(v => `
        <article class="verb-card">
          <div class="verb-main-row">
            <div class="verb-forms">
              <div class="verb-form-item">
                <span class="verb-col-label">Infinitive</span>
                <strong class="verb-word-inf">${v.inf}</strong>
              </div>
              <div class="verb-arrow">➔</div>
              <div class="verb-form-item">
                <span class="verb-col-label">Past Simple</span>
                <span class="verb-word-past">${v.past}</span>
              </div>
              <div class="verb-arrow">➔</div>
              <div class="verb-form-item">
                <span class="verb-col-label">Past Participle</span>
                <span class="verb-word-part">${v.part}</span>
              </div>
            </div>

            <div class="verb-actions">
              <button class="btn-icon btn-verb-audio" data-speech="${v.inf}, ${v.past}, ${v.part}" aria-label="Escuchar pronunciación de ${v.inf}">
                🔊
              </button>
            </div>
          </div>

          <div class="verb-translation-row">
            <span class="verb-meaning-badge">Significado:</span>
            <span class="verb-meaning-text">${v.es}</span>
          </div>
        </article>
      `).join('')
    : `
      <div class="empty-state">
        <span class="empty-icon">🔍</span>
        <p class="empty-text">No se encontraron verbos para "<strong>${escapeHtml(currentVerbSearch)}</strong>".</p>
      </div>
    `;

  container.innerHTML = `
    <div class="section-intro">
      <h1 class="section-title">Directorio de Verbos Irregulares</h1>
      <p class="section-description">
        Consulta las tres formas verbales esenciales en inglés. Usa el buscador en tiempo real para encontrar cualquier verbo al instante.
      </p>

      <!-- Barra de Búsqueda -->
      <div class="search-box">
        <span class="search-icon">🔎</span>
        <input 
          type="search" 
          id="verb-search-input" 
          class="search-input" 
          placeholder="Buscar verbo por infinitivo, pasado o significado (ej. drive, broke, comer)..." 
          value="${escapeHtml(currentVerbSearch)}"
          aria-label="Buscar verbo irregular"
        />
        ${currentVerbSearch ? `<button class="btn-clear-search" id="btn-clear-search" aria-label="Limpiar búsqueda">✕</button>` : ''}
      </div>
      <div class="search-counter">
        Mostrando ${filteredVerbs.length} de ${verbList.length} verbos
      </div>
    </div>

    <!-- Lista de Verbos -->
    <div class="verbs-list">
      ${cardsHtml}
    </div>
  `;

  // Asignar input de búsqueda en tiempo real
  const searchInput = document.getElementById('verb-search-input');
  if (searchInput) {
    searchInput.focus();
    // Mover cursor al final si ya tenía texto
    if (searchInput.value) {
      searchInput.selectionStart = searchInput.selectionEnd = searchInput.value.length;
    }

    searchInput.addEventListener('input', (e) => {
      currentVerbSearch = e.target.value;
      renderVerbs();
    });
  }

  // Botón para limpiar búsqueda
  document.getElementById('btn-clear-search')?.addEventListener('click', () => {
    currentVerbSearch = '';
    renderVerbs();
  });

  // Asignar audio a los verbos
  container.querySelectorAll('.btn-verb-audio').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-speech');
      if (text) speakText(text);
    });
  });
}

/**
 * Renderiza la vista de Acerca de con especificaciones técnicas y créditos.
 */
export function renderAbout() {
  const container = document.getElementById('about-content');
  if (!container) return;

  container.innerHTML = `
    <div class="section-intro">
      <h1 class="section-title">Acerca de EnglishPage</h1>
      <p class="section-description">
        Aplicación Web Móvil e Interactiva diseñada para el estudio y repaso de conceptos clave del idioma inglés.
      </p>
    </div>

    <div class="about-grid">
      <!-- Ficha Técnica -->
      <div class="about-card card-box">
        <div class="about-header">
          <span class="about-badge">⚙️ Arquitectura</span>
          <h2 class="about-card-title">Especificaciones Técnicas</h2>
        </div>
        <ul class="about-specs-list">
          <li><strong>Patrón Arquitectónico:</strong> Single Page Application (SPA) estática.</li>
          <li><strong>Estructura:</strong> HTML5 semántico con navegación por contenedores dinámicos.</li>
          <li><strong>Estilos e Interfaz:</strong> CSS3 puro (Grid, Flexbox, variables y animaciones 3D sin frameworks).</li>
          <li><strong>Lógica y Renderizado:</strong> Vanilla JavaScript (ES6+ modular, separación estricta data.js / render.js).</li>
          <li><strong>Entorno de Desarrollo:</strong> Vite Frontend Tooling.</li>
          <li><strong>Control de Versiones:</strong> Git & GitHub.</li>
        </ul>
      </div>

      <!-- Objetivos del Sistema -->
      <div class="about-card card-box">
        <div class="about-header">
          <span class="about-badge">🎯 Laboratorio</span>
          <h2 class="about-card-title">Objetivos del Proyecto</h2>
        </div>
        <p class="about-text">
          Desarrollar una aplicación web local responsive orientada a dispositivos móviles aplicando conceptos avanzados de desarrollo móvil web y multiplataforma:
        </p>
        <ul class="about-checklist">
          <li>✓ Interfaz adaptada prioritariamente a teléfonos celulares (Mobile-First).</li>
          <li>✓ 5 vistas o secciones interactivas sin recarga de página.</li>
          <li>✓ Manipulación dinámica del DOM mediante JavaScript Vanilla.</li>
          <li>✓ Presentación visual mediante tarjetas interactivas y listas estructuradas.</li>
          <li>✓ Flip cards 3D con aceleración por hardware.</li>
          <li>✓ Síntesis de voz nativa (Web Speech API) integrada.</li>
        </ul>
      </div>

      <!-- Requisitos Cumplidos -->
      <div class="about-card card-box">
        <div class="about-header">
          <span class="about-badge">📋 Requerimientos</span>
          <h2 class="about-card-title">Mapeo de Requerimientos</h2>
        </div>
        <div class="rf-tags">
          <span class="rf-pill">RF-01: Navegación SPA</span>
          <span class="rf-pill">RF-02: Renderizado Dinámico Vocabulario</span>
          <span class="rf-pill">RF-03: Renderizado Dinámico de Listas</span>
          <span class="rf-pill">RF-04: Flip 3D Interactivo</span>
          <span class="rf-pill">RF-05: Menú Móvil Hamburguesa</span>
          <span class="rf-pill">RNF-01: Responsive Mobile First</span>
          <span class="rf-pill">RNF-02: Cero librerías externas</span>
          <span class="rf-pill">RNF-03: Modularidad estricta</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Función auxiliar para escapar texto en HTML y evitar inyecciones.
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
