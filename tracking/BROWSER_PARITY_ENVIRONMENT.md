# Frozen React browser reference — 2026-10-12

**Latest Select result:** original `Select > should support multiple selection` completes with matching committed native-select state/callbacks/FormData. Early-observer contrast **falsifies late-logger ordering as the Dog-focus explanation**: native focusin precedes even pre-app window-capture pointerdown. Escape additionally focuses a different connected Dog node in a different listbox before restoring the trigger. Updated animation bytes stable; EFFECT_WRITES_OWN_SOURCE2→0, WIDE3/HOT1 remain. This is **targeted form/committed-DOM parity**, not blanket event/diagnostic parity. Current servers: React4317/PID13932, native4318/PID13934; `/select/` is the new case, `/` retains reconstructed Tooltip entry.

**Latest result after E1 cleanup: native tooltip host contract passes the paired physical-pointer replay, but complete parity FAILS: the once-captured native arrow disconnects on entering removal while React retains its arrow.** Initial unchanged Playwright `.hover()` also timed out because native arrow intercepted pointer events. See final execution section below. Both servers remain ready; no production edits by this lane.

## Ready environment and ownership

- **Ready:** http://127.0.0.1:4317/ . Vite PID **54676**, background shell `sh_12cf24287001ORMjVdBffAatgG`; remains running for coordinator use. Shell log: `/Users/avi/.local/share/opencode/shell/global/sh_12cf24287001ORMjVdBffAatgG.out`.
- Environment directory (abbreviated `$REF` below): `/private/var/folders/k1/dqkw16gn09q6492v5jn1x_jc0000gn/T/opencode/react-tooltip-reference`.
- Sole repository write by provisioning lane: this record. Native E1 implementation/instrumentation and plan belong to agent `ses_ed3173b67ffe6860MrOZVzNMc2`. No native browser run by this lane; coordinate removal of E1 instrumentation before native qualification.
- Source: exact `git archive 3bdef480e85ff135cd485e9f4511b98300127d4b packages yarn.lock package.json vitest.browser.config.ts`, extracted into `$REF/frozen`. That archive includes genuine RAC/aria/stately/internationalized source closure. All workspace package links point inside this copy, never published RAC from another revision.
- Existing npm cache had React18.3.1/19.2.7/19.2.8, not19.3.0; inspected Yarn v6/Berry caches and pnpm store names for19.3. No existing provisioned reference was found. Registry lookup confirmed exact19.3.0 availability; isolated install succeeded first attempt. **0 failed setup hypotheses; no active blocker.**

## Executed setup and replay

From repository root:

```sh
mkdir -p "$REF/frozen"
git -C upstream/react-spectrum archive 3bdef480e85ff135cd485e9f4511b98300127d4b packages yarn.lock package.json vitest.browser.config.ts | tar -x -C "$REF/frozen"
```

From `$REF`:

```sh
npm install --ignore-scripts --no-audit --no-fund
sed -n '1,11p;23,39p' frozen/packages/react-aria-components/test/Tooltip.test.js > TestTooltip.jsx
cp frozen/packages/react-aria-components/test/Tooltip.test.js Tooltip.test.original.js
node node_modules/vite/bin/vite.js --config vite.config.mjs
node capture.cjs
```

The fixture was terminal-copied before adaptation. Only imports and `export default` were added to its function; JSX/function body is the frozen original lines23–39. Direct source Button, TooltipTrigger/Tooltip and OverlayArrow imports. `main.jsx` creates one React root and exposes only fixture control `window.fixture.rerender(props)` plus runtime version. It starts `{isEntering:true}`. Calling `rerender({})`, then `rerender({isExiting:true})`, then `{}` preserves the source prop omission contract. No StrictMode wrapper: source `StrictModeWrapper.tsx`:15–20 returns children when STRICT_MODE is unset, while upstream `yarn test` sets STRICT_MODE=1. This captures the actual source fixture/contract in a direct browser mount, not the entire upstream strict Jest harness. No test adapter, fake DOM, fake timers, click/focus substitutions or dependency patches.

Vite7.3.2 is the exact frozen lock transport version. `source` resolution condition/mainField and isolated workspace symlinks select source exports. The only source-format transport plugin implements the frozen browser config's intl JSON glob expansion (lines24–57); missing directories throw instead of silently manufacturing messages. No full Storybook bootstrap. Browser source JSX uses Vite's standard React transform. A separate smoke launch mounted the button with runtime19.3.0; the original sequence then ran once successfully.

## Dependencies and reproducibility

- Exact frozen lock runtime resolutions: **react19.3.0** (`yarn.lock`:25512), **react-dom19.3.0** (:25244), **scheduler0.28.0** (:26630); also clsx2.0.0, aria-hidden1.2.4, use-sync-external-store1.6.0, @swc/helpers0.5.15. npm resolved tslib2.8.1. Copied frozen `yarn.lock` retains original checksums; isolated `package-lock.json` records installed npm tarball integrity.
- Tool transport: Vite7.3.2; its npm-resolved tool-only closure includes esbuild0.27.7, rollup4.64.5, postcss8.5.29. These transitive tool versions are recorded by the isolated package-lock, not claimed byte-identical to the complete frozen Yarn environment. No upstream install scripts/patches ran.
- Browser automation reused root **Playwright1.57.0**, read-only absolute require in `capture.cjs`. **Chromium143.0.7499.4**, actual headless browser, viewport1280×720; UA `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/143.0.7499.4 Safari/537.36`.
- No installs into root/native/frozen checkout, no modifications to their source/config/pins/lockfiles, no commits/publication. Only `$REF` dependencies/configuration and this record were authored.

