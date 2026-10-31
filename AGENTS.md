# Migration execution rules

## Reporting test exclusions clearly

- In user-facing reports, call structural exclusions inherited from upstream **upstream platform exclusions**, never “skips” or “skipped tests.” Verify their upstream provenance before using that description.
- Reserve **skipped** for work we actually left undone: tests omitted because of an unresolved problem, an inability to execute them, or a decision not to attempt them. State the reason plainly.
- Do not present upstream platform exclusions as unfinished migration work or failures. Prefer “358 passed, 0 failed” and, only when relevant, “41 upstream platform exclusions.” Keep technical engine details out unless requested.
- Preserve exact runner statuses in raw evidence, but translate them accurately in summaries. Never relabel our own omissions as upstream exclusions or imply excluded cases passed.

## Collecting library-test diagnostics

When asked to collect diagnostics, use **already-written library browser tests**, not website demos, MCP browser driving or a new audit framework. This task maintains the Solid library, not the docs site. The former `docs-website/audit` was deleted; do not recreate it.

From repository root:
```sh
node scripts/test-diagnostics/run.mjs
node scripts/test-diagnostics/report.mjs
```

- Runner uses `vitest.browser.config.ts` and existing core browser suites across Chromium/Firefox/WebKit, including opt-in Modal/Dialog/ShadowDOMFocus. It checks actual Solid/signals development-runtime availability. No website build/server is required.
- Preserve original tests, assertions, skips and console-error failure behavior. Capture Solid/Aria console warnings/errors, exceptions and test failures without suppression. Missing browser suites/engines or skipped interactions are coverage limitations, not passes.
- Read `tracking/browser-test-diagnostics/INDEX.md`, then the relevant component Markdown brief. Reports deduplicate per component using diagnostic code, source location and meaningful stack; retain exact messages, relevant technical file/line/stack, test names, engines and occurrence counts. Never invent causal ownership.
- Evidence links must point to small issue-specific excerpts **at most 8 KB per file**, split when needed—not global JSON/JSONL, HTML or full DOM. Raw logs are backing evidence only.
- Separate library runtime diagnostics, assertion/timeouts, collector/tooling failures and unexercised coverage. Verify report links/counts/evidence sizes and record source snapshot/runtime qualifications. Zero warnings on exercised tests is not whole-library clearance.
- Stop after collection/reporting unless library repairs are assigned. Do not expand collection into docs maintenance or new test infrastructure.

## Mandatory Solid 2 practice

For every Solid implementation, docs demo, wrapper or reactive-diagnostic repair, load `solidjs-v2-best-practices` and follow [its project-local instructions](.opencode/skills/solidjs-v2-best-practices/SKILL.md). Query relevant Solid 2 documentation and check pinned semantics before reactive adaptation; do not infer them from React or Solid 1.

No blanket whole-component JSX memo wrappers, inline render-callback memo factories, gratuitous function wrappers, diagnostic suppression or scheduling/positioning hacks. Fix the exact read and ownership boundary with idiomatic tracked JSX and justified named derivations. Preserve component/DOM identity, state, focus, caret and source behavior. Passing compilation or silenced warnings is not behavioral proof.

Every Migrator brief must explicitly require this skill, carry known rejected approaches and unresolved blocker budgets, and distinguish verified repairs from experiments. Review inherited speculative changes before propagating them. This requirement does not expand an assignment's editing scope; docs-only agents must document library-only causes rather than contort demos or patch the library.

## Start and resume

1. Read `HANDOFF.md` first. It is the current execution checkpoint.
2. Read only the relevant section of `MIGRATION_PLAN.md`, the applicable migration skill references, and the source/test files for the next action. Do not repeat whole-project research.
3. Inspect current files/Git status and reconcile them with the checkpoint. Files and actual results override stale prose. Preserve unfamiliar work.
4. Preserve exhausted-case evidence and follow the current authorization/budget. Escalate a stalled agent to coordinator code/trace review rather than repeatedly asking the user to continue. Keep independent work moving; ask the user only when no authorized useful work remains or a genuine global decision is required.

## Goal and scope

The goal is source-faithful code migration with passing copied source tests. Verification supports that goal; it is not an open-ended research project.

- Terminal-copy upstream implementation/tests before adapting them. Preserve source paths, behavior and assertions.
- Work on two primary families plus their real dependencies. Keep the canonical source frozen/read-only.
- Use native Solid 2. No React fallback, simplified replacement algorithms, weakened assertions, hidden skips, or fabricated passes.
- Respect the existing plan, but these user-directed execution limits govern its cadence and verification scope.
- Work in coherent multi-file changes (shared helper + hook + component + fixture), then run the affected checks. Do not turn ordinary porting into per-edit permission requests, per-file paperwork, or repeated research. Use Solid 2 docs-mcp documentation and pinned declarations for unfamiliar APIs.

