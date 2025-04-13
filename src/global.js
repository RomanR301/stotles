import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
// import Swiper from 'swiper';
// import { Keyboard, Mousewheel } from 'swiper/modules';

gsap.registerPlugin(ScrollTrigger, Observer);

window.Webflow ||= [];
window.Webflow.push(() => {
  let mm = gsap.matchMedia();

  // Navigation
  const nav = document.querySelector('.nav_component');
  if (nav) {
    // Set initial state
    gsap.set(nav, { yPercent: 0 });

    let lastScrollTop = 0;
    let scrollThreshold = 50; // Debounce threshold in pixels
    let navVisible = true;
    let scrollDistance = 0;
    let lastDirection = null;

    // Create ScrollTrigger for nav hide/show behavior
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const scrollTop = self.scroll();
        const currentDirection = scrollTop > lastScrollTop ? 'down' : 'up';

        // Check if direction changed
        if (lastDirection !== currentDirection) {
          // Direction changed, reset distance counter
          scrollDistance = 0;
          lastDirection = currentDirection;
        } else {
          // Still going in the same direction, add to the distance
          scrollDistance += Math.abs(scrollTop - lastScrollTop);
        }

        // Only trigger animation after scrolling threshold distance in a direction
        if (scrollDistance > scrollThreshold) {
          if (currentDirection === 'down' && navVisible) {
            // Hide nav when scrolling down
            gsap.to(nav, {
              yPercent: -100,
              duration: 0.5,
              ease: 'power2.inOut',
            });
            navVisible = false;
            scrollDistance = 0; // Reset after animation
          } else if (currentDirection === 'up' && !navVisible) {
            // Show nav when scrolling up
            gsap.to(nav, {
              yPercent: 0,
              duration: 0.5,
              ease: 'power2.inOut',
            });
            navVisible = true;
            scrollDistance = 0; // Reset after animation
          }
        }

        // Save current scroll position for next comparison
        lastScrollTop = scrollTop;
      },
    });
  }

  if (document.querySelector('.section_hero')) {
    // add a media query. When it matches, the associated function will run
    mm.add('(min-width: 991px)', () => {
      if (document.querySelector('.section_hero .svg-graphic')) {
        gsap.fromTo(
          '.section_hero .svg-graphic',
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            delay: 0.35,
            duration: 1.5,
            ease: 'power1.out',
            opacity: 1,
            scale: 1,
            stagger: {
              each: 0.0075,
              from: 'random',
            },
          }
        );
      }

      // Create a timeline
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.section_hero',
          start: 'bottom bottom-=50px',
          // markers: true,
          onEnter: () => {
            gsap
              .timeline()
              .to('.section_hero', {
                duration: 0.5,
                ease: 'power1.out',

                transformOrigin: 'top center',
                paddingLeft: '6rem',
                paddingRight: '6rem',
                paddingBottom: '6rem',
              })
              .to(
                '.section_hero-wrapper',
                {
                  duration: 0.5,
                  ease: 'power1.out',
                  borderRadius: '2.5rem',
                },
                '<'
              );
          },
          onLeaveBack: () => {
            gsap
              .timeline()
              .to('.section_hero', {
                duration: 0.5,
                ease: 'power1.out',

                transformOrigin: 'top center',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                paddingBottom: '1.5rem',
              })
              .to(
                '.section_hero-wrapper',
                {
                  duration: 0.5,
                  ease: 'power1.out',
                  borderRadius: '1.25rem',
                },
                '<'
              );
          },
        },
      });
    });
  }

  if (document.querySelectorAll('[data-element=hubspot-form]').length) {
    // Create a new script element
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//js.hsforms.net/forms/embed/v2.js';

    // Append the script to the body (or head, depending on your needs)
    document.body.appendChild(script);

    (window.hsFormsOnReady = window.hsFormsOnReady || []).push(() => {
      document.querySelectorAll('[data-element=hubspot-form]').forEach((form, i) => {
        form.setAttribute('hubspot-form-index', i);

        hbspt.forms.create({
          region: 'na1',
          portalId: '5746318',
          formId: form.getAttribute('formId'),
          css: '',
          cssClass: '',
          submitButtonClass: 'button',
          target: `[data-element="hubspot-form"][hubspot-form-index="${i}"]`,

          //onFormSubmitted: (form, data) => {},
          onFormReady: () => {
            ScrollTrigger.refresh();
          },
        });
      });
    });
  }

  // Select all elements with the 'data-counter' attribute
  const counterElements = document.querySelectorAll('[data-counter]');

  counterElements.forEach((element) => {
    const text = element.textContent;
    const match = text.match(/\d+/);

    if (match) {
      const targetNumber = parseInt(match[0], 10);
      const prefix = text.slice(0, match.index);
      const suffix = text.slice(match.index + match[0].length);

      // Create a proxy object to animate
      const obj = { value: 0 };
      element.textContent = prefix + obj.value + suffix;

      gsap.to(obj, {
        scrollTrigger: {
          trigger: element,
          start: 'center bottom',
          // markers: true,
        },
        value: targetNumber,
        duration: 5, // Animation duration in seconds
        ease: 'power3.out', // You can change this easing function
        onUpdate: function () {
          const currentValue = Math.round(obj.value);
          element.textContent = prefix + currentValue + suffix;
        },
        onComplete: function () {
          element.textContent = prefix + targetNumber + suffix;
        },
      });
    }
  });

  // ————— LOGO SLIDER MARQUEE ————— //
  document.querySelectorAll('.bidding-tag_wrapper').forEach((item, index) => {
    // clone slideWrapper to fill up space
    item.append(item.querySelector('.bidding-tag_slide').cloneNode(true));
    item.append(item.querySelector('.bidding-tag_slide').cloneNode(true));

    let tl = gsap.timeline({ repeat: -1, onReverseComplete: () => tl.progress(1) });

    tl.to(item.querySelectorAll('.bidding-tag_slide'), {
      xPercent: index % 2 ? 100 : -100,
      duration: 140,
      ease: 'none',
    });

    let object = { value: 1 };

    Observer.create({
      target: window,
      type: 'wheel,touch',
      wheelSpeed: -1,
      onChangeY: (self) => {
        // let v = Math.abs(self.velocityY * -0.01);
        let v = self.velocityY * -0.01;
        v = gsap.utils.clamp(-3, 3, v);
        tl.timeScale(v);
        let resting = 1;
        if (v < 0) resting = -1;
        gsap.fromTo(
          object,
          { value: v },
          { value: resting, duration: 1, onUpdate: () => tl.timeScale(object.value) }
        );
      },
    });
  });
  // ————— LOGO SLIDER MARQUEE ————— //

  // OFFER SWIPER CODE
  let slideCount = document.querySelectorAll(
    '.platform-swiper_wrapper .platform-swiper_slide'
  ).length;
  const BREAKPOINT = Math.min(slideCount * 360 + (slideCount - 1) * 24 + 80, 1320);

  const DEBOUNCE_DELAY = 50;
  const swiperArgs = {
    // modules: [Keyboard, Mousewheel],
    wrapperClass: 'platform-swiper_wrapper',
    slideClass: 'platform-swiper_slide',
    slidesPerView: 'auto',
    speed: 400,
    spaceBetween: 24,
    a11y: true,
    grabCursor: true,
    mousewheel: { forceToAxis: true },
    keyboard: {
      onlyInViewport: true,
    },
    on: {
      beforeInit: (swiper) => {
        swiper.wrapperEl.style.justifyContent = 'left';
        swiper.wrapperEl.style.gridColumnGap = 'unset';
      },
    },
  };

  let packageSwiper = null;

  if (slideCount > 3) {
    packageSwiper = new Swiper('.platform-swiper_container', swiperArgs);
  } else {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth || document.documentElement.clientWidth;
      if (newWindowWidth <= BREAKPOINT) {
        if (!packageSwiper) {
          packageSwiper = new Swiper('.platform-swiper_container', swiperArgs);
        } else {
          packageSwiper.update();
        }
      } else if (packageSwiper) {
        packageSwiper.destroy(true, true);
        packageSwiper = null;
      }
    };

    window.addEventListener('resize', debounce(handleResize, DEBOUNCE_DELAY));
    handleResize();
  }
  // OFFER SWIPER CODE

  // GENERIC DEBOUNCE FUNCTION
  function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }
});
