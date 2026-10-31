import { git } from './process.mjs';
import { fail, hash } from './state.mjs';

export function changeReport(checkout, source, state, fromSha, toSha) {
  const rawMetadata = git(checkout, ['diff', '--raw', '-z', '--no-abbrev', '--no-ext-diff', '--no-textconv',
    '--find-renames=50%', fromSha, toSha, '--'], {encoding: null}).stdout;
  const fields = rawMetadata.toString('utf8').split('\0');
  const changes = [];
  for (let i = 0; i < fields.length && fields[i];) {
    const header = fields[i++].match(/^:(\d+) (\d+) ([a-f0-9]{40}) ([a-f0-9]{40}) ([A-Z])(\d*)$/);
    if (!header) fail('DIFF_FORMAT', 'Unexpected raw Git diff format; refusing an incomplete change report.');
    const [, oldMode, newMode, oldBlob, newBlob, status, score] = header;
    const oldPath = fields[i++];
    const newPath = status === 'R' || status === 'C' ? fields[i++] : oldPath;
    changes.push({ status, ...(score ? { similarity: Number(score) } : {}),
      oldPath: status === 'A' ? null : oldPath, newPath: status === 'D' ? null : newPath,
      oldMode, newMode, oldBlob, newBlob, disposition: 'untriaged' });
  }
  const commits = git(checkout, ['rev-list', '--topo-order', '--reverse', `${fromSha}..${toSha}`]).stdout.trim().split('\n').filter(Boolean);
  const rawDiff = git(checkout, ['diff', '--binary', '--full-index', '--no-ext-diff', '--no-textconv',
    '--find-renames=50%', fromSha, toSha, '--'], {encoding: null}).stdout;
  return { schemaVersion: 1, source, repositoryUrl: state.repositoryUrl, branch: state.branch,
    fromSha, toSha, commits, changes, kind: 'raw-source-diff',
    commitOrdering: 'reverse topological order (git rev-list --topo-order --reverse)',
    rawDiffBase64: rawDiff.toString('base64'), rawDiffHash: hash(rawDiff),
    rawMetadataBase64: rawMetadata.toString('base64'), rawMetadataHash: hash(rawMetadata),
    qualification: 'unverified', impactStatus: 'pending-source-impact' };
}
