console.log('Continuity Membrane overlay injected')

const overlay = document.createElement('div')
overlay.id = 'continuity-membrane-overlay'
overlay.innerText = 'Continuity Membrane Active'

overlay.style.position = 'fixed'
overlay.style.bottom = '16px'
overlay.style.right = '16px'
overlay.style.padding = '8px 12px'
overlay.style.background = '#111'
overlay.style.color = '#fff'
overlay.style.border = '1px solid #444'
overlay.style.zIndex = '999999'
overlay.style.fontFamily = 'Arial, sans-serif'
overlay.style.fontSize = '12px'

document.body.appendChild(overlay)
