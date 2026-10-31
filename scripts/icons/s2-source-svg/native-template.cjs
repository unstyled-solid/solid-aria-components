const {createRequire} = require('node:module');
const babel = require('@babel/core');
const t = createRequire(require.resolve('@babel/core'))('@babel/types');
const workflowTemplate = require('../../../packages/@react-spectrum/s2/icons/ChevronRight.source-artifact/native-template.cjs');

module.exports = function nativeTemplate(source, kind) {
  if (kind === 'workflow') return workflowTemplate(source);
  if (kind !== 'ui') throw new Error('Unhandled source SVG pipeline: ' + kind);
  const ast = babel.parseSync(source, {configFile: false, babelrc: false, parserOpts: {plugins: ['jsx']}});
  const components = ast.program.body.filter(node => t.isVariableDeclaration(node));
  const exported = ast.program.body.find(node => t.isExportDefaultDeclaration(node));
  if (components.length !== 1 || components[0].declarations.length !== 1 || !exported) throw new Error('Unexpected genuine Parcel UI SVG module.');
  const component = components[0].declarations[0];
  if (!t.isArrowFunctionExpression(component.init) || component.init.params.length !== 1 ||
      component.init.params[0].name !== 'props' || !t.isJSXElement(component.init.body) ||
      !t.isIdentifier(exported.declaration) || exported.declaration.name !== component.id.name) {
    throw new Error('Unexpected source UI SVG callback/export signature.');
  }
  const imports = ast.program.body.filter(node => t.isImportDeclaration(node));
  if (imports.length !== 1 || imports[0].source.value !== 'react' ||
      imports[0].specifiers.length !== 1 || !t.isImportNamespaceSpecifier(imports[0].specifiers[0])) {
    throw new Error('Unhandled source UI SVG renderer import.');
  }
  component.init.params[0].typeAnnotation = t.tsTypeAnnotation(t.tsTypeReference(t.identifier('NativeSVGProps')));
  const prefix = babel.parseSync("import type {JSX} from '@solidjs/web'; type NativeSVGProps = JSX.SVGElementTags['svg'];",
    {configFile: false, babelrc: false, parserOpts: {plugins: ['typescript']}}).program.body;
  ast.program.body = [...prefix, components[0], exported];
  return babel.transformFromAstSync(ast, source, {configFile: false, babelrc: false}).code;
};
