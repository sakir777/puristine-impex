/**
 * Puristine Impex — Reusable UI Components (Navbar, Footer)
 */
const Components = (function () {
  function basePath() {
    return window.location.pathname.includes('/pages/') ? '../' : './';
  }

  function navLink(href, key, page) {
    const bp = basePath();
    const fullHref = bp + href;
    const isActive = page && window.location.pathname.includes(page);
    return `<a href="${fullHref}" class="nav-link text-sm font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-[#D4A373]' : 'text-[#071739]/80 hover:text-[#D4A373]'}" data-i18n="nav.${key}"></a>`;
  }

  function renderNavbar(options = {}) {
    const { page = '' } = options;
    const bp = basePath();

    return `
    <header id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500" role="banner">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div class="flex items-center justify-between h-20 lg:h-24">
          <a href="${bp}index.html" class="flex items-center gap-3 group" aria-label="Puristine Impex Home">
            <div class="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[#071739] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-500">
              <span class="text-[#D4A373] font-heading font-bold text-lg lg:text-xl">P</span>
            </div>
            <div class="hidden sm:block">
              <span class="font-heading font-bold text-[#071739] text-lg tracking-tight block leading-tight">Puristine</span>
              <span class="text-[10px] uppercase tracking-[0.2em] text-[#D4A373] font-medium">Impex LLP</span>
            </div>
          </a>

          <div class="hidden lg:flex items-center gap-10">
            ${navLink('index.html', 'home', 'index')}
            ${navLink('pages/categories.html', 'categories', 'categories')}
            ${navLink('pages/about.html', 'about', 'about')}
            ${navLink('pages/contact.html', 'contact', 'contact')}
          </div>

          <div class="flex items-center gap-3 sm:gap-4">
            <div class="hidden sm:flex items-center gap-1 p-1 rounded-full bg-[#f1f3f6] border border-[#e4e8ee]" role="group" aria-label="Language selector">
              <button type="button" data-lang="en" class="lang-btn px-2.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 text-[#64748b] hover:text-[#071739]" aria-pressed="false">EN</button>
              <button type="button" data-lang="es" class="lang-btn px-2.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 text-[#64748b] hover:text-[#071739]" aria-pressed="false">ES</button>
              <button type="button" data-lang="ar" class="lang-btn px-2.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 text-[#64748b] hover:text-[#071739]" aria-pressed="false">AR</button>
            </div>
            <a href="${bp}pages/contact.html" class="hidden md:inline-flex btn-gold !py-3 !px-6 !text-sm" data-i18n="nav.cta"></a>
            <button type="button" id="mobile-menu-btn" class="lg:hidden p-2 rounded-xl text-[#071739] hover:bg-[#f1f3f6] transition-colors" aria-label="Open menu" aria-expanded="false">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </nav>

      <div id="mobile-menu" class="lg:hidden fixed inset-0 top-20 bg-white/98 backdrop-blur-xl z-40 transform translate-x-full transition-transform duration-500 ease-out" aria-hidden="true">
        <div class="flex flex-col p-8 gap-6">
          <a href="${bp}index.html" class="text-xl font-heading font-semibold text-[#071739]" data-i18n="nav.home"></a>
          <a href="${bp}pages/categories.html" class="text-xl font-heading font-semibold text-[#071739]" data-i18n="nav.categories"></a>
          <a href="${bp}pages/about.html" class="text-xl font-heading font-semibold text-[#071739]" data-i18n="nav.about"></a>
          <a href="${bp}pages/contact.html" class="text-xl font-heading font-semibold text-[#071739]" data-i18n="nav.contact"></a>
          <div class="flex gap-2 pt-4 border-t border-[#e4e8ee]">
            <button type="button" data-lang="en" class="lang-btn flex-1 py-3 rounded-xl bg-[#f1f3f6] text-sm font-semibold">English</button>
            <button type="button" data-lang="es" class="lang-btn flex-1 py-3 rounded-xl bg-[#f1f3f6] text-sm font-semibold">Español</button>
            <button type="button" data-lang="ar" class="lang-btn flex-1 py-3 rounded-xl bg-[#f1f3f6] text-sm font-semibold">العربية</button>
          </div>
          <a href="${bp}pages/contact.html" class="btn-gold text-center mt-4" data-i18n="nav.cta"></a>
        </div>
      </div>
    </header>`;
  }

  function renderFooter() {
    const bp = basePath();
    const year = new Date().getFullYear();

    return `
    <footer class="bg-[#071739] text-white pt-20 pb-10" role="contentinfo">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          <div class="lg:col-span-1">
            <a href="${bp}index.html" class="inline-flex items-center gap-3 mb-6">
              <div class="w-12 h-12 rounded-xl bg-[#D4A373]/20 flex items-center justify-center">
                <span class="text-[#D4A373] font-heading font-bold text-xl">P</span>
              </div>
              <div>
                <span class="font-heading font-bold text-xl block">Puristine</span>
                <span class="text-[10px] uppercase tracking-[0.2em] text-[#D4A373]">Impex LLP</span>
              </div>
            </a>
            <p class="text-white/60 text-sm leading-relaxed max-w-xs" data-i18n="footer.tagline"></p>
          </div>

          <div>
            <h3 class="font-heading font-semibold text-sm uppercase tracking-wider text-[#D4A373] mb-6" data-i18n="footer.quickLinks"></h3>
            <ul class="space-y-4">
              <li><a href="${bp}index.html" class="text-white/70 hover:text-[#D4A373] transition-colors text-sm" data-i18n="nav.home"></a></li>
              <li><a href="${bp}pages/categories.html" class="text-white/70 hover:text-[#D4A373] transition-colors text-sm" data-i18n="nav.categories"></a></li>
              <li><a href="${bp}pages/about.html" class="text-white/70 hover:text-[#D4A373] transition-colors text-sm" data-i18n="nav.about"></a></li>
              <li><a href="${bp}pages/contact.html" class="text-white/70 hover:text-[#D4A373] transition-colors text-sm" data-i18n="nav.contact"></a></li>
              <li><a href="${bp}pages/privacy.html" class="text-white/70 hover:text-[#D4A373] transition-colors text-sm" data-i18n="footer.privacy"></a></li>
              <li><a href="${bp}pages/terms.html" class="text-white/70 hover:text-[#D4A373] transition-colors text-sm" data-i18n="footer.terms"></a></li>
            </ul>
          </div>

          <div>
            <h3 class="font-heading font-semibold text-sm uppercase tracking-wider text-[#D4A373] mb-6" data-i18n="footer.contact"></h3>
            <ul class="space-y-4 text-sm text-white/70">
              <li>
                <a href="mailto:info@puristineimpex.com" class="hover:text-[#D4A373] transition-colors">info@puristineimpex.com</a>
              </li>
              <li data-i18n="footer.address"></li>
              <li data-i18n="footer.hours"></li>
            </ul>
          </div>

          <div>
            <h3 class="font-heading font-semibold text-sm uppercase tracking-wider text-[#D4A373] mb-6" data-i18n="footer.language"></h3>
            <div class="flex flex-wrap gap-2 mb-8">
              <button type="button" data-lang="en" class="lang-btn px-4 py-2 rounded-full bg-white/10 text-sm hover:bg-[#D4A373] hover:text-[#071739] transition-all">English</button>
              <button type="button" data-lang="es" class="lang-btn px-4 py-2 rounded-full bg-white/10 text-sm hover:bg-[#D4A373] hover:text-[#071739] transition-all">Español</button>
              <button type="button" data-lang="ar" class="lang-btn px-4 py-2 rounded-full bg-white/10 text-sm hover:bg-[#D4A373] hover:text-[#071739] transition-all">العربية</button>
            </div>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A373] hover:text-[#071739] transition-all" aria-label="LinkedIn">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A373] hover:text-[#071739] transition-all" aria-label="Twitter">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div class="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>&copy; ${year} Puristine Impex LLP. <span data-i18n="footer.rights"></span></p>
        </div>
      </div>
    </footer>`;
  }

  function mount(selector, html) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  }

  function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    const toggle = () => {
      const open = menu.classList.contains('translate-x-0');
      menu.classList.toggle('translate-x-full', open);
      menu.classList.toggle('translate-x-0', !open);
      menu.setAttribute('aria-hidden', open ? 'true' : 'false');
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      document.body.classList.toggle('mobile-menu-open', !open);
    };

    btn.addEventListener('click', toggle);
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      menu.classList.add('translate-x-full');
      menu.classList.remove('translate-x-0');
      document.body.classList.remove('mobile-menu-open');
    }));
  }

  function init(options = {}) {
    mount('#site-header', renderNavbar(options));
    mount('#site-footer', renderFooter());
    initMobileMenu();
  }

  return { init, renderNavbar, renderFooter, basePath };
})();
