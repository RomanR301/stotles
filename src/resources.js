import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);
alert('test')
// Define constants and helper functions outside the Webflow push to make them globally available
const DURATION_IN = 0.5;
const DURATION_OUT = 0.5;
const EASE_IN = 'power2.inOut';
const EASE_OUT = 'power2.out';
const BLUR = 0.75;

// Helper function to handle hover animations
function createHoverAnimation(card, initialStates, timelineActions) {
  // Create timeline
  const timeline = gsap.timeline({ paused: true });

  // Set initial states
  Object.entries(initialStates).forEach(([selector, props]) => {
    const element = card.querySelector(selector);
    if (element) gsap.set(element, props);
  });

  // Build timeline animations
  timelineActions.forEach((action) => {
    const elements = action.selectors
      .map((selector) => card.querySelector(selector))
      .filter(Boolean);
    timeline.to(elements, action.props, action.position || '<');
  });

  // Hover handler function
  const handleHover = (isEntering) => {
    const direction = isEntering ? 1 : -1;
    const duration = isEntering ? DURATION_IN : DURATION_OUT;
    const ease = isEntering ? EASE_IN : EASE_OUT;

    timeline.timeScale(direction).duration(duration);
    timeline.getChildren().forEach((tween) => {
      tween.vars.ease = ease;
      if (tween.vars.duration) {
        tween.vars.duration = duration * (tween.vars.duration / DURATION_IN);
      }
    });

    isEntering ? timeline.play() : timeline.reverse();
  };

  // Add event listeners
  card.addEventListener('mouseenter', () => handleHover(true));
  card.addEventListener('mouseleave', () => handleHover(false));
}

// Define animations for each resource type
const resourceAnimations = {
  'is-study-1': {
    initialStates: {
      '.resource_study-text': { y: '0rem' },
      '.resource_study-heading': { display: 'none', opacity: 0, y: '2rem' },
      '.resource_button-wrap': { display: 'none', opacity: 0 },
      '.resource_study-bg': { blur: '0rem', filter: 'blur(0rem)', webkitFilter: 'blur(0rem)' },
    },
    timelineActions: [
      {
        selectors: ['.resource_study-heading', '.resource_button-wrap'],
        props: {
          display: (_, element) => (element.matches('.resource_button-wrap') ? 'flex' : 'block'),
          opacity: 1,
          y: '0rem',
          stagger: 0.1,
          duration: DURATION_IN * 1.5,
          ease: EASE_IN,
        },
      },
      {
        selectors: ['.resource_study-bg'],
        props: {
          blur: `${BLUR}rem`,
          filter: `blur(${BLUR}rem)`,
          webkitFilter: `blur(${BLUR}rem)`,
          duration: DURATION_IN * 2,
          ease: EASE_IN,
        },
      },
    ],
  },

  'is-report-1': {
    initialStates: {},
    timelineActions: [
      {
        selectors: ['.resource_report-1-image-wrap'],
        props: { opacity: 0, duration: DURATION_IN, ease: EASE_IN },
      },
    ],
  },

  'is-blog-1': {
    initialStates: {
      '.resource_blog-1-text': { height: 'auto' },
      '.resource_button-wrap': { display: 'none', opacity: 0 },
      '.resource_blog-1-image': { blur: '0rem', filter: 'blur(0rem)', webkitFilter: 'blur(0rem)' },
    },
    timelineActions: [
      {
        selectors: ['.resource_blog-1-text'],
        props: { height: '100%', duration: DURATION_IN * 2, ease: EASE_IN },
      },
      {
        selectors: ['.resource_button-wrap'],
        props: { display: 'flex', opacity: 1, duration: DURATION_IN, ease: EASE_IN },
      },
      {
        selectors: ['.resource_blog-1-image'],
        props: {
          blur: `${BLUR}rem`,
          filter: `blur(${BLUR}rem)`,
          webkitFilter: `blur(${BLUR}rem)`,
          duration: DURATION_IN * 2,
          ease: EASE_IN,
        },
      },
    ],
  },

  'is-blog-2': {
    initialStates: {
      '.resource_blog-2-bg': { height: 'auto' },
      '.resource_button-wrap': { display: 'none', opacity: 0 },
    },
    timelineActions: [
      {
        selectors: ['.resource_blog-2-bg'],
        props: { height: '100%', duration: DURATION_IN, ease: EASE_IN },
      },
      {
        selectors: ['.resource_button-wrap'],
        props: { display: 'flex', opacity: 1, duration: DURATION_IN, ease: EASE_IN },
      },
    ],
  },

  'is-blog-3': {
    initialStates: {
      '.resource_blog-3-bg': { height: 'auto' },
      '.resource_button-wrap': { display: 'none', opacity: 0 },
    },
    timelineActions: [
      {
        selectors: ['.resource_blog-3-bg'],
        props: { height: '0%', opacity: 0, duration: DURATION_IN, ease: EASE_IN },
      },
      {
        selectors: ['.resource_button-wrap', '.resource_blog-3-gradient'],
        props: { display: 'flex', opacity: 1, duration: DURATION_IN, ease: EASE_IN },
      },
    ],
  },

  'is-report-2': {
    initialStates: {
      '.resource_report-2-bg': { height: 'auto' },
      '.resource_button-wrap': { display: 'none', opacity: 0 },
    },
    timelineActions: [
      {
        selectors: ['.resource_report-2-bg'],
        props: { height: '100%', duration: DURATION_IN, ease: EASE_IN },
      },
      {
        selectors: ['.resource_button-wrap'],
        props: { display: 'flex', opacity: 1, duration: DURATION_IN, ease: EASE_IN },
      },
    ],
  },
};

// Modify the initializeResourceAnimations function to handle the correct structure
function initializeResourceAnimations(items = document) {
  Object.entries(resourceAnimations).forEach(([className, config]) => {
    let cards;

    if (items === document) {
      // If searching the entire document
      cards = document.querySelectorAll(`.resource_article .resource_layout.${className}`);
    } else {
      // If processing rendered items from FS CMS
      cards = [];
      // Each item in renderedItems has an 'element' property containing the actual DOM element
      items.forEach((item) => {
        if (item.element) {
          // Check if the element itself matches
          if (
            item.element.classList &&
            item.element.classList.contains('resource_layout') &&
            item.element.classList.contains(className)
          ) {
            cards.push(item.element);
          }
          // Or check if it contains matching elements
          const childCards = item.element.querySelectorAll(`.resource_layout.${className}`);
          if (childCards.length) {
            cards = [...cards, ...Array.from(childCards)];
          }
        }
      });
    }

    // Apply animations to each card
    cards.forEach((card) => {
      if (!card.dataset.animationInitialized && !isElementHidden(card)) {
        createHoverAnimation(card, config.initialStates, config.timelineActions);
        card.dataset.animationInitialized = 'true';
      }
    });
  });
}

function isElementHidden(element) {
  const style = window.getComputedStyle(element);
  return style.display === 'none';
}

// Initialize for initial document load
window.Webflow ||= [];
window.Webflow.push(() => {
  initializeResourceAnimations();
});

// For the FSAttributes integration
window.FinsweetAttributes ||= [];
window.FinsweetAttributes.push([
  'list',
  (listInstances) => {
    const [listInstance] = listInstances;

    initializeResourceAnimations();

    listInstance.effect(() => {
      initializeResourceAnimations(listInstance.items.value);
    });
  },
]);
