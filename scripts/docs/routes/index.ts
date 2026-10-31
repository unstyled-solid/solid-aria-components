import {AsyncLocalStorage} from 'node:async_hooks';
import {glob} from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';
import type {Page, PageMetadata, MetadataValue, PageExports, TocNode} from '../../../packages/dev/s2-docs/src/Page';

interface SourceToc {id: string; textContent: string; children: SourceToc[]}
export interface CompiledMDXMetadataInput {jsx: string; metadata: {tableOfContents: SourceToc[]}}
export interface DocsMetadataContextOptions {pagesRoot: string; catalogRoot?: string; projectRoot?: string}
interface MetadataContext extends DocsMetadataContextOptions {
  projectRoot: string;
  pages: Map<string, Promise<PageMetadata>>;
  catalog: Promise<string[]> | null;
  pageResult: Promise<Page[]> | null;
}

const contexts = new AsyncLocalStorage<MetadataContext>();

export function withDocsMetadataContext<T>({pagesRoot, catalogRoot, projectRoot = process.cwd()}: DocsMetadataContextOptions, callback: () => T): T {
  return contexts.run({pagesRoot: path.resolve(pagesRoot), catalogRoot: catalogRoot && path.resolve(catalogRoot),
    projectRoot, pages: new Map(), catalog: null, pageResult: null}, callback);
}

function context() {
  const current = contexts.getStore();
  if (!current) throw new Error('Docs metadata requires an explicit owned build/request context.');
  return current;
}

export function staticMetadataValue(node: ts.Expression, file: ts.SourceFile): MetadataValue {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(item => staticMetadataValue(item, file));
  if (ts.isObjectLiteralExpression(node)) {
    const value: {[key: string]: MetadataValue} = {};
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property) ||
          !(ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) || ts.isNumericLiteral(property.name))) {
        throw new Error(`Unsupported source metadata property: ${property.getText(file)}`);
      }
      Object.defineProperty(value, property.name.text, {value: staticMetadataValue(property.initializer, file),
        enumerable: true, configurable: true, writable: true});
    }
    return value;
  }
  throw new Error(`Unsupported source metadata expression: ${node.getText(file)}`);
}

// Read real named exports and heading levels from the actual MDX compilation.
// No page module evaluation (and therefore no fake Layout/API imports) occurs.
export function metadataFromCompiledMDX(result: CompiledMDXMetadataInput, name: string): PageMetadata {
  const file = ts.createSourceFile(name + '.jsx', result.jsx, ts.ScriptTarget.Latest, true, ts.ScriptKind.JSX);
  const parsed = ts.transpileModule(result.jsx, {fileName: name + '.jsx', reportDiagnostics: true,
    compilerOptions: {jsx: ts.JsxEmit.Preserve, target: ts.ScriptTarget.ESNext}});
  if (parsed.diagnostics?.length) throw new Error(`Compiled MDX could not be parsed for metadata: ${name}`);
  const exports: PageExports = {};
  for (const statement of file.statements) {
    const modifiers = ts.canHaveModifiers(statement) ? ts.getModifiers(statement) : undefined;
    if (!modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;
    if (modifiers.some(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword)) continue;
    if (!ts.isVariableStatement(statement)) throw new Error(`Unsupported named MDX metadata export: ${statement.getText(file)}`);
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.initializer) throw new Error(`Unsupported MDX metadata declaration: ${name}`);
      if (declaration.name.text === 'tableOfContents') continue; // Dedicated real compiler metadata below.
      Object.defineProperty(exports, declaration.name.text, {value: staticMetadataValue(declaration.initializer, file), enumerable: true});
    }
  }
  const levels = new Map<string, number>();
  function collectHeading(node: ts.Node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(file);
      const match = /^(?:_components\.)?h([1-6])$/.exec(tag);
      if (match) {
        const id = node.attributes.properties.find(attribute => ts.isJsxAttribute(attribute) && attribute.name.getText(file) === 'id');
        if (!id || !ts.isJsxAttribute(id) || !id.initializer || !ts.isStringLiteral(id.initializer)) {
          throw new Error(`Source heading lacks a literal compiler-generated ID: ${name}`);
        }
        levels.set(id.initializer.text, Number(match[1]));
      }
    }
    ts.forEachChild(node, collectHeading);
  }
  collectHeading(file);
  function convertToc(node: SourceToc): TocNode {
    if (typeof node.id !== 'string' || typeof node.textContent !== 'string' || !Array.isArray(node.children)) {
      throw new Error(`Unsupported actual MDX TOC node: ${name}`);
    }
    const level = levels.get(node.id);
    if (!level) throw new Error(`TOC ID missing from actual compiled headings: ${node.id}`);
    return {id: node.id, title: node.textContent, level, children: node.children.map(convertToc)};
  }
  if (!Array.isArray(result.metadata.tableOfContents)) throw new Error(`Missing actual MDX TOC: ${name}`);
  return {name, exports, tableOfContents: result.metadata.tableOfContents.map(convertToc)};
}

