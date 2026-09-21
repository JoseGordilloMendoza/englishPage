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
  // 1. Inicializar navegación primero para que todos los clics de la barra funcionen siempre
  try {
    initNavigation((activeViewId) => {
      if (activeViewId === 'inicio') {
        renderDashboard();
      } else if (activeViewId === 'vocabulario') {
        renderVocabulary();
      } else if (activeViewId === 'quiz') {
        renderQuiz();
      }
    });
  } catch (navError) {
    console.error('Error inicializando navegación:', navError);
  }

  // 2. Renderizar cada vista de forma aislada para que un fallo en una no bloquee a las demás
  try { renderDashboard(); } catch (e) { console.error('Error en renderDashboard:', e); }
  try { renderGrammar(); } catch (e) { console.error('Error en renderGrammar:', e); }
  try { renderVocabulary(); } catch (e) { console.error('Error en renderVocabulary:', e); }
  try { renderVerbs(); } catch (e) { console.error('Error en renderVerbs:', e); }
  try { renderQuiz(); } catch (e) { console.error('Error en renderQuiz:', e); }

  console.log('✨ EnglishPage SPA inicializada correctamente.');
}

// Garantizar ejecución inmediata si el DOM ya está listo (evita bloqueos tras recargas de Vite)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
