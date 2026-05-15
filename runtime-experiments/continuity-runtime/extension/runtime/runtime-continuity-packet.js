function exportContinuityPacket() {
  const packet = {
    timestamp: new Date().toISOString(),
    environment: location.hostname,
    runtime: window.CONTINUITY_RUNTIME_CONFIG?.runtimeId,
    version: window.CONTINUITY_RUNTIME_CONFIG?.runtimeVersion,
    topology: window.__CONTINUITY_RUNTIME_SINGLETON__?.topology || {},
    state: window.CONTINUITY_RUNTIME_STATE || {}
  };

  const serialized = JSON.stringify(packet, null, 2);

  navigator.clipboard.writeText(serialized);

  console.log('continuity_packet_exported', packet);

  return packet;
}

window.exportContinuityPacket = exportContinuityPacket;
