import {SOURCES,REFRESH_MS,cleanItems,headlines} from './feed-utils.mjs';
const root=document.querySelector('#external-feed');
if(root){
 const list=root.querySelector('.feed-items'),status=root.querySelector('.feed-status');
 const key='gnn-external-feeds-v1';
 let state=JSON.parse(document.querySelector('#feed-snapshot').textContent),busy=false,lastAttempt=0;
 try{const cached=JSON.parse(localStorage.getItem(key));if(cached?.feeds?.length&&Date.parse(cached.savedAt)>Date.parse(state.savedAt)){state=cached;const checks=SOURCES.map(s=>Date.parse(cached.feeds.find(f=>f.id===s.id)?.checkedAt));if(checks.every(Number.isFinite))lastAttempt=Math.min(...checks);}}catch{}
 const time=new Intl.DateTimeFormat('el-GR',{timeZone:'Europe/Athens',day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
 function render(message){
  const rows=headlines(state.feeds);
  if(rows.length){list.replaceChildren(...rows.map(item=>{
   const a=document.createElement('a');a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';
   const title=document.createElement('strong');title.textContent=item.title;
   const meta=document.createElement('small');meta.textContent=item.source+(item.publishedAt?' · '+time.format(new Date(item.publishedAt)):'');
   a.append(title,meta);return a;
  }));}
  status.textContent=message;
 }
 async function refresh(){
  if(busy||document.hidden||Date.now()-lastAttempt<REFRESH_MS)return;
  busy=true;lastAttempt=Date.now();
  const results=await Promise.allSettled(SOURCES.map(async source=>{
   const response=await fetch('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(source.url),{signal:AbortSignal.timeout(12000),credentials:'omit',referrerPolicy:'no-referrer'});
   if(!response.ok)throw Error('Feed unavailable');
   const data=await response.json();if(data.status!=='ok')throw Error('Feed unavailable');
   const items=cleanItems(data.items,source);if(!items.length)throw Error('Empty feed');
   return {id:source.id,items,checkedAt:new Date().toISOString()};
  }));
  let successes=0;
  results.forEach(r=>{if(r.status==='fulfilled'){successes++;state.feeds=state.feeds.filter(f=>f.id!==r.value.id).concat(r.value);}});
  if(successes){state.savedAt=new Date().toISOString();try{localStorage.setItem(key,JSON.stringify(state));}catch{}}
  const oldest=state.feeds.map(f=>f.checkedAt).filter(Boolean).sort()[0]||state.savedAt;
  render(successes===SOURCES.length?'Τελευταίος έλεγχος: '+time.format(new Date(state.savedAt))+' · Ώρα Ελλάδας':(successes?'Μερική ανανέωση · ':'Προσωρινά αποθηκευμένη ροή · ')+time.format(new Date(oldest))+' · Ώρα Ελλάδας');
  busy=false;
 }
 render(Date.now()-lastAttempt<REFRESH_MS?'Τελευταίος έλεγχος: '+time.format(new Date(lastAttempt))+' · Ώρα Ελλάδας':'Αποθηκευμένη ροή: '+time.format(new Date(state.savedAt))+' · Έλεγχος για νεότερα…');
 refresh();
 setInterval(refresh,60000);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
}
