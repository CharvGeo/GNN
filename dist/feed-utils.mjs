export const SOURCES=[
 {id:'olympia',name:'Olympia.gr',url:'https://olympia.gr/feed/',host:'olympia.gr'},
 {id:'onsports',name:'Onsports.gr',url:'https://feeds.feedburner.com/onsports/allnews',host:'onsports.gr'}
];
export const REFRESH_MS=15*60*1000;
export function cleanItems(items,source){
 if(!Array.isArray(items))return [];
 const seen=new Set();
 return items.flatMap(item=>{
  try{
   const url=new URL(item.link);
   if(!['https:','http:'].includes(url.protocol)||(url.hostname!==source.host&&!url.hostname.endsWith('.'+source.host)))return [];
   url.protocol='https:';url.hash='';
   if(seen.has(url.href))return [];seen.add(url.href);
   const title=String(item.title||'').replace(/\s+/g,' ').trim().slice(0,300);
   if(!title)return [];
   let raw=String(item.pubDate||item.publishedAt||'');
   if(/^\d{4}-\d\d-\d\d \d\d:\d\d:\d\d$/.test(raw))raw=raw.replace(' ','T')+'Z';
   const parsed=Date.parse(raw);
   return [{title,url:url.href,publishedAt:Number.isFinite(parsed)?new Date(parsed).toISOString():null}];
  }catch{return [];}
 }).slice(0,10);
}
export function headlines(feeds){
 const seen=new Set();
 return SOURCES.flatMap(source=>{
  const feed=feeds.find(f=>f.id===source.id);
  return cleanItems((feed?.items||[]).map(i=>({...i,link:i.url||i.link,pubDate:i.publishedAt||i.pubDate})),source).slice(0,4).map(i=>({...i,source:source.name}));
 }).sort((a,b)=>(Date.parse(b.publishedAt)||0)-(Date.parse(a.publishedAt)||0)).filter(i=>{if(seen.has(i.url))return false;seen.add(i.url);return true;});
}
