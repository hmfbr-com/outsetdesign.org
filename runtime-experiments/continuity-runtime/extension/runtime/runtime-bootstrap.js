async function initializeCanonicalContinuityRuntime() {
  console.log('canonical_continuity_runtime_bootstrap_started');

  if (window.initializeReminderRegistry) {
    await window.initializeReminderRegistry();
  }

  if (window.initializeContinuityOverlay) {
    window.initializeContinuityOverlay();
  }

  if (window.renderRuntimeDiagnosticsOverlay) {
    window.renderRuntimeDiagnosticsOverlay();
  }

  if (window.discoverContinuityReadmes) {
    window.discoverContinuityReadmes();
  }

  window.addEventListener('keydown', async event => {
    if (event.altKey && event.key.toLowerCase() === 'c') {
      if (window.exportContinuityPacket) {
        await window.exportContinuityPacket();
      }
    }

    if (event.altKey && event.key.toLowerCase() === 'r') {
      event.preventDefault();

      if (window.captureContinuityReminder) {
        await window.captureContinuityReminder();
      }
    }
  });

  console.log('canonical_continuity_runtime_bootstrap_complete');
}

initializeCanonicalContinuityRuntime();
