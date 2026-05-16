(function initializeReminderCaptureModule() {
  function getSelectedText() {
    return window.getSelection().toString().trim();
  }

  function buildReminderObject(selectedText) {
    return {
      id: crypto.randomUUID(),
      title: selectedText.slice(0, 80),
      content: selectedText,
      sourceUrl: window.location.href,
      pageTitle: document.title,
      timestamp: Date.now(),
      type: 'continuity-reminder'
    };
  }

  async function captureContinuityReminder() {
    const selectedText = getSelectedText();

    if (!selectedText) {
      console.warn('[continuity-runtime] no selected text');
      return;
    }

    const reminder = buildReminderObject(selectedText);

    const reminders = await window.CONTINUITY_REMINDER_STORAGE
      .addReminder(reminder);

    window.CONTINUITY_REMINDER_REGISTRY = reminders;

    if (window.CONTINUITY_RUNTIME_STATE) {
      window.CONTINUITY_RUNTIME_STATE.reminders = {
        total: reminders.length,
        updatedAt: new Date().toISOString()
      };
    }

    if (window.renderContinuityOverlay) {
      window.renderContinuityOverlay();
    }

    console.log('[continuity-runtime] reminder captured', reminder);
  }

  window.captureContinuityReminder = captureContinuityReminder;
})();