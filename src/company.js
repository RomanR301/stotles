import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('hello 123');

  const platformAiSwiper = new Swiper('.chill-swiper_container', {
    //modules: [Pagination, Mousewheel, Keyboard],
    wrapperClass: 'chill-swiper_wrapper',
    slideClass: 'chill-swiper_slide',
    slidesPerView: 'auto',
    speed: 300,
    spaceBetween: 16,
    a11y: true,
    grabCursor: true,
    keyboard: {
      onlyInViewport: true,
    },
    mousewheel: { forceToAxis: true },
    breakpoints: {
      768: {
        spaceBetween: 24,
      },
    },
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

  const teamImgSwiper = new Swiper('.team-img-swiper_container', {
    //modules: [Pagination, Mousewheel, Keyboard],
    wrapperClass: 'team-img-swiper_wrapper',
    slideClass: 'team-img-swiper_slide',
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    slidesPerView: 'auto',
    speed: 300,
    a11y: true,
    grabCursor: true,
    keyboard: {
      onlyInViewport: true,
    },
    mousewheel: { forceToAxis: true },

    on: {
      beforeInit: (swiper) => {
        swiper.wrapperEl.style.gridColumnGap = 'unset';
      },
    },
  });

  const teamSwiper = new Swiper('.team-swiper_container', {
    //modules: [Pagination, Mousewheel, Keyboard],
    wrapperClass: 'team-swiper_wrapper',
    slideClass: 'team-swiper_slide',
    direction: 'vertical',
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    slidesPerView: 1,
    speed: 300,
    a11y: true,
    grabCursor: true,
    keyboard: {
      onlyInViewport: true,
    },
    mousewheel: { forceToAxis: true },
    navigation: {
      nextEl: '.swiper_button.is-alternate.is-next',
      prevEl: '.swiper_button.is-alternate.is-prev',
    },
    thumbs: {
      swiper: teamImgSwiper,
    },
    on: {
      beforeInit: (swiper) => {
        swiper.wrapperEl.style.gridColumnGap = 'unset';
      },
    },
  });
});
