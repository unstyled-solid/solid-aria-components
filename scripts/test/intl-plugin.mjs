/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// Terminal-copied from upstream lib/jestResolver.js: retain its wildcard locale
// map and actual ICU compiler, adapting resolver/cache transport to Vite modules.
import {createRequire} from 'node:module';
import path from 'node:path';
import fs from 'node:fs';

const {compileStrings} = createRequire(import.meta.url)('../../packages/@internationalized/string-compiler/src/stringCompiler.js');

const prefix = '\0intl-messages:';
export function intlJsonPlugin() {
  return {
    name: 'source-intl-messages',
    resolveId(source, importer) {
      if (importer && /\/intl\/.*\*\.json$/.test(source)) {
        return prefix + path.resolve(path.dirname(importer), source.replace('*.json', ''));
      }
    },
    load(id) {
      if (!id.startsWith(prefix)) return;
      const directory = id.slice(prefix.length);
      const files = fs.readdirSync(directory).filter(file => file.endsWith('.json')).sort();
      const messages = files.map(file => {
        const filename = path.join(directory, file);
        this.addWatchFile(filename);
        const compiled = compileStrings(JSON.parse(fs.readFileSync(filename, 'utf8')), {format: 'esm'});
        return `${JSON.stringify(path.basename(file, '.json'))}: ${compiled.replace(/^export default /, '')}`;
      });
      return `export default {${messages.join(',\n')}};`;
    }
  };
}
