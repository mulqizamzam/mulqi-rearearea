import test from 'node:test';
import assert from 'node:assert/strict';
import { apply, name } from '../index.js';

test('plugin apply registers the bundled skill with the DSH skill service', async () => {
  let registered;
  const ctx = { skills: { register(value) { registered = value; } } };
  await apply(ctx);
  assert.equal(name, 'dsh-reverse-engineer-anything-self-learning-loop');
  assert.ok(registered);
  assert.equal(registered.name, 'reverse-engineer-anything-self-learning-loop');
  assert.equal(registered.provider, name);
  assert.equal(registered.source, 'bundled');
  assert.equal(registered.metadata.dshTarget, '0.2.1-rc.2');
  assert.equal(registered.invocation.modelInvocable, true);
  assert.equal(registered.invocation.userInvocable, true);
  assert.match(registered.content, /AUTHORISATION AND SCOPE GATE/);
});

test('plugin apply fails closed when the DSH skill service is missing', async () => {
  await assert.rejects(() => apply({}), /Missing ctx/);
});
