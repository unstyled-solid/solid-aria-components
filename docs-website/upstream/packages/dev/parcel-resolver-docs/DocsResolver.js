/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const {Resolver} = require('@parcel/plugin');
const NodeResolver = require('@parcel/node-resolver-core').default;
const path = require('path');
const fs = require('fs');

module.exports = new Resolver({
  loadConfig({options}) {
    return new NodeResolver({
      fs: options.inputFS,
      projectRoot: options.projectRoot,
      extensions: ['ts', 'tsx', 'd.ts', 'js'],
      mainFields: ['source', 'types', 'main'],
      packageExports: true
    });
  },
  async resolve({dependency, options, specifier, config: resolver}) {
    if (
      dependency.specifier.startsWith('docs:') ||
      dependency.specifier.startsWith('apiCheck:') ||
      dependency.pipeline === 'docs' ||
      dependency.pipeline === 'docs-json' ||
      dependency.pipeline === 'apiCheck'
    ) {
      // The isolated source copy includes the real API implementation. Modern
      // published dist/types layouts cannot use the old ../src rewrite below.
      const clean = specifier.replace(/^(docs|docs-json|apiCheck):/, '');
      if (clean.startsWith('.') && clean.endsWith('.js')) {
        const base = path.resolve(path.dirname(dependency.resolveFrom), clean.slice(0, -3));
        const filePath = ['.ts', '.d.ts', '.tsx', '.js'].map(ext => base + ext).find(file => fs.existsSync(file));
        if (filePath) return {filePath, sideEffects: true};
      }
      const parts = clean.split('/');
      const count = clean.startsWith('@') ? 2 : 1;
      const packageName = parts.slice(0, count).join('/');
      const copied = path.resolve(__dirname, '../../', packageName);
      const manifest = path.join(copied, 'package.json');
      if (fs.existsSync(manifest)) {
        const pkg = JSON.parse(fs.readFileSync(manifest, 'utf8'));
        const subpath = parts.slice(count).join('/');
        const base = path.join(copied, subpath ? `exports/${subpath}` : pkg.source || 'src/index.ts');
        const bases = subpath ? [base, path.join(copied, subpath)] : [base];
        const filePath = bases.flatMap(base => ['', '.ts', '.tsx', '.d.ts', '.js', '/index.ts'].map(ext => base + ext)).find(file => fs.existsSync(file) && fs.statSync(file).isFile());
        if (filePath) return {filePath, sideEffects: true};
      }
      let resolved = await resolver.resolve({
        filename: specifier,
        specifierType: dependency.specifierType,
        parent: dependency.resolveFrom,
        env: dependency.env,
        sourcePath: dependency.sourcePath,
        packageConditions: ['source', 'types']
      });

      if (resolved && resolved.filePath) {
        // HACK: ensure source code is used to build types, not compiled code.
        // Parcel removes the source field from package.json when the code comes from node_modules.
        // these are full filepaths, so don't check if they start with the pattern, they won't
        if (
          (/@(react-spectrum|react-aria|react-stately|internationalized|spectrum-icons|adobe\/react-spectrum)/g.test(
            resolved.filePath
          ) ||
            /react-aria-components/g.test(resolved.filePath)) &&
          resolved.filePath.endsWith('.d.ts')
        ) {
          resolved.filePath = path.resolve(
            path.dirname(resolved.filePath),
            '..',
            'src',
            'index.ts'
          );
        }

        resolved.filePath = await options.inputFS.realpath(resolved.filePath);
        resolved.sideEffects = true;
        return resolved;
      }
    }

    if (
      /^(@(react-spectrum|react-aria)\/(.*?)|react-aria-components)\/docs\/(.*)$/.test(specifier)
    ) {
      let baseDir = process.env.DOCS_ENV === 'production' ? 'docs' : 'packages';
      return {filePath: path.join(options.projectRoot, baseDir, specifier)};
    }

    if (
      /^((@(react-spectrum|react-aria|react-stately|internationalized|spectrum-icons|adobe\/react-spectrum))|react-aria-components|react-aria|react-stately)\/.*package.json$/.test(
        specifier
      )
    ) {
      let resolved = await resolver.resolve({
        filename: specifier,
        specifierType: dependency.specifierType,
        parent: dependency.resolveFrom,
        env: dependency.env,
        sourcePath: dependency.sourcePath
      });

      return resolved;
    }
  }
});
