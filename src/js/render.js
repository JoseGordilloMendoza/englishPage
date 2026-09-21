/**
 * EnglishPage - DOM Rendering Engine
 * Genera e inyecta dinámicamente el contenido de las vistas del sistema.
 */

import { grammarRules, flashcardsVocab, verbList, quizQuestions } from './data.js';
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
        <button class="btn btn-secondary" id="btn-start-quiz">
          <span>🎯 Desafío Quiz</span>
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
  document.getElementById('btn-start-quiz')?.addEventListener('click', () => navigateToView('quiz'));
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
// ==========================================================================
// ESTADO Y LÓGICA DEL DESAFÍO / QUIZ INTERACTIVO
// ==========================================================================
let quizRoundQuestions = [];
let currentQuestionIndex = 0;
let quizScore = 0;
let isAnswered = false;
let selectedOptionIndex = null;

/**
 * Inicia una nueva ronda de 5 preguntas aleatorias.
 */
function startNewQuiz() {
  quizRoundQuestions = [...quizQuestions].sort(() => 0.5 - Math.random()).slice(0, 5);
  currentQuestionIndex = 0;
  quizScore = 0;
  isAnswered = false;
  selectedOptionIndex = null;
}

/**
 * Renderiza la vista de Quiz Interactivo (#quiz).
 */
