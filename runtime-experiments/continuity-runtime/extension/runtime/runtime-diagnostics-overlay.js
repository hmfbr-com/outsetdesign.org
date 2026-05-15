function renderRuntimeDiagnosticsOverlay() {
  const existing = document.getElementById('continuity-runtime-diagnostics');

  if (existing) {
    existing.remove();
  }

  const diagnostics = document.createElement('div');

  diagnostics.id = 'continuity-runtime-diagnostics';

  const modules = [
    'runtime-singleton',
    'runtime-state',
    'runtime-overlay',
    'runtime-readme-discovery',
    'runtime-topology',
    'runtime-bootstrap'
  ];

  diagnostics.innerHTML = `
    <div style="font-weight:bold;margin-bottom:8px;">
      Runtime Diagnostics
    </div>
    <div>Environment: ${location.hostname}</div>
    <div>Runtime: ${window.CONTINUITY_RUNTIME_CONFIG?.runtimeId || 'unknown'}</div>
    <div>Version: ${window.CONTINUITY_RUNTIME_CONFIG?.runtimeVersion || 'unknown'}</div>
    <div>Lifecycle: ${window.CONTINUITY_RUNTIME_STATE?.runtime || 'unknown'}</div>
    <div style="margin-top:8px;font-weight:bold;">Modules</div>
    <ul style="padding-left:16px; margin-top:4px;">
      ${modules.map(module => `<li>${module}</li>`).join('')}
    </ul>
  `;

  diagnostics.style.position = 'fixed';
  diagnostics.style.top = '16px';
  diagnostics.style.right = '16px';
  diagnostics.style.background = '#111';
  diagnostics.style.color = '#fff';
  diagnostics.style.padding = '12px';
  diagnostics.style.border = '1px solid #444';
  diagnostics.style.borderRadius = '8px';
  diagnostics.style.zIndex = '999999';
  diagnostics.style.fontFamily = 'Arial, sans-serif';
  diagnostics.style.fontSize = '12px';
  diagnostics.style.maxWidth = '320px';

  document.body.appendChild(diagnostics);

  console.log('runtime_diagnostics_overlay_rendered');
}

window.renderRuntimeDiagnosticsOverlay = renderRuntimeDiagnosticsOverlay;
