/**
 * Resolve local image paths (works from root and /pages/)
 */
const IMG = (function () {
  const base = () => (window.location.pathname.includes('/pages/') ? '../' : './');

  function path(relativePath) {
    return `${base()}assets/images/${relativePath}`;
  }

  function initFallbacks() {
    document.addEventListener(
      'error',
      (e) => {
        const el = e.target;
        if (el.tagName !== 'IMG' || el.dataset.fallbackApplied) return;
        const fallback = path('categories/spices.svg');
        if (el.src && !el.src.endsWith('spices.svg')) {
          el.dataset.fallbackApplied = '1';
          el.src = fallback;
        }
      },
      true
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFallbacks);
  } else {
    initFallbacks();
  }

  return { path, base };
})();
