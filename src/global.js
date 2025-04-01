import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

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
        markers: true,
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
});
