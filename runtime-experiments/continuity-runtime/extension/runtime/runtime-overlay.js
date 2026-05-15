function initializeContinuityOverlay() {
  const existingOverlay = document.getElementById('continuity-runtime-overlay');

  if (existingOverlay) {
    console.log('continuity_runtime_overlay_reused');
    return existingOverlay;
  }

  const overlay = document.createElement('div');

  overlay.id = 'continuity-runtime-overlay';

  overlay.innerHTML = `
    <div style="font-weight:bold;margin-bottom:6px;">
      Continuity Runtime
    </div>
    <div>Environment: ${location.hostname}</div>
    <div>Runtime: ACTIVE</div>
    <div>Version: ${window.CONTINUITY_RUNTIME_CONFIG?.runtimeVersion || 'unknown'}</div>
  `;

  overlay.style.position = 'fixed';
  overlay.style.bottom = '16px';
  overlay.style.right = '16px';
  overlay.style.zIndex = '999999';
  overlay.style.background = 'rgba(20,20,20,0.95)';
  overlay.style.color = '#ffffff';
  overlay.style.padding = '12px';
  overlay.style.borderRadius = '8px';
  overlay.style.fontFamily = 'Arial, sans-serif';
  overlay.style.fontSize = '12px';
  overlay.style.border = '1px solid #333';

  document.body.appendChild(overlay);

  console.log('continuity_runtime_overlay_initialized');

  return overlay;
}

window.initializeContinuityOverlay = initializeContinuityOverlay;