## Actual retained-host baseline

Capture script retains the original button ElementHandle through physical pointer actions and captures tooltip/arrow objects **once** when opened. Real mouse moves from body point(600,400) to original button, then back to(600,400). Native browser timers run; delay0 opens, source `useTooltipTriggerState` closeDelay500ms settles via650ms wall wait. Current selectors are used only for identity/count reporting, never to replace the captured assertion target. Each rerender waits for the captured node's actual committed condition. Public refs are not exposed by the unchanged original fixture; no ref result is claimed.

WeakMap node IDs: button1, body2, tooltip3, arrow4, portal wrapper5. All checkpoints retain button1 connected/current and activeElement body2. Sentinel count0 throughout; browser error list empty.

| Phase | Captured tooltip3 connected/current | Captured arrow4 connected/current | data-entering | data-exiting | Tooltip count | aria-describedby |
|---|---|---|---|---|---|---|
| Mounted (96.10ms) | Not captured/not mounted | Not captured | absent | absent | 0 | absent |
| Real hover (157.70ms) | true/true | true/true | `true` | absent | 1 | matches tooltip ID |
| `rerender({})` (178.50ms) | true/true | true/true | **absent** | absent | 1 | matches same ID |
| isExiting + unhover +650ms (832.90ms) | true/true | true/true | absent | **`true`** | 1 | absent |
| `rerender({})` close (837.00ms) | **false/false** | false/false | absent | `true` on detached old host | **0** | absent |

Tooltip DOM ID during this run: `react-aria5111842616-_r_0_`. Portal wrapper5 remains the same DIV directly under BODY while open/exiting; after close its parent is null. The disconnected tooltip retaining data-exiting is a captured detached-node observation, not a mounted stale attribute. **The frozen React original entering/exiting retained-host contract passed in a physical browser.** Cleanup evidence is overlay removal/zero sentinels; listener teardown was not instrumented or independently asserted. This is React reference evidence, not yet React-vs-Solid parity qualification.

Artifacts in `$REF`: `react-baseline.json` (complete scalar rows), `react-entering.png`, `capture.cjs` (replay), `Tooltip.test.original.js`, `TestTooltip.jsx`, `main.jsx`, `vite.config.mjs`, `fingerprints.json`, and npm `package-lock.json`. Browser context from replay closed; server remains ready. Node identity evidence survives as scalars, not a claim that browser objects survive context teardown.

## SHA256 fingerprints

Paths relative to `$REF`; full machine-readable list is `fingerprints.json`.

```text
a52cff9fe53a20b0cc6d301817eef20aaa9f5d40d1a10f99768c1bfd808b5790 frozen/yarn.lock
772e09803cde8864c4323c1c32a629dcfb80cd9067f9eee922d31af87e57f15e frozen/packages/react-aria-components/test/Tooltip.test.js
b8f4fb4b83e8c046c873c8dba8e3c7fe728b41f24bbfa4bd459e1db3e1ddbd5f frozen/packages/react-aria-components/src/Button.tsx
11c58a711e5d6bdad932129e6ef369481e1b6582a7425dcb163f2b0c0185cbfc frozen/packages/react-aria-components/src/Tooltip.tsx
d2d639e8c92e1492246616708a8650b57e6094aa4046196c2a61d00498df288b frozen/packages/react-aria-components/src/OverlayArrow.tsx
491644bc0f07e625a1c8fdf6317b82cfe36f962b7da65e09bae1ce7842c7bc8e frozen/packages/react-aria-components/src/utils.tsx
893ebe4d14e52b397b9733479ec3d2a27b4749e3e382b1c4b9209a2675fd2c56 frozen/packages/react-stately/src/tooltip/useTooltipTriggerState.ts
97bef56f30daa05320514ea220d7d03eb765635519ff2d5650c4887772aa5767 node_modules/react/cjs/react.development.js
c10b5e5ad37ca22c88b58bf4ada9a3b655ab79934c0b5cc6bad26f42c774584f node_modules/react-dom/cjs/react-dom-client.development.js
646eb671c8585382baff16daf92fe16a4cdd10dcf1a363c58b2ae1f6bf3a2b8d node_modules/scheduler/cjs/scheduler.development.js
64e62ce43f1967d3025c6508121ea0c75a740160551cd68a51552f6f7f71326f package-lock.json
98080a0e0aaebb87f76a0ebe267183e633d6a39359182ba064a7873deadc6a90 TestTooltip.jsx
0c42e6a5c15be94fe89faa03fdb9e1c5c6dd56efeef16208311dd01a59e2dd92 main.jsx
c9357c6a232a270be283f14e611eaa0706e0fda681a08495845c86a8dfee3a2b vite.config.mjs
7b69649aef5c495a543d13d3ee70a6d29ba6a0e9ee61cad27b296b530b0cdb49 capture.cjs
f7c657c4a1e1b08efcd3a0b9f56adc72cb129f0e1b68b370e4f5dc4356790822 react-baseline.json
```

## Native physical entry — prepared, capture awaiting coordinator dispatch

**Ready URL:** http://127.0.0.1:4318/ . Native Vite PID **55349**, shell `sh_12cf5d534001S1MUZj8g8R6j99`; log `/Users/avi/.local/share/opencode/shell/global/sh_12cf5d534001S1MUZj8g8R6j99.out`. React4317/PID54676 was verified still listening and preserved.

Native directory (`$NATIVE`): `/private/var/folders/k1/dqkw16gn09q6492v5jn1x_jc0000gn/T/opencode/native-tooltip-reference`.

