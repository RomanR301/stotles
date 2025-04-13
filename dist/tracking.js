(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/tracking.js
  document.addEventListener("DOMContentLoaded", function() {
    const forms = document.querySelectorAll("form");
    if (forms.length === 0)
      return;
    forms.forEach((form) => {
      console.log(form);
      const interactedFields = /* @__PURE__ */ new Set();
      let formInteractionTracked = false;
      form.querySelectorAll("input, select, textarea").forEach((input) => {
        const inputName = input.name || input.id || input.type;
        const trackInteraction = function() {
          if (!formInteractionTracked) {
            formInteractionTracked = true;
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "form_started_",
              form_id: form.id || "unnamed_form",
              form_url: window.location.href
            });
          }
          if (!interactedFields.has(inputName)) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "form_interaction",
              form_id: form.id || "unnamed_form",
              form_url: window.location.href,
              field_name: inputName
            });
            interactedFields.add(inputName);
          }
        };
        input.addEventListener("input", trackInteraction);
        if (input.type === "checkbox" || input.type === "radio") {
          input.addEventListener("change", trackInteraction);
        }
      });
    });
  });
})();
//# sourceMappingURL=tracking.js.map
