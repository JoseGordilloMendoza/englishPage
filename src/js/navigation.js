/**
 * EnglishPage - Navigation Controller
 * Gestiona el enrutamiento SPA mediante el Hash (#inicio, #gramatica, etc.)
 * y el control del menú móvil desplegable (hamburguesa).
 */

const VALID_VIEWS = ['inicio', 'gramatica', 'vocabulario', 'verbos', 'acerca-de'];
const DEFAULT_VIEW = 'inicio';

let onViewChangeCallback = null;

export function initNavigation(onViewChange) {
  onViewChangeCallback = onViewChange;

  const menuToggle = document.getElementById('menu-toggle');
  const navDrawer = document.getElementById('nav-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const navLinks = document.querySelectorAll('[data-nav-link]');

  // Alternar menú hamburguesa
  const toggleDrawer = (open) => {
    const isOpen = open !== undefined ? open : !navDrawer.classList.contains('open');
    navDrawer.classList.toggle('open', isOpen);
    drawerOverlay.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen.toString());
    menuToggle.classList.toggle('active', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => toggleDrawer());
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', () => toggleDrawer(false));
  }

  // Cerrar con tecla Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDrawer && navDrawer.classList.contains('open')) {
      toggleDrawer(false);
    }
  });

  // Event listener para links de navegación
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetView = link.getAttribute('data-target') || link.getAttribute('href')?.replace('#', '');
      if (targetView && VALID_VIEWS.includes(targetView)) {
        e.preventDefault();
        navigateToView(targetView);
        toggleDrawer(false);
      }
    });
  });

  // Escuchar cambios en el hash de la URL
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (VALID_VIEWS.includes(hash)) {
      activateView(hash);
    } else {
      navigateToView(DEFAULT_VIEW);
    }
  });

  // Carga inicial según el hash actual o default
  const initialHash = window.location.hash.replace('#', '');
  const initialView = VALID_VIEWS.includes(initialHash) ? initialHash : DEFAULT_VIEW;
  navigateToView(initialView, false);
}

/**
 * Cambia la vista activa y actualiza el hash de la URL.
 * @param {string} viewId 
 * @param {boolean} updateHash 
 */
export function navigateToView(viewId, updateHash = true) {
  if (!VALID_VIEWS.includes(viewId)) viewId = DEFAULT_VIEW;

  if (updateHash && window.location.hash !== `#${viewId}`) {
    window.location.hash = viewId;
  } else {
    activateView(viewId);
  }
}

/**
 * Modifica las clases visuales de las secciones y de los enlaces activos.
 * @param {string} viewId 
 */
function activateView(viewId) {
  const sections = document.querySelectorAll('section.view');
  sections.forEach(section => {
    if (section.id === viewId) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });

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