### Source and transport

- Terminal-copied native `packages/react-aria-components/test/Tooltip.test.jsx`: header1–11 and exact `TestTooltip`46–62 into `$NATIVE/TestTooltip.jsx`; full original saved as `Tooltip.test.original.jsx`. Then added only direct absolute native Button/Tooltip/OverlayArrow imports and `export default`. Same JSX/function body as native test.
- `$NATIVE/main.jsx` calls native `render` once. Inside that stable root, `createSignal({isEntering:true})`, fixture control `rerender: value => updateProps(value)`, and `<TestTooltip {...props()} />` reproduce native case152–158. No production flush or test adapter. Ordinary RC13 microtask staging is retained (confirmed indexed Solid2 staged-write docs). The served Babel transform contains `createComponent(TestTooltip, mergeProps(props))`, not a root rerender/remount implementation.
- `$NATIVE/vite.config.ts` **imports actual repository `vitest.browser.config`** and reuses its `plugins`, `resolve` and `define`. This transitively imports actual `vitest.config.ts`, its **Babel RC13/hydratable options**, native aliases, intl plugin, Spectrum CSS plugin, and browser asset chain. No shared config edits or new shared join needed.
- Temp-only `node_modules` symlink points to existing native root node_modules; no install. Actual runtime/source imports remain the native repository files, not copies or published replacement components. `cacheDir` is temp-local; CLI uses `--configLoader runner` to avoid writing bundled config artifacts into root node_modules. Server fs allowlist covers only temp entry and native repository. HMR disabled; replay creates a fresh browser page.
- Installed versions verified: solid-js/@solidjs/web/@solidjs/signals/@solidjs/babel-plugin **2.0.0-rc.13**, @solidjs/vite-plugin **3.0.0-next.47**, native Vite **8.3.2**, reused Playwright **1.57.0**. React transport remains its separate Vite7.3.2 install.

Executed launch from `$NATIVE`:

```sh
rtk proxy node /Users/avi/avir-oss/solid-aria-components/node_modules/vite/bin/vite.js --config vite.config.ts --configLoader runner
```

### Actual preparation verification; no native interaction replay yet

- HTTP200 for `/`, `/main.jsx`, `/TestTooltip.jsx`, actual native Tooltip.tsx transform. Saved `main.transformed.js`, `Tooltip.transformed.js`, `transport-check.json`.
- A read-only HTTP import walk starting `/main.jsx` fetched **91 served static ESM modules, all HTTP200**; `transport-import-closure.json` records URLs/status/bytes. This compiles/serves the entry's source/static dependency graph without executing browser code. It is not a runtime/interaction pass.
- `node --check capture.cjs` passed. **No native browser page, hover, prop update, source timer replay or parity qualification executed** during preparation. E1 owns production and may change it; preparation hashes below are explicitly unqualified snapshots. No polling E1 completion.
- `capture.cjs` was terminal-copied from accepted React replay, then changed URL/output names to native. It retains original button handle and once-captured tooltip/arrow, Chromium from the same Playwright1.57.0 installation (**143.0.7499.4** in accepted React run),1280×720, body(600,400)→button→body pointer actions, same `{}` prop omission and650ms wait for source500ms close timer.
- Native script adds before/after relevant source/config/runtime SHA256 snapshots, saves interrupted checkpoints on failure rather than losing evidence, and reports `completed`/`inputsStable`; partial replay or changed inputs exits nonzero. No replacing captured assertions with current selectors. No new component suite or matrix.

**Ready command, not executed; coordinator dispatches after E1 confirms instrumentation removed:**

```sh
# working directory: $NATIVE
node capture.cjs
```

Expected artifacts: `native-baseline.json`, `native-entering.png`. The JSON contains actual captured checkpoints/error list/sourceBefore/sourceAfter. A source-code change during replay makes `inputsStable=false`; completion itself does not replace checking retained identity and baseline parity. Reference `react-baseline.json` stays untouched in `$REF`.

### Native preparation fingerprints (SHA256, unqualified E1-era inputs)

Complete versions/hashes: `$NATIVE/preparation-fingerprints.json`. Local files below are relative to `$NATIVE`; remaining paths relative to native repo.

```text
70131b366b1fb840738ba73ea31864a645cb905d48b807325bf7c3f5c905758d TestTooltip.jsx
1dcb6f31886bf3abee0ae9c642957c1510f4d836f555173b0fb73541da46c126 Tooltip.test.original.jsx
d9075630cf236666bc0d930ceb73ffeca94cae4ffbebae903af9e9ffb00521a8 main.jsx
aaa2a1c6c4380a721eaf83e0a889cdcf378200a2ec09cea1b32cb320015d8da1 vite.config.ts
a65e1d67243e8ff0fda26c475a72e4e7aabb9ddf49d7a82cf9336759cc0b80c1 capture.cjs
90fddf6f19a406400135a9cf25d4bfff2bf0aaedb18430cbf1d17be13b2246f2 vitest.config.ts
26a8141a579e9f3584917ca89311121842ed0ea33b302aac2dfd60d7ead73b2e vitest.browser.config.ts
056d36faaf8a78744c12dec5aeb4b1594410cf72352fdac67439db27c771ad0e scripts/test/intl-plugin.mjs
4baf6af2737ef7a42299a4245cb26dac6ea447678d6d89cddf98db81150c8616 scripts/test/spectrum-css-plugin.mjs
df1488a9b1ea1f71c5a411e5f3ecb3ea9524c71d0f666aaf00106e555eaad5ae packages/react-aria-components/src/Tooltip.tsx
c89a53d42b1715fa64a373da1fce12768bd9f2b39616f0be201e97bf84be193e packages/react-aria-components/src/utils.tsx
c6736f9d807c8eebe168c921b458617623cea88ac115f541f1d4151fda79b26e packages/react-aria/src/overlays/useModal.tsx
0489d4c57801d5d31e66013f4973c35105bba229df22ae95cdd5a8e260d19e7f node_modules/solid-js/dist/solid.dev.js
bd417d367b53da351b1f566102a768aeb7ec66ab0d5cabe9f16ce8dec66a4077 node_modules/@solidjs/web/dist/web.dev.js
8dc03b10900358068678b4968c070e9d3f5cda781a5d8f7b40996e322b94a4c4 node_modules/@solidjs/signals/dist/dev.js
6cb450e2b9507c5285549e410d82ee8af68d5808e3b148c9b431e46e854eea4a node_modules/@solidjs/babel-plugin/index.js
```