function sourceToc(value: unknown): value is SourceToc {
  return typeof value === 'object' && value !== null && 'id' in value && typeof value.id === 'string' &&
    'textContent' in value && typeof value.textContent === 'string' && 'children' in value &&
    Array.isArray(value.children) && value.children.every(sourceToc);
}

async function compileMetadata(file: string, projectRoot: string, name: string): Promise<PageMetadata> {
  // Actual native compiler module, checked at the JS/TS boundary rather than
  // assigning a fabricated declaration to the independently owned adapter.
  const moduleUrl = new URL('../mdx/index.mjs', import.meta.url).href;
  const module: unknown = await import(moduleUrl);
  if (typeof module !== 'object' || module === null || !('compileNativeMDXFile' in module) ||
      typeof module.compileNativeMDXFile !== 'function') throw new Error('Actual MDX compiler entry unavailable.');
  const result: unknown = await module.compileNativeMDXFile(file, {projectRoot});
  if (typeof result !== 'object' || result === null || !('jsx' in result) || typeof result.jsx !== 'string' ||
      !('metadata' in result) || typeof result.metadata !== 'object' || result.metadata === null ||
      !('tableOfContents' in result.metadata) || !Array.isArray(result.metadata.tableOfContents) ||
      !result.metadata.tableOfContents.every(sourceToc)) throw new Error('Actual MDX compiler metadata shape unsupported: ' + name);
  return metadataFromCompiledMDX({jsx: result.jsx, metadata: {tableOfContents: result.metadata.tableOfContents}}, name);
}

export function prepareDocsPageMetadata(name: string): Promise<PageMetadata> {
  const current = context();
  if (!name || name.includes('\\') || path.isAbsolute(name) || name.split('/').some(part => !part || part === '.' || part === '..')) {
    throw new Error('Unsafe docs page name: ' + name);
  }
  if (!current.pages.has(name)) {
    const file = path.join(current.pagesRoot, name + '.mdx');
    current.pages.set(name, compileMetadata(file, current.projectRoot, name));
  }
  const prepared = current.pages.get(name);
  if (!prepared) throw new Error('Native metadata cache did not retain page: ' + name);
  return prepared;
}

function metadataValue(value: unknown): value is MetadataValue {
  return value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' ||
    (Array.isArray(value) ? value.every(metadataValue) :
      typeof value === 'object' && value !== null && Object.values(value).every(metadataValue));
}
function pageExports(value: unknown): value is PageExports {
  if (typeof value !== 'object' || value === null || Array.isArray(value) || !Object.values(value).every(metadataValue)) return false;
  for (const key of ['title', 'description', 'version', 'section', 'group']) {
    if (key in value && typeof Reflect.get(value, key) !== 'string') return false;
  }
  for (const key of ['hideNav', 'omitFromNav', 'isSubpage']) {
    if (key in value && typeof Reflect.get(value, key) !== 'boolean') return false;
  }
  if ('tags' in value && (!Array.isArray(value.tags) || !value.tags.every(tag => typeof tag === 'string'))) return false;
  if ('relatedPages' in value && (!Array.isArray(value.relatedPages) || !value.relatedPages.every(page =>
    typeof page === 'object' && page !== null && 'title' in page && typeof page.title === 'string' &&
    'url' in page && typeof page.url === 'string'))) return false;
  return true;
}
function nativeToc(value: unknown): value is TocNode {
  return typeof value === 'object' && value !== null && 'title' in value && typeof value.title === 'string' &&
    'id' in value && typeof value.id === 'string' && 'level' in value && typeof value.level === 'number' &&
    'children' in value && Array.isArray(value.children) && value.children.every(nativeToc);
}
function pageMetadata(value: unknown): value is PageMetadata {
  return typeof value === 'object' && value !== null && 'name' in value && typeof value.name === 'string' &&
    'exports' in value && pageExports(value.exports) && 'tableOfContents' in value &&
    Array.isArray(value.tableOfContents) && value.tableOfContents.every(nativeToc);
}
function sameToc(left: TocNode[], right: TocNode[]): boolean {
  return left.length === right.length && left.every((node, i) => node.id === right[i].id &&
    node.title === right[i].title && node.level === right[i].level && sameToc(node.children, right[i].children));
}

