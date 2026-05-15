const runtimeState = {
  environment: window.location.hostname,
  domReady: document.readyState,
  overlay: true,
  locality: false,
  manifest: false,
  clipboard: !!navigator.clipboard,
  continuityContext: false,
  version: '0.2'
}

function createPanel() {
  const panel = document.createElement('div')

  panel.id = 'continuity-runtime-panel'

  panel.style.position = 'fixed'
  panel.style.bottom = '16px'
  panel.style.right = '16px'
  panel.style.width = '340px'
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

function renderDiagnostics(panel) {
  panel.innerHTML = `
    <div style="font-weight:bold;margin-bottom:8px;">
      CONTINUITY RUNTIME
    </div>

    <div>Environment: ${runtimeState.environment}</div>
    <div>Runtime Version: ${runtimeState.version}</div>
    <div>DOM State: ${runtimeState.domReady}</div>

    <div style="margin-top:8px;font-weight:bold;">
      Capabilities
    </div>

    <div>Overlay: ${runtimeState.overlay ? 'ACTIVE' : 'INACTIVE'}</div>
    <div>Manifest: ${runtimeState.manifest ? 'LOADED' : 'PENDING'}</div>
    <div>Locality: ${runtimeState.locality ? 'LOADED' : 'PENDING'}</div>
    <div>Clipboard: ${runtimeState.clipboard ? 'READY' : 'UNAVAILABLE'}</div>
    <div>Context Runtime: ${runtimeState.continuityContext ? 'ACTIVE' : 'PENDING'}</div>

    <div style="margin-top:10px;">
      <button id="copy-continuity-context"
        style="background:#202020;color:#fff;border:1px solid #666;padding:8px 10px;cursor:pointer;">
        Copy Continuity Context
      </button>
    </div>

    <div id="runtime-events"
      style="margin-top:10px;border-top:1px solid #333;padding-top:8px;">
      <div style="font-weight:bold;margin-bottom:4px;">Runtime Events</div>
    </div>
  `
}

function logEvent(message) {
  const events = document.getElementById('runtime-events')

  if (!events) return

  const item = document.createElement('div')
  item.innerText = `[OK] ${message}`

  events.appendChild(item)
}

async function generateContinuityContext() {
  try {
    const localityResponse = await fetch('./locality-index.json')
    const locality = await localityResponse.json()

    runtimeState.locality = true

    const runtimeResponse = await fetch('./runtime-manifest.json')
    const runtime = await runtimeResponse.json()

    runtimeState.manifest = true
    runtimeState.continuityContext = true

    const packet = {
      timestamp: new Date().toISOString(),
      environment: runtimeState.environment,
      runtime: runtime.runtime,
      version: runtime.version,
      locality: locality.locality,
      neighbors: locality.neighbors.map(n => ({
        label: n.label,
        type: n.type,
        path: n.path
      }))
    }

    return JSON.stringify(packet, null, 2)
  } catch (error) {
    console.error('continuity_context_failed', error)
    return 'continuity context generation failed'
  }
}

async function copyContinuityContext() {
  const context = await generateContinuityContext()

  await navigator.clipboard.writeText(context)

  const notice = document.createElement('div')
  notice.innerText = 'Continuity context copied successfully'
  notice.style.position = 'fixed'
  notice.style.top = '16px'
  notice.style.left = '16px'
  notice.style.background = '#14532d'
  notice.style.color = '#f5f5f5'
  notice.style.padding = '10px'
  notice.style.border = '1px solid #1f7a45'
  notice.style.zIndex = '999999'

  document.body.appendChild(notice)

  logEvent('Continuity context copied')

  setTimeout(() => {
    notice.remove()
  }, 3000)
}

function initializeRuntime() {
  const panel = createPanel()

  renderDiagnostics(panel)

  logEvent('Overlay initialized')
  logEvent('Diagnostics rendered')

  const button = document.getElementById('copy-continuity-context')

  if (button) {
    button.onclick = copyContinuityContext
    logEvent('Clipboard runtime active')
  }

  generateContinuityContext().then(() => {
    renderDiagnostics(panel)
    logEvent('Manifest loaded')
    logEvent('Locality index loaded')
    logEvent('Continuity runtime active')
  })

  console.log('continuity_runtime_initialized', runtimeState)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeRuntime)
} else {
  initializeRuntime()
}
