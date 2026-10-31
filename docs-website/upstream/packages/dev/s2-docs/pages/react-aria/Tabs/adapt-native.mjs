// This lane's source-faithful adaptation, restricted to terminal-copied page-local wrappers.
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const babel = require('@babel/core');
const t = require('@babel/types');
const here = path.dirname(new URL(import.meta.url).pathname);
export function nativePatterns() {
  function expand(pattern, source, scope) {
    const rest = [];
    for (const property of pattern.properties) {
      if (t.isRestElement(property)) { rest.push(property); continue; }
      const key = property.key;
      const value = t.isAssignmentPattern(property.value) ? property.value.left : property.value;
      if (!t.isIdentifier(value)) throw new Error('Unsupported nested pattern');
      const binding = scope.getBinding(value.name);
      const access = () => t.memberExpression(t.cloneNode(source), t.cloneNode(key), !t.isIdentifier(key));
      for (const reference of binding?.referencePaths ?? []) {
        reference.replaceWith(t.isAssignmentPattern(property.value)
          ? t.logicalExpression('??', access(), t.cloneNode(property.value.right)) : access());
      }
    }
    return rest.map(rest => t.variableDeclaration('const', [t.variableDeclarator(rest.argument,
      t.callExpression(t.identifier('omit'), [t.cloneNode(source), ...pattern.properties.filter(p => !t.isRestElement(p)).map(p => t.stringLiteral(p.key.name ?? p.key.value))]))]));
  }
  return {visitor: {
    Function(p) {
      p.node.params.forEach((param, index) => {
        if (!t.isObjectPattern(param)) return;
        const source = p.scope.generateUidIdentifier('props');
        source.typeAnnotation = param.typeAnnotation;
        const declarations = expand(param, source, p.scope);
        p.node.params[index] = source;
        if (declarations.length) {
          if (!t.isBlockStatement(p.node.body)) p.node.body = t.blockStatement([t.returnStatement(p.node.body)]);
          p.node.body.body.unshift(...declarations);
        }
      });
    },
    VariableDeclarator(p) {
      if (t.isArrayPattern(p.node.id) && t.isCallExpression(p.node.init) && t.isIdentifier(p.node.init.callee, {name:'createSignal'})) {
        const signal = p.node.id.elements[0];
        if (t.isIdentifier(signal)) {
          for (const reference of p.scope.getBinding(signal.name)?.referencePaths ?? []) reference.replaceWith(t.callExpression(t.cloneNode(signal), []));
        }
      }
      if (!t.isObjectPattern(p.node.id)) return;
      const source = p.scope.generateUidIdentifier('state');
      const declarations = expand(p.node.id, source, p.scope);
      p.node.id = source;
      if (declarations.length) p.parentPath.insertAfter(declarations);
    },
    JSXAttribute(p) {
      const tag = p.parent.name;
      if (p.node.name.name === 'aria-hidden' && p.node.value == null) p.node.value = t.stringLiteral('true');
      if (t.isJSXIdentifier(tag) && ['Label','RACLabel','Text','AriaText','Description'].includes(tag.name) && p.node.name.name === 'className') p.node.name.name = 'class';
      const nativeTag = t.isJSXIdentifier(tag) && /^[a-z]/.test(tag.name);
      const map = {className:'class', strokeWidth:'stroke-width', strokeDasharray:'stroke-dasharray', strokeDashoffset:'stroke-dashoffset', strokeLinecap:'stroke-linecap', strokeLinejoin:'stroke-linejoin'};
      if (nativeTag && map[p.node.name.name]) p.node.name.name = map[p.node.name.name];
      if (nativeTag && p.node.name.name === 'key') {p.remove(); return;}
      if (p.node.name.name !== 'style' || !t.isJSXExpressionContainer(p.node.value) || !t.isObjectExpression(p.node.value.expression)) return;
      for (const property of p.node.value.expression.properties) {
        if (!t.isObjectProperty(property)) continue;
        const name = property.key.name ?? property.key.value;
        property.key = t.stringLiteral(name.replace(/[A-Z]/g, x => '-' + x.toLowerCase()));
        if (t.isNumericLiteral(property.value) && !['flex','opacity','scale','zIndex','order','flexGrow','flexShrink'].includes(name)) property.value = t.stringLiteral(property.value.value + 'px');
      }
    }
  }};
}
for (const directory of process.argv.includes('--examples-only') ? [] : ['vanilla', 'tailwind']) {
  for (const name of fs.readdirSync(path.join(here, directory))) {
    if (!/\.tsx?$/.test(name)) continue;
    const file = path.join(here, directory, name);
    const original = path.resolve(here, '../../../../../../../../upstream/react-spectrum/starters', directory === 'vanilla' ? 'docs' : 'tailwind', 'src', name);
    let source = fs.readFileSync(original, 'utf8')
      .replace(/^['"]use client['"];\n/m, '')
      .replace(/^import .* from ['"]react['"];\n/gm, '')
      .replace(/React\.ReactNode|\bReactNode\b/g, 'JSX.Element')
      .replace(/React\.Ref</g, 'Ref<')
      .replace(/['"]react-aria-components(?:\/[^'"]+)?['"]/g, "'solid-aria-components'")
      .replace(/['"]lucide-react['"]/g, "'../icons'");
    if (name === 'Field.tsx') source = "import {clsx} from 'clsx';\n" + source.replace(/(export function (?:Label|Description)[\s\S]*?)(?=export function|export const)/g, block => block.replace(/props\.className/g, 'clsx(props.class)'));
    if (name === 'ProgressCircle.tsx' && directory === 'vanilla') source = source.replace(/width: props.size \|\| 16/g, "width: (props.size || 16) + 'px'").replace(/height: props.size \|\| 16/g, "height: (props.size || 16) + 'px'");
    source = "import {omit, useContext} from 'solid-js';\nimport type {Ref} from 'solid-js';\nimport type {JSX} from '@solidjs/web';\n" + source;
    const result = babel.transformSync(source, {filename:file, configFile:false, babelrc:false, parserOpts:{plugins:['typescript','jsx']}, plugins:[nativePatterns()], generatorOpts:{comments:true, retainLines:true}});
    fs.writeFileSync(file, result.code + '\n');
  }
}
