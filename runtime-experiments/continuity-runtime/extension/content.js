console.log('Continuity Membrane overlay injected');

async function injectRuntimeScript(path) {
  return new Promise((resolve, reject) => {
    try {
      const script = document.createElement('script');
      const resolvedUrl = chrome.runtime.getURL(path);

      script.src = resolvedUrl;
      script.async = false;

      script.onload = () => {
        console.log('runtime_script_load_success', {
          path,
          resolvedUrl
        });

        script.remove();

        resolve(path);
      };

      script.onerror = error => {
        console.error('runtime_script_load_failed', {
          path,
          resolvedUrl,
          error
        });

        reject({
          path,
          resolvedUrl,
          error
        });
      };

      (document.head || document.documentElement).appendChild(script);
    } catch (error) {
      reject({
        path,
        error
      });
    }
  });
}

async function initializeRuntimeInjection() {
  try {
    console.log('continuity_runtime_injection_started');

    const runtimeScripts = [
      'runtime/runtime-registry-loader.js',
      'runtime/runtime-source-resolver.js',
      'runtime/runtime-bootstrap-sequencer.js',
      'runtime/runtime-entry.js'
    ];

    for (const runtimeScript of runtimeScripts) {
      await injectRuntimeScript(runtimeScript);

      console.log('runtime_script_injected', {
        runtimeScript
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeRuntimeInjection);
} else {
  initializeRuntimeInjection();
}
