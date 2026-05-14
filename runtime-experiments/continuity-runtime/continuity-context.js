async function generateContinuityContext() {
  try {
    const localityResponse = await fetch('./locality-index.json')
    const locality = await localityResponse.json()

    const runtimeResponse = await fetch('./runtime-manifest.json')
    const runtime = await runtimeResponse.json()

    const packet = {
      timestamp: new Date().toISOString(),
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
  notice.innerText = 'Continuity context copied'
  notice.style.position = 'fixed'
  notice.style.bottom = '16px'
  notice.style.left = '16px'
  notice.style.background = '#1b1b1b'
  notice.style.color = '#f5f5f5'
  notice.style.padding = '10px'
  notice.style.border = '1px solid #444'
  notice.style.zIndex = '999999'

  document.body.appendChild(notice)

  setTimeout(() => {
    notice.remove()
  }, 2500)
}

function renderContinuityButton() {
  const button = document.createElement('button')

  button.innerText = 'Copy Continuity Context'

  button.style.position = 'fixed'
  button.style.bottom = '16px'
  button.style.right = '16px'
  button.style.background = '#202020'
  button.style.color = '#f5f5f5'
  button.style.border = '1px solid #555'
  button.style.padding = '10px 14px'
  button.style.cursor = 'pointer'
  button.style.zIndex = '999999'

  button.onclick = copyContinuityContext

  document.body.appendChild(button)
}

renderContinuityButton()
