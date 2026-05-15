async function loadRuntimeRegistry() {
  const registryPaths = {
    sources: './runtime/registry/runtime-sources.json',
    profiles: './runtime/registry/runtime-profiles.json',
    policies: './runtime/registry/injection-policies.json'
  };

  const registry = {};

  for (const [key, path] of Object.entries(registryPaths)) {
    try {
      const response = await fetch(path);
      registry[key] = await response.json();

      console.log('runtime_registry_loaded', {
        registry: key,
        path
      });
    } catch (error) {
      console.error('runtime_registry_load_failed', {
        registry: key,
        path,
        error
      });
    }
  }

  window.continuityRuntimeRegistry = registry;

  return registry;
}

window.loadRuntimeRegistry = loadRuntimeRegistry;
