import assert from 'node:assert/strict';
import {greekDate} from './dist/current-date.mjs';
assert.equal(greekDate(new Date('2026-10-08T20:59:59Z')),'Πέμπτη 8 Οκτωβρίου 2026');
assert.equal(greekDate(new Date('2026-10-08T21:00:00Z')),'Παρασκευή 9 Οκτωβρίου 2026');
assert.equal(greekDate(new Date('2026-12-31T22:00:00Z')),'Παρασκευή 1 Ιανουαρίου 2027');
console.log('Greek date checks passed: Athens midnight in summer and winter time');
