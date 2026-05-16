(function initializeReminderStorageModule() {
  const STORAGE_KEY = 'continuity-runtime-reminders-v0-1';

  async function loadReminders() {
    const result = await chrome.storage.local.get([STORAGE_KEY]);
    return result[STORAGE_KEY] || [];
  }

  async function saveReminders(reminders) {
    await chrome.storage.local.set({
      [STORAGE_KEY]: reminders
    });
  }

  async function addReminder(reminder) {
    const reminders = await loadReminders();

    reminders.unshift(reminder);

    const bounded = reminders.slice(0, 50);

    await saveReminders(bounded);

    return bounded;
  }

  window.CONTINUITY_REMINDER_STORAGE = {
    loadReminders,
    saveReminders,
    addReminder
  };

  console.log('[continuity-runtime] reminder storage initialized');
})();