import { test } from 'node:test';
import assert from 'node:assert/strict';

import { getGap, getPercentage, updateStats } from '../functions.mjs';

test('gap between clicks', () =>{
    const state = {lastPress : 100};
    const gap = getGap(state, 150);

    assert.deepStrictEqual(gap, '50');
});

test('percentage', () =>{
    const state = {
        doubleCount : 3,
        clickCount : 4
    };

    const percent = getPercentage(state);

    assert.deepStrictEqual(percent, '75.0');
});

test('update states', () => {
    const elements = {
        clickStat: { textContent: '' },
        doubleStat: { textContent: '' },
        percentStat: { textContent: '' }
    };
    globalThis.document = { getElementById: (id) => elements[id] };

    updateStats({ clickCount: 4, doubleCount: 1 });

    assert.strictEqual(elements.clickStat.textContent, 'Clicks: 4');
    assert.strictEqual(elements.doubleStat.textContent, 'Double-clicks: 1');
    assert.strictEqual(elements.percentStat.textContent, 'Double-click percentage: 25.0%');
});