import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

window.Webflow ||= [];
window.Webflow.push(() => {
  const DURATION_IN = 1;
  const DURATION_OUT = 0.7;
  const EASE_IN = 'power2.out';
  const EASE_OUT = 'power2.out';
  const BLUR = 0.75;

  // CUSTOMER STORY
  document.querySelectorAll('.resource_article .resource_layout.is-study-1').forEach((card) => {
    const headingWrap = card.querySelector('.resource_study-text');
    const heading = card.querySelector('.resource_study-heading');
    const link = card.querySelector('.resource_button-wrap');
    const imageWrapper = card.querySelector('.resource_study-bg');

    const timeline = gsap.timeline({ paused: true });

    console.log(card, headingWrap, heading, link, imageWrapper);

    // Set initial states
    gsap.set(headingWrap, { y: '0rem' });
    gsap.set([heading, link], { display: 'none', opacity: 0, y: '1rem' });
    gsap.set(imageWrapper, { blur: '0rem', filter: 'blur(0rem)', webkitFilter: 'blur(0rem)' });

    // Create the timeline
    timeline
      .to(headingWrap, { y: '0.25rem', duration: DURATION_IN, ease: EASE_IN })
      .to(
        [heading, link],
        {
          display: (_, element) => (element === link ? 'flex' : 'block'),
          opacity: 1,
          y: '0rem',
          stagger: 0.1,
          duration: DURATION_IN,
          ease: EASE_IN,
        },
        '<'
      )
      .to(
        imageWrapper,
        {
          blur: `${BLUR}rem`,
          filter: `blur(${BLUR}rem)`,
          webkitFilter: `blur(${BLUR}rem)`,
          duration: DURATION_IN * 2,
          ease: EASE_IN,
        },
        '<'
      );

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

      if (isEntering) {
        timeline.play();
      } else {
        timeline.reverse();
      }
    };

    card.addEventListener('mouseenter', () => handleHover(true));
    card.addEventListener('mouseleave', () => handleHover(false));
  });

  // BLOG POST LAYOUT 1
  document.querySelectorAll('.resource_article .resource_layout.is-blog-1').forEach((card) => {
    const headingWrap = card.querySelector('.resource_blog-1-text');
    // const heading = card.querySelector('.heading-style-h4');
    const link = card.querySelector('.resource_button-wrap');
    const imageWrapper = card.querySelector('.resource_blog-1-image');

    const timeline = gsap.timeline({ paused: true });

    console.log(card, headingWrap, link, imageWrapper);

    // Set initial states
    gsap.set(headingWrap, { y: '0rem' });
    gsap.set([link], { display: 'none', opacity: 0, y: '1rem' });
    gsap.set(imageWrapper, { blur: '0rem', filter: 'blur(0rem)', webkitFilter: 'blur(0rem)' });

    // Create the timeline
    timeline
      .to(headingWrap, { y: '-22rem', duration: DURATION_IN, ease: EASE_IN })
      .to(
        [link],
        {
          display: (_, element) => (element === link ? 'flex' : 'block'),
          opacity: 1,
          y: '0rem',
          stagger: 0.1,
          duration: DURATION_IN,
          ease: EASE_IN,
        },
        '<'
      )
      .to(
        imageWrapper,
        {
          blur: `${BLUR}rem`,
          filter: `blur(${BLUR}rem)`,
          webkitFilter: `blur(${BLUR}rem)`,
          duration: DURATION_IN * 2,
          ease: EASE_IN,
        },
        '<'
      );

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

      if (isEntering) {
        timeline.play();
      } else {
        timeline.reverse();
      }
    };

    card.addEventListener('mouseenter', () => handleHover(true));
    card.addEventListener('mouseleave', () => handleHover(false));
  });

  // BLOG POST LAYOUT 2
  document.querySelectorAll('.resource_article .resource_layout.is-blog-2').forEach((card) => {
    const headingWrap = card.querySelector('.resource_blog-2-bg');
    const link = card.querySelector('.resource_button-wrap');

    const timeline = gsap.timeline({ paused: true });

    console.log(card, headingWrap, link);

    // Set initial states
    gsap.set(headingWrap, { height: 'auto' });
    gsap.set([link], { display: 'none', opacity: 0, y: '1rem' });

    // Create the timeline
    timeline.to(headingWrap, { height: '100%', duration: DURATION_IN, ease: EASE_IN }).to(
      [link],
      {
        display: (_, element) => (element === link ? 'flex' : 'block'),
        opacity: 1,
        y: '0rem',
        stagger: 0.1,
        duration: DURATION_IN,
        ease: EASE_IN,
      },
      '<'
    );

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

      if (isEntering) {
        timeline.play();
      } else {
        timeline.reverse();
      }
    };

    card.addEventListener('mouseenter', () => handleHover(true));
    card.addEventListener('mouseleave', () => handleHover(false));
  });

  // BLOG POST LAYOUT 3
  document.querySelectorAll('.resource_article .resource_layout.is-blog-3').forEach((card) => {
    const headingWrap = card.querySelector('.resource_blog-3-bg');
    const link = card.querySelector('.resource_button-wrap');

    const timeline = gsap.timeline({ paused: true });

    console.log(card, headingWrap, link);

    // Set initial states
    gsap.set(headingWrap, { height: 'auto' });
    gsap.set([link], { display: 'none', opacity: 0, y: '1rem' });

    // Create the timeline
    timeline.to(headingWrap, { height: '0%', duration: DURATION_IN, ease: EASE_IN }).to(
      [link],
      {
        display: (_, element) => (element === link ? 'flex' : 'block'),
        opacity: 1,
        y: '0rem',
        stagger: 0.1,
        duration: DURATION_IN,
        ease: EASE_IN,
      },
      '<'
    );

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

      if (isEntering) {
        timeline.play();
      } else {
        timeline.reverse();
      }
    };

    card.addEventListener('mouseenter', () => handleHover(true));
    card.addEventListener('mouseleave', () => handleHover(false));
  });

  // REPORT POST LAYOUT 2
  document.querySelectorAll('.resource_article .resource_layout.is-report-2').forEach((card) => {
    const headingWrap = card.querySelector('.resource_report-2-bg');
    const link = card.querySelector('.resource_button-wrap');

    const timeline = gsap.timeline({ paused: true });

    console.log(card, headingWrap, link);

    // Set initial states
    gsap.set(headingWrap, { height: 'auto' });
    gsap.set([link], { display: 'none', opacity: 0, y: '1rem' });

    // Create the timeline
    timeline.to(headingWrap, { height: '100%', duration: DURATION_IN, ease: EASE_IN }).to(
      [link],
      {
        display: (_, element) => (element === link ? 'flex' : 'block'),
        opacity: 1,
        y: '0rem',
        stagger: 0.1,
        duration: DURATION_IN,
        ease: EASE_IN,
      },
      '<'
    );

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

      if (isEntering) {
        timeline.play();
      } else {
        timeline.reverse();
      }
    };

    card.addEventListener('mouseenter', () => handleHover(true));
    card.addEventListener('mouseleave', () => handleHover(false));
  });
});
