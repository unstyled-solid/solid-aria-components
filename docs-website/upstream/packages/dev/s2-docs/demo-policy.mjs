import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import {parse} from '@babel/parser';

const placeholder = '<div data-unavailable-demo="">TO BE DONE LATER</div>';
const metadata = new Set(['default', 'section', 'title', 'description', 'keywords', 'tags', 'relatedPages', 'hideNav', 'hideToc', 'isSubpage', 'hideFromSearch', 'omitFromNav', 'hideHeader', 'layout', 'image', 'date', 'author']);

/** Original files remain intact. Unported execution is commented in compiler input. */
export function neutralizeDemos(source, filename) {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(source);
  const edits = [];
  const denied = new Set();
  const comment = text => `{/* Unavailable demo execution (original retained):\n${text.replaceAll('*/', '* /')}\n*/}`;
  const change = (node, value) => edits.push({start: node.position.start.offset, end: node.position.end.offset, value});
  const walk = (node, fn) => { fn(node); for (const child of node.children || []) walk(child, fn); };
  walk(tree, node => {
    if (node.type !== 'mdxjsEsm') return;
    const ast = parse(node.value, {sourceType: 'module', plugins: ['typescript', 'jsx']});
    let chunks = [];
    for (const statement of ast.program.body) {
      const original = node.value.slice(statement.start, statement.end);
      if (statement.type === 'ImportDeclaration') {
        const specifier = statement.source.value;
        const allowed = specifier.startsWith('docs:') || specifier.startsWith('url:') || /\.(css|svg)$/.test(specifier) || /\/src\//.test(specifier) || specifier.startsWith('@react-spectrum/s2') || specifier === 'lucide-react' || specifier === '@internationalized/date' || specifier === '@internationalized/number' || specifier === './HomeHeader' || specifier === './home/components';
        if (!allowed) {
          for (const spec of statement.specifiers) denied.add(spec.local.name);
          chunks.push('/* Unavailable demo import: ' + original.replaceAll('*/', '* /') + ' */');
        } else chunks.push(original);
      } else if (statement.type === 'ExportDefaultDeclaration' && statement.declaration.type === 'Identifier' && statement.declaration.name === 'Layout') chunks.push(original);
      else if (statement.type === 'ExportNamedDeclaration' && statement.declaration?.type === 'VariableDeclaration' && statement.declaration.declarations.every(d => metadata.has(d.id.name))) chunks.push(original);
      else {
        for (const d of statement.declaration?.declarations || []) if (d.id.name) denied.add(d.id.name);
        if (statement.declaration?.id?.name) denied.add(statement.declaration.id.name);
        chunks.push('/* Unavailable inline demo declaration: ' + original.replaceAll('*/', '* /') + ' */');
      }
    }
    // A leading comment is Markdown, not an MDX ESM block. Preserve the ESM
    // boundary even when the group's first import was an unavailable demo.
    change(node, 'export {};\n' + chunks.join('\n'));
  });
  walk(tree, node => {
    if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
      if (node.name === 'VisualExample') {
        if (!node.attributes.some(a => a.name === 'solid')) change(node, comment(source.slice(node.position.start.offset, node.position.end.offset)) + '\n' + placeholder);
        else {
          const component = node.attributes.find(a => a.name === 'component');
          if (component?.position) change(component, '');
        }
      } else if (denied.has(node.name?.split('.')[0])) change(node, comment(source.slice(node.position.start.offset, node.position.end.offset)) + '\n' + placeholder);
    }
    if (node.type === 'code' && /(?:^|\s)(render|example|snippet)(?:\s|$)/.test(node.meta || '') && !/render=false|nativeModule=|solid=/.test(node.meta || '')) {
      // Keep the complete source as inert highlighted text; no import extraction.
      const original = source.slice(node.position.start.offset, node.position.end.offset);
      change(node, original.replace(/^(\s*```\w+)[^\n]*/, '$1') + '\n\n' + placeholder);
    }
  });
  // Ignore nested changes already covered by an unavailable outer example.
  const selected = edits.filter(e => !edits.some(other => other !== e && other.start <= e.start && other.end >= e.end && (other.start < e.start || other.end > e.end)));
  for (const edit of selected.sort((a, b) => b.start - a.start)) source = source.slice(0, edit.start) + edit.value + source.slice(edit.end);
  return source;
}
