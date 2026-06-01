/**
 * Puristine Impex LLP — Main Application Entry
 */
document.addEventListener('DOMContentLoaded', async () => {
  const page = document.body.dataset.page || 'home';
  const pageFile = window.location.pathname.split('/').pop() || 'index.html';

  Components.init({
    page: pageFile.replace('.html', '')
  });

  await I18n.init();
  Animations.init();

  if (page === 'home' || pageFile === 'index.html' || pageFile === '') {
    HomePage.init();
  }
  if (page === 'categories') {
    CategoriesPage.init();
  }
  if (page === 'category-detail') {
    CategoryDetailPage.init();
  }
  if (page === 'contact') {
    ContactPage.init();
  }
  if (page === 'eco-friendly' || page === 'laundry-sheets' || page === 'floor-sheets') {
    EcoFriendlyPage.init();
  }
});

/** Eco-Friendly Products page */
const EcoFriendlyPage = {
  titleKeys: {
    'eco-friendly': 'pages.ecoFriendly.title',
    'laundry-sheets': 'pages.laundrySheets.title',
    'floor-sheets': 'pages.floorSheets.title'
  },

  init() {
    this.applyPageTitle();
    this.highlightBrand();
    document.addEventListener('i18n:ready', () => {
      this.applyPageTitle();
      this.highlightBrand();
    });
  },

  applyPageTitle() {
    const page = document.body.dataset.page;
    const key = this.titleKeys[page];
    if (!key || typeof I18n === 'undefined') return;
    const title = I18n.t(key);
    if (title && title !== key) {
      document.title = `${title} | Faire Wash | Puristine Impex LLP`;
    }
  },

  highlightBrand() {
    const brand = 'Faire Wash';
    document.querySelectorAll('.eco-page [data-i18n]').forEach((el) => {
      const onDark = Boolean(el.closest('.eco-hero-band, .product-hero-bar'));
      const html = el.innerHTML;
      if (!html.includes(brand)) return;

      if (html.includes('eco-brand')) {
        if (onDark) {
          el.querySelectorAll('.eco-brand').forEach((span) => span.classList.add('eco-brand-on-dark'));
        }
        return;
      }

      const cls = onDark ? 'eco-brand eco-brand-on-dark' : 'eco-brand';
      el.innerHTML = html.replaceAll(brand, `<span class="${cls}">${brand}</span>`);
    });
  }
};

