import {readFileSync} from 'node:fs';
import {fail, hash, readJson, safePath} from '../git/state.mjs';

// A declared full library scope is a prerequisite, not an inferred list of green batches.
// No declaration is installed for the unfinished canonical migration.
export function validateVerificationEvidence(root, paths, state, reference) {
  if (!reference || !/^[a-f0-9]{64}$/.test(reference.hash)) fail('INVALID_EVIDENCE', 'Exact evidence SHA-256 required.');
  const text = readFileSync(safePath(root, reference.path), 'utf8');
  if (hash(text) !== reference.hash) fail('STALE_EVIDENCE', 'Evidence bytes differ from the requested hash.');
  const bundle = JSON.parse(text);
  const scopePath = 'tracking/upstream/library-scope.json';
  const scopeText = readFileSync(safePath(root, scopePath), 'utf8');
  const declaration = JSON.parse(scopeText);
  if (declaration.source !== paths.source || !Array.isArray(declaration.scopes) || !declaration.scopes.length ||
      bundle.scopeHash !== hash(scopeText)) fail('INCOMPLETE_SCOPE', 'Evidence must match the complete declared library scope.');
  const initial = state.verifiedParitySha === null;
  const target = initial ? state.baselineSourceSha : state.fetchedCandidateSha;
  if (bundle.schemaVersion !== 1 || bundle.source !== paths.source || bundle.scope !== 'library' ||
      bundle.kind !== (initial ? 'initial' : 'update') || bundle.toSha !== target ||
      bundle.fromSha !== (initial ? state.baselineSourceSha : state.activeEpisode?.fromSha) ||
      bundle.reportHash !== (initial ? null : state.activeEpisode?.reportHash)) {
    fail('INVALID_EVIDENCE', 'Wrong evidence scope/source/range/report; partial passes cannot promote parity.');
  }
  if (!Array.isArray(bundle.blockers) || bundle.blockers.length || !Array.isArray(bundle.results)) {
    fail('OPEN_BLOCKER', 'Complete results and no blocked/deferred scopes required.');
  }
  const unique = (values) => new Set(values).size === values.length;
  const ids = declaration.scopes.map(s => s.id);
  if (!unique(ids) || !unique(bundle.results.map(s => s.id)) ||
      bundle.results.length !== ids.length || bundle.results.some(s => !ids.includes(s.id))) {
    fail('INCOMPLETE_SCOPE', 'Every declared scope must be verified exactly once.');
  }
  for (const scope of declaration.scopes) {
    const result = bundle.results.find(s => s.id === scope.id);
    if (typeof scope.id !== 'string' || !scope.id || !Array.isArray(scope.requiredChecks) ||
        !scope.requiredChecks.length || !unique(scope.requiredChecks) || result.status !== 'passed' ||
        !Array.isArray(result.checks) || result.checks.length !== scope.requiredChecks.length ||
        !unique(result.checks.map(c => c.id))) fail('INCOMPLETE_SCOPE', 'Missing/pending required scope checks.');
    for (const check of result.checks) {
      if (!scope.requiredChecks.includes(check.id) || check.status !== 'passed' ||
          typeof check.command !== 'string' || !check.command.trim() || !/^[a-f0-9]{64}$/.test(check.sha256)) {
        fail('INCOMPLETE_SCOPE', 'Required source checks must have genuine passing evidence.');
      }
      const receiptPath = safePath(root, check.path);
      const bytes = readFileSync(receiptPath);
      if (hash(bytes) !== check.sha256) fail('STALE_EVIDENCE', 'Check evidence bytes changed.');
      const receipt = readJson(receiptPath);
      if (receipt.status !== 'passed' || receipt.exitCode !== 0 || receipt.command !== check.command ||
          receipt.sourceSha !== target || receipt.scopeId !== scope.id || receipt.checkId !== check.id) {
        fail('INVALID_EVIDENCE', 'Check receipt must match source, scope, command and successful exit.');
      }
    }
  }
  return {target, bundle, reference, scopeHash: hash(scopeText)};
}
