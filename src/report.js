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
    document.querySelector('.section_report-content > div:first-child').style.maxHeight = 'none';
  }

  window.addEventListener('message', function (event) {
    if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmit') {
      const getFormId = event.data.id.toString();
      const getFormUrl = document
        .getElementById(`hsForm_${event.data.id}`)
        .getAttribute('action')
        .toString();

      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: 'download_report_form_submitted',
        form_id: getFormId,
        form_url: getFormUrl,
        lead_id: localStorage.getItem('lead_id'),
      });

      document.querySelector('[fs-modal-element=close-2]').click();
      window.localStorage.setItem(pagePath, 'true');
      setTimeout(() => {
        document.querySelector('.sign-up_component').style.display = 'none';
        document.querySelector('.section_report-content > div:first-child').style.maxHeight =
          'none';
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

  window.FinsweetAttributes ||= [];
  window.FinsweetAttributes.push([
    'toc',

    () => {
      document.querySelectorAll('.section-heading_overline-wrap').forEach((overline) => {
        // First, check if we're dealing with a DOM element
        if (!(overline instanceof Element)) {
          // console.error('Not a DOM element:', overline);
          return;
        }

        // Find the container with fs-toc-element="contents"
        const tocContainer = overline.closest('[fs-toc-element="contents"]');

        if (!tocContainer) {
          // console.log('Not inside a TOC container');
          return;
        }

        // Get all direct child divs with IDs that have scroll-margin-top
        const sections = Array.from(
          tocContainer.querySelectorAll('div[id][style*="scroll-margin-top"]')
        );

        // Find the current section (the one containing our overline)
        // or the first section if the overline is directly in the toc container
        let currentSectionIndex = -1;

        if (tocContainer.contains(overline) && overline.parentElement === tocContainer) {
          // The overline is directly in the toc container
          currentSectionIndex = -1; // Will target the first section
        } else {
          // Find which section contains our overline
          for (let i = 0; i < sections.length; i++) {
            if (sections[i].contains(overline)) {
              currentSectionIndex = i;
              break;
            }
          }
        }

        // Get the next section
        const nextSection = sections[currentSectionIndex + 1];

        // If we found a next section
        if (nextSection) {
          // console.log('Found next section:', nextSection.id);

          // Clone the overline element
          const overlineClone = overline.cloneNode(true);

          // Insert at the beginning of the next section
          nextSection.insertBefore(overlineClone, nextSection.firstChild);

          // Remove the original
          overline.remove();

          // console.log('Moved overline element to next section');
        }
      });
    },
  ]);
});
