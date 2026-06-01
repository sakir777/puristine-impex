/**
 * Puristine Impex LLP — Product & Category Data
 * All images are local under assets/images/ (no external URLs).
 */
const PURISTINE_DATA = {
  /** Shown on homepage portfolio section (order matters) */
  homepageCategories: ['pulses', 'instant-mixes', 'spices'],

  categories: [
    { id: 'instant-mixes', slug: 'instant-mixes', image: 'categories/instant-mixes.svg', icon: '⚡' },
    { id: 'spices', slug: 'spices', image: 'categories/spices.svg', icon: '🌶️' },
    { id: 'disposable-products', slug: 'disposable-products', image: 'categories/disposable-products.svg', icon: '📦' },
    { id: 'pulses', slug: 'pulses', image: 'categories/pulses.svg', icon: '🫘' },
    { id: 'mouth-fresheners', slug: 'mouth-fresheners', image: 'categories/mouth-fresheners.svg', icon: '✨' },
    { id: 'jaggery', slug: 'jaggery', image: 'categories/syrups.svg', icon: '🍯' },
    { id: 'flours', slug: 'flours', image: 'categories/flours.svg', icon: '🌾' },
    { id: 'syrups', slug: 'syrups', image: 'categories/syrups.svg', icon: '🍶' },
    { id: 'pickles', slug: 'pickles', image: 'categories/pickles.svg', icon: '🥒' },
    { id: 'sauces', slug: 'sauces', image: 'categories/sauces.svg', icon: '🍯' },
    { id: 'namkeens-sweets', slug: 'namkeens-sweets', image: 'categories/namkeens-sweets.svg', icon: '🍬' }
  ],

  featuredProducts: [
    { id: 'turmeric-powder', category: 'spices', image: 'products/turmeric.svg' },
    { id: 'toor-dal', category: 'pulses', image: 'categories/pulses.svg' },
    { id: 'wheat-flour', category: 'flours', image: 'categories/flours.svg' },
    { id: 'green-chutney', category: 'sauces', image: 'categories/sauces.svg' },
    { id: 'mango-pickle', category: 'pickles', image: 'categories/pickles.svg' },
    { id: 'rose-syrup', category: 'syrups', image: 'categories/syrups.svg' }
  ],

  categoryProducts: {
    spices: [
      { id: 'turmeric', image: 'products/turmeric.svg' },
      { id: 'cumin', image: 'categories/spices.svg' },
      { id: 'coriander', image: 'categories/spices.svg' },
      { id: 'red-chilli', image: 'categories/spices.svg' },
      { id: 'garam-masala', image: 'categories/spices.svg' },
      { id: 'cardamom', image: 'categories/spices.svg' }
    ],
    pulses: [
      { id: 'toor-dal', image: 'categories/pulses.svg' },
      { id: 'moong-dal', image: 'categories/pulses.svg' },
      { id: 'chana-dal', image: 'categories/pulses.svg' },
      { id: 'urad-dal', image: 'categories/pulses.svg' }
    ],
    flours: [
      { id: 'wheat-flour', image: 'categories/flours.svg' },
      { id: 'besan', image: 'categories/flours.svg' },
      { id: 'rice-flour', image: 'categories/flours.svg' }
    ],
    'home-care': [
      { id: 'laundry-sheets', image: 'fairewash/laundry-sheets.svg' },
      { id: 'floor-sheets', image: 'fairewash/floor-sheets.svg' }
    ]
  },

  fairewash: {
    products: [
      { id: 'laundry-sheets', image: 'fairewash/laundry-sheets.svg' },
      { id: 'floor-sheets', image: 'fairewash/floor-sheets.svg' }
    ]
  },

  /**
   * Homepage video testimonials — set url when client provides MP4 or embed link.
   * YouTube: https://www.youtube.com/embed/VIDEO_ID
   * Vimeo: https://player.vimeo.com/video/VIDEO_ID
   */
  testimonialVideos: [
    { url: '', type: 'embed' },
    { url: '', type: 'embed' }
  ],

  /** Resolve image path for current page location */
  img(relativePath) {
    if (!relativePath) return '';
    if (relativePath.startsWith('http') || relativePath.startsWith('/')) return relativePath;
    return typeof IMG !== 'undefined' ? IMG.path(relativePath) : relativePath;
  },

  getCategoryImage(cat) {
    return this.img(cat.image);
  },

  getProductImage(product) {
    return this.img(product.image);
  }
};
