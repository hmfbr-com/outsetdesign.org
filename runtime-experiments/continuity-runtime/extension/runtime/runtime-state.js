window.CONTINUITY_RUNTIME_STATE = {
  runtime: 'ACTIVE',
  bootstrap: 'INITIALIZED',
  environment: location.hostname,
  updatedAt: new Date().toISOString()
};

console.log('continuity_runtime_state_initialized', {
  state: window.CONTINUITY_RUNTIME_STATE
});
