import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  const textRows = document.querySelectorAll('h1 .line-changer');
  const totalRows = textRows.length;
  let currentIndex = 0;
  gsap.set(textRows, { yPercent: 0 });
  function animateText() {
    gsap.to(textRows, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power3.inOut',
      onComplete: () => {
        // Reset position of all rows
        gsap.set(textRows, { yPercent: 0 });

        const topRow = textRows[currentIndex];
        topRow.parentNode.appendChild(topRow);

        currentIndex = (currentIndex + 1) % totalRows;
        setTimeout(animateText, 2250);
      },
    });
  }
  // Start the animation loop
  setTimeout(animateText, 2500);

  // const tabComponent = document.querySelector('.autotab_component');
  // const tabs = tabComponent.querySelectorAll('.autotab_item');
  // const imageContainer = tabComponent.querySelector('.autotab_col2');
  // const images = imageContainer.querySelectorAll('.autotab_image-wrapper:nth-child(n + 2)');
  // const AUTO_PLAY_DELAY = 6000; // 6 seconds
  // let currentTabIndex = 0;
  // let isHovering = false;
  // let lineAnimation;
  // let scrollTrigger;

  // function setupTabs() {
  //   gsap.set('.autotab_col1', { xPercent: -50, opacity: 0 });
  //   gsap.set('.autotab_col2', { x: '-30rem' });
  //   gsap.set('.autotab_image-wrapper:nth-child(1)', { zIndex: 5, backgroundColor: 'white' });

  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: '.autotab_component',
  //       start: 'top 60%',
  //       end: '40% center',
  //       // markers: true,
  //       toggleActions: 'none play none reverse',
  //     },
  //   });

  //   tl.to('.autotab_col2', {
  //     duration: 1,
  //     ease: 'power2.inOut',
  //     x: '0rem',
  //   })
  //     .to(
  //       '.autotab_col1',
  //       {
  //         xPercent: 0,
  //         opacity: 1,
  //         duration: 1,
  //         ease: 'power2.inOut',
  //       },
  //       '<+0.05'
  //     )
  //     .to(
  //       '.autotab_image-wrapper:nth-child(1)',
  //       {
  //         opacity: 0,
  //         duration: 1,
  //         ease: 'power2.inOut',
  //       },
  //       '<+0.05'
  //     );

  //   tabs.forEach((item, index) => {
  //     const head = item.querySelector('.autotab_head');
  //     const body = item.querySelector('.autotab_body');
  //     const line = item.querySelector('.autotab_line');
  //     const lineInner = item.querySelector('.autotab_line-inner');

  //     // Set ARIA attributes
  //     head.setAttribute('role', 'tab');
  //     head.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
  //     head.setAttribute('aria-controls', `tab-content-${index}`);
  //     body.setAttribute('role', 'tabpanel');
  //     body.setAttribute('id', `tab-content-${index}`);
  //     body.setAttribute('aria-labelledby', head.id);

  //     // Set initial states
  //     if (index === 0) {
  //       gsap.set(body, { height: 'auto' });
  //       gsap.set(line, { opacity: 1 });
  //       gsap.set(lineInner, { height: '0%' });
  //     } else {
  //       gsap.set(body, { height: 0 });
  //       gsap.set(line, { opacity: 0 });
  //       gsap.set(lineInner, { height: '0%' });
  //     }

  //     head.addEventListener('click', () => {
  //       if (currentTabIndex !== index) {
  //         activateTab(index, true);
  //       }
  //     });

  //     // Add hover listeners to the entire tab item
  //     item.addEventListener('mouseenter', () => {
  //       if (index === currentTabIndex) {
  //         isHovering = true;
  //         if (lineAnimation) lineAnimation.pause();
  //       }
  //     });
  //     item.addEventListener('mouseleave', () => {
  //       if (index === currentTabIndex) {
  //         isHovering = false;
  //         if (lineAnimation) lineAnimation.play();
  //       }
  //     });
  //   });

  //   // Set initial image states
  //   images.forEach((image, index) => {
  //     gsap.set(image, {
  //       opacity: index === 0 ? 1 : 0,
  //       visibility: index === 0 ? 'visible' : 'hidden',
  //     });
  //   });
  // }

  // function activateTab(index, isManualClick = false) {
  //   if (currentTabIndex !== index) {
  //     if (lineAnimation) {
  //       lineAnimation.kill();
  //     }

  //     const prevTab = tabs[currentTabIndex];
  //     const newTab = tabs[index];

  //     animateTab(prevTab, false);
  //     currentTabIndex = index;
  //     animateTab(newTab, true, isManualClick);
  //     transitionImages(index);

  //     // Update ARIA attributes
  //     tabs.forEach((tab, i) => {
  //       const head = tab.querySelector('.autotab_head');
  //       head.setAttribute('aria-selected', i === index ? 'true' : 'false');
  //     });
  //   }
  // }

  // function animateTab(tab, isActive, isManualClick = false) {
  //   const body = tab.querySelector('.autotab_body');
  //   const line = tab.querySelector('.autotab_line');
  //   const lineInner = tab.querySelector('.autotab_line-inner');

  //   tab.classList.toggle('is-active', isActive);

  //   gsap.to(body, {
  //     height: isActive ? 'auto' : 0,
  //     duration: 0.5,
  //   });

  //   gsap.to(line, {
  //     opacity: isActive ? 1 : 0,
  //     duration: 0.5,
  //   });

  //   if (isActive) {
  //     lineAnimation = gsap.to(lineInner, {
  //       height: '100%',
  //       duration: isManualClick ? AUTO_PLAY_DELAY / 1000 : 6,
  //       ease: 'none',
  //       onComplete: () => {
  //         if (!isHovering) {
  //           nextTab();
  //         }
  //       },
  //     });
  //   } else {
  //     gsap.to(lineInner, {
  //       height: '0%',
  //       duration: 0.5,
  //       ease: 'none',
  //     });
  //   }
  // }

  // function transitionImages(activeIndex) {
  //   images.forEach((image, index) => {
  //     gsap.to(image, {
  //       opacity: index === activeIndex ? 1 : 0,
  //       visibility: index === activeIndex ? 'visible' : 'hidden',
  //       duration: 0.5,
  //       ease: 'power2.inOut',
  //     });
  //   });
  // }

  // function nextTab() {
  //   activateTab((currentTabIndex + 1) % tabs.length);
  // }

  // let isDesktopView = false;

  // function initTabComponent() {
  //   setupTabs();

  //   scrollTrigger = ScrollTrigger.create({
  //     trigger: tabComponent,
  //     start: 'top center',
  //     markers: false,
  //     onEnter: () => {
  //       startAnimation();
  //     },
  //     onLeaveBack: () => {
  //       // Reset when scrolling back up
  //       if (lineAnimation) {
  //         lineAnimation.kill();
  //       }
  //       resetTabsForDesktop();
  //     },
  //   });
  // }

  // function startAnimation() {
  //   // Start the animation for the first tab
  //   currentTabIndex = 0;
  //   animateTab(tabs[0], true, false);
  // }

  // function resetTabsForDesktop() {
  //   currentTabIndex = 0;
  //   tabs.forEach((tab, index) => {
  //     const body = tab.querySelector('.autotab_body');
  //     const line = tab.querySelector('.autotab_line');
  //     const lineInner = tab.querySelector('.autotab_line-inner');
  //     if (index === 0) {
  //       gsap.set(body, { height: 'auto' });
  //       gsap.set(line, { opacity: 1 });
  //       gsap.set(lineInner, { height: '0%' });
  //     } else {
  //       gsap.set(body, { height: 0 });
  //       gsap.set(line, { opacity: 0 });
  //       gsap.set(lineInner, { height: '0%' });
  //     }
  //   });
  //   images.forEach((image, index) => {
  //     gsap.set(image, {
  //       opacity: index === 0 ? 1 : 0,
  //       visibility: index === 0 ? 'visible' : 'hidden',
  //     });
  //   });
  // }

  // // Use GSAP's matchMedia for responsive behavior
  // const mm = gsap.matchMedia();

  // mm.add('(min-width: 992px)', () => {
  //   if (!isDesktopView) {
  //     isDesktopView = true;
  //     resetTabsForDesktop();
  //     initTabComponent();

  //     // If the component is already in view, start the animation
  //     if (ScrollTrigger.isInViewport(tabComponent)) {
  //       startAnimation();
  //     }
  //   }
  //   return () => {
  //     if (scrollTrigger) scrollTrigger.kill();
  //     if (lineAnimation) lineAnimation.kill();
  //     isDesktopView = false;
  //   };
  // });

  // mm.add('(max-width: 991px)', () => {
  //   if (isDesktopView) {
  //     if (scrollTrigger) scrollTrigger.kill();
  //     if (lineAnimation) lineAnimation.kill();
  //     resetTabsForMobile();
  //     isDesktopView = false;
  //   }
  // });

  // function resetTabsForMobile() {
  //   tabs.forEach((tab) => {
  //     const body = tab.querySelector('.autotab_body');
  //     const line = tab.querySelector('.autotab_line');
  //     gsap.set(body, { height: 'auto' });
  //     gsap.set(line, { opacity: 1 });
  //   });
  //   images.forEach((image) => {
  //     gsap.set(image, { opacity: 1, visibility: 'visible' });
  //   });
  // }

  // // Handle resize events
  // window.addEventListener('resize', () => {
  //   mm.revert(); // This will re-run the correct media query
  // });

  const tabComponent = document.querySelector('.autotab_component');

  // Only proceed if we have the tab component
  if (tabComponent) {
    const tabs = tabComponent.querySelectorAll('.autotab_item');
    const imageContainer = tabComponent.querySelector('.autotab_col2');
    const tabBodies = tabComponent.querySelectorAll('.autotab_body');
    const lineInners = tabComponent.querySelectorAll('.autotab_line-inner');
    const allImages = imageContainer.querySelectorAll('.autotab_image-wrapper');

    // Store all ScrollTrigger instances for cleanup
    let scrollTriggers = [];

    // Animation durations
    const DURATION = {
      INITIAL: 0.65,
      TAB_TRANSITION: 0.5,
      LINE_PROGRESS: 0.5,
    };

    // Add ARIA attributes for accessibility
    function setupAccessibility() {
      // Make the tab component a tablist
      tabComponent.setAttribute('role', 'tablist');
      tabComponent.setAttribute('aria-orientation', 'vertical');

      // Setup each tab
      tabs.forEach((tab, index) => {
        const tabBody = tab.querySelector('.autotab_body');
        const headingEl = tab.querySelector('h3, h4, h5, h6') || tab;
        const tabId = `tab-${index}`;
        const panelId = `panel-${index}`;

        // Set tab attributes
        headingEl.setAttribute('role', 'tab');
        headingEl.setAttribute('id', tabId);
        headingEl.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        headingEl.setAttribute('aria-controls', panelId);
        headingEl.setAttribute('tabindex', index === 0 ? '0' : '-1');

        // Set panel attributes
        tabBody.setAttribute('role', 'tabpanel');
        tabBody.setAttribute('id', panelId);
        tabBody.setAttribute('aria-labelledby', tabId);
        tabBody.setAttribute('tabindex', '0');
      });
    }

    // Reset all styles and GSAP animations
    function resetStyles() {
      // Reset column and container styles
      gsap.set('.autotab_col1', { clearProps: 'all' });
      gsap.set('.autotab_col2', { clearProps: 'all' });

      // Reset images
      gsap.set(allImages, { clearProps: 'all' });

      // Reset tabs and lines
      tabs.forEach((tab) => {
        tab.classList.remove('is-active');
        gsap.set(tab.querySelector('.autotab_body'), { clearProps: 'all' });
        gsap.set(tab.querySelector('.autotab_line-inner'), { clearProps: 'all' });
      });

      // Set first tab as active for accessibility
      if (tabs.length) {
        tabs[0].classList.add('is-active');
        tabs[0]
          .querySelector('h3, h4, h5, h6, [role="tab"]')
          ?.setAttribute('aria-selected', 'true');
      }
    }

    // Initialize animations and scroll triggers
    function initAnimations() {
      // Clear any previous scroll triggers
      cleanupScrollTriggers();

      // Initial setup
      (function initialize() {
        // Column and container setup
        gsap.set('.autotab_col1', { xPercent: -50, opacity: 0 });
        gsap.set('.autotab_col2', { x: '-30rem' });

        // Image setup
        gsap.set(allImages, { opacity: 0, visibility: 'hidden' });
        gsap.set(allImages[0], { opacity: 1, visibility: 'visible' });

        // Line and tab setup
        gsap.set(lineInners, { height: '0%' });
        tabBodies.forEach((body, idx) => {
          gsap.set(body, {
            height: idx === 0 ? 'auto' : 0,
            opacity: idx === 0 ? 1 : 0,
          });
          if (idx === 0) {
            tabs[0].classList.add('is-active');
            const tabEl = tabs[0].querySelector('[role="tab"]');
            if (tabEl) tabEl.setAttribute('aria-selected', 'true');
          }
        });
      })();

      // Main timeline for initial animation
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: tabComponent,
          start: 'top center',
          end: 'bottom center',
          markers: false,
          toggleActions: 'play none none reverse',
        },
      });

      scrollTriggers.push(mainTl.scrollTrigger);

      mainTl
        .to('.autotab_col1', {
          xPercent: 0,
          opacity: 1,
          duration: DURATION.INITIAL,
          ease: 'power1.inOut',
        })
        .to(
          imageContainer,
          {
            x: '0rem',
            duration: DURATION.INITIAL,
            ease: 'power1.inOut',
          },
          '<'
        );

      // Animation utility functions
      const animations = {
        // Set active tab class and ARIA attributes
        setActiveTab(activeIndex) {
          tabs.forEach((tab, idx) => {
            const isActive = idx === activeIndex;
            tab.classList.toggle('is-active', isActive);

            const tabEl = tab.querySelector('[role="tab"]');
            if (tabEl) {
              tabEl.setAttribute('aria-selected', isActive ? 'true' : 'false');
              tabEl.setAttribute('tabindex', isActive ? '0' : '-1');
            }
          });
        },

        // Tab body animations
        tabBody: {
          open(tabBody) {
            return gsap.to(tabBody, {
              height: 'auto',
              opacity: 1,
              duration: DURATION.TAB_TRANSITION,
              ease: 'power1.inOut',
              overwrite: 'auto',
            });
          },
          close(tabBody) {
            return gsap.to(tabBody, {
              height: 0,
              opacity: 0,
              duration: DURATION.TAB_TRANSITION,
              ease: 'power1.inOut',
              overwrite: 'auto',
            });
          },
          closeAllExcept(exceptIndex) {
            tabBodies.forEach((body, idx) => {
              if (idx !== exceptIndex) {
                animations.tabBody.close(body);
              }
            });
          },
        },

        // Image transition animation
        transitionImage(toActiveIndex) {
          const tl = gsap.timeline();

          // Hide all other images
          allImages.forEach((img, idx) => {
            if (idx !== toActiveIndex) {
              tl.to(
                img,
                {
                  opacity: 0,
                  duration: 0.4,
                  ease: 'none',
                  onComplete: () => gsap.set(img, { visibility: 'hidden' }),
                },
                0
              );
            }
          });

          // Show target image
          tl.to(
            allImages[toActiveIndex],
            {
              opacity: 1,
              visibility: 'visible',
              duration: 0.4,
              ease: 'none',
            },
            '<'
          );

          return tl;
        },
      };

      // Create scroll triggers for each tab
      tabs.forEach((tab, index) => {
        const tabBody = tab.querySelector('.autotab_body');
        const lineInner = tab.querySelector('.autotab_line-inner');

        // Section boundaries
        const sectionStart = `top+=${index * 25}% center`;
        const sectionEnd = `top+=${(index + 1) * 25}% center`;

        // Tab activation trigger
        const tabTrigger = ScrollTrigger.create({
          trigger: tabComponent,
          start: sectionStart,
          end: sectionEnd,
          markers: false,
          onEnter: () => {
            const tl = gsap.timeline();

            // Tab and content transitions
            animations.tabBody.closeAllExcept(index);
            tl.add(animations.tabBody.open(tabBody), 0);
            animations.setActiveTab(index);
            tl.add(animations.transitionImage(index + 1), 0);

            // Reset previous tab lines
            for (let i = 0; i < index; i++) {
              tl.to(
                lineInners[i],
                {
                  height: '0%',
                  duration: DURATION.LINE_PROGRESS,
                  ease: 'power2.inOut',
                },
                0
              );
            }
          },
          onLeaveBack: () => {
            if (index > 0) {
              const tl = gsap.timeline();
              const prevIndex = index - 1;

              // Transition to previous tab
              tl.add(animations.tabBody.close(tabBody), 0);
              tl.add(animations.tabBody.open(tabs[prevIndex].querySelector('.autotab_body')), 0);
              animations.setActiveTab(prevIndex);
              tl.add(animations.transitionImage(index), 0);

              // Reset current line
              tl.to(
                lineInner,
                {
                  height: '0%',
                  duration: DURATION.LINE_PROGRESS,
                  ease: 'power2.inOut',
                },
                0
              );
            } else {
              animations.transitionImage(0);
            }
          },
        });

        scrollTriggers.push(tabTrigger);

        // Line progress trigger
        const lineTrigger = ScrollTrigger.create({
          trigger: tabComponent,
          start: sectionStart,
          end: sectionEnd,
          scrub: true,
          onUpdate: (self) => {
            gsap.to(lineInner, {
              height: `${self.progress * 100}%`,
              duration: 0,
              overwrite: true,
            });
          },
        });

        scrollTriggers.push(lineTrigger);
      });
    }

    // Clean up scroll triggers
    function cleanupScrollTriggers() {
      scrollTriggers.forEach((trigger) => {
        if (trigger) trigger.kill();
      });
      scrollTriggers = [];
    }

    // Set up accessibility attributes
    setupAccessibility();

    // Create a media query context
    const mediaQuery = gsap.matchMedia();

    // Add the desktop context (992px and above)
    mediaQuery.add('(min-width: 992px)', () => {
      initAnimations();

      // Return a cleanup function
      return () => {
        cleanupScrollTriggers();
        resetStyles();
      };
    });

    // Add click handlers for accessibility (works at all screen sizes)
    tabs.forEach((tab, index) => {
      const headingEl = tab.querySelector('h3, h4, h5, h6, [role="tab"]');
      if (headingEl) {
        headingEl.addEventListener('click', () => {
          // Update ARIA states
          tabs.forEach((t, i) => {
            const tabEl = t.querySelector('[role="tab"]');
            const tabBody = t.querySelector('.autotab_body');
            const isActive = i === index;

            t.classList.toggle('is-active', isActive);

            if (tabEl) {
              tabEl.setAttribute('aria-selected', isActive ? 'true' : 'false');
              tabEl.setAttribute('tabindex', isActive ? '0' : '-1');
            }

            // For mobile or when animations aren't running, manually toggle visibility
            if (window.innerWidth < 992) {
              gsap.to(tabBody, {
                height: isActive ? 'auto' : 0,
                opacity: isActive ? 1 : 0,
                duration: 0.3,
                ease: 'power1.inOut',
              });
            }
          });
        });

        // Keyboard navigation
        headingEl.addEventListener('keydown', (e) => {
          let newIndex = -1;

          switch (e.key) {
            case 'ArrowDown':
              newIndex = (index + 1) % tabs.length;
              break;
            case 'ArrowUp':
              newIndex = (index - 1 + tabs.length) % tabs.length;
              break;
            case 'Home':
              newIndex = 0;
              break;
            case 'End':
              newIndex = tabs.length - 1;
              break;
          }

          if (newIndex >= 0) {
            e.preventDefault();
            tabs[newIndex].querySelector('[role="tab"]')?.click();
            tabs[newIndex].querySelector('[role="tab"]')?.focus();
          }
        });
      }
    });
  }

  // function setupTabs() {

  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: '.autotab_component',
  //       start: 'top 60%',
  //       end: '40% center',
  //       // markers: true,
  //       toggleActions: 'none play none reverse',
  //     },
  //   });

  //   tl.to('.autotab_col2', {
  //     duration: 1,
  //     ease: 'power2.inOut',
  //     x: '0rem',
  //   })
  //     .to(
  //       '.autotab_col1',
  //       {
  //         xPercent: 0,
  //         opacity: 1,
  //         duration: 1,
  //         ease: 'power2.inOut',
  //       },
  //       '<+0.05'
  //     )
  //     .to(
  //       '.autotab_image-wrapper:nth-child(1)',
  //       {
  //         opacity: 0,
  //         duration: 1,
  //         ease: 'power2.inOut',
  //       },
  //       '<+0.05'
  //     );

  //   tabs.forEach((item, index) => {
  //     const head = item.querySelector('.autotab_head');
  //     const body = item.querySelector('.autotab_body');
  //     const line = item.querySelector('.autotab_line');
  //     const lineInner = item.querySelector('.autotab_line-inner');

  //     // Set ARIA attributes
  //     head.setAttribute('role', 'tab');
  //     head.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
  //     head.setAttribute('aria-controls', `tab-content-${index}`);
  //     body.setAttribute('role', 'tabpanel');
  //     body.setAttribute('id', `tab-content-${index}`);
  //     body.setAttribute('aria-labelledby', head.id);

  //     // Set initial states
  //     if (index === 0) {
  //       gsap.set(body, { height: 'auto' });
  //       gsap.set(line, { opacity: 1 });
  //       gsap.set(lineInner, { height: '0%' });
  //     } else {
  //       gsap.set(body, { height: 0 });
  //       gsap.set(line, { opacity: 0 });
  //       gsap.set(lineInner, { height: '0%' });
  //     }

  //     head.addEventListener('click', () => {
  //       if (currentTabIndex !== index) {
  //         activateTab(index, true);
  //       }
  //     });

  //     // Add hover listeners to the entire tab item
  //     item.addEventListener('mouseenter', () => {
  //       if (index === currentTabIndex) {
  //         isHovering = true;
  //         if (lineAnimation) lineAnimation.pause();
  //       }
  //     });
  //     item.addEventListener('mouseleave', () => {
  //       if (index === currentTabIndex) {
  //         isHovering = false;
  //         if (lineAnimation) lineAnimation.play();
  //       }
  //     });
  //   });

  //   // Set initial image states
  //   images.forEach((image, index) => {
  //     gsap.set(image, {
  //       opacity: index === 0 ? 1 : 0,
  //       visibility: index === 0 ? 'visible' : 'hidden',
  //     });
  //   });
  // }

  // function activateTab(index, isManualClick = false) {
  //   if (currentTabIndex !== index) {
  //     if (lineAnimation) {
  //       lineAnimation.kill();
  //     }

  //     const prevTab = tabs[currentTabIndex];
  //     const newTab = tabs[index];

  //     animateTab(prevTab, false);
  //     currentTabIndex = index;
  //     animateTab(newTab, true, isManualClick);
  //     transitionImages(index);

  //     // Update ARIA attributes
  //     tabs.forEach((tab, i) => {
  //       const head = tab.querySelector('.autotab_head');
  //       head.setAttribute('aria-selected', i === index ? 'true' : 'false');
  //     });
  //   }
  // }

  // function animateTab(tab, isActive, isManualClick = false) {
  //   const body = tab.querySelector('.autotab_body');
  //   const line = tab.querySelector('.autotab_line');
  //   const lineInner = tab.querySelector('.autotab_line-inner');

  //   tab.classList.toggle('is-active', isActive);

  //   gsap.to(body, {
  //     height: isActive ? 'auto' : 0,
  //     duration: 0.5,
  //   });

  //   gsap.to(line, {
  //     opacity: isActive ? 1 : 0,
  //     duration: 0.5,
  //   });

  //   if (isActive) {
  //     lineAnimation = gsap.to(lineInner, {
  //       height: '100%',
  //       duration: isManualClick ? AUTO_PLAY_DELAY / 1000 : 6,
  //       ease: 'none',
  //       onComplete: () => {
  //         if (!isHovering) {
  //           nextTab();
  //         }
  //       },
  //     });
  //   } else {
  //     gsap.to(lineInner, {
  //       height: '0%',
  //       duration: 0.5,
  //       ease: 'none',
  //     });
  //   }
  // }

  // function transitionImages(activeIndex) {
  //   images.forEach((image, index) => {
  //     gsap.to(image, {
  //       opacity: index === activeIndex ? 1 : 0,
  //       visibility: index === activeIndex ? 'visible' : 'hidden',
  //       duration: 0.5,
  //       ease: 'power2.inOut',
  //     });
  //   });
  // }

  // function nextTab() {
  //   activateTab((currentTabIndex + 1) % tabs.length);
  // }

  // let isDesktopView = false;

  // function initTabComponent() {
  //   setupTabs();

  //   scrollTrigger = ScrollTrigger.create({
  //     trigger: tabComponent,
  //     start: 'top center',
  //     markers: false,
  //     onEnter: () => {
  //       startAnimation();
  //     },
  //     onLeaveBack: () => {
  //       // Reset when scrolling back up
  //       if (lineAnimation) {
  //         lineAnimation.kill();
  //       }
  //       resetTabsForDesktop();
  //     },
  //   });
  // }

  // function startAnimation() {
  //   // Start the animation for the first tab
  //   currentTabIndex = 0;
  //   animateTab(tabs[0], true, false);
  // }

  // function resetTabsForDesktop() {
  //   currentTabIndex = 0;
  //   tabs.forEach((tab, index) => {
  //     const body = tab.querySelector('.autotab_body');
  //     const line = tab.querySelector('.autotab_line');
  //     const lineInner = tab.querySelector('.autotab_line-inner');
  //     if (index === 0) {
  //       gsap.set(body, { height: 'auto' });
  //       gsap.set(line, { opacity: 1 });
  //       gsap.set(lineInner, { height: '0%' });
  //     } else {
  //       gsap.set(body, { height: 0 });
  //       gsap.set(line, { opacity: 0 });
  //       gsap.set(lineInner, { height: '0%' });
  //     }
  //   });
  //   images.forEach((image, index) => {
  //     gsap.set(image, {
  //       opacity: index === 0 ? 1 : 0,
  //       visibility: index === 0 ? 'visible' : 'hidden',
  //     });
  //   });
  // }

  // // Use GSAP's matchMedia for responsive behavior
  // const mm = gsap.matchMedia();

  // mm.add('(min-width: 992px)', () => {
  //   if (!isDesktopView) {
  //     isDesktopView = true;
  //     resetTabsForDesktop();
  //     initTabComponent();

  //     // If the component is already in view, start the animation
  //     if (ScrollTrigger.isInViewport(tabComponent)) {
  //       startAnimation();
  //     }
  //   }
  //   return () => {
  //     if (scrollTrigger) scrollTrigger.kill();
  //     if (lineAnimation) lineAnimation.kill();
  //     isDesktopView = false;
  //   };
  // });

  // mm.add('(max-width: 991px)', () => {
  //   if (isDesktopView) {
  //     if (scrollTrigger) scrollTrigger.kill();
  //     if (lineAnimation) lineAnimation.kill();
  //     resetTabsForMobile();
  //     isDesktopView = false;
  //   }
  // });

  // function resetTabsForMobile() {
  //   tabs.forEach((tab) => {
  //     const body = tab.querySelector('.autotab_body');
  //     const line = tab.querySelector('.autotab_line');
  //     gsap.set(body, { height: 'auto' });
  //     gsap.set(line, { opacity: 1 });
  //   });
  //   images.forEach((image) => {
  //     gsap.set(image, { opacity: 1, visibility: 'visible' });
  //   });
  // }

  // // Handle resize events
  // window.addEventListener('resize', () => {
  //   mm.revert(); // This will re-run the correct media query
  // });
});
