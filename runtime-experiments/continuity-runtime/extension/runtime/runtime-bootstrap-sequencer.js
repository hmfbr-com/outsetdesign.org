window.bootstrapContinuityRuntime = async function () {
  console.log('continuity_runtime_bootstrap_started');

  const resolvedSources = window.resolveContinuityRuntimeSources();

  window.continuityRuntime = {
    initialized: true,
    environment: window.location.hostname,
    resolvedSources,
    initializedAt: new Date().toISOString()
  };

  console.log('continuity_runtime_bootstrap_complete', {
    runtime: window.continuityRuntime
  });
};
