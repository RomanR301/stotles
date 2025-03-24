window.Webflow ||= [];
window.Webflow.push(() => {
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
          onFormSubmitted: () => {
            form.style.display = 'none';
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
