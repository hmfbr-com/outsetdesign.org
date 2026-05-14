async function loadLocalityIndex() {
  try {
    const response = await fetch('./locality-index.json')
    const locality = await response.json()

    renderLocalityOverlay(locality)

    console.log('recursive_locality_loaded', locality)
  } catch (error) {
    console.error('recursive_locality_failed', error)
  }
}

function renderLocalityOverlay(locality) {
  const overlay = document.createElement('div')

  overlay.id = 'recursive-locality-overlay'

  overlay.style.position = 'fixed'
  overlay.style.top = '16px'
  overlay.style.right = '16px'
  overlay.style.width = '320px'
  overlay.style.padding = '12px'
  overlay.style.background = '#161616'
  overlay.style.color = '#f5f5f5'
  overlay.style.border = '1px solid #444'
  overlay.style.zIndex = '999999'
  overlay.style.fontFamily = 'Arial, sans-serif'
  overlay.style.fontSize = '12px'
  overlay.style.lineHeight = '1.5'

  const title = document.createElement('div')
  title.innerText = 'Nearby Localities'
  title.style.marginBottom = '8px'
  title.style.fontWeight = 'bold'

  overlay.appendChild(title)

  locality.neighbors.forEach(neighbor => {
    const item = document.createElement('div')

    item.style.marginBottom = '6px'

    const link = document.createElement('a')
    link.href = `./viewer.html?artifact=${encodeURIComponent(neighbor.path)}`
    link.innerText = neighbor.label
    link.style.color = '#8ecbff'
    link.style.textDecoration = 'none'

    item.appendChild(link)

    overlay.appendChild(item)
  })

  document.body.appendChild(overlay)
}

loadLocalityIndex()
