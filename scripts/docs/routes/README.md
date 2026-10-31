# Source docs metadata/route boundary

The copied `getPages.ts` now uses this native request/build-owned metadata cache,
not React cache or Parcel Rust/RSC transport. `Page.ts` describes actual source
consumer fields: name/url, optional exports/TOC, and title/level/children/ID.
No default Nav section/group or missing-page fallback is synthesized.

```ts
await withDocsMetadataContext({pagesRoot, catalogRoot, projectRoot}, async () => {
  const metadata = await prepareDocsPageMetadata('react-aria/ProgressBar');
  await prepareDocsCatalogMetadata();
  // Full getPages now has source metadata, not 334 built/rendered page modules.
});
```

`pagesRoot` is the actual copied MDX tree. Optional `catalogRoot` must identify
the authoritative full page tree; omitting it explicitly leaves navigation
catalog intake pending. Enumeration retains the source library-level glob and
ordering. Missing entries are reported, never omitted or automatically compiled
as part of a first-page check. Each scoped page promise and full getPages result
is cached only within its AsyncLocalStorage request/build owner.

Named metadata is read from the real new MDX adapter's preserved output without
evaluating unresolved Layout/API imports. Literal strings/numbers/booleans/null,
arrays and plain object metadata are supported; other named export expressions
report their exact unsupported shape rather than skipping them. Default page
component and separately handled tableOfContents are not navigation metadata.

TOC title and IDs come from actual compiler metadata; levels come from the actual
compiled heading elements, not guessed depth. The selected source page verifies
H1 ProgressBar, H2 Value/ProgressCircle/API, and H3 ProgressBar with duplicate
heading ID progressbar-1. All original tags/relatedPages/description are retained.

Copied getUrl/getCurrentPage preserve index normalization, library prefix,
combined-development URL, source production library host and PUBLIC_URL behavior.
pageUtils retains source isClientLink conditions and getRSCUrl calculation.
**getRSCUrl is transport-pending**, not native HTML navigation or a payload claim.
Unknown env/library strings produce explicit errors, not casts or invented URLs.

Fixed checks passed: owned native TS strict, actual ProgressBar metadata/TOC and
cache identity, combined-dev/current-library production URL joins. P63 captures
all 334 frozen MDX files under source-evidence/pages (not host routes), with exact
path/hash provenance in catalog-source.json. catalog.mjs uses the actual MDX
rc.2 parser, source frontmatter parsing, remark slug, mdast-util-toc and the
terminal-copy-derived source TOC converter. Named static metadata uses the same
native metadata evaluator as the selected compiled page; unsupported expressions
are source-specific errors and do not prevent independent records being read.

`node scripts/docs/routes/catalog.mjs` reproducibly emits catalog-metadata.json:
334 metadata-only records, zero errors. It does not execute JSX/imports/fences,
lower demos or evaluate S2/macros/API dependencies. All source flags are retained
(69 hideNav, 4 omitFromNav, 127 isSubpage); six source pages have empty TOCs.
There is no YAML frontmatter in this frozen catalog; future YAML navigation
mapping would be explicitly reported, not silently omitted. The two headings
with inline VersionBadge follow the actual source converter's leading text
title rule, not fabricated badge text. No runtime nodes are removed from MDX.

prepareDocsCatalogMetadata loads metadata into the owned scope, preserves an
already compiled selected page after checking equivalence, and reports failed
records. getPages enumerates the authoritative source catalog in source order
and refuses missing metadata. All 333 additional records are now available as
navigation metadata only. No full catalog runtime compilation, SSG/page rendering
or navigation parity is claimed.
