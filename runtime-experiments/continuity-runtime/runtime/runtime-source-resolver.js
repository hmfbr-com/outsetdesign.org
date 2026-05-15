function resolveRuntimeSource(hostname) {
  const registry = window.continuityRuntimeRegistry;

  if (!registry || !registry.sources) {
    console.error('runtime_source_resolution_failed', {
      reason: 'registry_missing'
    });

    return null;
  }

  const sources = registry.sources.sources || [];

  const source = sources.find(source => {
    return source.domains.some(domain => hostname.includes(domain));
  });

  if (!source) {
    console.warn('runtime_source_not_found', {
      hostname
    });

    return null;
  }

  console.log('runtime_source_resolved', {
    hostname,
    source: source.id,
    profile: source.runtimeProfile,
    policy: source.policy
  });

  window.continuityRuntimeSource = source;

  return source;
}

window.resolveRuntimeSource = resolveRuntimeSource;
