import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';

test('downloaded standalone page has executable, self-contained JavaScript', async () => {
  const html = await fs.readFile(new URL('../generated/AI Behind the Headlines.html', import.meta.url), 'utf8');
  const match = html.match(/<script type="module">([\s\S]*?)<\/script>/);
  assert.ok(match, 'Embedded application must be present');
  assert.doesNotThrow(() => new vm.Script('(async()=>{' + match[1] + '\n})()'));
  assert.ok(match[1].includes("symbol:'HK$'"), 'Story currency must survive packaging literally');
  assert.ok(!match[1].includes("fetch('data/cases.json')"), 'Offline page must embed its dataset');
  assert.ok(!/^import /m.test(match[1]), 'Offline page must not import a separate module');
  assert.ok(match[1].includes('function buildEthicsChecklist'), 'Offline copy must include the ethics rules');
  assert.ok(match[1].includes('guideForm.addEventListener'), 'Offline copy must include the guided interface');
  assert.ok(!html.includes('href="guide.css"'), 'Offline guide styles must be embedded');
});
