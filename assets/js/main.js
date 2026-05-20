/**
 * Puristine Impex — Main Application Entry
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
});

/** Homepage dynamic content */
const HomePage = {
  init() {
    this.renderCategories();
    this.renderFeatured();
    document.addEventListener('i18n:ready', () => {
      this.renderCategories();
      this.renderFeatured();
    });
  },

  renderCategories() {
    const grid = document.getElementById('categories-grid');
    if (!grid || typeof PURISTINE_DATA === 'undefined') return;

    const t = (key) => I18n.t(key);
    const bp = Components.basePath();

    grid.innerHTML = PURISTINE_DATA.categories
      .map(
        (cat) => `
      <a href="${bp}pages/category-detail.html?category=${cat.slug}" class="group card-premium block bg-white rounded-2xl overflow-hidden border border-[#e4e8ee]/80 shadow-sm">
        <div class="relative aspect-[4/3] overflow-hidden">
          <img src="${PURISTINE_DATA.img(cat.image)}" alt="${t(`categories.${cat.id}.title`)}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width="400" height="300">
          <div class="absolute inset-0 bg-gradient-to-t from-[#071739]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div class="p-6 lg:p-8">
          <h3 class="font-heading font-semibold text-lg text-[#071739] mb-2 group-hover:text-[#D4A373] transition-colors" data-i18n="categories.${cat.id}.title"></h3>
          <p class="text-sm text-[#64748b] leading-relaxed mb-4 line-clamp-2" data-i18n="categories.${cat.id}.desc"></p>
          <span class="inline-flex items-center gap-2 text-sm font-medium text-[#D4A373]">
            <span data-i18n="common.explore"></span>
            <svg class="w-4 h-4 card-arrow rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </span>
        </div>
      </a>`
      )
      .join('');

    I18n.apply();
  },

  renderFeatured() {
    const grid = document.getElementById('featured-grid');
    if (!grid) return;

    const bp = Components.basePath();
    grid.innerHTML = PURISTINE_DATA.featuredProducts
      .map((p) => {
        const catLabel = I18n.t(`categories.${p.category}.title`);
        const name = I18n.t(`products.${p.id}.name`);
        const desc = I18n.t(`products.${p.id}.desc`);
        return `
        <article class="group card-premium bg-white rounded-2xl overflow-hidden border border-[#e4e8ee]/80">
          <div class="aspect-product overflow-hidden">
            <img src="${PURISTINE_DATA.img(p.image)}" alt="${name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy">
          </div>
          <div class="p-6">
            <span class="text-xs font-semibold uppercase tracking-wider text-[#D4A373] mb-2 block">${catLabel}</span>
            <h3 class="font-heading font-semibold text-[#071739] mb-2">${name}</h3>
            <p class="text-sm text-[#64748b] leading-relaxed">${desc}</p>
          </div>
        </article>`;
      })
      .join('');
  }
};

/** Categories listing page */
const CategoriesPage = {
  init() {
    const grid = document.getElementById('all-categories-grid');
    if (!grid) return;

    const bp = Components.basePath();
    const render = () => {
      grid.innerHTML = PURISTINE_DATA.categories
        .map(
          (cat) => `
        <a href="${bp}pages/category-detail.html?category=${cat.slug}" data-category="${cat.slug}" class="category-card group card-premium bg-white rounded-2xl overflow-hidden border border-[#e4e8ee]">
          <div class="aspect-[16/10] overflow-hidden relative">
            <img src="${PURISTINE_DATA.img(cat.image)}" alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy">
            <div class="absolute top-4 left-4 w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl">${cat.icon}</div>
          </div>
          <div class="p-6">
            <h2 class="font-heading text-xl font-semibold text-[#071739] mb-2" data-i18n="categories.${cat.id}.title"></h2>
            <p class="text-[#64748b] text-sm" data-i18n="categories.${cat.id}.desc"></p>
          </div>
        </a>`
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
            <h3 class="font-heading font-semibold text-[#071739] mb-2">${I18n.t(`products.${p.id}.name`)}</h3>
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
