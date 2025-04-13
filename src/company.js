import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from 'swiper/modules';
gsap.registerPlugin(ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  // TEAM IMAGES
  let customIndex = 0;
  let lastActiveIndex = 0;

  const setCirclePosition = (slide, index) => {
    const circle = slide.querySelector('.team_circle');
    const positions = [
      { inset: '0% auto auto 0%' }, // 4n+1
      { inset: '0% 0% auto auto' }, // 4n+2
      { inset: 'auto 0% 0% auto' }, // 4n+3
      { inset: 'auto auto 0% 0%' }, // 4n+4
    ];

    const positionIndex = ((index % 4) + 4) % 4;
    gsap.set(circle, positions[positionIndex]);
  };

  const teamImgSwiper = new Swiper('.team-img-swiper_container', {
    wrapperClass: 'team-img-swiper_wrapper',
    slideClass: 'team-img-swiper_slide',
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    slidesPerView: 'auto',
    speed: 400,
    a11y: true,
    on: {
      slideChangeTransitionStart: (swiper) => {
        // Determine slide direction
        const currentActiveIndex = swiper.activeIndex;
        const totalSlides = swiper.slides.length;

        // Check if we've moved forward or backward, considering the loop
        if (
          (currentActiveIndex > lastActiveIndex &&
            !(lastActiveIndex === 0 && currentActiveIndex === totalSlides - 1)) ||
          (lastActiveIndex === totalSlides - 1 && currentActiveIndex === 0)
        ) {
          customIndex++;
          // console.log('next', customIndex);
        } else {
          customIndex--;
          // console.log('prev', customIndex);
        }

        setCirclePosition(swiper.slides[currentActiveIndex], customIndex);

        // Update lastActiveIndex for the next transition
        lastActiveIndex = currentActiveIndex;
      },
    },
  });
  const teamSwiper = new Swiper('.team-swiper_container', {
    modules: [Navigation],
    wrapperClass: 'team-swiper_wrapper',
    slideClass: 'team-swiper_slide',
    direction: 'vertical',
    loop: true,
    effect: 'fade',
    allowTouchMove: false,
    fadeEffect: {
      crossFade: true,
    },
    slidesPerView: 1,
    speed: 400,
    a11y: true,
    navigation: {
      nextEl: '.swiper_button.is-alternate.is-next',
      prevEl: '.swiper_button.is-alternate.is-prev',
    },
    thumbs: {
      swiper: teamImgSwiper,
    },
    on: {
      init: (swiper) => {
        swiper.slideTo(Math.abs(Math.random() * swiper.slides.length), 0);
      },
      slideNextTransitionStart: function () {
        const activeSlide = this.slides[this.activeIndex];
        const prevSlide = this.slides[this.previousIndex];

        // Animate the active slide coming in from bottom
        gsap.fromTo(
          activeSlide.querySelector('.team-swiper_wrap'),
          { yPercent: 10 },
          { yPercent: 0, duration: 0.6, ease: 'power2.out' }
        );
      },
      slidePrevTransitionStart: function () {
        const activeSlide = this.slides[this.activeIndex];
        const prevSlide = this.slides[this.previousIndex];

        // Animate the active slide coming in from top
        gsap.fromTo(
          activeSlide.querySelector('.team-swiper_wrap'),
          { yPercent: -10 },
          { yPercent: 0, duration: 0.6, ease: 'power2.out' }
        );
      },
    },
  });
  // TEAM IMAGES

  // TEAM CHILL SWIPER
  const teamChillSwiper = new Swiper('.chill-swiper_container', {
    // modules: [Pagination, Mousewheel, Keyboard],
    wrapperClass: 'chill-swiper_wrapper',
    slideClass: 'chill-swiper_slide',
    slidesPerView: 'auto',
    speed: 400,
    spaceBetween: 24,
    a11y: true,
    grabCursor: true,
    keyboard: {
      onlyInViewport: true,
    },
    mousewheel: { forceToAxis: true },
    navigation: {
      nextEl: '.swiper_button.is-chill.is-next',
      prevEl: '.swiper_button.is-chill.is-prev',
    },
    on: {
      beforeInit: (swiper) => {
        swiper.wrapperEl.style.gridColumnGap = 'unset';
      },
    },
  });
  // TEAM CHILL SWIPER
});