Preparation required **0 failed setup hypotheses**, no production/config/dependency-pin changes, no shared configuration join, no native baseline claim. Sole durable repository write remains this record.

## Native execution after E1 instrumentation removal — actual parity result

Coordinator explicitly authorized replay after E1 completion. Read latest plan execution checkpoint/final hashes first. Actual replay before/after fingerprints matched E1 final utils `c89a53d4…193e`, useModal `c6736f9d…b26e`; restored Tooltip `df1488a9…ad5ae`. **All recorded source/config/runtime input hashes remained unchanged** through both native runs (`inputsStable:true`). RC13/compiler/config fingerprints match preparation table above. Additional actual native input SHA256: Button `c03d74083dfa065199500256f64cced9a8df864c112ea76864130934a9c3caa8`; OverlayArrow `8b88b0c328604f39905e3c4aca1824575b6eaedccd83691da2c2cf8c4a1c4381`; useObjectRef `49281a392cd01af2d3cd42cf43c6e944bc2318810047b96240df0398611ff6e9`.

### First replay: same accepted React automation

Executed `rtk proxy node capture.cjs` in `$NATIVE` against4318. **Exit1, completed:false.** Original button1 stayed connected/current; activeElement remained body2. Actual hover opened one tooltip (`aria-describedby=react-aria3309538032-cl-0`) but Playwright `ElementHandle.hover()` did not return: native `.react-aria-OverlayArrow[data-placement="bottom"]` under `[data-overlay-container="true"]` intercepted pointer events. It retried until30000ms timeout. No page JavaScript error; the recorded error is the actual hover action timeout/interception log. No tooltip/arrow object had yet been captured because the awaited hover preceded capture; later phases unexecuted. Preserved full `native-baseline.json`; no fabricated identity result for this interrupted run.

### Focused paired physical-pointer replay, justified by observed hover interception

The hover retry itself prevented checkpoint capture. Added **one paired contrast**, announced before execution: terminal-copy each existing capture script to `capture-direct-pointer.cjs`, replace only `await button.hover()` with `button.boundingBox()` on the retained original handle followed by one genuine `page.mouse.move(centerX, centerY)`. Retain body(600,400)→original button center→body pointer sequence, source layout, pointer hit testing, props/root, real timers and650ms close wait. No force-hover, synthetic dispatch, pointer-events styling or positioning correction. Run this identical change on React and native so it cannot conceal the original native-only hover result.

Executed concurrently in their respective isolated directories:

```sh
rtk proxy node capture-direct-pointer.cjs
```

Both ran actual **Chromium143.0.7499.4**, viewport1280×720, identical UA recorded above; React4317/native4318. Both script sequences completed; native before/after hashes stable. **No page/console errors in either paired run.** Script completion/exit0 means actions completed, not an arrow-parity pass: captured identity rows below are the acceptance evidence.

### Retained nodes and first identity divergence

Both runs independently assign WeakMap IDs: button1, body2, tooltip3, arrow4, portal DIV5. These IDs are per-browser-context labels, not cross-context object equality. Capture tooltip/arrow only once at first open. Never replace them with current selectors. Native tooltip ID `react-aria5303439870-cl-0`; paired React `react-aria2647459021-_r_0_`.

| Phase | Native time(ms) | React time(ms) | Native tooltip3 connected/current | React tooltip3 connected/current | Native captured arrow4 connected/current | React captured arrow4 connected/current | entering / exiting (both captured tooltips) |
|---|---:|---:|---|---|---|---|---|
| Mounted |159.40|132.40|not mounted|not mounted|not captured|not captured|absent / absent|
| Real pointer hover |198.40|160.30|true/true|true/true|true/true|true/true|`true` / absent|
| Remove entering via `{}` |216.10|176.50|**true/true**|true/true|**false/false**|**true/true**|absent / absent|
| Set exiting, unhover,650ms |876.60|833.00|**true/true**|true/true|false/false|true/true|absent / `true`|
| Remove exiting via `{}` |880.60|840.60|**false/false**|false/false|false/false|false/false|absent / `true` on detached host|

