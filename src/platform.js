// import Swiper from 'swiper';
// import { Scrollbar, Mousewheel, Keyboard, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  // const platformAiSwiper = new Swiper('.platform-ai-swiper_container', {
  //   modules: [Pagination, Mousewheel, Keyboard],
  //   wrapperClass: 'platform-ai-swiper_wrapper',
  //   slideClass: 'platform-ai-swiper_slide',
  //   slidesPerView: 'auto',
  //   speed: 300,
  //   spaceBetween: 32,
  //   a11y: true,
  //   grabCursor: true,
  //   keyboard: {
  //     onlyInViewport: true,
  //   },
  //   mousewheel: { forceToAxis: true },
  //   pagination: {
  //     clickable: true,
  //     el: '.swiper-pagination',
  //     bulletClass: 'swiper-bullet',
  //     bulletActiveClass: 'swiper-bullet-active',
  //   },
  //   breakpoints: {
  //     992: {
  //       spaceBetween: 48,
  //     },
  //   },
  //   on: {
  //     beforeInit: (swiper) => {
  //       swiper.wrapperEl.style.gridColumnGap = 'unset';
  //     },
  //   },
  // });

  //   if (document.querySelectorAll('.platform-swiper_wrapper .platform-swiper_slide').length > 3) {
  //     // OFFER SWIPER CODE
  //     const BREAKPOINT = 991;
  //     const DEBOUNCE_DELAY = 50;
  //     const swiperArgs = {
  //       modules: [Keyboard, Mousewheel],
  //       wrapperClass: 'platform-swiper_wrapper',
  //       slideClass: 'platform-swiper_slide',
  //       slidesPerView: 'auto',
  //       speed: 300,
  //       spaceBetween: 32,
  //       a11y: true,
  //       grabCursor: true,
  //       keyboard: false,
  //       mousewheel: { forceToAxis: true },
  //       keyboard: {
  //         onlyInViewport: true,
  //       },
  //       on: {
  //         beforeInit: (swiper) => {
  //           swiper.wrapperEl.style.gridColumnGap = 'unset';
  //         },
  //       },
  //     };
  //     let packageSwiper = null;
  //     const handleResize = () => {
  //       const newWindowWidth = window.innerWidth || document.documentElement.clientWidth;
  //       if (newWindowWidth >= BREAKPOINT) {
  //         if (!packageSwiper) {
  //           packageSwiper = new Swiper('.platform-swiper_container', swiperArgs);
  //         } else {
  //           packageSwiper.update();
  //         }
  //       } else if (packageSwiper) {
  //         packageSwiper.destroy(true, true);
  //         packageSwiper = null;
  //       }
  //     };
  //     window.addEventListener('resize', debounce(handleResize, DEBOUNCE_DELAY));
  //     handleResize();
  //     // OFFER SWIPER CODE
  //   }
  // });

  // // GENERIC DEBOUNCE FUNCTION
  // function debounce(func, delay) {
  //   let timeoutId;
  //   return (...args) => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => func(...args), delay);
  //   };
  // }

  let mm = gsap.matchMedia();

  mm.add('(min-width: 991px)', () => {
    const rows = Array.from(document.querySelectorAll('.sticky_row'));
    const images = Array.from(document.querySelectorAll('.sticky_image-wrapper:not(.show-tablet)'));

    console.log(images);

    const animationConfig = {
      yOffsetFactor: 2,
      duration: 0.45,
      ease: 'power1.inOut',
    };

    let currentAnimation = null;
    let currentImageIndex = 0;

    rows.forEach((row, index) => {
      if (index === 0) return; // Skip the first row

      ScrollTrigger.create({
        trigger: row.querySelector('.sticky_content'),
        start: 'top 55%',
        // markers: true,
        onEnter: () => animateImages(index),
        onLeaveBack: () => animateImages(index - 1),
      });
    });

    function animateImages(newIndex) {
      if (currentAnimation) {
        currentAnimation.kill();
      }

      const oldIndex = currentImageIndex;
      currentImageIndex = newIndex;

      const tl = gsap.timeline();

      // Fade out the old image and any other visible images
      images.forEach((img, idx) => {
        if (idx !== newIndex) {
          tl.to(
            img,
            {
              yPercent: animationConfig.yOffsetFactor,
              opacity: 0,
              duration: animationConfig.duration,
              ease: animationConfig.ease,
            },
            idx === oldIndex ? 0 : '<'
          );
        }
      });

      // Fade in the new image
      tl.fromTo(
        images[newIndex],
        { yPercent: animationConfig.yOffsetFactor, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: animationConfig.duration,
          ease: animationConfig.ease,
        },
        '<'
      );

      currentAnimation = tl;
    }

    // Initialize the first image
    gsap.set(images[0], { opacity: 1, yPercent: 0 });
    images
      .slice(1)
      .forEach((img) => gsap.set(img, { opacity: 0, yPercent: animationConfig.yOffsetFactor }));
  });
});
