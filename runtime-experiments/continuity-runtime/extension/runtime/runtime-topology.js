function inspectContinuityRuntimeTopology() {
  const topology = {
    environment: location.hostname,
    runtimeId: window.CONTINUITY_RUNTIME_CONFIG?.runtimeId || 'unknown',
    runtimeVersion: window.CONTINUITY_RUNTIME_CONFIG?.runtimeVersion || 'unknown',
    overlays: window.__CONTINUITY_RUNTIME_SINGLETON__?.overlays || [],
    topology: window.__CONTINUITY_RUNTIME_SINGLETON__?.topology || {},
    lifecycle: window.__CONTINUITY_RUNTIME_SINGLETON__?.lifecycle || 'UNKNOWN'
  };

  console.log('continuity_runtime_topology_inspected', topology);

  return topology;
}

window.inspectContinuityRuntimeTopology = inspectContinuityRuntimeTopology;