- **Host-specific result:** same actual captured tooltip3 survives entering removal, receives exiting, remains connected after physical unhover/source close delay, disconnects only on removal of exit override. This matches frozen React in the paired direct-pointer replay.
- **First captured identity divergence:** immediately after `isEntering:true → {}`, native captured arrow4 is disconnected/not the currently queried arrow, while the same native tooltip3 and portal5 remain connected/current. Frozen React's original arrow4 stays connected/current through exit retention. **Full host+arrow parity FAILS.** Browser capture proves original-arrow detachment; it did not assign an ID to the subsequently queried arrow, so do not infer replacement count or allocation cause from this row. E1's separate arrow recreation observations are supporting history, not substituted browser proof.
- **Earlier interaction divergence:** native's original `.hover()` action was intercepted by the arrow; React's accepted original `.hover()` succeeds. No geometry/root-cause attribution is established here. Direct-pointer completion does not erase that result.
- **Focus/ARIA/portal:** button1 stays connected/current and body2 stays active at every checkpoint in both paired runs. aria-describedby matches each tooltip ID while open, is absent after unhover/close. Same portal DIV5 remains directly under BODY through exiting; after final close its parent is null. Tooltip counts0→1→1→1→0, focus sentinel count0 throughout. No duplicate tooltip reported.
- **Ref coverage:** unchanged original fixtures expose no public ref; no ref attach/detach/current-value parity qualification. No listener teardown instrumentation. Observed DOM cleanup is not a substitute for unmeasured ref/listener claims.
- No production fixes, additional native tests, layout changes, alternate published dependencies or extra browser matrix. Browser contexts closed after recording; servers4317/PID54676 and4318/PID55349 remain running. Arrow divergence and initial pointer interception are concrete findings for coordinator routing, not a request to broaden this lane.

### Preserved artifacts and hashes

`$NATIVE/native-baseline.json` preserves initial hover failure. Paired outputs are `$NATIVE/native-direct-pointer.json`, `$NATIVE/native-direct-pointer-entering.png`, `$REF/react-direct-pointer.json`, `$REF/react-direct-pointer-entering.png`, and each directory's `capture-direct-pointer.cjs`. Accepted original React baseline/screenshot/script remain untouched.

```text
a0455b96cf896ba76633acd78347d58dca9c7d2c035d8b597168cbb5da6fcf43 native-tooltip-reference/native-baseline.json
353700e7ce87c8de5a7f708e76209dd41b98ad5cf5c002337ef4bc69593f8334 native-tooltip-reference/capture-direct-pointer.cjs
4a7e63ce08cfa4fa360404311befe57733af5ac2161ade9014d02012f051b36c native-tooltip-reference/native-direct-pointer.json
6aff983e22345038d2e3e83ff898f4cfd523bea84b048f486be186e286bef885 react-tooltip-reference/capture-direct-pointer.cjs
e57c5f948da567b05dd2dd6f2a3223330a8decb3370603dcf9519c6eda7bd8c7 react-tooltip-reference/react-direct-pointer.json
```

## Select multiple-selection form — actual frozen/native Chromium pair

### Exact original source and action transport

- Frozen SHA remains `3bdef480e85ff135cd485e9f4511b98300127d4b`. Selected **`Select > should support multiple selection`**, frozen `packages/react-aria-components/test/Select.test.js`:723–754, native `.jsx`:715–746; not the separate320-item case. Terminal-copied each exact test block to each temp `select/original-case.txt`, and each actual `TestSelect` fixture (frozen27–43, native29–45) before adding imports/export. No substituted algorithm or synthetic bare select.
- Exact fixture: genuine `<Form data-testid="form"><TestSelect name="select" selectionMode="multiple" onChange={onChange}/></Form>`; TestSelect includes source Select/Label/Button/SelectValue/Text/Popover/ListBox and Cat/Dog/Kangaroo items. Only jest mock replaced with observational array of delivered callback arguments. Actual native and frozen source imports; copied body/children/props unchanged.
- Source SelectTester defaults to mouse (`select.ts`:49). Source `open` clicks trigger; selections click once-captured option0 and option1; exact source `close` (`:107–128`) calls listbox.focus(), presses Escape, requires original trigger focus and original listbox removal. Replay executes these actions with real Playwright pointer/keyboard on retained handles. The explicit listbox.focus() is **the original helper action**, not a repair/focus-forcing workaround; trigger is never programmatically focused by replay.
- Original opening label, multiselectable/3options, retained-trigger `Cat and Dog`,2callbacks/last`['cat','dog']`, close restoration/removal and native `new FormData(capturedForm).getAll('select')` all reached. Additional observational checkpoints read actual HTMLSelectElement/selectedOptions/option.selected, disabled/name/multiple, identity and callback arrays. No FormData shim, manual selection writes, hidden inputs or selector replacement of captured targets.
- `select-form-capture.cjs` lives directly under approved temp `/private/var/folders/k1/dqkw16gn09q6492v5jn1x_jc0000gn/T/opencode/`. Same script takes `react` or `native`; source/helper snapshots before/after include current T `createEventHandler.ts` fix. T's stable-input notification preceded both actual successful captures; no native capture straddled a production change. No native rerun needed.

### Environment recovery and actual commands

After server restart cancellations, both old ports were unbound and **the old temp environment contents were gone** (newly created select subdirectory was the only React entry). Earlier artifact hashes/scalars in this record remain historical evidence; do not claim their old temporary JSON/screenshots still exist. Restored isolated exact-source archive/dependencies/config transport as recorded above, without source/root installs. Exact React19.3.0/ReactDOM19.3.0/Scheduler0.28.0/Vite7.3.2 recovered; isolated package-lock SHA256 is again `64e62ce4…1326f`. Native reuses unchanged root RC13 config/plugins/aliases, temp-local cache and node_modules symlink. Tooltip root entries reconstructed from source for availability; no Tooltip replay or new qualification.

