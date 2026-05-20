/**
 * Puristine Impex — Internationalization
 * Loads locale JSON and applies translations via data-i18n attributes.
 */
const I18n = (function () {
  const STORAGE_KEY = 'puristine_lang';
  const DEFAULT_LANG = 'en';
  const SUPPORTED = ['en', 'es', 'ar'];
  const RTL_LANGS = ['ar'];

  let currentLang = DEFAULT_LANG;
  let translations = {};
  let basePath = '';

  function detectBasePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/')) return '../';
    return './';
  }

  function getNested(obj, key) {
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
  }

  async function loadLocale(lang) {
    const file = `${basePath}assets/locales/${lang}.json`;
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Locale ${lang} not found`);
    return res.json();
  }

  function applyRTL(lang) {
    const html = document.documentElement;
    if (RTL_LANGS.includes(lang)) {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', lang);
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', lang);
    }
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = getNested(translations, key);
      if (value === null || value === undefined) return;

      const attr = el.getAttribute('data-i18n-attr');
      if (attr) {
        el.setAttribute(attr, value);
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.getAttribute('placeholder') !== null || el.hasAttribute('data-i18n-placeholder')) {
          el.placeholder = value;
        } else {
          el.value = value;
        }
      } else {
        el.innerHTML = value;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      const value = getNested(translations, key);
      if (value) el.placeholder = value;
    });

    document.title = getNested(translations, 'meta.title') || document.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && getNested(translations, 'meta.description')) {
      metaDesc.setAttribute('content', getNested(translations, 'meta.description'));
    }

    updateLangSwitcherUI();
    document.dispatchEvent(new CustomEvent('i18n:ready', { detail: { lang: currentLang } }));

    document.querySelectorAll('[data-lang]').forEach((btn) => {
      if (!btn.dataset.i18nBound) {
        btn.dataset.i18nBound = '1';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          setLanguage(btn.getAttribute('data-lang'));
        });
      }
    });
  }

  function updateLangSwitcherUI() {
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      const lang = btn.getAttribute('data-lang');
      const active = lang === currentLang;
      btn.classList.toggle('lang-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  async function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    try {
      translations = await loadLocale(lang);
      currentLang = lang;
      localStorage.setItem(STORAGE_KEY, lang);
      applyRTL(lang);
      applyTranslations();
    } catch (e) {
      console.warn('i18n load failed, falling back to en', e);
      if (lang !== DEFAULT_LANG) await setLanguage(DEFAULT_LANG);
    }
  }

  function t(key) {
    return getNested(translations, key) || key;
  }

  async function init() {
    basePath = detectBasePath();
    const saved = localStorage.getItem(STORAGE_KEY);
    const browserLang = (navigator.language || 'en').slice(0, 2);
    const initial = saved && SUPPORTED.includes(saved)
      ? saved
      : SUPPORTED.includes(browserLang)
        ? browserLang
        : DEFAULT_LANG;
    await setLanguage(initial);

  }

  return {
    init,
    setLanguage,
    apply: applyTranslations,
    t,
    getLang: () => currentLang,
    getTranslations: () => translations
  };
})();
