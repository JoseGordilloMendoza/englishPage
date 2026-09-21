/**
 * EnglishPage - DOM Rendering Engine
 * Genera e inyecta dinámicamente el contenido de las vistas del sistema,
 * utilizando íconos vectoriales SVG limpios y consistentes en lugar de emojis.
 */

import { grammarRules, flashcardsVocab, verbList, quizQuestions } from './data.js';
import { speakText } from './speech.js';
import { isCardMastered, toggleCardMastered, getStudyStats } from './storage.js';
import { navigateToView } from './navigation.js';
import { icons } from './icons.js';

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
    <!-- Hero Banner con Ilustración 3D Amigable -->
    <div class="dashboard-hero">
      <div class="hero-content">
        <div class="hero-badge">${icons.sparkles()} Práctica diaria y repaso activo</div>
        <h1 class="hero-title">Domina el inglés paso a paso</h1>
        <p class="hero-subtitle">
          Repasa reglas gramaticales clave, practica con flashcards interactivas en 3D y consulta el catálogo de verbos irregulares.
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary" id="btn-start-vocab">
            <span>${icons.vocab()} Practicar Vocabulario</span>
          </button>
          <button class="btn btn-secondary" id="btn-start-quiz">
            <span>${icons.quiz()} Desafío de Práctica</span>
          </button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-img-frame">
          <img src="/images/hero-student.jpg" alt="Estudiante practicando inglés en la app" class="hero-img" loading="eager" />
          <div class="hero-floating-chip">
            ${icons.headphones()}
            <span>Audio nativo</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Estadísticas de Aprendizaje -->
    <div class="stats-grid">
      <div class="stat-card" data-target="vocabulario">
        <div class="stat-icon-wrapper bg-indigo">
          <span class="stat-icon">${icons.vocab()}</span>
        </div>
        <div class="stat-info">
          <span class="stat-value">${stats.totalVocab}</span>
          <span class="stat-label">Tarjetas de Vocabulario</span>
        </div>
        <div class="stat-badge">${stats.masteredCount} dominadas</div>
      </div>

      <div class="stat-card" data-target="verbos">
        <div class="stat-icon-wrapper bg-emerald">
          <span class="stat-icon">${icons.verbs()}</span>
        </div>
        <div class="stat-info">
          <span class="stat-value">${stats.totalVerbs}</span>
          <span class="stat-label">Verbos Irregulares</span>
        </div>
        <div class="stat-badge">${icons.volume()} Pronunciación</div>
      </div>

      <div class="stat-card" data-target="gramatica">
        <div class="stat-icon-wrapper bg-amber">
          <span class="stat-icon">${icons.grammar()}</span>
        </div>
        <div class="stat-info">
          <span class="stat-value">${stats.totalGrammar}</span>
          <span class="stat-label">Temas Estructurales</span>
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
        ${stats.masteredCount} de ${stats.totalVocab} tarjetas marcadas como dominadas. ¡Continúa con tu ritmo de estudio!
      </p>
    </div>

    <!-- Frase del Día -->
    <div class="daily-phrase card-box">
      <div class="daily-phrase-header">
        <span class="badge-tag">${icons.lightbulb()} Expresión de hoy</span>
        <button class="btn-icon" id="btn-daily-audio" aria-label="Escuchar pronunciación" title="Escuchar pronunciación">
          ${icons.volume()}
        </button>
      </div>
      <h3 class="daily-phrase-en">${randomCard.en}</h3>
      <p class="daily-phrase-phonetic">${randomCard.phonetic}</p>
      <p class="daily-phrase-es">"${randomCard.es}"</p>
      <div class="daily-phrase-example">
        <span class="example-label">Ejemplo en contexto:</span>
        <span class="example-text">"${randomCard.example}"</span>
      </div>
    </div>
  `;

  // Listeners de botones dentro del dashboard
  document.getElementById('btn-start-vocab')?.addEventListener('click', () => navigateToView('vocabulario'));
  document.getElementById('btn-start-quiz')?.addEventListener('click', () => navigateToView('quiz'));
  document.getElementById('btn-daily-audio')?.addEventListener('click', (e) => speakText(randomCard.en, 'en-US', e.currentTarget));

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
        <div class="grammar-number">${String(index + 1).padStart(2, '0')}</div>
        <div class="grammar-title-group">
          <span class="level-badge">${item.level}</span>
          <h2 class="grammar-topic">${item.topic}</h2>
        </div>
      </div>

      <div class="grammar-body">
        <div class="grammar-rule-block">
          <span class="rule-icon">${icons.bookmark()}</span>
          <p class="grammar-rule-text">${item.rule}</p>
        </div>

        <div class="grammar-formula-box">
          <span class="formula-label">Estructura:</span>
          <code>${item.formula}</code>
        </div>

        <div class="grammar-example-box">
          <div class="example-header">
            <span class="example-tag">Ejemplo de uso</span>
            <button class="btn-icon btn-sm btn-grammar-audio" data-speech="${item.example.split('(')[0].trim()}" aria-label="Escuchar ejemplo" title="Escuchar ejemplo">
              ${icons.volume()}
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
        Repasa las estructuras más importantes y comunes del inglés en niveles intermedios y avanzados.
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
      if (text) speakText(text, 'en-US', btn);
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
                    <button class="btn-icon btn-card-audio" data-speech="${card.en}" aria-label="Escuchar pronunciación" title="Escuchar pronunciación">
                      ${icons.volume()}
                    </button>
                    <button class="btn-icon btn-card-master ${mastered ? 'active' : ''}" data-card-id="${card.id}" aria-label="Marcar como aprendida" title="Marcar como aprendida">
                      ${icons.star('', mastered)}
                    </button>
                  </div>
                </div>

                <div class="card-center">
                  <div class="concept-badge-wrapper theme-${card.theme || 'indigo'}">
                    ${(icons[card.icon] || icons.vocab)('concept-icon')}
                  </div>
                  <h2 class="card-word">${card.en}</h2>
                  <span class="card-phonetic">${card.phonetic}</span>
                </div>

                <div class="card-bottom">
                  <span class="flip-hint">${icons.flip()} Toca para ver traducción</span>
                </div>
              </div>

              <!-- Back Face (Español y Ejemplo) -->
              <div class="flashcard-face flashcard-back">
                <div class="card-top-bar">
                  <span class="meaning-pill">Traducción</span>
                  <button class="btn-icon btn-card-audio" data-speech="${card.example}" aria-label="Escuchar ejemplo en inglés" title="Escuchar ejemplo">
                    ${icons.volume()}
                  </button>
                </div>

                <div class="card-center">
                  <h3 class="card-meaning">${card.es}</h3>
                  <div class="card-example-box">
                    <span class="example-quote">"${card.example}"</span>
                  </div>
                </div>

                <div class="card-bottom">
                  <span class="flip-hint">${icons.flip()} Toca para volver</span>
                </div>
              </div>

            </div>
          </div>
        `;
      }).join('')
    : `
      <div class="empty-state">
        <span class="empty-icon">${icons.vocab()}</span>
        <p class="empty-text">No hay tarjetas en esta categoría.</p>
      </div>
    `;

  container.innerHTML = `
    <div class="section-intro">
      <h1 class="section-title">Vocabulario y Expresiones Comunes</h1>
      <p class="section-description">
        Toca cualquier tarjeta para girarla y descubrir su traducción y ejemplo contextual. Escucha la pronunciación nativa o guárdala como aprendida.
      </p>

      <!-- Barra de Filtros -->
      <div class="filter-pills" role="tablist">
        <button class="filter-pill ${currentVocabFilter === 'all' ? 'active' : ''}" data-filter="all">
          Todas (${flashcardsVocab.length})
        </button>
        <button class="filter-pill ${currentVocabFilter === 'pending' ? 'active' : ''}" data-filter="pending">
          Por repasar
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
      if (text) speakText(text, 'en-US', btn);
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
              <div class="verb-arrow">${icons.arrowRight()}</div>
              <div class="verb-form-item">
                <span class="verb-col-label">Past Simple</span>
                <span class="verb-word-past">${v.past}</span>
              </div>
              <div class="verb-arrow">${icons.arrowRight()}</div>
              <div class="verb-form-item">
                <span class="verb-col-label">Past Participle</span>
                <span class="verb-word-part">${v.part}</span>
              </div>
            </div>

            <div class="verb-actions">
              <button class="btn-icon btn-verb-audio" data-speech="${v.inf}, ${v.past}, ${v.part}" aria-label="Escuchar pronunciación de ${v.inf}" title="Escuchar pronunciación">
                ${icons.volume()}
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
        <span class="empty-icon">${icons.search()}</span>
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
        <span class="search-icon">${icons.search()}</span>
        <input 
          type="search" 
          id="verb-search-input" 
          class="search-input" 
          placeholder="Buscar verbo por infinitivo, pasado o significado (ej. drive, broke, comer)..." 
          value="${escapeHtml(currentVerbSearch)}"
          aria-label="Buscar verbo irregular"
        />
        ${currentVerbSearch ? `<button class="btn-clear-search" id="btn-clear-search" aria-label="Limpiar búsqueda" title="Limpiar">${icons.close()}</button>` : ''}
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
      if (text) speakText(text, 'en-US', btn);
    });
  });
}

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
      feedback = '¡Excelente desempeño! Tienes un dominio impecable del vocabulario y las estructuras repasadas.';
    } else if (percentage >= 70) {
      feedback = '¡Muy buen trabajo! Tienes bases muy sólidas. ¡Continúa practicando para perfeccionar los detalles!';
    } else {
      feedback = '¡Buen esfuerzo! Te recomendamos repasar las flashcards y el catálogo de verbos para reforzar tu memoria activa.';
      badgeClass = 'bg-amber';
    }

    quizMainHtml = `
      <div class="quiz-result-card card-box">
        <div class="result-illustration-wrapper">
          <img src="/images/quiz-trophy.jpg" alt="Logro y trofeo de celebración" class="result-celebration-img" />
        </div>
        <h2 class="result-title">¡Desafío Completado!</h2>
        <div class="result-score-badge ${badgeClass}">
          <span class="score-number">${quizScore} / ${total}</span>
          <span class="score-percent">(${percentage}% de respuestas correctas)</span>
        </div>
        <p class="result-feedback">${feedback}</p>

        <div class="result-actions">
          <button class="btn btn-primary" id="btn-restart-quiz">
            <span>${icons.refresh()} Intentar Otra Ronda</span>
          </button>
          <button class="btn btn-secondary" id="btn-go-vocab">
            <span>${icons.vocab()} Repasar Vocabulario</span>
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
          ${isAnswered && idx === q.answer ? `<span class="option-status-icon">${icons.check()}</span>` : ''}
          ${isAnswered && idx === selectedOptionIndex && idx !== q.answer ? `<span class="option-status-icon">${icons.close()}</span>` : ''}
        </button>
      `;
    }).join('');

    const explanationHtml = isAnswered ? `
      <div class="quiz-explanation-box">
        <div class="explanation-header">
          <span class="explanation-icon">
            ${selectedOptionIndex === q.answer ? icons.check() + ' Respuesta Correcta' : icons.lightbulb() + ' Explicación de la respuesta'}
          </span>
        </div>
        <p class="explanation-text">${escapeHtml(q.explanation)}</p>
        <button class="btn btn-primary btn-next-question" id="btn-next-question">
          <span>${questionNumber < totalQuestions ? 'Siguiente Pregunta ' + icons.arrowRight() : 'Ver Resultados ' + icons.trophy()}</span>
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
          <button class="btn-icon btn-sm btn-quiz-speech" data-speech="${q.question}" aria-label="Escuchar pregunta" title="Escuchar pregunta">
            ${icons.volume()}
          </button>
        </div>

        <div class="quiz-options-list">
          ${optionsHtml}
        </div>

        ${explanationHtml}
      </div>
    `;
  }

  // Consejos prácticos de estudio
  const tipsHtml = `
    <div class="tips-section">
      <div class="section-intro" style="margin-top: 36px; margin-bottom: 16px;">
        <h2 class="section-title" style="font-size: 1.3rem;">Consejos de Estudio y Errores Frecuentes</h2>
        <p class="section-description">
          Acelera tu progreso evitando los tropiezos más habituales en la comunicación en inglés.
        </p>
      </div>

      <div class="tips-grid">
        <div class="tip-card card-box">
          <div class="tip-icon" style="color: #ef4444;">${icons.alertCircle()}</div>
          <h3 class="tip-title">Falsos Amigos (False Friends)</h3>
          <p class="tip-desc">
            <strong>Actually</strong> no significa "actualmente", sino <em>"en realidad"</em> o <em>"de hecho"</em>. Para referirte al presente, utiliza <strong>Currently</strong> o <strong>Nowadays</strong>.
          </p>
        </div>

        <div class="tip-card card-box">
          <div class="tip-icon" style="color: var(--color-primary);">${icons.refresh()}</div>
          <h3 class="tip-title">Diferencia entre Make y Do</h3>
          <p class="tip-desc">
            Usa <strong>Make</strong> al crear, construir o tomar decisiones (<em>make coffee, make a decision</em>). Usa <strong>Do</strong> para acciones generales y tareas (<em>do homework, do exercise</em>).
          </p>
        </div>

        <div class="tip-card card-box">
          <div class="tip-icon" style="color: #059669;">${icons.headphones()}</div>
          <h3 class="tip-title">Técnica de Shadowing</h3>
          <p class="tip-desc">
            Pulsa el ícono de audio en las flashcards y repite en voz alta imitando la entonación y cadencia natural para entrenar tu fluidez auditiva y muscular.
          </p>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = `
    <div class="section-intro">
      <h1 class="section-title">Desafío de Práctica Interactiva</h1>
      <p class="section-description">
        Pon a prueba tu retención en vocabulario, verbos y gramática con preguntas rápidas y explicaciones claras.
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
      const btn = e.currentTarget;
      const text = btn.getAttribute('data-speech');
      if (text) speakText(text, 'en-US', btn);
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
