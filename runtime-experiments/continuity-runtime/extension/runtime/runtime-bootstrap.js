async function initializeCanonicalContinuityRuntime() {
  console.log('canonical_continuity_runtime_bootstrap_started');

  if (window.initializeContinuityOverlay) {
    window.initializeContinuityOverlay();
  }

  if (window.renderRuntimeDiagnosticsOverlay) {
    window.renderRuntimeDiagnosticsOverlay();
  }

  if (window.discoverContinuityReadmes) {
    window.discoverContinuityReadmes();
  }

  window.addEventListener('keydown', event => {
    if (event.altKey && event.key.toLowerCase() === 'c') {
      if (window.exportContinuityPacket) {
        window.exportContinuityPacket();
      }
    }
  });

  console.log('canonical_continuity_runtime_bootstrap_complete');
}

initializeCanonicalContinuityRuntime();
