window.Webflow ||= [];
window.Webflow.push(() => {
  /*-------------------------------------------------------*/
  /* DECODE URL PARAMS                                     */
  /*-------------------------------------------------------*/
  const getUrlParameter = function getUrlParameter(sParam) {
    let sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        return typeof sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
    return '';
  };
  /*-------------------------------------------------------*/
  /* DECODE URL PARAMS                                     */
  /*-------------------------------------------------------*/

  const pagePath = new URL(document.URL).pathname + '-popup';

  if (window.localStorage.getItem(pagePath) === 'true' || getUrlParameter('popup') === 'false') {
    document.querySelector('.sign-up_component').style.display = 'none';
    document.querySelector('.rich-text-wrap').style.maxHeight = 'none';
  }

  window.addEventListener('message', function (event) {
    if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmit') {
      document.querySelector('[fs-modal-element=close-2]').click();
      window.localStorage.setItem(pagePath, 'true');
      setTimeout(() => {
        document.querySelector('.sign-up_component').style.display = 'none';
        document.querySelector('.rich-text-wrap').style.maxHeight = 'none';
      }, 400);
    }
  });

  /*-------------------------------------------------------*/
  /* VIDEO POPUP                                           */
  /*-------------------------------------------------------*/

  document.querySelectorAll('.image_component .image_link:not([href="#"])').forEach((videoLink) => {
    videoLink.style.pointerEvents = 'auto';

    if (videoLink.target !== '_blank') {
      const videoUrl = videoLink.href;
      const youtubeId = getYoutubeId(videoUrl);

      videoLink.href = '#';

      let player = document.createElement('div');
      player.classList.add('fs_modal_video-embed');
      player.style.height = '100%';
      player.style.width = '100%';
      player.style.position = 'absolute';
      player.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

      videoLink.addEventListener('click', (e) => {
        document.querySelector('.fs_modal_video').appendChild(player);
      });
    } else {
      videoLink.removeAttribute('aria-roledescription');
      videoLink.removeAttribute('aria-haspopup');
      videoLink.removeAttribute('aria-controls');
      videoLink.removeAttribute('fs-modal-element');
    }
  });

  document.querySelectorAll('[fs-modal-element="close-1"]').forEach((link) => {
    link.addEventListener('click', () => {
      document
        .querySelector('[fs-modal-element="modal-1"] .fs_modal_video .fs_modal_video-embed')
        .remove();
    });
  });

  function getYoutubeId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return 'Unable to extract YouTube ID';
    }
  }

  /*-------------------------------------------------------*/
  /* VIDEO POPUP                                           */
  /*-------------------------------------------------------*/

  /*-------------------------------------------------------*/
  /* SHARE FUNCTIONALTIY                                   */
  /*-------------------------------------------------------*/

  const title = document.title,
    // description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    url = new URL(document.URL).origin + new URL(document.URL).pathname;

  document
    .querySelector('[data-name="twitter"]')
    .setAttribute(
      'href',
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}: ${encodeURIComponent(
        url
      )}`
    );
  document
    .querySelector('[data-name="email"]')
    .setAttribute(
      'href',
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
    );
  document
    .querySelector('[data-name="linkedin"]')
    .setAttribute(
      'href',
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    );

  document.querySelector('[data-name="url"]').addEventListener('click', function (e) {
    e.preventDefault();
    let clipboardInput = document.createElement('input');
    document.body.appendChild(clipboardInput);
    clipboardInput.value = url;
    clipboardInput.select();
    document.execCommand('copy');
    document.body.removeChild(clipboardInput);
  });

  /*-------------------------------------------------------*/
  /* SHARE FUNCTIONALTIY                                   */
  /*-------------------------------------------------------*/

  /*-------------------------------------------------------*/
  /* NUMBER ANIMATION                                      */
  /*-------------------------------------------------------*/

  function isInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function animateNumber(element, numberFloat, numberString, duration, decimal) {
    let start = null;
    let someValue = 0;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      someValue = (numberFloat * progress) / duration;
      if (someValue > numberFloat) someValue = numberFloat;
      element.textContent =
        numberString[0] +
        (Math.round((someValue + Number.EPSILON) * 1 * decimal) / (1 * decimal))
          .toString()
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') +
        numberString[1];
      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent =
          numberString[0] +
          (Math.round((someValue + Number.EPSILON) * 1 * decimal) / (1 * decimal))
            .toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') +
          numberString[1];
      }
    }

    window.requestAnimationFrame(step);
  }

  let baseEasings = {};
  ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'].forEach((name, i) => {
    baseEasings[name] = function (p) {
      return Math.pow(p, i + 2);
    };
  });

  const duration = 1500;

  document.querySelectorAll('.stat_heading').forEach(function (el, index) {
    const numberFloat = parseFloat(el.textContent.match(/[0-9.,]+/)[0]);
    const numberString = el.textContent.split(/[0-9.,]+/);

    let fired = false;
    let decimal = 10;
    if (!(numberFloat % 1 != 0)) decimal = 1;

    el.textContent = '0';

    const checkFireState = () => {
      if (isInViewport(el) && !fired) {
        animateNumber(el, numberFloat, numberString, duration, decimal);
        fired = true;
      }
    };

    window.addEventListener('load', checkFireState);
    window.addEventListener('resize', checkFireState);
    window.addEventListener('scroll', checkFireState);
  });

  /*-------------------------------------------------------*/
  /* NUMBER ANIMATION                                      */
  /*-------------------------------------------------------*/
});
