async function initializeCanonicalContinuityRuntime() {
  console.log('canonical_continuity_runtime_bootstrap_started');

  if (window.initializeContinuityOverlay) {
    window.initializeContinuityOverlay();
  }

  if (window.discoverContinuityReadmes) {
    window.discoverContinuityReadmes();
  }

  console.log('canonical_continuity_runtime_bootstrap_complete');
}

initializeCanonicalContinuityRuntime();
