/**
 * Puristine Impex — SEO, social preview, favicons, PWA meta
 */
const SeoMeta = (function () {
  const SITE_NAME = 'Puristine Impex LLP';
  const THEME_COLOR = '#44749E';
  const TILE_COLOR = '#44749E';
  const DEFAULT_SITE_URL = 'https://puristine-impex.vercel.app';

  const PAGE_META = {
    'index.html': {
      title: 'Puristine Impex LLP | Premium Global Import Export',
      description:
        'Puristine Impex LLP — trusted international supplier of premium food products, spices, pulses, and innovative Faire Wash home-care solutions.',
      path: '',
      ogType: 'website'
    },
    'categories.html': {
      title: 'Product Categories | Puristine Impex LLP',
      description: 'Explore our full range of export categories — spices, pulses, flours, sauces, and more.',
      path: 'pages/categories.html'
    },
    'category-detail.html': {
      title: 'Product Category | Puristine Impex LLP',
      description: 'Browse premium export products in this category from Puristine Impex LLP.',
      path: 'pages/category-detail.html'
    },
    'about.html': {
      title: 'About Us | Puristine Impex LLP',
      description: 'Learn about Puristine Impex LLP — heritage, mission, and global trade expertise.',
      path: 'pages/about.html'
    },
    'contact.html': {
      title: 'Contact Us | Puristine Impex LLP',
      description: 'Contact Puristine Impex LLP for export inquiries, partnerships, and product information.',
      path: 'pages/contact.html'
    },
    'eco-friendly-products.html': {
      title: 'Eco-Friendly Products | Faire Wash | Puristine Impex LLP',
      description:
        'Faire Wash eco-friendly cleaning products — laundry and floor detergent sheets. Sustainable home care by Puristine Impex LLP.',
      path: 'pages/eco-friendly-products.html'
    },
    'laundry-detergent-sheets.html': {
      title: 'Laundry Detergent Sheets | Faire Wash | Puristine Impex LLP',
      description:
        'Faire Wash Laundry Detergent Sheets — ultra-concentrated, eco-friendly, plastic-free laundry cleaning.',
      path: 'pages/laundry-detergent-sheets.html'
    },
    'floor-cleaning-sheets.html': {
      title: 'Floor Cleaning Sheets | Faire Wash | Puristine Impex LLP',
      description:
        'Faire Wash Floor Cleaning Sheets — eco-friendly, non-toxic floor cleaning for all surfaces.',
      path: 'pages/floor-cleaning-sheets.html'
    },
    'privacy.html': {
      title: 'Privacy Policy | Puristine Impex LLP',
      description: 'Privacy policy for Puristine Impex LLP website and business inquiries.',
      path: 'pages/privacy.html'
    },
    'terms.html': {
      title: 'Terms & Conditions | Puristine Impex LLP',
      description: 'Terms and conditions governing use of the Puristine Impex LLP website.',
      path: 'pages/terms.html'
    }
  };

  function basePath() {
    return window.location.pathname.includes('/pages/') ? '../' : './';
  }

  function siteUrl() {
    const configured = document.querySelector('meta[name="site:url"]')?.getAttribute('content');
    if (configured) return configured.replace(/\/$/, '');
    if (window.location.origin && window.location.protocol.startsWith('http')) {
      return window.location.origin.replace(/\/$/, '');
    }
    return DEFAULT_SITE_URL;
  }

  function pageFile() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  function rel(path) {
    return `${basePath()}${path.replace(/^\//, '')}`;
  }

  function absUrl(path) {
    const p = path.replace(/^\//, '');
    return `${siteUrl()}/${p}`;
  }

  function upsertMeta(attrName, attrValue, content) {
    if (content === undefined || content === null) return;
    let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function upsertLink(rel, href, extra = {}) {
    let el = document.head.querySelector(`link[rel="${rel}"]${extra.sizes ? `[sizes="${extra.sizes}"]` : ''}`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
    if (extra.sizes) el.setAttribute('sizes', extra.sizes);
    if (extra.type) el.setAttribute('type', extra.type);
    if (extra.color) el.setAttribute('color', extra.color);
  }

  function injectIcons() {
    const bp = basePath();
    upsertLink('icon', `${bp}assets/icons/favicon.ico`, { type: 'image/x-icon' });
    upsertLink('icon', `${bp}assets/icons/favicon-32x32.png`, { sizes: '32x32', type: 'image/png' });
    upsertLink('icon', `${bp}assets/icons/favicon-16x16.png`, { sizes: '16x16', type: 'image/png' });
    upsertLink('apple-touch-icon', `${bp}assets/icons/apple-touch-icon.png`, { sizes: '180x180' });
    upsertLink('manifest', `${bp}site.webmanifest`);
    const mask = document.createElement('link');
    mask.setAttribute('rel', 'mask-icon');
    mask.setAttribute('href', `${bp}assets/icons/safari-pinned-tab.svg`);
    mask.setAttribute('color', THEME_COLOR);
    document.head.appendChild(mask);
  }

  function apply(config) {
    if (!config) return;

    const title = config.title || SITE_NAME;
    const description = config.description || '';
    const canonical = config.canonical || absUrl(config.path ?? '');
    const ogImage = config.ogImage || absUrl('assets/images/og-image.jpg');
    const ogType = config.ogType || 'website';

    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'author', SITE_NAME);
    upsertMeta('name', 'robots', 'index, follow');
    upsertMeta('name', 'theme-color', THEME_COLOR);
    upsertMeta('name', 'msapplication-TileColor', TILE_COLOR);
    upsertMeta('name', 'msapplication-config', rel('browserconfig.xml'));
    upsertMeta('name', 'application-name', SITE_NAME);
    upsertMeta('name', 'apple-mobile-web-app-title', 'Puristine');
    upsertMeta('name', 'apple-mobile-web-app-capable', 'yes');
    upsertMeta('name', 'apple-mobile-web-app-status-bar-style', 'default');
    upsertMeta('name', 'format-detection', 'telephone=no');
    upsertMeta('name', 'mobile-web-app-capable', 'yes');

    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:image:alt', `${SITE_NAME} — global import export and Faire Wash eco-friendly products`);
    upsertMeta('property', 'og:locale', 'en_IN');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);
    upsertMeta('name', 'twitter:image:alt', `${SITE_NAME} — global import export and Faire Wash eco-friendly products`);

    let canonicalEl = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonical);
  }

  function applyFromI18n() {
    if (typeof I18n === 'undefined') return;
    const file = pageFile();
    const base = PAGE_META[file] || PAGE_META['index.html'];
    const lang = I18n.getLang?.() || 'en';
    const localeMap = { en: 'en_IN', es: 'es_ES', ar: 'ar_SA' };

    let title = I18n.t('meta.title');
    let description = I18n.t('meta.description');

    const pageKey = document.body?.dataset?.metaPage;
    if (pageKey) {
      const pt = I18n.t(`${pageKey}.title`);
      const pd =
        I18n.t(`${pageKey}.subtitle`) ||
        I18n.t(`${pageKey}.intro`) ||
        I18n.t(`${pageKey}.metaDescription`) ||
        I18n.t(`${pageKey}.description`);
      if (pt && !pt.startsWith(pageKey)) title = `${pt} | ${SITE_NAME}`;
      if (pd && !pd.startsWith(pageKey)) description = pd;
    }

    if (title === 'meta.title') title = base.title;
    if (description === 'meta.description') description = base.description;

    apply({
      ...base,
      title,
      description
    });

    upsertMeta('property', 'og:locale', localeMap[lang] || 'en_IN');
  }

  function init() {
    injectIcons();
    apply(PAGE_META[pageFile()] || PAGE_META['index.html']);
    document.addEventListener('i18n:ready', applyFromI18n);
  }

  if (document.head) init();
  else document.addEventListener('DOMContentLoaded', init);

  return { init, apply, applyFromI18n };
})();
