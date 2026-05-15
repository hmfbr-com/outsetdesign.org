function discoverContinuityReadmes() {
  const links = [...document.querySelectorAll('a')];

  const readmes = links
    .map(link => link.href)
    .filter(href => href.includes('README'));

  console.log('continuity_readmes_discovered', {
    count: readmes.length,
    readmes
  });

  if (window.__CONTINUITY_RUNTIME_SINGLETON__) {
    window.__CONTINUITY_RUNTIME_SINGLETON__.topology.readmes = readmes;
  }

  return readmes;
}

window.discoverContinuityReadmes = discoverContinuityReadmes;
