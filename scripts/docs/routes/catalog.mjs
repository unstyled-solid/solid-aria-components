import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {createProcessor} from '@mdx-js/mdx';
import frontmatter from 'remark-frontmatter';
import slug from 'remark-slug';
import {toc} from 'mdast-util-toc';
import {visit} from 'unist-util-visit';
import ts from 'typescript';
import treeConverter from './catalog-toc.cjs';
import {staticMetadataValue} from './index.ts';

const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const frozen = '3bdef480e85ff135cd485e9f4511b98300127d4b';

export async function intakeSourceCatalog(manifestPath = 'scripts/docs/routes/catalog-source.json') {
  const manifestBytes = await fs.readFile(manifestPath);
  const manifest = JSON.parse(manifestBytes);
  if (manifest.sourceSha !== frozen || manifest.pages.length !== 334) throw new Error('Wrong frozen catalog scope/pin.');
  const parser = createProcessor({remarkPlugins: [[frontmatter, {type: 'yaml', anywhere: true, marker: '-'}]]});
  const pages = [], errors = [], seen = new Set();
  for (const entry of manifest.pages) {
    if (seen.has(entry.name)) throw new Error('Duplicate frozen source page: ' + entry.name);
    seen.add(entry.name);
    // Source byte failures invalidate intake, rather than becoming grammar debt.
    const captured = await fs.readFile(entry.capturePath), original = await fs.readFile(entry.sourcePath);
    if (sha(captured) !== entry.sha256 || sha(original) !== entry.sha256) throw new Error('Catalog source hash changed: ' + entry.name);
    try {
      const tree = parser.parse({value: captured.toString('utf8'), path: entry.sourcePath});
      const exports = {};
      for (const node of tree.children) {
        if (node.type === 'yaml') throw new Error('Source-specific YAML navigation export mapping requires intake: ' + entry.sourcePath);
        if (node.type !== 'mdxjsEsm') continue; // Runtime prose/JSX/fences are not metadata evaluation.
        const file = ts.createSourceFile(entry.name + '.tsx', node.value, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
        for (const statement of file.statements) {
          const modifiers = ts.canHaveModifiers(statement) ? ts.getModifiers(statement) : undefined;
          if (!modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) ||
              modifiers.some(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword)) continue;
          if (!ts.isVariableStatement(statement)) throw new Error('Unsupported named source metadata export: ' + statement.getText(file));
          for (const declaration of statement.declarationList.declarations) {
            if (!ts.isIdentifier(declaration.name) || !declaration.initializer) throw new Error('Unsupported source metadata declaration.');
            Object.defineProperty(exports, declaration.name.text, {
              value: staticMetadataValue(declaration.initializer, file), enumerable: true
            });
          }
        }
        // `export {x}` has no ExportKeyword modifier; do not silently drop it.
        if (file.statements.some(ts.isExportDeclaration)) throw new Error('Unsupported named reexport in source navigation metadata.');
      }
      slug()(tree);
      const levels = new Map();
      visit(tree, 'heading', node => {
        const id = node.data?.hProperties?.id;
        if (typeof id !== 'string') throw new Error('Parsed source heading missing slug ID.');
        levels.set(id, node.depth);
      });
      const map = toc(tree, {maxDepth: 6}).map;
      pages.push({name: entry.name, exports, tableOfContents: map ? treeConverter(map, levels, true) : [],
        sourceSha256: entry.sha256, sourcePath: entry.sourcePath, qualification: 'metadata-only; not built/rendered/available'});
    } catch (error) {
      errors.push({name: entry.name, sourcePath: entry.sourcePath, message: error.message});
    }
  }
  return {sourceSha: frozen, manifestSha256: sha(manifestBytes), pathCount: manifest.pages.length, pages, errors};
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const result = await intakeSourceCatalog();
  const destination = new URL('./catalog-metadata.json', import.meta.url);
  await fs.writeFile(destination, JSON.stringify(result, null, 2) + '\n');
  console.log(`Frozen catalog: ${result.pathCount} paths; ${result.pages.length} metadata records; ${result.errors.length} source-specific failures.`);
  if (result.errors.length) console.log(JSON.stringify(result.errors, null, 2));
}
