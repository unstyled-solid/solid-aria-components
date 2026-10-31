import { createRequire } from 'node:module';
import path from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import ts from 'typescript';
import { parseSync, transformSync } from '@babel/core';
import solid from '@solidjs/babel-plugin';
import { transform as nativeTransform } from '@solidjs/compiler';
import config from '../build.config.mjs';

const require = createRequire(import.meta.url);
// The pinned Vite integration owns this installed source-map composer.
const viteRequire = createRequire(require.resolve('@solidjs/vite-plugin'));
const remapping = viteRequire('@ampproject/remapping');
export function verifyToolchain() {
  for (const [name, version] of Object.entries({
    '@solidjs/compiler': config.compilerVersion,
    '@solidjs/babel-plugin': config.compilerVersion,
    '@babel/core': config.babelVersion,
    'solid-js': config.compilerVersion,
    '@solidjs/web': config.compilerVersion,
    typescript: '5.9.3',
  })) {
    let directory = path.dirname(require.resolve(name));
    while (!existsSync(path.join(directory, 'package.json'))) directory = path.dirname(directory);
    const actual = JSON.parse(readFileSync(path.join(directory, 'package.json'), 'utf8')).version;
    if (actual !== version) throw new Error(`Build requires ${name}@${version}; found ${actual}`);
  }
}

// Match the harness: Babel lowers typed JSX, then TypeScript erases types. No React presets,
// transform-runtime, bundling, development instrumentation, or second JSX pass.
export function compile(source, filename, generate, resolveImport = value => value, compiler = config.compiler) {
  const options = { moduleName: config.moduleName, generate, hydratable: config.hydratable, dev: config.dev };
  let lowered;
  if (compiler === 'babel') {
    lowered = transformSync(source, {
      filename, sourceFileName: filename, configFile: false, babelrc: false,
      sourceType: 'module', comments: true, sourceMaps: true,
      parserOpts: { plugins: ['typescript', 'jsx'] },
      plugins: [[solid, options]],
    });
  } else {
    lowered = nativeTransform(source, { filename, ...options, sourceMap: true });
    lowered.map = typeof lowered.map === 'string' ? JSON.parse(lowered.map) : lowered.map;
  }
  const result = ts.transpileModule(lowered.code, {
    fileName: filename,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.Preserve, sourceMap: true, inlineSources: true,
      removeComments: false, newLine: ts.NewLineKind.LineFeed,
    },
    reportDiagnostics: true,
    transformers: { after: [context => {
      const visit = node => {
        if (ts.isImportDeclaration(node) && node.moduleSpecifier.text === 'client-only' && /react-aria-components\/exports\//.test(filename)) return undefined;
        if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
          const specifier=context.factory.createStringLiteral(resolveImport(node.moduleSpecifier.text));
          return ts.isImportDeclaration(node) ? context.factory.updateImportDeclaration(node,node.modifiers,node.importClause,specifier,node.attributes) : context.factory.updateExportDeclaration(node,node.modifiers,node.isTypeOnly,node.exportClause,specifier,node.attributes);
        }
        if (ts.isCallExpression(node) && node.expression.kind===ts.SyntaxKind.ImportKeyword && ts.isStringLiteral(node.arguments[0])) return context.factory.updateCallExpression(node,node.expression,node.typeArguments,[context.factory.createStringLiteral(resolveImport(node.arguments[0].text))]);
        if (ts.isPropertyAccessExpression(node) && node.name.text === 'NODE_ENV' && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === 'env' && ts.isIdentifier(node.expression.expression) && node.expression.expression.text === 'process') {
          return context.factory.createStringLiteral('production');
        }
        if (ts.isExpressionStatement(node) && ts.isStringLiteral(node.expression) &&
            ['use client', 'use server', 'use memo', 'use no memo'].includes(node.expression.text)) return undefined;
        return ts.visitEachChild(node, visit, context);
      };
      return file => ts.visitNode(file, visit);
    }] },
  });
  const errors = result.diagnostics?.filter(d => d.category === ts.DiagnosticCategory.Error);
  if (errors?.length) throw new Error(`${filename}: ${ts.formatDiagnostics(errors, {
    getCanonicalFileName: f => f, getCurrentDirectory: () => '.', getNewLine: () => '\n',
  })}`);
  const code = result.outputText.replace(/\n?\/\/# sourceMappingURL=.*(?:\n|$)/g, '\n');
  const stripMap = JSON.parse(result.sourceMapText);
  stripMap.sources = [filename];
  stripMap.sourceRoot = '';
  lowered.map.sources = [filename];
  lowered.map.sourcesContent = [source];
  lowered.map.sourceRoot = '';
  const map = JSON.parse(remapping([stripMap, lowered.map], () => null).toString());
  parseSync(code, { configFile: false, babelrc: false, sourceType: 'module' });
  return { code, map };
}

export function moduleImports(code, filename) {
  const file = ts.createSourceFile(filename, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const imports = [];
  const visit = node => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier) {
      imports.push(node.moduleSpecifier.text);
    }
    if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        ts.isIdentifier(node.expression) && node.expression.text === 'require')) {
      if (node.expression.kind !== ts.SyntaxKind.ImportKeyword || !node.arguments[0] || !ts.isStringLiteral(node.arguments[0])) {
        throw new Error(`${filename}: unreviewed require/nonliteral dynamic import`);
      }
      imports.push(node.arguments[0].text);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return imports;
}

export const packageName = specifier => specifier.startsWith('@')
  ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0];
export const toPosix = value => value.split(path.sep).join('/');