- Two initial launch commands failed on absent old temp files, same diagnosed cleanup cause; restored once. First React Select transport run failed before mount due one-level-too-high relative source imports; corrected temp paths only and preserved `select/setup-failed.json`. Native original scenario succeeded on its first run. React then succeeded. No dependency patch/pin change or production fix.
- **React:** http://127.0.0.1:4317/select/ — PID13932, shell `sh_12f8b73c5001Ryx5HlePfj2d25`. Log `/Users/avi/.local/share/opencode/shell/global/sh_12f8b73c5001Ryx5HlePfj2d25.out`.
- **Native:** http://127.0.0.1:4318/select/ — PID13934, shell `sh_12f8b744d001hvEUK6637FYJfU`. Log `/Users/avi/.local/share/opencode/shell/global/sh_12f8b744d001hvEUK6637FYJfU.out`.

Executed isolated restore: exact earlier `git archive ... | tar`, `npm install --ignore-scripts --no-audit --no-fund`, recreate copied-workspace links. Actual launches from each respective temp environment:

```sh
rtk proxy node node_modules/vite/bin/vite.js --config vite.config.mjs
rtk proxy node /Users/avi/avir-oss/solid-aria-components/node_modules/vite/bin/vite.js --config vite.config.ts --configLoader runner
```

Actual captures from approved temp parent (native executed once; React rerun only after diagnosed temporary import correction):

```sh
rtk proxy node select-form-capture.cjs native
rtk proxy node select-form-capture.cjs react
```

Both **Chromium143.0.7499.4**, viewport1280×720, Playwright1.57.0. Native runtime solid-js/web/signals/Babel **2.0.0-rc.13**, plugin3.0.0-next.47, Vite8.3.2. Runtime/config hashes remain those recorded above; fresh comparison artifact includes them. No baseline approval follows from a different browser or helper fixture.

### Actual scalar comparison

Both runs independently assigned form1, trigger2, native HTMLSelectElement3, native option IDs4(empty)/5(cat)/6(dog)/7(kangaroo), body8, listbox10 and visible option IDs11/12/13. The same form1/trigger2/select3 remained connected; trigger/select matched current host queries at every checkpoint. Native-option identities remained5/6 through all selections/close. Select count1, `name='select'`, `multiple=true`, `disabled=false` in both throughout. No native option disabled.

| Committed checkpoint | React ms | Solid ms | selectedOptions values / real FormData values (both) | Trigger text (both) | Cumulative callbacks (both) | Focus (both) |
|---|---:|---:|---|---|---|---|
| mounted |296.60|751.00|[] / []|Select an item|[]|BODY8|
| opened |368.40|859.10|[] / []|Select an item|[]|listbox10|
| Cat clicked |412.60|899.20|[cat] / [cat]|Cat|[[cat]]|option11|
| Dog clicked |454.70|949.50|[cat,dog] / [cat,dog]|Cat and Dog|[[cat],[cat,dog]]|option12|
| Escape closed |479.60|991.10|[cat,dog] / [cat,dog]|Cat and Dog|unchanged2|original trigger2|
| Original form assertion |481.70|992.80|[cat,dog] / [cat,dog]|Cat and Dog|unchanged2|original trigger2|

- Native select `.value` is `''` initially then `'cat'` for both one and two selections, correctly reflecting HTMLSelectElement first-selected-value semantics. Selected native-option flags `[empty,cat,dog,kangaroo]`: allfalse→[false,true,false,false]→[false,true,true,false]. **Both actual selected options contribute separate successful form entries** `[['select','cat'],['select','dog']]`.
- Captured listbox/visible options10/11/12/13 remain connected through both original clicks; flags false/false/false→true/false/false→true/true/false. They disconnect only on close in both. Expanded false→true→false; aria-controls present while open and removed on close. Generated ID strings differ appropriately between runtimes; relationship/state presence matches.
- Offline comparison of **all recorded committed rows**, omitting elapsed time and normalizing only generated aria-controls ID to presence, returns **rowParity=true**. No first failure of the original form scenario or captured DOM identity found. This independently confirms the HiddenSelect multiple serialization fix in real DOM; it is not borrowed hook/unit evidence.
- **Errors:**0 in both successful runs; `completed=true`, `inputsStable=true` for both. Original close action also succeeded here; does not resolve separately deferred cases.

### Remaining observable differences (not suppressed or repaired)

- **Native diagnostics6, React0:** EFFECT_WRITES_OWN_SOURCE2 (`useEnterAnimation.isEntering true→false`, `useExitAnimation.completed0→1` under Popover); WIDE_SCOPE_DEPS3 (33/32/32 source effect subscription counts); HOT_SCOPE_TIME1 (Button effect8.4ms/1000ms over8ms budget). Complete original console text retained in native result JSON. Target behavior passes, **diagnostic-clean qualification does not**.
- Capture-phase trusted events: React17/native18, every recorded event `isTrusted=true`. First raw event-order difference is Dog focus: React pointerdown(option12)→focusin(option12), native focusin(option12)→pointerdown(option12). Native additionally emits focusin on another option node14 after Escape keydown before restoring original trigger2; React goes directly to trigger2. No inference of cause, hidden host replacement, or component allocation identity from these event-only observations. No synthetic events were introduced and native select's captured identity/state is unchanged.
- Thus **exact requested source FormData case and measured committed DOM state PASS**; raw focus-event parity and diagnostic cleanliness are not claimed. No additional investigations or source changes by this lane. Standard source browser gates are not replaced by this narrow replay.

### Current source/runtime/artifact fingerprints

Full before/after native and frozen hashes, final DOM HTML, events, diagnostics and checkpoint rows are each `select/result.json`. Full metadata: approved-temp `select-form-comparison.json` (rowParity true, eventParity false, runtime versions/hashes, artifact hashes).

