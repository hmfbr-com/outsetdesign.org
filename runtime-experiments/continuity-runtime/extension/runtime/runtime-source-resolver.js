window.resolveContinuityRuntimeSources = function () {
  const hostname = window.location.hostname;

  const resolvedSources = {
    hostname,
    registry: window.continuityRuntimeRegistry || null,
    resolvedAt: new Date().toISOString()
  };

  console.log('runtime_source_resolved', resolvedSources);

  return resolvedSources;
};