export async function prepareDocsCatalogMetadata(manifestPath?: string): Promise<{prepared: number; errors: unknown[]}> {
  const current = context();
  const module: unknown = await import(new URL('./catalog.mjs', import.meta.url).href);
  if (typeof module !== 'object' || module === null || !('intakeSourceCatalog' in module) ||
      typeof module.intakeSourceCatalog !== 'function') throw new Error('Actual catalog source parser unavailable.');
  const result: unknown = await module.intakeSourceCatalog(manifestPath);
  if (typeof result !== 'object' || result === null || !('pages' in result) || !Array.isArray(result.pages) ||
      !('errors' in result) || !Array.isArray(result.errors) || !('pathCount' in result) || result.pathCount !== 334 ||
      !('sourceSha' in result) || result.sourceSha !== '3bdef480e85ff135cd485e9f4511b98300127d4b') {
    throw new Error('Unexpected actual frozen catalog result.');
  }
  let prepared = 0;
  const errors: unknown[] = [...result.errors];
  for (const page of result.pages) {
    if (!pageMetadata(page)) {
      errors.push({name: typeof page === 'object' && page !== null && 'name' in page ? page.name : '<unknown>',
        message: 'Unsupported source navigation metadata record shape; record not prepared.'});
      continue;
    }
    const existing = current.pages.get(page.name);
    if (existing) {
      const actual = await existing;
      if (JSON.stringify(actual.exports) !== JSON.stringify(page.exports) || !sameToc(actual.tableOfContents, page.tableOfContents)) {
        throw new Error('Source-only catalog disagrees with already prepared native page: ' + page.name);
      }
    } else {
      current.pages.set(page.name, Promise.resolve({name: page.name, exports: page.exports, tableOfContents: page.tableOfContents}));
      prepared++;
    }
  }
  current.pageResult = null;
  return {prepared, errors};
}

export async function getDocsCatalogMetadata(): Promise<PageMetadata[]> {
  const current = context();
  if (!current.catalogRoot) throw new Error('Full navigation metadata pending: authoritative catalogRoot not supplied.');
  current.catalog ??= (async () => {
    const names: string[] = [];
    // Preserve source getPages library-level glob and traversal order.
    for await (const file of glob('*/**/*.mdx', {cwd: current.catalogRoot})) names.push(file.replaceAll(path.sep, '/').slice(0, -4));
    return names;
  })();
  const names = await current.catalog;
  const missing = names.filter(name => !current.pages.has(name));
  if (missing.length) {
    throw new Error(`Full navigation metadata pending: ${missing.length} catalog pages not prepared: ${missing.join(', ')}`);
  }
  return Promise.all(names.map(name => {
    const metadata = current.pages.get(name);
    if (!metadata) throw new Error('Missing catalog metadata: ' + name);
    return metadata;
  }));
}

export function getDocsPages(resolveUrl: (name: string) => string): Promise<Page[]> {
  const current = context();
  current.pageResult ??= getDocsCatalogMetadata().then(pages =>
    pages.map(page => ({...page, url: resolveUrl(page.name)})));
  return current.pageResult;
}
