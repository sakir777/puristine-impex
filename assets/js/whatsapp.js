/**
 * Puristine Impex LLP — WhatsApp floating chat widget
 */
const WhatsApp = (function () {
  const PHONE = '919326477055';
  const PREFILLED_TEXT =
    'Hello Puristine Impex, I want to know more about your products';
  const CHAT_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(PREFILLED_TEXT)}`;

  const ENTRANCE_DELAY_MS = 900;
  const PULSE_INTERVAL_MS = 4500;
  const PULSE_DURATION_MS = 1200;
  const BUBBLE_HIDE_DELAY_MS = 8000;

  let pulseTimer = null;
  let bubbleTimer = null;

  function loadFontAwesome() {
    if (document.querySelector('link[data-whatsapp-fa]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
    link.crossOrigin = 'anonymous';
    link.referrerPolicy = 'no-referrer';
    link.setAttribute('data-whatsapp-fa', '');
    document.head.appendChild(link);
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function triggerPulse(widget) {
    if (prefersReducedMotion() || !widget) return;
    widget.classList.add('is-pulsing');
    window.setTimeout(() => {
      widget.classList.remove('is-pulsing');
    }, PULSE_DURATION_MS);
  }

  function startPulseLoop(widget) {
    if (prefersReducedMotion()) return;
    pulseTimer = window.setInterval(() => {
      triggerPulse(widget);
    }, PULSE_INTERVAL_MS);
  }

  function showEntrance(widget) {
    if (!widget) return;
    widget.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => {
      widget.classList.add('is-visible');
    });
    if (!prefersReducedMotion()) {
      window.setTimeout(() => triggerPulse(widget), 400);
    }
  }

  function scheduleEntrance(widget) {
    const reveal = () => showEntrance(widget);
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        window.setTimeout(reveal, ENTRANCE_DELAY_MS);
      });
    } else {
      window.setTimeout(reveal, ENTRANCE_DELAY_MS);
    }
  }

  function bindInteractions(widget) {
    const btn = widget.querySelector('.whatsapp-widget__btn');
    const bubble = widget.querySelector('.whatsapp-widget__bubble');
    if (!btn) return;

    btn.addEventListener('mouseenter', () => {
      widget.classList.add('is-hover');
    });
    btn.addEventListener('mouseleave', () => {
      widget.classList.remove('is-hover');
    });
    btn.addEventListener('focus', () => {
      widget.classList.add('is-hover');
    });
    btn.addEventListener('blur', () => {
      widget.classList.remove('is-hover');
    });

    if (bubble && !prefersReducedMotion()) {
      bubbleTimer = window.setTimeout(() => {
        widget.classList.add('is-bubble-dismissed');
      }, BUBBLE_HIDE_DELAY_MS);
    }
  }

  function init() {
    const widget = document.getElementById('whatsapp-widget');
    if (!widget) return;

    loadFontAwesome();
    bindInteractions(widget);
    scheduleEntrance(widget);
    startPulseLoop(widget);
  }

  function destroy() {
    if (pulseTimer) window.clearInterval(pulseTimer);
    if (bubbleTimer) window.clearTimeout(bubbleTimer);
  }

  return { init, destroy, CHAT_URL, PHONE };
})();
