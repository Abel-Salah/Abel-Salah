import test from 'node:test';
import assert from 'node:assert/strict';
import { parseConsent, CONSENT_DURATION } from '../src/lib/trackingConsent.ts';
test('missing, corrupt, expired and future choices fail closed', () => {
  const now = CONSENT_DURATION * 2;
  for (const raw of [null, '{', '{}', JSON.stringify({accepted:true,at:0}), JSON.stringify({accepted:true,at:now+1}), JSON.stringify({accepted:'true',at:now})]) assert.equal(parseConsent(raw,now),null);
});
test('accept and refuse are both remembered within the consent period', () => {
  for(const accepted of [true,false]) assert.equal(parseConsent(JSON.stringify({accepted,at:1000}),2000),accepted);
});
