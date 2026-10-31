import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';
import {fixture, g, write} from './fixtures.mjs';
import {runUpstream} from '../../../scripts/upstream/git/workflow.mjs';
import {runVerification} from '../../../scripts/upstream/verify/writer.mjs';
import {hash, json} from '../../../scripts/upstream/git/state.mjs';
import {git} from '../../../scripts/upstream/git/process.mjs';

function evidence(f, mutate = () => {}) {
  const scope = {source: f.source, scopes: [{id: 'fixture-library', requiredChecks: ['source-tests', 'types']}]};
  const scopeText = json(scope);
  write(join(f.root, 'tracking/upstream/library-scope.json'), scopeText);
  const state = f.readState();
  const initial = state.verifiedParitySha === null;
  const toSha = initial ? f.baseline : state.fetchedCandidateSha;
  const checks = scope.scopes[0].requiredChecks.map(id => {
    const path = `evidence/${id}.json`, command = `fixture ${id}`;
    const text = json({status: 'passed', exitCode: 0, command, sourceSha: toSha,
      scopeId: 'fixture-library', checkId: id});
    write(join(f.root, path), text);
    return {id, command, status: 'passed', path, sha256: hash(text)};
  });
  const bundle = {schemaVersion: 1, source: f.source, scope: 'library',
    kind: initial ? 'initial' : 'update', toSha,
    fromSha: initial ? f.baseline : state.activeEpisode.fromSha,
    reportHash: initial ? null : state.activeEpisode.reportHash, scopeHash: hash(scopeText), blockers: [],
    results: [{id: 'fixture-library', status: 'passed', checks}]};
  mutate(bundle);
  const text = json(bundle), path = 'evidence/bundle.json';
  write(join(f.root, path), text);
  return {root: f.root, evidencePath: path, evidenceHash: hash(text)};
}

test('initial null parity freezes baseline through update, queue and init; full binary diff bytes retained', t => {
  const f = fixture(t);
  write(join(f.producer, 'binary.dat'), Buffer.from([0, 255, 128, 13, 10]));
  write(join(f.producer, 'tab\tline\nfile.txt'), 'NUL-safe path');
  const next = f.advance();
  runUpstream({root: f.root, command: 'update'});
  assert.equal(g(f.checkout, 'rev-parse', 'HEAD'), f.baseline);
  const state = f.readState();
  const report = JSON.parse(readFileSync(join(f.paths.episodes, state.activeEpisode.id, 'report.json')));
  const raw = git(f.checkout, ['diff', '--binary', '--full-index', '--no-ext-diff', '--no-textconv',
    '--find-renames=50%', f.baseline, next, '--'], {encoding: null}).stdout;
  assert.deepEqual(Buffer.from(report.rawDiffBase64, 'base64'), raw);
  assert.equal(hash(Buffer.from(report.rawDiffBase64, 'base64')), report.rawDiffHash);
  assert.equal(hash(Buffer.from(report.rawMetadataBase64, 'base64')), report.rawMetadataHash);
  assert.ok(report.changes.some(c => c.newPath === 'tab\tline\nfile.txt'));
  const later = f.advance('later');
  runUpstream({root: f.root, command: 'update'});
  assert.equal(f.readState().queuedCandidateSha, later);
  runUpstream({root: f.root, command: 'init'});
  assert.equal(g(f.checkout, 'rev-parse', 'HEAD'), f.baseline);
  assert.equal(f.readState().verifiedParitySha, null);
});

test('writer is check-only by default; complete initial scope can publish tested state', t => {
  const f = fixture(t), opts = evidence(f);
  const before = readFileSync(f.paths.state);
  assert.equal(runVerification(opts).outcome, 'checked');
  assert.deepEqual(readFileSync(f.paths.state), before);
  assert.equal(runVerification({...opts, advance: true}).outcome, 'verify');
  assert.equal(f.readState().verifiedParitySha, f.baseline);
  assert.ok(existsSync(join(f.paths.episodes, `${f.baseline}-${f.baseline}`, 'verified.json')));
});

test('partial scope cannot promote global parity', t => {
  const f = fixture(t), opts = evidence(f, b => { b.results[0].checks.pop(); });
  assert.throws(() => runVerification({...opts, advance: true}), {code: 'INCOMPLETE_SCOPE'});
  assert.equal(f.readState().verifiedParitySha, null);
});

test('blocked or deferred scope cannot promote parity', t => {
  const f = fixture(t), opts = evidence(f, b => { b.blockers.push('retained context failure'); });
  assert.throws(() => runVerification({...opts, advance: true}), {code: 'OPEN_BLOCKER'});
  assert.equal(f.readState().verifiedParitySha, null);
});

test('tampered passing check bytes cannot promote parity', t => {
  const f = fixture(t), opts = evidence(f);
  write(join(f.root, 'evidence/types.json'), '{}');
  assert.throws(() => runVerification({...opts, advance: true}), {code: 'STALE_EVIDENCE'});
  assert.equal(f.readState().verifiedParitySha, null);
});

test('mismatched source scope declaration cannot promote parity', t => {
  const f = fixture(t), opts = evidence(f);
  write(join(f.root, 'tracking/upstream/library-scope.json'), json({source: f.source, scopes: []}));
  assert.throws(() => runVerification({...opts, advance: true}), {code: 'INCOMPLETE_SCOPE'});
  assert.equal(f.readState().verifiedParitySha, null);
});

test('verification publication interruption resumes journal before fetching', t => {
  const f = fixture(t), opts = evidence(f);
  assert.throws(() => runVerification({...opts, advance: true, checkpoint: point => {
    if (point === 'state-temp') throw Error('interrupted verification');
  }}), /interrupted verification/);
  f.advance();
  assert.equal(runUpstream({root: f.root, command: 'update'}).outcome, 'resumed');
  assert.equal(f.readState().verifiedParitySha, f.baseline);
  assert.equal(f.readState().fetchedCandidateSha, f.baseline);
  assert.equal(existsSync(f.paths.journal), false);
});

test('initial writer retains queued episode; later full range verification clears only active episode', t => {
  const f = fixture(t), next = f.advance();
  runUpstream({root: f.root, command: 'update'});
  const later = f.advance('later');
  runUpstream({root: f.root, command: 'update'});
  runVerification({...evidence(f), advance: true});
  assert.equal(f.readState().verifiedParitySha, f.baseline);
  assert.equal(g(f.checkout, 'rev-parse', 'HEAD'), next);
  assert.equal(f.readState().queuedCandidateSha, later);
  runVerification({...evidence(f), advance: true});
  assert.equal(f.readState().verifiedParitySha, next);
  assert.equal(f.readState().activeEpisode, null);
  assert.equal(f.readState().queuedCandidateSha, later);
});

test('tampering after journal publication blocks verification replay without discarding intent', t => {
  const f = fixture(t), opts = evidence(f);
  assert.throws(() => runVerification({...opts, advance: true, checkpoint: point => {
    if (point === 'journal') throw Error('interrupted verification');
  }}), /interrupted verification/);
  write(join(f.root, 'evidence/types.json'), 'tampered');
  assert.throws(() => runUpstream({root: f.root, command: 'init'}), {code: 'STALE_EVIDENCE'});
  assert.equal(f.readState().verifiedParitySha, null);
  assert.ok(existsSync(f.paths.journal));
});
