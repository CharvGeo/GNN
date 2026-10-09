import assert from 'node:assert/strict';
import {SOURCES,cleanItems,headlines} from './dist/feed-utils.mjs';
const source=SOURCES[0];
const rows=cleanItems([{title:' Valid title ',link:'http://www.kathimerini.gr/story#tracking',pubDate:'2026-10-08 13:00:00'},{title:'Bad URL',link:'javascript:alert(1)'},{title:'Wrong site',link:'https://kathimerini.gr.evil.example/story'},{title:'Duplicate',link:'https://www.kathimerini.gr/story'}],source);
assert.equal(rows.length,1);assert.equal(rows[0].url,'https://www.kathimerini.gr/story');assert.equal(rows[0].publishedAt,'2026-10-08T13:00:00.000Z');
assert.deepEqual(cleanItems(null,source),[]);
assert.equal(headlines([{id:'kathimerini',items:rows}]).length,1);
console.log('Feed checks passed: URL allowlist, HTTPS, deduplication, timestamp and saved data');
