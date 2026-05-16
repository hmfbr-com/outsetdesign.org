(function initializeReminderRegistryModule() {
  async function initializeReminderRegistry() {
    const reminders = await window.CONTINUITY_REMINDER_STORAGE
      .loadReminders();

    window.CONTINUITY_REMINDER_REGISTRY = reminders;

    if (window.CONTINUITY_RUNTIME_STATE) {
      window.CONTINUITY_RUNTIME_STATE.reminders = {
        total: reminders.length,
        updatedAt: new Date().toISOString()
      };
    }

    console.log(
      '[continuity-runtime] reminder registry initialized',
      reminders.length
    );
  }

  window.initializeReminderRegistry = initializeReminderRegistry;
})();