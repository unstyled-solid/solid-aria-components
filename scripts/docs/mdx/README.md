# Native source MDX adapter

`MDXTransformer.cjs`, `MDXFragments.cjs`, and `processCSS.cjs` were terminal-copied
from frozen source before adaptation; exact original/native hashes are in
`source-copy.json`. Originals in `scripts/docs/source-originals/` are untouched.

## Entry API

```js
const result = await compileNativeMDXFile(actualCopiedPagePath, {projectRoot});
// or compileNativeMDX({source, filePath, projectRoot, version})
// result: jsx, dom, server, metadata, dependencies, sourcePath
```

No output is written or host started. The caller retains the actual page location
so relative Layout/CSS imports resolve to C's copied source, not an invented host.
DOM/server outputs retain the real docs:, starter and asset imports for the
actual bundler/API owner. They are compilation outputs, not linked page bundles.

Installed MDX 2.0.0-rc.2 `lib/core.js:115–121` confirms `jsx:true` bypasses
recma JSX runtime lowering. Its real providerImportSource API calls
`useMDXComponents`; `native-provider.tsx` supplies that native context/map API.
Both outputs are lowered by installed RC13 @solidjs/babel-plugin, not React.

## Preserved source transformations

The source plugin order remains: slug, extractToc, extractExamples, fragmentWrap,
frontmatter, highlight, fragmentUnWrap, appendCSS; rehype wrapExamples follows.
Full source helpers handle code/frontmatter/highlighting/source CSS. Native
style injection uses innerHTML, retaining the exact processed CSS text.
The original full TOC conversion is exposed as tableOfContents in addition to
legacy toc metadata; Markdown heading IDs remain source-generated.
Source CSS dependency read/parse failures now report explicitly, never pretending
an empty successful stylesheet. Babel AST helpers resolve through the installed
core's genuine dependency scope; no fake declarations or replacement parser.

The unchanged 84-line ProgressBar source compiled successfully with four
VisualExamples, three docs imports, Anatomy SVG, four source-panel references,
exported tags/description/relatedPages and fenced-code links. Provider and page
both lower to native DOM/server output without React runtime imports.

## Explicit remaining boundary

Executable legacy `example`/`snippet` fence roots need a separately assigned
native source adaptation. The copied transformer reports these if encountered,
instead of returning its legacy React-root client bundle or dropping their body.
ProgressBar does not use those fences; its real VisualExamples stay in MDX.
The legacy Parcel/React client-bundle section remains only in the retained
original; the native adapter returns the actual preserved JSX and metadata.

The actual Layout/S2 UI, API payload linking, macro CSS execution, assets,
navigation and SSG/hydration integration are not completed by parsing this page.
No React MDX provider is imported; no node/dependency patch was applied. No
unknown-node skipping walker or new component/test framework was introduced.
