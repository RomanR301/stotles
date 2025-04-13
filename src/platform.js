// import Swiper from 'swiper';
// import { Scrollbar, Mousewheel, Keyboard, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  // STICKY IMAGES
  let mm = gsap.matchMedia();

  mm.add('(min-width: 991px)', () => {
    const rows = Array.from(document.querySelectorAll('.sticky_row'));
    const images = Array.from(document.querySelectorAll('.sticky_image-wrapper:not(.show-tablet)'));
    const offset = images[0].offsetHeight;

    const animationConfig = {
      yOffsetFactor: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    };

    let currentAnimation = null;
    let currentImageIndex = 0;

    rows.forEach((row, index) => {
      if (index === 0) return; // Skip the first row

      ScrollTrigger.create({
        trigger: row.querySelector('.sticky_content'),
        start: `top center+=${offset / 2}px`,
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
  // STICKY IMAGES

  // AI EMPOWERED SWIPER
  const platformAiSwiper = new Swiper('.platform-ai-swiper_container', {
    // modules: [Pagination, Mousewheel, Keyboard],
    wrapperClass: 'platform-ai-swiper_wrapper',
    slideClass: 'platform-ai-swiper_slide',
    slidesPerView: 'auto',
    speed: 400,
    spaceBetween: 24,
    a11y: true,
    grabCursor: true,
    keyboard: {
      onlyInViewport: true,
    },
    mousewheel: { forceToAxis: true },
    pagination: {
      clickable: true,
      el: '.swiper-pagination',
      bulletClass: 'swiper-bullet',
      bulletActiveClass: 'swiper-bullet-active',
    },
    on: {
      beforeInit: (swiper) => {
        swiper.wrapperEl.style.gridColumnGap = 'unset';
      },
    },
  });
  // AI EMPOWERED SWIPER
});
