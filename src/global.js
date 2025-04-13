import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import CustomEase from 'gsap/CustomEase';
import Swiper from 'swiper';
import { Keyboard, Mousewheel } from 'swiper/modules';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(Observer);

window.Webflow ||= [];
window.Webflow.push(() => {
  let mm = gsap.matchMedia();

  // add a media query. When it matches, the associated function will run
  mm.add('(min-width: 991px)', () => {
    // Create a timeline
    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.section_hero',
        start: '50% center',
        end: '55% center',
        // markers: true,
        toggleActions: 'play none reverse none',
      },
    });

    // Add animations to the timeline
    heroTimeline
      .to('.section_hero', {
        duration: 0.5,
        ease: 'power1.inOut',
        transformOrigin: 'top center',
        paddingLeft: '6rem',
        paddingRight: '6rem',
        paddingBottom: '6rem',
      })
      .to(
        '.section_hero .background-wrapper',
        {
          // left: '-4.5rem',
          // right: '-4.5rem',
          width: 'calc(100% + 9rem)',
          duration: 0.5,
          ease: 'power1.inOut',
        },
        '<'
      ); // The "<" makes this animation start at the same time as the previous one
  });

  if (document.querySelectorAll('[data-element=hubspot-form]').length) {
    console.log(document.querySelectorAll('[data-element=hubspot-form]'));
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

          onFormSubmitted: (form, data) => {
            // console.log(form, data);
            // if (
            //   form.getAttribute('formid') === '' &&
            //   data.submissionValues.key === ('hoi' || 'bye')
            // ) {
            //   window.location.replace(
            //     redirectUrls[Math.floor(Math.random() * redirectUrls.length)]
            //   );
            // }
            // form.style.display = 'none';
            // document.querySelectorAll('[data-element="hubspot-show]').forEach((el) => {
            //   el.style.display = 'block';
            // });
            // document.querySelectorAll('[data-element="hubspot-hide]').forEach((el) => {
            //   el.style.display = 'none';
            // });
            // form.nextSibling.style.display = 'flex';
            // form.nextSibling.scrollIntoView({ behavior: 'instant' });
          },
          // onFormReady: () => {
          //   ScrollTrigger.refresh();
          // },
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

  // if (document.querySelectorAll('.platform-swiper_wrapper .platform-swiper_slide').length > 3) {
  // OFFER SWIPER CODE
  let slideCount = document.querySelectorAll(
    '.platform-swiper_wrapper .platform-swiper_slide'
  ).length;
  // let BREAKPOINT = 1224;

  const BREAKPOINT = Math.min(slideCount * 360 + (slideCount - 1) * 24 + 80, 1320);
  console.log(BREAKPOINT);

  const DEBOUNCE_DELAY = 50;
  const swiperArgs = {
    modules: [Keyboard, Mousewheel],
    wrapperClass: 'platform-swiper_wrapper',
    slideClass: 'platform-swiper_slide',
    slidesPerView: 'auto',
    speed: 300,
    spaceBetween: 24,
    a11y: true,
    grabCursor: true,
    keyboard: false,
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
  // }

  // GENERIC DEBOUNCE FUNCTION
  function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }
});
