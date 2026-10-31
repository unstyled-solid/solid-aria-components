# P01 — ProgressBar + Meter

**Complete for the pilot scope.** Both copied component suites, seven supporting source suites, strict native types, and the shared SSR/hydration proof pass.

## Results

- `PILOT_HYDRATION=1 pnpm exec vitest run --config vitest.config.ts`: 10 suites, 47 passes (46 source cases + 1 harness proof), no skips or unhandled errors.
- `pnpm exec tsc -p tsconfig.pilot.json`: passed with strict checking and `skipLibCheck: false`.
- `node scripts/test/ssr-fixture.mjs`: separately compiled SSR in a fresh Node process; hydration retains ProgressBar/Meter hosts and IDs, reactive updates retain hosts, two roots remain independent, disposal runs.
- Copied upstream setup fails unexpected console warnings/errors. Source assertions retained; React-specific fixture lifecycle/spy observation translated to native ownership.

## Reusable lessons

- Keep Adobe prop-merge rules and live getters, but do not forward Solid `$PROXY` metadata through a custom merge proxy.
- Use native `dynamic` for custom host rendering; keep merged prop/context views setup-owned and stable for matching server/client allocation.
- Keep children lazy under the consuming provider. Use native DOM `class` in copied fixtures; preserve component `className` capability and default source classes.
- Translate hook outputs to their actual native shape. Broad HTML attribute types can pollute a narrow label/slot contract.
- ID merging intentionally writes during prop composition; only that internal signal opts into native `ownedWrite`.
- Retain the hydration bootstrap until queued replay settles. Use raw runner output when diagnosing; compressed reporters can hide console detail.

## Scope and provenance

- Frozen Adobe SHA: `3bdef480e85ff135cd485e9f4511b98300127d4b`. Per-package `.source-copy.json` files retain original hashes; most captured code remains unadapted.
- Actual selected source suites are listed in `vitest.config.ts`. JSX suites were renamed `.js` → `.jsx`; original paths remain in the copy manifests.
- `pilot.d.ts` is a terminal copy of shared `index.d.ts`, narrowed to the pilot's type closure; the full source barrel is retained.
- Native config and SSR harness were terminal-copied/adapted from the migration skill's `assets/baseui-reference/`; license retained at `test/harness/LICENSE.reference-kit`.
- No pristine React-runner baseline was executed; copied source assertions provided the pilot oracle. No full package, collection-family, device-matrix, or whole-library parity claim.
- Updater adaptation and full dependency inventory remain planned work. Global `verifiedParitySha` remains null.

## W01 — ColorSwatch + Separator (complete for selected scope)

One dependency-closed Migrator lane selected. Three lanes were authorized, but interaction candidates' complete supporting suites execute unported Spectrum ActionButton/Dialog/DialogTrigger/Provider; TextField also shares focus/hover and imports Autocomplete. Do not substitute mocks or expand into those families in W01.

| Owner | Exact writable paths (relative to `packages/`) |
|---|---|
| Migrator W01 | `react-aria-components/src/{ColorSwatch,Separator}.tsx`; `react-aria/src/color/useColorSwatch.ts`; `react-aria/src/separator/useSeparator.ts`; `react-aria/src/collections/{CollectionBuilder.tsx,BaseCollection.ts,Document.ts,useCachedChildren.ts}`; `react-stately/src/color/{Color.ts,types.ts}`; `react-aria-components/test/{ColorSwatch,Separator}.test.js` (may rename to `.jsx`); `react-aria/test/collections/CollectionBuilder.test.js` (may rename to `.jsx`); `react-stately/test/color/Color.test.tsx` |
| Coordinator | All shared declarations, localization, manifests/lockfile, configs, test helpers, existing pilot adaptations, source tracking; extraction of `FocusableContext` from `useFocusable.tsx` into its own source-derived module |

- Source: same frozen SHA as P01; provenance manifests are adjacent to package directories: `packages/<package>.source-copy.json`.
- Required source suites: complete ColorSwatch, Separator, CollectionBuilder, and Color suites. The last contains upstream property checks; retain them. No dedicated useColorSwatch/useSeparator suite or browser/SSR case exists in this selected source scope.
- Commands: `pnpm exec vitest run --config vitest.config.ts packages/react-aria-components/test/ColorSwatch.test.jsx packages/react-aria-components/test/Separator.test.jsx packages/react-aria/test/collections/CollectionBuilder.test.jsx packages/react-stately/test/color/Color.test.tsx`; `pnpm exec tsc -p tsconfig.wave.json`.
- Affected P01 checks: strict pilot types after shared declaration changes; runtime pilot suites and existing SSR/hydration proof only if shared runtime inputs change. Merely adding runner aliases/includes does not change the proof inputs.
- Preserve Document/BaseCollection algorithms and collection context propagation. Native rendering/ownership adaptation is authorized; replacing collection architecture or patching Solid requires escalation.

### Result

- Integrated four-suite command: **49 passed** (ColorSwatch 9, Separator 6, CollectionBuilder 5, Color 29); strict `tsconfig.wave.json` and affected `tsconfig.pilot.json` both pass. No skips/unhandled errors. Final native lazy-children branch correction was followed by **5/5 CollectionBuilder passes**; the other green suites were unchanged.
- Shared integration: native collection declarations, extracted FocusableContext, live localized formatter, source ICU compilation, and source test dependencies. Existing pilot runtime/SSR inputs were unchanged, so its 46-case and hydration results were reused.
- New extraction provenance, all from the same pin: `FocusableContext.ts` terminal-copied from `react-aria/src/interactions/useFocusable.tsx` before extraction; `scripts/test/intl-plugin.mjs` terminal-copied from `lib/jestResolver.js` before Vite adaptation. Real `@internationalized/string-compiler` copied with adjacent hash manifest; full locale data and compiler retained.
- Native collection rows preserve Document/BaseCollection algorithms. Zero-argument native JSX accessors stay lazy; item-taking callbacks without `items` yield no children. `SSRProvider.tsx` remains captured-only; collection code uses native server/hydration detection. This does not qualify other collection-consuming families or whole-library parity.
