window.CONTINUITY_RUNTIME_CONFIG = window.CONTINUITY_RUNTIME_CONFIG || {
  runtimeId: 'continuity-runtime-experiment',
  runtimeVersion: '0.1.3'
};

if (window.__CONTINUITY_RUNTIME_SINGLETON__) {
  console.log('continuity_runtime_singleton_reused');
} else {
  window.__CONTINUITY_RUNTIME_SINGLETON__ = {
    initializedAt: new Date().toISOString(),
    environment: location.hostname,
    runtimeId: window.CONTINUITY_RUNTIME_CONFIG.runtimeId,
    runtimeVersion: window.CONTINUITY_RUNTIME_CONFIG.runtimeVersion,
    overlays: [],
    topology: {},
    lifecycle: 'ACTIVE'
  };

  console.log('continuity_runtime_singleton_initialized', {
    runtime: window.__CONTINUITY_RUNTIME_SINGLETON__
  });
}
