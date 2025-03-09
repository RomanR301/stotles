import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  gsap.to('.section_home-hero', {
    scrollTrigger: {
      trigger: '.section_home-hero',
      start: '50% center',
      end: '55% center',
      markers: true,
      // scrub: true,
      toggleActions: 'play none reverse none',
    },
    duration: 0.5,
    ease: 'power1.inOut',
    scale: 0.96,
    transformOrigin: 'top center',
    // marginLeft: '2.5rem',
    // marginRight: '2.5rem',
    // //minHeight: 'calc(100dvh - 5.5rem - 2.5rem)',
    borderBottomLeftRadius: '2rem',
    borderBottomRightRadius: '2rem',
  });

  const textRows = document.querySelectorAll('h1 .line-changer');
  const totalRows = textRows.length;
  let currentIndex = 0;

  function animateText() {
    gsap.to(textRows, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        // Reset position of all rows
        gsap.set(textRows, { yPercent: 0 });

        const topRow = textRows[currentIndex];
        topRow.parentNode.appendChild(topRow);

        currentIndex = (currentIndex + 1) % totalRows;
        setTimeout(animateText, 2000);
      },
    });
  }

  // Start the animation loop
  setTimeout(animateText, 2000);

  const tabComponent = document.querySelector('.autotab_component');
  const tabs = tabComponent.querySelectorAll('.autotab_item');
  const imageContainer = tabComponent.querySelector('.autotab_col2');
  const images = imageContainer.querySelectorAll('.autotab_image-wrapper');
  const AUTO_PLAY_DELAY = 6000; // 6 seconds
  let currentTabIndex = 0;
  let isHovering = false;
  let lineAnimation;
  let scrollTrigger;

  function setupTabs() {
    tabs.forEach((item, index) => {
      const head = item.querySelector('.autotab_head');
      const body = item.querySelector('.autotab_body');
      const line = item.querySelector('.autotab_line');
      const lineInner = item.querySelector('.autotab_line-inner');

      // Set ARIA attributes
      head.setAttribute('role', 'tab');
      head.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      head.setAttribute('aria-controls', `tab-content-${index}`);
      body.setAttribute('role', 'tabpanel');
      body.setAttribute('id', `tab-content-${index}`);
      body.setAttribute('aria-labelledby', head.id);

      // Set initial states
      if (index === 0) {
        gsap.set(body, { height: 'auto' });
        gsap.set(line, { opacity: 1 });
        gsap.set(lineInner, { height: '0%' });
      } else {
        gsap.set(body, { height: 0 });
        gsap.set(line, { opacity: 0 });
        gsap.set(lineInner, { height: '0%' });
      }

      head.addEventListener('click', () => {
        if (currentTabIndex !== index) {
          activateTab(index, true);
        }
      });

      // Add hover listeners to the entire tab item
      item.addEventListener('mouseenter', () => {
        if (index === currentTabIndex) {
          isHovering = true;
          if (lineAnimation) lineAnimation.pause();
        }
      });
      item.addEventListener('mouseleave', () => {
        if (index === currentTabIndex) {
          isHovering = false;
          if (lineAnimation) lineAnimation.play();
        }
      });
    });

    // Set initial image states
    images.forEach((image, index) => {
      gsap.set(image, {
        opacity: index === 0 ? 1 : 0,
        visibility: index === 0 ? 'visible' : 'hidden',
      });
    });
  }

  function activateTab(index, isManualClick = false) {
    if (currentTabIndex !== index) {
      if (lineAnimation) {
        lineAnimation.kill();
      }

      const prevTab = tabs[currentTabIndex];
      const newTab = tabs[index];

      animateTab(prevTab, false);
      currentTabIndex = index;
      animateTab(newTab, true, isManualClick);
      transitionImages(index);

      // Update ARIA attributes
      tabs.forEach((tab, i) => {
        const head = tab.querySelector('.autotab_head');
        head.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }
  }

  function animateTab(tab, isActive, isManualClick = false) {
    const body = tab.querySelector('.autotab_body');
    const line = tab.querySelector('.autotab_line');
    const lineInner = tab.querySelector('.autotab_line-inner');

    tab.classList.toggle('is-active', isActive);

    gsap.to(body, {
      height: isActive ? 'auto' : 0,
      duration: 0.5,
    });

    gsap.to(line, {
      opacity: isActive ? 1 : 0,
      duration: 0.5,
    });

    if (isActive) {
      lineAnimation = gsap.to(lineInner, {
        height: '100%',
        duration: isManualClick ? AUTO_PLAY_DELAY / 1000 : 6,
        ease: 'none',
        onComplete: () => {
          if (!isHovering) {
            nextTab();
          }
        },
      });
    } else {
      gsap.to(lineInner, {
        height: '0%',
        duration: 0.5,
        ease: 'none',
      });
    }
  }

  function transitionImages(activeIndex) {
    images.forEach((image, index) => {
      gsap.to(image, {
        opacity: index === activeIndex ? 1 : 0,
        visibility: index === activeIndex ? 'visible' : 'hidden',
        duration: 0.5,
        ease: 'power2.inOut',
      });
    });
  }

  function nextTab() {
    activateTab((currentTabIndex + 1) % tabs.length);
  }

  let isDesktopView = false;

  function initTabComponent() {
    setupTabs();

    scrollTrigger = ScrollTrigger.create({
      trigger: tabComponent,
      start: 'top center',
      markers: false,
      onEnter: () => {
        startAnimation();
      },
      onLeaveBack: () => {
        // Reset when scrolling back up
        if (lineAnimation) {
          lineAnimation.kill();
        }
        resetTabsForDesktop();
      },
    });
  }

  function startAnimation() {
    // Start the animation for the first tab
    currentTabIndex = 0;
    animateTab(tabs[0], true, false);
  }

  function resetTabsForDesktop() {
    currentTabIndex = 0;
    tabs.forEach((tab, index) => {
      const body = tab.querySelector('.autotab_body');
      const line = tab.querySelector('.autotab_line');
      const lineInner = tab.querySelector('.autotab_line-inner');
      if (index === 0) {
        gsap.set(body, { height: 'auto' });
        gsap.set(line, { opacity: 1 });
        gsap.set(lineInner, { height: '0%' });
      } else {
        gsap.set(body, { height: 0 });
        gsap.set(line, { opacity: 0 });
        gsap.set(lineInner, { height: '0%' });
      }
    });
    images.forEach((image, index) => {
      gsap.set(image, {
        opacity: index === 0 ? 1 : 0,
        visibility: index === 0 ? 'visible' : 'hidden',
      });
    });
  }

  // Use GSAP's matchMedia for responsive behavior
  const mm = gsap.matchMedia();

  mm.add('(min-width: 992px)', () => {
    if (!isDesktopView) {
      isDesktopView = true;
      resetTabsForDesktop();
      initTabComponent();

      // If the component is already in view, start the animation
      if (ScrollTrigger.isInViewport(tabComponent)) {
        startAnimation();
      }
    }
    return () => {
      if (scrollTrigger) scrollTrigger.kill();
      if (lineAnimation) lineAnimation.kill();
      isDesktopView = false;
    };
  });

  mm.add('(max-width: 991px)', () => {
    if (isDesktopView) {
      if (scrollTrigger) scrollTrigger.kill();
      if (lineAnimation) lineAnimation.kill();
      resetTabsForMobile();
      isDesktopView = false;
    }
  });

  function resetTabsForMobile() {
    tabs.forEach((tab) => {
      const body = tab.querySelector('.autotab_body');
      const line = tab.querySelector('.autotab_line');
      gsap.set(body, { height: 'auto' });
      gsap.set(line, { opacity: 1 });
    });
    images.forEach((image) => {
      gsap.set(image, { opacity: 1, visibility: 'visible' });
    });
  }

  // Handle resize events
  window.addEventListener('resize', () => {
    mm.revert(); // This will re-run the correct media query
  });
});
