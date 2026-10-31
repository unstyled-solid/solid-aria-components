# P57 source adapter intake

Only build adapters/capture live here. C owns the host/starter copies; this lane
does not edit them, root dependencies, config, or package output.

`source-copy.json` records the exact frozen source commit and whole-file hashes
of terminal-copied MDX transformer, MDXFragments/processCSS, API extractor,
API packager, package manifests and the two actual Yarn patch files.
`source-originals/` is retained evidence, not an executable replacement host.

## Implemented independent source function

`expand-example-switcher.mjs` is terminal-copied from
`packages/dev/s2-docs/MDXTransformer.mjs` before removing its Parcel wrapper.
`expandExampleSwitcher(code, parse = json5.parse)` returns `{code, replaced}`.
It preserves the source regular expression, JSON5 parse, component substitution
and unchanged-input behavior. It does not parse MDX or drop unknown AST nodes.
ProgressBar's four actual VisualExamples remain in its unchanged full page.

## Frozen patches: no runtime grammar blocker

Both patch files are present and captured:

- remark-mdx 2.0.0-rc.2: index.d.ts changes the Options import from
  `micromark-extension-mdx-expression/dev/lib/syntax` to the package root.
- remark-parse 10.0.1: lib/index.d.ts changes the Options import from
  `mdast-util-from-markdown/lib` to the package root.

No JS/parser/runtime files are modified. Unpatched published versions therefore
do not lose ProgressBar grammar because of these patches. Do not apply either
patch. If their original declarations cause a real consumer type error, retain
that affected declaration boundary and report it; do not rewrite dependencies.

## Exact dependency request to I

Source MDX compiler closure (published versions, no `next` resolution):

- @mdx-js/mdx 2.0.0-rc.2; its remark-mdx 2.0.0-rc.2 and remark-parse 10.0.1
  dependencies must remain on that generation.
- remark-frontmatter 4.0.1, remark-slug 7.0.1, unist-util-flatmap 1.0.0,
  unist-util-visit 4.1.0, unified 10.1.2.
- tree-sitter-highlight 1.0.1, dprint-node 1.0.7, js-yaml 3.14.0,
  mdast-util-toc 6.1.0, json5 2.2.3, doctrine 3.0.0.

Keep installed framework/Babel pins. The existing Babel core dependency scope
resolves parser 7.29.9, traverse 7.29.10, types 7.29.8 and JSON5 2.2.3; they are
usable through an explicit createRequire rooted at actual installed Babel core.
Frozen extractor originally resolved parser/traverse/types 7.24.4/7.24.1/7.24.0;
this is a disclosed parser-tool version difference, not byte-identical tooling.
Do not downgrade the native compiler toolchain. Installed Lightning CSS 1.33.0
is also available; frozen source resolved 1.32.0. Exact source processCSS
qualification requires I to provide 1.32.0 locally without replacing unrelated
installed versions. No React MDX provider/runtime dependency is requested.

## Next concrete adapter batch after intake

1. Inspect obtained MDX rc.2 implementation/declarations before choosing its
   JSX-preserving output option. Use its genuine compile API and copied source
   plugins; no substitute parser or invented AST traversal.
2. Adapt source provider/output plumbing to native Layout component mapping,
   retaining heading/TOC, fenced-code highlighting/link metadata and full MDX
   exports. Lower preserved JSX using installed RC13 @solidjs/babel-plugin.
3. Expose copied DocsTransformer/DocsPackager extraction and link resolution
   through the source-derived adapter, preserving {exports, links}. The current
   captured originals still require real Parcel asset/bundle interfaces; no fake
   completed neutral extraction or fabricated PropTable data is supplied.
4. Join only real ProgressBar imports: three docs API modules, vanilla
   ProgressBar/ProgressCircle, Tailwind ProgressBar, referenced source panels,
   starter CSS/Tailwind and Anatomy SVG. Preserve source S2 style macros and
   their CSS output; host/S2 adaptation remains separately owned.

First build scope remains the whole 84-line react-aria/ProgressBar page with all
four VisualExamples, API/source panels, route metadata and actual assets.
No build/runtime/empty-host success is claimed by this intake.
