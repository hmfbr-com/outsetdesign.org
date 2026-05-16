function renderReminderList(reminders) {
  if (!reminders || reminders.length === 0) {
    return '<div style="margin-top:8px;opacity:0.7;">No reminders</div>';
  }

  return reminders
    .slice(0, 5)
    .map(reminder => {
      return `
        <div
          class="continuity-runtime-reminder"
          data-reminder-id="${reminder.id}"
          style="margin-top:6px;padding:6px;border:1px solid #444;border-radius:6px;cursor:pointer;background:rgba(255,255,255,0.04);"
        >
          ${reminder.title}
        </div>
      `;
    })
    .join('');
}

function attachReminderInteractions(overlay) {
  overlay.querySelectorAll('.continuity-runtime-reminder')
    .forEach(element => {
      element.addEventListener('click', async () => {
        const reminderId = element.dataset.reminderId;

        const reminders = window.CONTINUITY_REMINDER_REGISTRY || [];

        const reminder = reminders.find(item => item.id === reminderId);

        if (!reminder) {
          return;
        }

        await navigator.clipboard.writeText(reminder.content);

        console.log('[continuity-runtime] reminder copied');
      });
    });
}

function renderContinuityOverlay() {
  const reminders = window.CONTINUITY_REMINDER_REGISTRY || [];

  let overlay = document.getElementById('continuity-runtime-overlay');

  if (!overlay) {
    overlay = document.createElement('div');

    overlay.id = 'continuity-runtime-overlay';

    overlay.style.position = 'fixed';
    overlay.style.bottom = '16px';
    overlay.style.right = '16px';
    overlay.style.zIndex = '999999';
    overlay.style.background = 'rgba(20,20,20,0.95)';
    overlay.style.color = '#ffffff';
    overlay.style.padding = '12px';
    overlay.style.borderRadius = '8px';
    overlay.style.fontFamily = 'Arial, sans-serif';
    overlay.style.fontSize = '12px';
    overlay.style.border = '1px solid #333';
    overlay.style.maxWidth = '320px';

    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div style="font-weight:bold;margin-bottom:6px;">
      Continuity Runtime
    </div>
    <div>Environment: ${location.hostname}</div>
    <div>Runtime: ACTIVE</div>
    <div>Version: ${window.CONTINUITY_RUNTIME_CONFIG?.runtimeVersion || 'unknown'}</div>
    <div style="margin-top:8px;font-weight:bold;">
      Reminders (${reminders.length})
    </div>
    ${renderReminderList(reminders)}
  `;

  attachReminderInteractions(overlay);

  console.log('continuity_runtime_overlay_rendered');

  return overlay;
}

function initializeContinuityOverlay() {
  return renderContinuityOverlay();
}

window.initializeContinuityOverlay = initializeContinuityOverlay;
window.renderContinuityOverlay = renderContinuityOverlay;
