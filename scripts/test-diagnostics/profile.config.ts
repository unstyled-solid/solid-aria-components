import config from '../../vitest.browser.config';
import {defineConfig} from 'vitest/config';

// Profile the same runtime with an existing small library suite, without changing resolution.
export default defineConfig({...config, test: {...config.test,
  setupFiles: [...(config.test!.setupFiles as string[]), './scripts/test-diagnostics/profile.ts']
}});