```text
739bd4cceee86a28e11b641b67a394182daf745f3175b24e639d9caba5189579 native packages/react-aria/src/select/HiddenSelect.tsx
d8c766d2a545ed7f743d871f9f11db0a755e872f25fe8642d89f4a04ed5446b3 native packages/react-aria/src/interactions/createEventHandler.ts
fbdaf5de612ff99518e62efc4ae9227c4b120cdf40c9048131b23433c737e200 native packages/react-aria-components/src/Select.tsx
4a2fcdad49c8bcf897730c560fbdcafae7030d668c1f6bc571f8ed50e13890ca native packages/react-aria-components/src/Form.tsx
e7cea50fcc5464abce58147ae986e81df0553978b2cd406525953f07791394c1 native packages/react-aria-components/src/ListBox.tsx
0ddcb043baff08a64eb7458ceef599be6f71d0aaae0e55497fdbab426f5f08ed native packages/react-aria/src/select/useSelect.ts
a324bf66b7ada9cd29c58dde06b4164a88fe4ba926874b7375ce3a3efd7731b2 native packages/react-stately/src/select/useSelectState.ts
c28bc9dc818f49127350dddf050e05a206d653f9513dba16c2ed65ef9fdf2868 select-form-capture.cjs
29168d69cecc40f6212396057714d256b10bc454c0a5cd7b9280e99e678914c2 react-tooltip-reference/select/result.json
ad52d90d42d4e4ade88d683aa8963aa29dbf8ebd691cadb1fd9bcb903b41625a native-tooltip-reference/select/result.json
55ee3a67f1420e7b033eca9cb0b06677bfc2abd1e96d0f9026060b19941c2d0c react-tooltip-reference/select/TestSelect.jsx
87d539c9db01ebc5e09a96598999e55c33d8c4ad6b3b7f7f7596bcb07fb1304a native-tooltip-reference/select/TestSelect.jsx
f7d7ae9815cd2c0f2eec6dbf2c8baad2429b640d68cc68f510719b9d1a89e4fe react-tooltip-reference/select/main.jsx
30b5643df8202658dc46dc473ccd94dfc9f7e39f4753a2955021140f887d5cad native-tooltip-reference/select/main.jsx
5fb3592190bdba4008fc4af0d4f8397127b435deff641f2c5dec53f989471901 react-tooltip-reference/vite.config.mjs
2f31cb20041339d489ca334fbd60ed85bd636dc8645bb68c09c10f1703175ae5 native-tooltip-reference/vite.config.ts
```

Source snapshots for unchanged shared Tooltip-era utils/useModal/Popover/FocusScope match their earlier recorded final hashes; full values remain in comparison JSON. Artifact screenshots: each environment's `select/final.png`. Browser contexts closed; both serving processes stay available. Only temporary files plus this owned environment record were written.

## Select event-order measurement contrast — prediction before execution

One initial read-only inspection: original capture registers its document-capture recorder **after** `page.goto` and mounted-button readiness. Native `useFocusVisible.ts`:208–222 registers document-capture keyboard/pointer listeners during app initialization; pointerdown calls synchronous change handlers (:95–101). Pinned web renderer's delegated handlers use ordinary bubbling listeners (`web.dev.js`:569–573), so renderer delegation alone cannot be presumed to explain a later document-capture record. Earlier global document handlers and nested synchronous focus remain a specific measurable possibility.

**One paired contrast:** keep original fixture, actions and settlement timing; use Playwright `addInitScript` before app imports to install passive observational window-capture and document-capture listeners. Retain original late document recorder, correlate actual Event identities across observers. On focus/focusin, record actual still-dispatching outer Event.eventPhase/currentTarget, scalar node identity/connectedness, original option index/containing-listbox identity, and read-only Error stack. No listener monkeypatch, propagation/focus mutation, debugger pause or library edit.

**Prediction:** if the old Dog focusin→pointerdown ordering is caused by late-recorder ordering, early pointerdown must precede focusin and that focusin can identify the same still-dispatching pointerdown before the late document recorder observes it. If early focusin also precedes pointerdown, that hypothesis is falsified. Escape's additional option focus is separately classified by actual target identity/connectedness and stack, not erased by Dog's result. Fingerprints additionally cover animation.ts and focus/selection/press sources; changing T animation bytes makes the run partial, not stable parity. No polling or additional pair is authorized here.

### Executed once per engine; stable final animation bytes

Executed from approved temp, same source fixture/actions/settlement, one paired contrast only:

```sh
rtk proxy node select-event-order-capture.cjs react
rtk proxy node select-event-order-capture.cjs native
```

`addInitScript` registers window/document observers before any app import. All added observers passive/capture; original late document recorder retained. Actual Event objects are correlated by WeakMap identity. Observers only record scalars/Error stacks, without altering listener registration semantics, focus/propagation, timers, DOM or actions. No debugger pause or framework monkeypatch. Native70 observer rows/React65, not70/65 distinct events.

Both source cases complete with unchanged before/after inputs, no page/console errors, Chromium143.0.7499.4/1280×720. Native already captured **final animation fix SHA256 `06e711a5988e6a45715f55033c7f4b27004de9e8d25b5ec50930768cda2b9c8b`**. After T's explicit completion notification a single reconciliation hash matched this exact captured value; no unchanged native replay performed. Frozen animation SHA `8db65a47551f5ad2c9eb8a3140c46786941cb2a149ab5946891471f37f2d3d38`. Native `useSelectableItem.ts` SHA `c98f12d8a8c9794117c042b3e91b94292332a3735ecc5aca36dace8a2a3c4f55`; other source snapshots retained in each event-order JSON.

