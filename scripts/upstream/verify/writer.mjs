import {existsSync} from 'node:fs';
import {sourcePaths, readState, withSourceLock, fail, json} from '../git/state.mjs';
import {repositoryRoot, inspectSource, requireClean, requireHead, requireCommit} from '../git/checkout.mjs';
import {validateEpisode, transact} from '../git/workflow.mjs';
import {validateVerificationEvidence} from './evidence.mjs';

export function runVerification({root = process.cwd(), source = 'react-spectrum', evidencePath,
  evidenceHash, advance = false, checkpoint = () => {}} = {}) {
  root = repositoryRoot(root);
  const paths = sourcePaths(root, source);
  return withSourceLock(paths, () => {
    if (existsSync(paths.journal)) fail('PENDING_TRANSACTION', 'Resume the pending transaction before new verification.');
    const before = readState(paths);
    const proof = validateVerificationEvidence(root, paths, before, {path: evidencePath, hash: evidenceHash});
    const info = inspectSource(root, before, source);
    requireClean(info);
    requireCommit(info.checkout, proof.target);
    validateEpisode(paths, before);
    if (!advance) return {outcome: 'checked', source, target: proof.target, scopeHash: proof.scopeHash};
    const initial = before.verifiedParitySha === null;
    const after = {...before, verifiedParitySha: proof.target,
      ...(initial ? {} : {activeEpisode: null})};
    requireHead(info, [initial ? before.baselineSourceSha : before.fetchedCandidateSha]);
    const id = initial ? `${proof.target}-${proof.target}` : before.activeEpisode.id;
    return transact(root, paths, before, after, info, 'verify', [{path: `${id}/verified.json`,
      text: json({source, target: proof.target, scopeHash: proof.scopeHash,
        evidenceHash, evidencePath, evidence: proof.bundle})}], checkpoint, proof.reference);
  });
}
