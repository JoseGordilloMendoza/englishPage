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
  renderAbout 
} from './render.js';

document.addEventListener('DOMContentLoaded', () => {
  // Renderizado inicial de todas las vistas
  renderDashboard();
  renderGrammar();
  renderVocabulary();
  renderVerbs();
  renderAbout();

  // Inicializar enrutador SPA y control del menú móvil
  initNavigation((activeViewId) => {
    // Si el usuario regresa al inicio o a vocabulario, refrescar métricas o tarjetas si hubo cambios
    if (activeViewId === 'inicio') {
      renderDashboard();
    } else if (activeViewId === 'vocabulario') {
      renderVocabulary();
    }
  });

  console.log('✨ EnglishPage SPA inicializada correctamente.');
});