export function renderQuiz() {
  const container = document.getElementById('quiz-content');
  if (!container) return;

  // Si aún no hay preguntas seleccionadas, inicializar la ronda
  if (quizRoundQuestions.length === 0) {
    startNewQuiz();
  }

  const isCompleted = currentQuestionIndex >= quizRoundQuestions.length;

  let quizMainHtml = '';

  if (isCompleted) {
    // Pantalla de Resultados
    const total = quizRoundQuestions.length;
    const percentage = Math.round((quizScore / total) * 100);
    let feedback = '';
    let badgeClass = 'bg-emerald';

    if (percentage === 100) {
      feedback = '¡Extraordinario! Tienes un dominio impecable del vocabulario y la gramática.';
    } else if (percentage >= 70) {
      feedback = '¡Muy buen trabajo! Tienes bases muy sólidas. ¡Sigue practicando para alcanzar la perfección!';
    } else {
      feedback = '¡Buen esfuerzo! Te recomendamos repasar las flashcards 3D y la sección de verbos para reforzar.';
      badgeClass = 'bg-amber';
    }

    quizMainHtml = `
      <div class="quiz-result-card card-box">
        <div class="result-trophy">🏆</div>
        <h2 class="result-title">¡Desafío Completado!</h2>
        <div class="result-score-badge ${badgeClass}">
          <span class="score-number">${quizScore} / ${total}</span>
          <span class="score-percent">(${percentage}% de aciertos)</span>
        </div>
        <p class="result-feedback">${feedback}</p>

        <div class="result-actions">
          <button class="btn btn-primary" id="btn-restart-quiz">
            <span>🔄 Jugar Otro Desafío</span>
          </button>
          <button class="btn btn-secondary" id="btn-go-vocab">
            <span>🃏 Ir a Flashcards</span>
          </button>
        </div>
      </div>
    `;
  } else {
    // Pantalla de Pregunta Activa
    const q = quizRoundQuestions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    const totalQuestions = quizRoundQuestions.length;
    const progressPercent = (questionNumber / totalQuestions) * 100;

    const letters = ['A', 'B', 'C', 'D'];
    const optionsHtml = q.options.map((opt, idx) => {
      let optClass = 'quiz-option-btn';
      if (isAnswered) {
        if (idx === q.answer) {
          optClass += ' correct';
        } else if (idx === selectedOptionIndex) {
          optClass += ' incorrect';
        } else {
          optClass += ' disabled';
        }
      }

      return `
        <button class="${optClass}" data-opt-idx="${idx}" ${isAnswered ? 'disabled' : ''}>
          <span class="option-letter">${letters[idx]}</span>
          <span class="option-text">${escapeHtml(opt)}</span>
          ${isAnswered && idx === q.answer ? '<span class="option-status-icon">✓</span>' : ''}
          ${isAnswered && idx === selectedOptionIndex && idx !== q.answer ? '<span class="option-status-icon">✕</span>' : ''}
        </button>
      `;
    }).join('');

    const explanationHtml = isAnswered ? `
      <div class="quiz-explanation-box">
        <div class="explanation-header">
          <span class="explanation-icon">${selectedOptionIndex === q.answer ? '🎉 ¡Correcto!' : '💡 Explicación:'}</span>
        </div>
        <p class="explanation-text">${escapeHtml(q.explanation)}</p>
        <button class="btn btn-primary btn-next-question" id="btn-next-question">
          <span>${questionNumber < totalQuestions ? 'Siguiente Pregunta ➔' : 'Ver Resultados Finales 🏆'}</span>
        </button>
      </div>
    ` : '';

    quizMainHtml = `
      <div class="quiz-card card-box">
        <!-- Barra de Progreso del Quiz -->
        <div class="quiz-progress-bar-wrap">
          <div class="quiz-progress-bar-fill" style="width: ${progressPercent}%"></div>
        </div>

        <div class="quiz-card-header">
          <span class="badge-tag">${escapeHtml(q.category)}</span>
          <div class="quiz-meta-info">
            <span class="quiz-step-count">Pregunta ${questionNumber} de ${totalQuestions}</span>
            <span class="quiz-score-pill">Puntaje: ${quizScore}</span>
          </div>
        </div>

        <div class="quiz-question-row">
          <h2 class="quiz-question-title">${escapeHtml(q.question)}</h2>
          <button class="btn-icon btn-sm btn-quiz-speech" data-speech="${q.question}" aria-label="Escuchar pregunta" title="Escuchar">
            🔊
          </button>
        </div>

        <div class="quiz-options-list">
          ${optionsHtml}
        </div>

        ${explanationHtml}
      </div>
    `;
  }

  // Tips adicionales para estudiantes de inglés
  const tipsHtml = `
    <div class="tips-section">
      <div class="section-intro" style="margin-top: 36px; margin-bottom: 16px;">
        <h2 class="section-title" style="font-size: 1.3rem;">💡 Tips de Fluidez & Errores Frecuentes</h2>
        <p class="section-description">
          Acelera tu aprendizaje evitando los tropiezos más comunes de los hispanohablantes.
        </p>
      </div>

      <div class="tips-grid">
        <div class="tip-card card-box">
          <div class="tip-icon">⚠️</div>
          <h3 class="tip-title">False Friends (Falsos Amigos)</h3>
          <p class="tip-desc">
            <strong>Actually</strong> no significa "actualmente", sino <em>"en realidad"</em> o <em>"de hecho"</em>. Para decir "actualmente", usa <strong>Currently</strong> o <strong>Nowadays</strong>.
          </p>
        </div>

        <div class="tip-card card-box">
          <div class="tip-icon">🔄</div>
          <h3 class="tip-title">Make vs. Do</h3>
          <p class="tip-desc">
            Usa <strong>Make</strong> para crear o producir algo (<em>make coffee, make a decision</em>). Usa <strong>Do</strong> para acciones, tareas o rutinas (<em>do homework, do exercise</em>).
          </p>
        </div>

        <div class="tip-card card-box">
          <div class="tip-icon">🎧</div>
          <h3 class="tip-title">Técnica Shadowing</h3>
          <p class="tip-desc">
            Toca el botón de audio 🔊 en las flashcards y repite inmediatamente la frase en voz alta imitando el ritmo, acento y entonación.
          </p>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = `
    <div class="section-intro">
      <h1 class="section-title">Desafío Rápido de Inglés (Quick Quiz)</h1>
      <p class="section-description">
        Pon a prueba lo que has aprendido en vocabulario, verbos y gramática con este desafío interactivo.
      </p>
    </div>

    ${quizMainHtml}
    ${tipsHtml}
  `;

  // Asignar listeners del Quiz
  if (isCompleted) {
    document.getElementById('btn-restart-quiz')?.addEventListener('click', () => {
      startNewQuiz();
      renderQuiz();
    });
    document.getElementById('btn-go-vocab')?.addEventListener('click', () => {
      navigateToView('vocabulario');
    });
  } else {
    // Click en opción de respuesta
    container.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (isAnswered) return;
        const optIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
        selectedOptionIndex = optIdx;
        isAnswered = true;

        const currentQ = quizRoundQuestions[currentQuestionIndex];
        if (optIdx === currentQ.answer) {
          quizScore += 1;
        }

        renderQuiz();
      });
    });

    // Audio de la pregunta
    container.querySelector('.btn-quiz-speech')?.addEventListener('click', (e) => {
      const text = e.currentTarget.getAttribute('data-speech');
      if (text) speakText(text);
    });

    // Botón siguiente pregunta
    document.getElementById('btn-next-question')?.addEventListener('click', () => {
      currentQuestionIndex += 1;
      isAnswered = false;
      selectedOptionIndex = null;
      renderQuiz();
    });
  }
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
