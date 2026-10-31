// Adapt only the observed source-generated React renderer/ref plumbing.
// All SVG geometry/attributes remain the genuine configured SVGR output.
const {createRequire} = require('node:module');
const babel = require('@babel/core');
const t = createRequire(require.resolve('@babel/core'))('@babel/types');

module.exports = function nativeTemplate(source) {
  const ast = babel.parseSync(source, {configFile: false, babelrc: false, parserOpts: {plugins: ['typescript', 'jsx']}});
  const svgDeclaration = ast.program.body.find(node => t.isVariableDeclaration(node) && node.declarations[0]?.id.name === 'SvgComponent');
  const forwardDeclaration = ast.program.body.find(node => t.isVariableDeclaration(node) && node.declarations[0]?.id.name === 'ForwardRef');
  const exported = ast.program.body.find(node => t.isExportDefaultDeclaration(node));
  if (!svgDeclaration || !forwardDeclaration || !exported) throw new Error('Unexpected actual SVGR source module shape.');
  const component = svgDeclaration.declarations[0].init;
  if (!t.isArrowFunctionExpression(component) || component.params.length !== 2 ||
      component.params[0].name !== 'props' || component.params[1].name !== 'ref' ||
      !t.isJSXElement(component.body)) throw new Error('Unexpected source SVG callback signature/body.');
  const forward = forwardDeclaration.declarations[0].init;
  if (!t.isCallExpression(forward) || forward.callee.name !== 'forwardRef' || forward.arguments[0]?.name !== 'SvgComponent' ||
      !t.isCallExpression(exported.declaration) || exported.declaration.callee.name !== 'createIcon' ||
      exported.declaration.arguments[0]?.name !== 'ForwardRef') throw new Error('Unexpected source createIcon/forwardRef linkage.');
  for (const node of ast.program.body.filter(node => t.isImportDeclaration(node) && node.source.value === 'react')) {
    if (node.specifiers.some(specifier => !['SVGProps', 'Ref', 'forwardRef'].includes(specifier.imported?.name))) {
      throw new Error('Unhandled React-specific source icon import.');
    }
  }
  component.params = [t.identifier('props')];
  component.params[0].typeAnnotation = t.tsTypeAnnotation(t.tsTypeReference(t.identifier('NativeSVGProps')));
  const ref = component.body.openingElement.attributes.find(attribute => t.isJSXAttribute(attribute) && attribute.name.name === 'ref');
  if (!ref || !t.isJSXExpressionContainer(ref.value) || ref.value.expression.name !== 'ref') throw new Error('Missing source SVG root ref.');
  ref.value.expression = t.memberExpression(t.identifier('props'), t.identifier('ref'));
  exported.declaration.arguments[0] = t.identifier('SvgComponent');
  const type = babel.parseSync('type NativeSVGProps = Parameters<Parameters<typeof createIcon>[0]>[0];',
    {configFile: false, babelrc: false, parserOpts: {plugins: ['typescript']}}).program.body[0];
  ast.program.body = [t.importDeclaration([t.importSpecifier(t.identifier('createIcon'), t.identifier('createIcon'))],
    t.stringLiteral('../src/Icon')), type, svgDeclaration, exported];
  return babel.transformFromAstSync(ast, source, {configFile: false, babelrc: false}).code;
};
