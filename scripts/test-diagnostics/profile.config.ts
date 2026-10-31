import config from '../../vitest.browser.config';
import {defineConfig} from 'vitest/config';

// Profile the same runtime with an existing small library suite, without changing resolution.
export default defineConfig({...config,
  // The profile setup imports signals directly. Prebundle it before any browser
  // loads a suite so late discovery cannot reload the active Vitest context.
  optimizeDeps: {...config.optimizeDeps, include: [...(config.optimizeDeps?.include || []), '@solidjs/signals']},
  test: {...config.test,
  setupFiles: [...(config.test!.setupFiles as string[]), './scripts/test-diagnostics/profile.ts']
}});
