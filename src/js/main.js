/**
 * EnglishPage - Main Application Entrypoint
 * Inicializa los módulos de navegación, renderizado y eventos globales.
 */

import { initNavigation } from './navigation.js';
import { 
  renderDashboard, 
  renderGrammar, 
  renderVocabulary, 
  renderVerbs, 
  renderQuiz 
} from './render.js';

function initApp() {
  try {
    // Renderizado inicial de todas las vistas
    renderDashboard();
    renderGrammar();
    renderVocabulary();
    renderVerbs();
    renderQuiz();

    // Inicializar enrutador SPA y control del menú móvil
    initNavigation((activeViewId) => {
      if (activeViewId === 'inicio') {
        renderDashboard();
      } else if (activeViewId === 'vocabulario') {
        renderVocabulary();
      } else if (activeViewId === 'quiz') {
        renderQuiz();
      }
    });

    console.log('✨ EnglishPage SPA inicializada correctamente.');
  } catch (error) {
    console.error('Error inicializando EnglishPage:', error);
  }
}

// Garantizar ejecución inmediata si el DOM ya está listo (evita bloqueos tras recargas de Vite)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