/** Homepage dynamic content */
const HomePage = {
  testimonialCarousel: null,

  init() {
    this.renderCategories();
    this.renderTestimonialVideos();
    this.initTestimonialsCarousel();
    document.addEventListener('i18n:ready', () => this.renderCategories());
  },

  initTestimonialsCarousel() {
    const root = document.querySelector('[data-testimonials-carousel]');
    if (!root || root.dataset.carouselReady === 'true') return;

    const viewport = root.querySelector('[data-carousel-viewport]');
    const track = root.querySelector('[data-carousel-track]');
    const prevBtn = root.querySelector('[data-carousel-prev]');
    const nextBtn = root.querySelector('[data-carousel-next]');
    const originals = [...track.querySelectorAll('.testimonials-carousel__slide')];
    if (!originals.length) return;

    const realCount = originals.length;
    const infinite = realCount > 1;

    const markClone = (node) => {
      node.classList.add('is-clone');
      node.setAttribute('aria-hidden', 'true');
      node.removeAttribute('data-i18n');
      node.querySelectorAll('[data-i18n]').forEach((el) => el.removeAttribute('data-i18n'));
    };

    if (infinite) {
      const before = document.createDocumentFragment();
      const after = document.createDocumentFragment();
      [...originals].reverse().forEach((slide) => {
        const clone = slide.cloneNode(true);
        markClone(clone);
        before.appendChild(clone);
      });
      originals.forEach((slide) => {
        const clone = slide.cloneNode(true);
        markClone(clone);
        after.appendChild(clone);
      });
      track.insertBefore(before, originals[0]);
      track.appendChild(after);
    }

    const slides = [...track.querySelectorAll('.testimonials-carousel__slide')];
    const baseSlideIndex = infinite ? realCount : 0;
    let stepIndex = 0;
    let autoplayId = null;
    let isAnimating = false;
    const autoplayMs = 5000;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getGap = () => {
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap);
      return Number.isFinite(gap) ? gap : 0;
    };

    const getSlidesVisible = () => (window.innerWidth >= 768 ? 3 : 1);

    const getSlideWidth = () => {
      const gap = getGap();
      const visible = getSlidesVisible();
      return (viewport.clientWidth - (visible - 1) * gap) / visible;
    };

    const getStep = () => getSlideWidth() + getGap();

    const syncSlideMetrics = () => {
      viewport.style.setProperty('--slide-width', `${getSlideWidth()}px`);
    };

    const setBtnLabels = () => {
      if (typeof I18n === 'undefined') return;
      prevBtn?.setAttribute('aria-label', I18n.t('testimonials.prev'));
      nextBtn?.setAttribute('aria-label', I18n.t('testimonials.next'));
    };

    const scrollToStep = (step, animate = true) => {
      stepIndex = step;
      const offset = (baseSlideIndex + stepIndex) * getStep();
      const useTransition = animate && !reducedMotion;
      track.style.transition = useTransition ? 'transform 0.55s var(--transition-smooth)' : 'none';
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      isAnimating = useTransition;
    };

    const normalizeInfinite = () => {
      if (!infinite) return;
      if (stepIndex >= realCount) scrollToStep(0, false);
      else if (stepIndex < 0) scrollToStep(realCount - 1, false);
      isAnimating = false;
    };

    const next = () => {
      if (isAnimating) return;
      scrollToStep(stepIndex + 1);
    };

    const prev = () => {
      if (isAnimating) return;
      scrollToStep(stepIndex - 1);
    };

    const stopAutoplay = () => {
      if (autoplayId) {
        clearInterval(autoplayId);
        autoplayId = null;
      }
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (reducedMotion || realCount < 2) return;
      autoplayId = window.setInterval(next, autoplayMs);
    };

    const onResize = () => {
      syncSlideMetrics();
      if (infinite && (stepIndex >= realCount || stepIndex < 0)) {
        normalizeInfinite();
      }
      scrollToStep(stepIndex, false);
    };

    track.addEventListener('transitionend', (e) => {
      if (e.target !== track || e.propertyName !== 'transform') return;
      normalizeInfinite();
      isAnimating = false;
    });

    prevBtn?.addEventListener('click', () => {
      prev();
      startAutoplay();
    });
    nextBtn?.addEventListener('click', () => {
      next();
      startAutoplay();
    });

    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', startAutoplay);
    root.addEventListener('focusin', stopAutoplay);
    root.addEventListener('focusout', (e) => {
      if (!root.contains(e.relatedTarget)) startAutoplay();
    });

    viewport?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
        startAutoplay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
        startAutoplay();
      }
    });

    const syncCloneContent = () => {
      if (!infinite) return;
      for (let i = 0; i < realCount; i += 1) {
        slides[i].innerHTML = originals[realCount - 1 - i].innerHTML;
        slides[baseSlideIndex + realCount + i].innerHTML = originals[i].innerHTML;
      }
    };

    setBtnLabels();
    document.addEventListener('i18n:ready', () => {
      setBtnLabels();
      syncCloneContent();
    });

    window.addEventListener('resize', onResize);
    syncSlideMetrics();
    scrollToStep(0, false);
    startAutoplay();
    root.dataset.carouselReady = 'true';
    this.testimonialCarousel = { stopAutoplay };
  },

  renderTestimonialVideos() {
    const videos = PURISTINE_DATA?.testimonialVideos;
    if (!videos?.length) return;

    document.querySelectorAll('[data-testimonial-video]').forEach((card) => {
      const index = Number(card.getAttribute('data-testimonial-video'));
      const item = videos[index];
      if (!item?.url) return;

      const media = card.querySelector('.testimonial-video-media');
      if (!media) return;

      media.classList.add('has-video');
      const placeholder = media.querySelector('.testimonial-video-placeholder');
      if (placeholder) placeholder.remove();

      let el;
      if (item.type === 'file' || /\.(mp4|webm|ogg)(\?|$)/i.test(item.url)) {
        el = document.createElement('video');
        el.src = item.url;
        el.controls = true;
        el.playsInline = true;
        if (item.poster) el.poster = item.poster;
      } else {
        el = document.createElement('iframe');
        el.src = item.url;
        el.title = 'Video testimonial';
        el.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        el.allowFullscreen = true;
        el.loading = 'lazy';
      }

      media.appendChild(el);
    });
  },

  renderCategories() {
    const grid = document.getElementById('categories-grid');
    if (!grid || typeof PURISTINE_DATA === 'undefined') return;

    const t = (key) => I18n.t(key);
    const bp = Components.basePath();
    const ids = PURISTINE_DATA.homepageCategories || [];
    const categories = ids
      .map((id) => PURISTINE_DATA.categories.find((c) => c.id === id))
      .filter(Boolean);

    grid.innerHTML = categories
      .map(
        (cat) => `
      <a href="${bp}pages/categories.html" class="categories-home-card group card-premium block bg-white rounded-2xl overflow-hidden border border-[#e4e8ee]/80 shadow-sm h-full text-inherit no-underline transition-all duration-500 hover:border-gold/40 hover:shadow-lg" aria-label="${t(`categories.${cat.id}.title`)}">
        <div class="relative aspect-[5/3] lg:aspect-[3/2] overflow-hidden">
          <img src="${PURISTINE_DATA.img(cat.image)}" alt="" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width="400" height="300">
        </div>
        <div class="p-4 lg:p-5">
          <h3 class="font-heading font-semibold text-base lg:text-lg text-navy mb-1.5 group-hover:text-gold transition-colors duration-300" data-i18n="categories.${cat.id}.title"></h3>
          <p class="categories-home-desc text-xs sm:text-sm text-gray-600 leading-relaxed" data-i18n="categoriesPreview.${cat.id}"></p>
        </div>
      </a>`
      )
      .join('');

    I18n.apply();
  }
};