### Dog focus: late-recorder hypothesis falsified

IDs below belong to the new **early observer's** map, separate from original checkpoint IDs.

| Engine | Actual observed order | Dispatch nesting at Dog focusin |
|---|---|---|
| React | seq36 early-window pointerdown event15; seq37 early-document; seq38 late-document; seq41 early-window focusin event17 | Same pointerdown event15 still dispatching, phase3/currentTarget BODY; Dog focus occurs during this pointerdown's bubble processing |
| Native | seq38 early-window focusin event16; seq39 early-document; seq40 late-document; **seq41 early-window pointerdown event17**,42early-document,43late-document | No other recorded Event is still dispatching at focusin; Dog is already active when the earliest pointerdown listener runs |

Native Dog focusin observed at387.30ms; early pointerdown at387.70ms. React early pointerdown328.30ms; Dog focusin332.30ms. Both target their original captured Dog (native early-node9/originalOptionIndex1, React11/index1), connected under original captured listbox. All events trusted. Native pointerdown Event.timeStamp383.10ms precedes focusin's387.30ms, but that is event creation time: **the pre-app window observer's dispatch order**, not creation timestamp, establishes what listeners observe.

Both stacks identify the real focus call: `useSelectableItem` → `focusSafely` → `focusWithoutScrolling` → the existing `useFocusVisible` focus wrapper. Native stack continues through `_effectFn`, `runEffect`, `runQueue`; React through passive-hook commit frames. The serialized stack URL line90 (native) /69 (React) refers to **served transformed modules**, not asserted original-file line mapping.

**Proven:** this measured Dog difference is visible at the earliest window observer and is not the former late document recorder being overtaken by a prior document pointerdown handler. **Not proven:** which earlier input/state update scheduled native's focus effect, or whether renderer scheduling/hover is the initiating cause. Pointermove/over were not instrumented; `outer=[]` means no active event from the recorded set, not absence of all possible event nesting. No second contrast/source diagnosis performed.

### Extra Escape focus: actual different connected host, not merely logger ordering

Native early seq55 records Escape keydown event22 targeting original listbox6. At seq60, early-window focusin event24 targets **Dog node10**, `isConnected=true`, role option, key dog, originalOptionIndex=-1, containing original captured listbox=false; parent is **different listbox11**. The original Dog is node9/index1 under original listbox6. New Dog10 shares original Dog9's DOM id `react-aria7303871677-cl-19-option-dog`, but **is a different actual Node**. New listbox11 similarly shares original listbox6's DOM id. This distinction uses retained object identity, not a requery substitution.

That focusin is genuinely nested in the same Escape keydown event22, eventPhase3/currentTarget native DIV (original dialog early-node7). Stack is again `useSelectableItem` → focusSafely/focusWithoutScrolling → native effect/runQueue. At seq65 the original trigger2 receives focus via `FocusScope` restoreFocusToElement; no recorded outer event remains. Final observations show both original/new Dog and listbox nodes disconnected; original trigger/select/form remain connected and form values `['cat','dog']` pass. React Escape goes directly to original trigger2 via FocusScope and never emits the additional Dog focusin.

**Proven:** native briefly focuses a connected non-original Dog in a non-original listbox during Escape's dispatch, before correct final trigger restoration. **Unproven:** initiating owner/allocation cause or whether originals/new nodes coexist at that instant (no mutation/owner instrumentation). The evidence must not be collapsed into either a logging artifact or a whole-component lifetime diagnosis.

### Behavioral and diagnostic results on these same bytes

- Both execute all original Select form assertions: retained trigger/options, real callback sequence `['cat']` then `['cat','dog']`, actual selectedOptions `['cat','dog']`, captured native-select identity, FormData values and Escape restoration/removal. No forced-value/focus workaround added. Earlier exact source helper listbox.focus action remains unchanged.
- Native **EFFECT_WRITES_OWN_SOURCE2→0** versus preceding Select capture. React warnings0. This directly observes clearance for this same source case on final animation bytes, not all animation consumers.
- Native remains **WIDE_SCOPE_DEPS3 + HOT_SCOPE_TIME1**. WIDE counts33/32/32; owner stack traverses Form→Select/CollectionBuilder→Popover→Portal/FocusScope→ListBox→SharedElementTransition→FocusableContext→Component/ElementType→Host effect. HOT: Button host effect **8.8ms/1000ms**, budget8ms; causes `useFocusRing.isFocused` / `useFocusRing.isFocusVisibleState`. Full warning strings and owner paths are retained unchanged in native JSON. **No diagnostic-clean claim.**
- No new production edits, no browser matrix, no follow-up reruns. Both servers retained; reference entries unchanged by the measurement contrast.

### Contrast artifacts

Approved-temp files: `select-event-order-capture.cjs`, `select-event-order-summary.json`; per-environment `select/event-order.json` and `select/event-order-final.png`. Earlier `select/result.json`/screenshots remain intact. JSON includes original committed rows, original late observer sequence, correlated early observations, focus stacks, final retained-node state, full diagnostics, before/after source hashes.

```text
230d4d40c331e9a1fe238d1ab9e9af350e34f300710d4ac6f86b452a4baa12eb select-event-order-capture.cjs
29eba197b8986c447d5a651a2b5dedaa3a08af6d857bb5bb3f2926a205cb482a react-tooltip-reference/select/event-order.json
d8ba4f3bea80ea1f88ff281533cb5c5446118b7d437efc39ae7d92a50b9aeecc native-tooltip-reference/select/event-order.json
```
