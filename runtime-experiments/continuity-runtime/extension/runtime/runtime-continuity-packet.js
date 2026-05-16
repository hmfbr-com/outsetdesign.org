async function exportContinuityPacket() {
  const reminders = window.CONTINUITY_REMINDER_REGISTRY || [];

  const packet = {
    timestamp: new Date().toISOString(),
    environment: location.hostname,
    runtime: window.CONTINUITY_RUNTIME_CONFIG?.runtimeId,
    version: window.CONTINUITY_RUNTIME_CONFIG?.runtimeVersion,
    topology: window.__CONTINUITY_RUNTIME_SINGLETON__?.topology || {},
    state: window.CONTINUITY_RUNTIME_STATE || {},

    reminders: reminders.slice(0, 5).map(reminder => ({
      id: reminder.id,
      title: reminder.title,
      sourceUrl: reminder.sourceUrl,
      pageTitle: reminder.pageTitle,
      timestamp: reminder.timestamp
    })),

    reminderRuntime: {
      total: reminders.length,
      exportState: 'ACTIVE'
    }
  };

  const serialized = JSON.stringify(packet, null, 2);

  await navigator.clipboard.writeText(serialized);

  console.log('continuity_packet_exported', packet);

  return packet;
}

window.exportContinuityPacket = exportContinuityPacket;
