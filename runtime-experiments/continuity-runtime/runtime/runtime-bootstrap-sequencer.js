async function bootstrapContinuityRuntime() {
  console.log('continuity_runtime_bootstrap_started');

  const registry = await window.loadRuntimeRegistry();

  if (!registry) {
    console.error('continuity_runtime_bootstrap_failed', {
      reason: 'registry_load_failure'
    });

    return;
  }

  const source = window.resolveRuntimeSource(window.location.hostname);

  if (!source) {
    console.warn('continuity_runtime_bootstrap_partial', {
      reason: 'source_not_resolved'
    });

    return;
  }

  window.continuityRuntime = {
    registry,
    source,
    initializedAt: new Date().toISOString(),
    status: 'active'
  };

  console.log('continuity_runtime_bootstrap_complete', {
    source: source.id,
    profile: source.runtimeProfile,
    policy: source.policy
  });
}

window.bootstrapContinuityRuntime = bootstrapContinuityRuntime;
