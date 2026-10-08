import fs from 'node:fs';
import {SOURCES,cleanItems} from './dist/feed-utils.mjs';
const previous=fs.existsSync('dist/feed-snapshot.json')?JSON.parse(fs.readFileSync('dist/feed-snapshot.json','utf8')):{feeds:[]};
const results=await Promise.allSettled(SOURCES.map(async source=>{
 const response=await fetch('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(source.url),{signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw Error(source.name+' unavailable');
 const data=await response.json();if(data.status!=='ok')throw Error(source.name+' unavailable');
 const items=cleanItems(data.items,source);if(!items.length)throw Error(source.name+' empty');
 return {id:source.id,items,checkedAt:new Date().toISOString()};
}));
results.forEach((r,i)=>{if(r.status==='fulfilled')previous.feeds=previous.feeds.filter(f=>f.id!==r.value.id).concat(r.value);else console.warn(SOURCES[i].name+': keeping previous snapshot');});
if(previous.feeds.length!==SOURCES.length)throw Error('Initial snapshot incomplete');
previous.savedAt=new Date().toISOString();fs.writeFileSync('dist/feed-snapshot.json',JSON.stringify(previous,null,2));
console.log('Feed snapshot: '+previous.feeds.length+' sources');
