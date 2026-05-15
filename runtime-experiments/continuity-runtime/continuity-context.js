const runtimeState = {
  environment: window.location.hostname,
  domReady: document.readyState,
  secureContext: window.isSecureContext,
  overlay: true,
  locality: false,
  manifest: false,
  clipboard: !!navigator.clipboard,
  continuityContext: false,
  clipboardWrites: 0,
  clipboardFailures: 0,
  lastError: null,
  version: '0.3'
}

let runtimePanel = null

function createPanel() {
  const panel = document.createElement('div')
  panel.id = 'continuity-runtime-panel'
  panel.style.position = 'fixed'
  panel.style.bottom = '16px'
  panel.style.right = '16px'
  panel.style.width = '360px'
  panel.style.background = '#111'
  panel.style.color = '#f5f5f5'
  panel.style.border = '1px solid #555'
  panel.style.padding = '12px'
  panel.style.zIndex = '999999'
  panel.style.fontFamily = 'Arial, sans-serif'
  panel.style.fontSize = '12px'
  panel.style.lineHeight = '1.5'
  document.body.appendChild(panel)
  return panel
}

function renderDiagnostics() {
  if (!runtimePanel) return

  runtimePanel.innerHTML = `
    <div style="font-weight:bold;margin-bottom:8px;">CONTINUITY RUNTIME</div>
    <div>Environment: ${runtimeState.environment}</div>
    <div>Runtime Version: ${runtimeState.version}</div>
    <div>DOM State: ${runtimeState.domReady}</div>
    <div>Secure Context: ${runtimeState.secureContext}</div>
    <div style="margin-top:8px;font-weight:bold;">Clipboard Metrics</div>
    <div>Writes: ${runtimeState.clipboardWrites}</div>
    <div>Failures: ${runtimeState.clipboardFailures}</div>
    <div style="margin-top:10px;">
      <button id="copy-continuity-context" style="background:#202020;color:#fff;border:1px solid #666;padding:8px 10px;cursor:pointer;">Copy Continuity Context</button>
    </div>
    <div id="runtime-events" style="margin-top:10px;border-top:1px solid #333;padding-top:8px;"><div style="font-weight:bold;margin-bottom:4px;">Runtime Events</div></div>
    <div id="runtime-errors" style="margin-top:10px;border-top:1px solid #552222;padding-top:8px;color:#ff9090;"><div style="font-weight:bold;margin-bottom:4px;">Runtime Errors</div><div>${runtimeState.lastError || 'none'}</div></div>
  `

  const button = document.getElementById('copy-continuity-context')
  if (button) button.onclick = copyContinuityContext
}

function logEvent(message) {
  const events = document.getElementById('runtime-events')
  if (!events) return
  const item = document.createElement('div')
  item.innerText = '[OK] ' + message
  events.appendChild(item)
}

function logError(message) {
  runtimeState.lastError = message
  console.error('continuity_runtime_error', message)
  renderDiagnostics()
}

async function generateContinuityContext() {
  const localityResponse = await fetch('./locality-index.json')
  const locality = await localityResponse.json()
  runtimeState.locality = true

  const runtimeResponse = await fetch('./runtime-manifest.json')
  const runtime = await runtimeResponse.json()
  runtimeState.manifest = true
  runtimeState.continuityContext = true

  return JSON.stringify({
    timestamp: new Date().toISOString(),
    environment: runtimeState.environment,
    runtime: runtime.runtime,
    version: runtime.version,
    locality: locality.locality
  }, null, 2)
}

async function copyContinuityContext() {
  logEvent('Clipboard request initiated')

  try {
    if (!window.isSecureContext) {
      throw new Error('Window not secure context')
    }

    if (!navigator.clipboard) {
      throw new Error('Clipboard API unavailable')
    }

    const context = await generateContinuityContext()

    await navigator.clipboard.writeText(context)

    runtimeState.clipboardWrites += 1
    renderDiagnostics()
    logEvent('Clipboard write success')
  } catch (error) {
    runtimeState.clipboardFailures += 1
    logError('Clipboard failure: ' + error.message)
  }
}

function initializeRuntime() {
  runtimeState.domReady = document.readyState
  runtimePanel = createPanel()
  renderDiagnostics()
  logEvent('Overlay initialized')
  logEvent('Secure context: ' + window.isSecureContext)

  generateContinuityContext().then(() => {
    renderDiagnostics()
    logEvent('Continuity runtime active')
  }).catch(error => {
    logError(error.message)
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeRuntime)
} else {
  initializeRuntime()
}
