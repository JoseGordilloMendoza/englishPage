/**
 * EnglishPage - Navigation Controller
 * Gestiona el enrutamiento SPA mediante el Hash (#inicio, #gramatica, etc.)
 * y el control del menú móvil desplegable (hamburguesa).
 */

const VALID_VIEWS = ['inicio', 'gramatica', 'vocabulario', 'verbos', 'quiz'];
const DEFAULT_VIEW = 'inicio';

let onViewChangeCallback = null;

export function initNavigation(onViewChange) {
  onViewChangeCallback = onViewChange;

  // 1. Asignar listeners directos a todos los enlaces de la barra de navegación estática
  const allStaticLinks = document.querySelectorAll('.nav-link, .bottom-nav-item, .brand, [data-nav-link]');
  allStaticLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetView = link.getAttribute('data-target') || link.getAttribute('href')?.replace('#', '');
      if (targetView && VALID_VIEWS.includes(targetView)) {
        e.preventDefault();
        navigateToView(targetView);
      }
    });
  });

  // 2. Delegación de eventos global como respaldo para enlaces o botones creados dinámicamente
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-nav-link], [data-target]');
    if (!link) return;

    // Si ya fue procesado o es un botón sin data-target, omitir
    if (link.tagName === 'BUTTON' && !link.hasAttribute('data-target')) return;

    const targetView = link.getAttribute('data-target') || link.getAttribute('href')?.replace('#', '');
    if (targetView && VALID_VIEWS.includes(targetView)) {
      e.preventDefault();
      navigateToView(targetView);
    }
  });

  // Escuchar cambios directos en el hash de la URL (botones adelante/atrás del navegador)
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (VALID_VIEWS.includes(hash)) {
      activateView(hash);
    } else {
      activateView(DEFAULT_VIEW);
    }
  });

  // Carga inicial según el hash actual de la URL o vista por defecto
  const initialHash = window.location.hash.replace('#', '');
  const initialView = VALID_VIEWS.includes(initialHash) ? initialHash : DEFAULT_VIEW;
  navigateToView(initialView, true);
}

/**
 * Cambia la vista activa de forma inmediata y sincroniza el hash de la URL.
 * @param {string} viewId 
 * @param {boolean} updateHash 
 */
export function navigateToView(viewId, updateHash = true) {
  if (!VALID_VIEWS.includes(viewId)) viewId = DEFAULT_VIEW;

  // Actualizar hash en la URL si difiere
  if (updateHash && window.location.hash !== `#${viewId}`) {
    window.location.hash = viewId;
  }

  // Activar la vista en el DOM de inmediato sin esperar eventos asíncronos
  activateView(viewId);
}

/**
 * Modifica las clases visuales de las secciones y de los enlaces activos.
 * @param {string} viewId 
 */
function activateView(viewId) {
  const sections = document.querySelectorAll('section.view');
  let found = false;

  sections.forEach(section => {
    if (section.id === viewId) {
      section.classList.add('active');
      found = true;
    } else {
      section.classList.remove('active');
    }
  });

  // Si no se encontró la sección (por ejemplo, si el DOM aún no estaba listo), no continuar
  if (!found) return;

  // Actualizar enlaces de navegación activos
  const allNavLinks = document.querySelectorAll('[data-nav-link]');
  allNavLinks.forEach(link => {
    const target = link.getAttribute('data-target') || link.getAttribute('href')?.replace('#', '');
    if (target === viewId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Subir suavemente al tope de la página
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Notificar al callback si existe (para refrescar contadores, etc.)
  if (typeof onViewChangeCallback === 'function') {
    onViewChangeCallback(viewId);
  }
}
