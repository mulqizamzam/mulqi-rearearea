import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { parse as parseYaml } from 'yaml';

export const name = 'dsh-reverse-engineer-anything-self-learning-loop';
const root = dirname(fileURLToPath(import.meta.url));

export async function apply(ctx) {
  if (!ctx.skills || typeof ctx.skills.register !== 'function') {
    throw new Error('[dsh-reverse-engineer-anything-self-learning-loop] Missing ctx.skills service. Enable @deepseek-ai/dsh-skill in the profile.');
  }

  const file = await readFile(join(root, 'SKILL.md'), 'utf8');
  if (!file.startsWith('---\n')) throw new Error('Invalid SKILL.md frontmatter: missing opening delimiter.');
  const end = file.indexOf('\n---', 4);
  if (end < 0) throw new Error('Invalid SKILL.md frontmatter: missing closing delimiter.');
  const meta = parseYaml(file.slice(4, end));
  if (!meta || meta.name !== 'reverse-engineer-anything-self-learning-loop' || typeof meta.description !== 'string') {
    throw new Error('Invalid SKILL.md frontmatter: name and description are required.');
  }

  ctx.skills.register({
    name: meta.name,
    description: meta.description,
    whenToUse: 'Use for authorised software reconstruction, interoperability, platform ports, and parity-driven completion. Always begin with the authority and scope gate.',
    source: 'bundled',
    provider: 'dsh-reverse-engineer-anything-self-learning-loop',
    resourceBase: { kind: 'directory', path: root },
    path: join(root, 'SKILL.md'),
    content: file.slice(end + 4).trim(),
    invocation: { modelInvocable: true, userInvocable: true },
    metadata: { ...(meta.metadata ?? {}), dshTarget: '0.2.1-rc.2' }
  });
}
