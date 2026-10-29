import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const name = 'dsh-reverse-engineer-anything-self-learning-loop';
const root = dirname(fileURLToPath(import.meta.url));

export async function apply(ctx) {
  if (!ctx.skills || typeof ctx.skills.register !== 'function') {
    throw new Error('[dsh-reverse-engineer-anything-self-learning-loop] Missing ctx.skills service. Enable @deepseek-ai/dsh-skill in the profile.');
  }
  const file = await readFile(join(root, 'SKILL.md'), 'utf8');
  const closing = file.indexOf('\n---', 4);
  if (!file.startsWith('---\n') || closing < 0) throw new Error('Invalid SKILL.md frontmatter.');
  const bodyStart = file.indexOf('\n', closing + 4);
  ctx.skills.register({
    name: 'reverse-engineer-anything-self-learning-loop',
    description: 'Authorisation-gated, evidence-led software reconstruction with parity checks, regression reviews, and operator-approved learning.',
    whenToUse: 'Use for authorised software reconstruction, interoperability, platform ports, and parity-driven completion. Always begin with the authority and scope gate.',
    source: 'bundled',
    provider: 'dsh-reverse-engineer-anything-self-learning-loop',
    resourceBase: { kind: 'directory', path: root },
    path: join(root, 'SKILL.md'),
    content: file.slice(bodyStart + 1).trim(),
    invocation: { modelInvocable: true, userInvocable: true },
    metadata: { version: '0.2.1', dshTarget: '0.2.1-rc.2', upstreamVersion: '1.0.1' }
  });
}
