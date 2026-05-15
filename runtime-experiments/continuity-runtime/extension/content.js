console.log('Continuity Membrane overlay injected');

async function injectRuntimeScript(path) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.src = chrome.runtime.getURL(path);
    script.onload = () => resolve(path);
    script.onerror = error => reject(error);

    (document.head || document.documentElement).appendChild(script);
  });
}

async function initializeRuntimeInjection() {
  try {
    const runtimeScripts = [
      'runtime/runtime-registry-loader.js',
      'runtime/runtime-source-resolver.js',
      'runtime/runtime-bootstrap-sequencer.js',
      'runtime/runtime-entry.js'
    ];

    for (const script of runtimeScripts) {
      await injectRuntimeScript(script);

      console.log('runtime_script_injected', {
        script
      });
    }

    const overlay = document.createElement('div');

    overlay.id = 'continuity-membrane-overlay';
    overlay.innerText = 'Continuity Membrane Active';

    overlay.style.position = 'fixed';
    overlay.style.bottom = '16px';
    overlay.style.right = '16px';
    overlay.style.padding = '8px 12px';
    overlay.style.background = '#111';
    overlay.style.color = '#fff';
    overlay.style.border = '1px solid #444';
    overlay.style.zIndex = '999999';
    overlay.style.fontFamily = 'Arial, sans-serif';
    overlay.style.fontSize = '12px';

    document.body.appendChild(overlay);

    console.log('continuity_runtime_injection_complete');
  } catch (error) {
    console.error('continuity_runtime_injection_failed', error);
  }
}

initializeRuntimeInjection();