## Fixed verification scope

Before a batch, record its source suites, relevant type check, required source browser/SSR cases, and concrete affected-consumer checks in `HANDOFF.md` or its linked batch record.

- Do not add acceptance gates mid-batch unless a specific observed defect requires a focused check. Explain the addition.
- No newly invented component test suites, general browser/device matrices, fuzzing, benchmark projects, recursive reviews, or generic verification frameworks.
- Run the shared native toolchain proof once. Repeat only the affected proof when its inputs change or a concrete failure warrants it.
- Full-package, packed-consumer, tree-shaking, and comprehensive integration checks belong to the final integration phase, not every component batch. A focused packaging check is appropriate when packaging itself changes.
- Keep original source browser/SSR cases; do not add speculative platform obligations.
- Do not rerun unchanged passing checks. Missing paperwork alone is not a failed implementation and does not justify rebuilding verification infrastructure.
- Use direct runner commands until a wrapper genuinely saves repeated work. Planned wrapper commands are not prerequisites for porting.

## DOM-first diagnosis and active supervision

The target is the browser's observable contract: DOM identity, attributes/styles, event delivery, accepted state, focus/caret/selection, callbacks and cleanup. Preserve the donor's behavior, not React's rendering mechanics. A warning-free mount or a unit pass does not establish that contract.

1. State the exact expected interaction and observed mismatch. Capture the ORIGINAL node/ref/owner before the action; do not requery a replacement and call it retained.
2. Use a small automated replay of that existing flow to compare expectation with reality. Temporary Playwright/compiled-code instrumentation may log attachment/disposal IDs, callback order, getter/key reads, first invalidating dependency, DOM mutations and unfiltered diagnostics. This is focused investigation, not permission to invent a general test framework or alter original assertions. Never credit synthetic transport as a real native gesture; remove instrumentation before final proof.
3. Identify the first wrong boundary, not its downstream cascade. Distinguish component construction from leaf updates, child-source selection from child evaluation, and a ref attachment from another attachment's cleanup. Inspect actual compiled code and the installed Solid pin.
4. Test one falsifiable causal change against the same replay. Keep the smallest repair that preserves existing semantics; revert disproven candidates. Narrow changes to the failing path instead of replacing a working static/dynamic/provider path wholesale.
5. When an agent stalls, the coordinator must read the exact code and trace, challenge the approach, and give a concrete next hypothesis or smaller design. Do not merely respawn the task, extend a reading loop, or accept repeated “could not solve” handoffs. More agents help only when their ownership and useful work are independent.
6. Consult the sibling Base UI port or Kobalte when a specific blocker could benefit from a proven pattern. Verify versions and contracts; borrow the needed principle, not an entire subsystem. Preserve Aria's precedence, controlled-state and cleanup semantics even when the reference differs.
7. Qualify retained fixes with unchanged affected source/SSR tests and fresh, uninstrumented browser behavior. Verify actual served contents, not asset filenames. Use isolated browser contexts/processes for safe parallel automation; otherwise serialize browser driving. Run needed builds in background while independent source/test work continues.

Search infrastructure must not hold the implementation lane hostage. **Current user override: do not use CCC at all, including background commands.** Use FFF, literal grep/glob and direct known-path reads; no indexing or tool troubleshooting. Interrupt or redirect blocked agent work rather than killing/restarting CCC/MCP processes. If CCC is explicitly re-enabled later, run its CLI searches/indexing in background terminal tasks with bounded timeouts and continue independent work.

Concrete lessons: membership/descriptor lookup can subscribe to a losing prop bag even when value precedence is correct; stabilize the actual child source rather than memoizing whole JSX trees. Old ref teardown must not clear a replacement attachment. Two same-turn handlers may require the donor's committed-state snapshot rather than cumulative functional toggles. Incremental dynamic-list reconciliation should preserve an already-qualified static-child path. Detailed evidence: `../solid-aria-migration-learnings/07-shared-boundary-breakthroughs.md`.

## Hard stop rules