/** Categories listing page */
const CategoriesPage = {
  init() {
    const grid = document.getElementById('all-categories-grid');
    if (!grid) return;

    const render = () => {
      grid.innerHTML = PURISTINE_DATA.categories
        .map(
          (cat) => `
        <article data-category="${cat.slug}" class="category-card card-premium bg-white rounded-2xl overflow-hidden border border-[#e4e8ee] text-center">
          <div class="aspect-[4/3] overflow-hidden">
            <img src="${PURISTINE_DATA.img(cat.image)}" alt="${I18n.t(`categories.${cat.id}.title`)}" class="w-full h-full object-cover" loading="lazy">
          </div>
          <div class="p-5">
            <h2 class="font-heading text-lg font-semibold text-navy" data-i18n="categories.${cat.id}.title"></h2>
          </div>
        </article>`
        )
        .join('');

      I18n.apply();
      document.querySelectorAll('#all-categories-grid [data-i18n]').forEach((el) => {
        el.textContent = I18n.t(el.getAttribute('data-i18n'));
      });
    };

    render();
    document.addEventListener('i18n:ready', render);

    const search = document.getElementById('category-search');
    if (search) {
      search.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('.category-card').forEach((card) => {
          const slug = card.dataset.category;
          const title = I18n.t(`categories.${slug.replace(/-/g, '-')}.title`).toLowerCase();
          const id = slug.replace(/-/g, '-');
          const titleKey = PURISTINE_DATA.categories.find((c) => c.slug === slug);
          const text = titleKey ? I18n.t(`categories.${titleKey.id}.title`).toLowerCase() : '';
          card.style.display = text.includes(q) || slug.includes(q) ? '' : 'none';
        });
      });
    }
  }
};

/** Category detail page */
const CategoryDetailPage = {
  init() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('category') || 'spices';
    const cat = PURISTINE_DATA.categories.find((c) => c.slug === slug) || PURISTINE_DATA.categories[0];

    ['category-title', 'category-heading'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('data-i18n', `categories.${cat.id}.title`);
    });
    document.getElementById('category-desc')?.setAttribute('data-i18n', `categories.${cat.id}.longDesc`);
    const heroImg = document.getElementById('category-hero-img');
    if (heroImg) {
      heroImg.src = PURISTINE_DATA.img(cat.image);
      heroImg.alt = I18n.t(`categories.${cat.id}.title`);
    }

    let products = PURISTINE_DATA.categoryProducts[cat.id];
    if (!products || !products.length) {
      products = [
        { id: 'turmeric', image: cat.id === 'spices' ? 'products/turmeric.svg' : cat.image },
        { id: 'cumin', image: cat.image },
        { id: 'coriander', image: cat.image },
        { id: 'garam-masala', image: cat.image }
      ];
    }
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    const renderProducts = () => {
      grid.innerHTML = products
        .map(
          (p) => `
        <article class="group card-premium bg-white rounded-2xl overflow-hidden border border-[#e4e8ee]">
          <div class="aspect-product overflow-hidden">
            <img src="${PURISTINE_DATA.img(p.image)}" alt="${I18n.t(`products.${p.id}.name`)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
          </div>
          <div class="p-6">
            <h3 class="font-heading font-semibold text-[#44749E] mb-2">${I18n.t(`products.${p.id}.name`)}</h3>
            <p class="text-sm text-[#64748b]">${I18n.t(`products.${p.id}.desc`)}</p>
          </div>
        </article>`
        )
        .join('');
    };

    renderProducts();
    document.addEventListener('i18n:ready', () => {
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const v = I18n.t(el.getAttribute('data-i18n'));
        if (v) el.textContent = v;
      });
      renderProducts();
    });
  }
};

/** Contact form */
const ContactPage = {
  init() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = I18n.t('contact.sending');
      setTimeout(() => {
        btn.innerHTML = I18n.t('contact.sent');
        form.reset();
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = orig;
        }, 3000);
      }, 1200);
    });
  }
};
