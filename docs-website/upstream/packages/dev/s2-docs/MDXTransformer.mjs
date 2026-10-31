import json5 from 'json5';
import {Transformer} from '@parcel/plugin';
import fs from 'node:fs';
import path from 'node:path';
import {neutralizeDemos} from './demo-policy.mjs';

export default new Transformer({
  async transform({asset}) {
    let code = await asset.getCode();

    let replaced = false;
    // Keep the upstream CodePlatter/source drawer. Only replace its live output
    // with the page owner's native mount when the fence imports a native wrapper.
    code = code.replace(/```(\w+)([^\n]*)\n([\s\S]*?)```/g, (fence, language, metadata, body) => {
      if (!/\brender\b/.test(metadata)) return fence;
      const explicitIsland = metadata.match(/\bsolid=['"]([^'"]+)['"]/);
      if (explicitIsland) {
        replaced = true;
        const root = path.join(path.dirname(new URL(import.meta.url).pathname), 'pages/react-aria');
        const moduleName = path.relative(root, path.resolve(path.dirname(asset.filePath), explicitIsland[1])).split(path.sep).join('/');
        return `\`\`\`${language}${metadata.replace(/\brender\b/, '').replace(explicitIsland[0], '')} nativeModule=${JSON.stringify(moduleName)}\n${body}\`\`\``;
      }
      const relativeImports = [...body.matchAll(/from\s+['"](\.[^'"]+)['"]/g)];
      const native = relativeImports.some(([, specifier]) => {
        const base = path.resolve(path.dirname(asset.filePath), specifier);
        const file = ['', '.tsx', '.ts', '.jsx', '.js'].map(ext => base + ext).find(file => fs.existsSync(file));
        return file && (/\/NativeDemo\.tsx$/.test(file) || /(?:solid-aria-components|@solidjs\/web|from ['"]solid-js)/.test(fs.readFileSync(file, 'utf8')));
      });
      const island = ['solid-demo.tsx', 'NativeDemo.tsx'].map(name => path.join(path.dirname(asset.filePath), name)).find(file => fs.existsSync(file));
      if (!native || !island) return fence;
      const pages = path.join(path.dirname(new URL(import.meta.url).pathname), 'pages/react-aria');
      const moduleName = path.relative(pages, island).split(path.sep).join('/');
      replaced = true;
      return `\`\`\`${language}${metadata.replace(/\brender\b/, '')} nativeModule=${JSON.stringify(moduleName)}\n${body}\`\`\``;
    });
    code = code.replace(
      /(<ExampleSwitcher type="component" examples={(\[.*?\])}>)((?:.|\n)*?)<\/ExampleSwitcher>/g,
      (m, start, examples, inner) => {
        if (inner.includes('COMPONENT')) {
          replaced = true;
          let components = json5.parse(examples);
          inner = components.map(component => inner.replace(/COMPONENT/g, component)).join('\n\n');
          return start + inner + '</ExampleSwitcher>';
        }

        return m;
      }
    );

    asset.setCode(neutralizeDemos(code, asset.filePath));

    return [asset];
  }
});