User clarification: ordinary native Solid code/type adaptation is authorized porting work. Continue autonomously through diagnosed fixes and compiler errors that are being concretely reduced. Do not treat each typecheck invocation or each newly exposed error as an unsuccessful hypothesis on one blocker. The limits below apply to repeated unsuccessful approaches to the SAME unresolved cause or directionless investigation, not productive migration. Preserve behavior/assertions, not React implementation mechanics or React type spellings.

For one unresolved root-cause blocker, apply the current user-directed limits:

1. **Seven unsuccessful hypothesis → change/experiment → focused-check attempts**, including attempts already made for that cause; do not reset history.
2. **Ten consecutive investigative tool calls without a concrete diagnosis or a migration fix trigger coordinator review.** Count calls inside parallel wrappers separately; do not hide directionless investigation in scripts or delegated work. This is a strategy-change escalation, not an automatic user-permission request or a halt to independent work.

A successful diagnosis ends a directionless-investigation streak, but does not reset the failed-attempt budget for the same unresolved blocker. Renaming a problem, changing chats, compaction, or handing it to another agent does not reset either budget. Persist counts and failed hypotheses in the checkpoint. Ordinary necessary file reading and productive component adaptation are not failures, but broadening searches without new evidence is investigation.

Stop earlier if resolving the issue requires patching/forking Solid or another dependency, changing the pinned framework profile after bootstrap, an architectural change outside explicit authorization, substantially expanding the batch beyond its recorded dependency closure, or weakening source fidelity. Ask before undertaking an unauthorized change. Source-tracked normal hook/renderer adaptation and explicitly authorized incremental collection reconciliation are not escalations by themselves.

At an escalation or exhausted budget:

- Preserve current work and record whether the subset needs coordinator review, has exhausted its budget, or genuinely requires user authorization. Use `blocked-awaiting-user` only for that last case.
- Report: what works, the exact failing case/seam, attempts and findings, and the smallest recommended next step.
- The coordinator reviews the causal evidence and supplies a concrete next strategy within the remaining authorized budget. Do not treat productive diagnosed fixes or ordinary compiler corrections as failed hypotheses.
- After seven unsuccessful approaches, defer that subset and continue independent work without erasing the failures. Ask a concrete user decision only when renewed authorization or a global tradeoff is actually needed; do not keep retrying an exhausted cause indefinitely.
- A blocked batch stays blocked, not green. An exception requires explicit user agreement.

These budgets apply to bootstrap/updater/harness problems too. Do not spend an unlimited session perfecting tooling before component work.

## Durable continuity

### Delegation briefs

Use Migrator agents for substantive implementation. Each assignment must be self-contained and detailed: include the latest user intent, coordinator's preferred solution and reasoning, exact causal evidence/files, failed approaches and remaining budgets, allowed native adaptations, disallowed alternatives, disjoint ownership, concrete verification commands, and completion/stop criteria. Do not assume agents see the conversation or can reconstruct intent from markdown records. Records supply supporting evidence, not a substitute for the implementation brief. Give end-to-end ownership rather than speculative design freedom or repeated helper-sized handoffs.

Update `HANDOFF.md` after a coherent implementation step, a meaningful test result, a failed debugging attempt, a user decision, and before stopping or switching tasks. Do not wait for a compaction warning. Avoid per-edit bookkeeping.

Keep `HANDOFF.md` around 20–40 lines: current status, working commands, next action, and any active blocker. Completed work needs only a short result; do not retain its edit history, resolved errors, or every file touched. For an unresolved blocker only, retain the exact failure and failed hypotheses/remaining budget. Link existing results rather than duplicate them. Do not create extra records merely to demonstrate thoroughness.

Update the plan only for a lasting change to scope, sequence, native conventions, or acceptance. Change the relevant section in place; do not append a new narrative after every batch. Keep a completed batch summary to a few bullets and useful lessons. Conversation history and tool logs already contain the detailed chronology.

Distinguish implemented, tested, and blocked. Include unfinished edits and any running process/port. Never record a planned command as executed. Reuse the checkpoint's actual command; verify paths/options rather than assuming planned scripts exist.

New chats do one lightweight reconciliation and continue. Consult prior conversation recall only for a specific missing fact; do not reread all prior sessions. No need to reconstruct reasoning already distilled in the checkpoint.

The user has authorized continuous migration through successive waves, using as many nonconflicting Migrator subagents as dependency readiness permits. Prefer delegated implementation to coordinator implementation; no per-wave approval is needed. Maintain exact disjoint ownership and a single integrator for shared files. Stop only for exhausted/global decisions, retaining blocked subsets while other lanes proceed. No commits, publishing, source advancement, fidelity weakening, or dependency/framework patches are authorized by this execution permission.
