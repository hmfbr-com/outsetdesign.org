async function initializeContinuityRuntime() {
  console.log('continuity_runtime_entry_started');

  try {
    await window.bootstrapContinuityRuntime();

    console.log('continuity_runtime_entry_complete', {
      runtime: window.continuityRuntime
    });
  } catch (error) {
    console.error('continuity_runtime_entry_failed', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeContinuityRuntime);
} else {
  initializeContinuityRuntime();
}
