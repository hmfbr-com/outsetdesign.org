console.log('Continuity Membrane overlay injected');

const CONTINUITY_GLOBAL_CONFIG = {
  runtimeId: 'continuity-runtime-experiment',
  runtimeVersion: '0.2.1',
  overlayId: 'continuity-membrane-overlay',
  runtimeFlag: '__CONTINUITY_RUNTIME_ACTIVE__',
  runtimeScripts: [
    'runtime/runtime-registry-loader.js',
    'runtime/runtime-source-resolver.js',
    'runtime/runtime-bootstrap-sequencer.js',
    'runtime/runtime-singleton.js',
    'runtime/runtime-state.js',
    'runtime/runtime-overlay.js',
    'runtime/runtime-readme-discovery.js',
    'runtime/runtime-topology.js',
    'runtime/runtime-diagnostics-overlay.js',
    'runtime/runtime-continuity-packet.js',
    'runtime/runtime-bootstrap.js',
    'runtime/runtime-entry.js'
  ]
};

async function injectRuntimeScript(path) {
  return new Promise((resolve, reject) => {
    try {
      const script = document.createElement('script');
      const resolvedUrl = chrome.runtime.getURL(path);

      script.src = resolvedUrl;
      script.async = false;
      script.dataset.continuityRuntime = CONTINUITY_GLOBAL_CONFIG.runtimeId;

      script.onload = () => {
        console.log('runtime_script_load_success', {
          path,
          resolvedUrl
        });

        script.remove();

        resolve(path);
      };

      script.onerror = errorEvent => {
        console.error('runtime_script_load_failed', {
          path,
          resolvedUrl,
          errorEvent
        });

        reject({
          path,
          resolvedUrl,
          errorEvent
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
    if (window[CONTINUITY_GLOBAL_CONFIG.runtimeFlag]) {
      console.log('continuity_runtime_already_initialized');
      return;
    }

    window[CONTINUITY_GLOBAL_CONFIG.runtimeFlag] = true;

    console.log('continuity_runtime_injection_started');

    for (const runtimeScript of CONTINUITY_GLOBAL_CONFIG.runtimeScripts) {
      await injectRuntimeScript(runtimeScript);

      console.log('runtime_script_injected', {
        runtimeScript
      });
    }

    if (!document.getElementById(CONTINUITY_GLOBAL_CONFIG.overlayId)) {
      const overlay = document.createElement('div');

      overlay.id = CONTINUITY_GLOBAL_CONFIG.overlayId;
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
    }

    console.log('continuity_runtime_injection_complete', {
      runtime: CONTINUITY_GLOBAL_CONFIG.runtimeId,
      version: CONTINUITY_GLOBAL_CONFIG.runtimeVersion
    });
  } catch (error) {
    console.error('continuity_runtime_injection_failed', {
      error,
      runtime: CONTINUITY_GLOBAL_CONFIG.runtimeId
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeRuntimeInjection, {
    once: true
  });
} else {
  initializeRuntimeInjection();
}
