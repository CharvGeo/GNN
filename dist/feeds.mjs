import {SOURCES,REFRESH_MS,cleanItems,headlines} from './feed-utils.mjs';
const root=document.querySelector('#external-feed');
if(root){
 const list=root.querySelector('.feed-items'),status=root.querySelector('.feed-status');
 const key='gnn-external-feeds-v3';
 let state=JSON.parse(document.querySelector('#feed-snapshot').textContent),busy=false,lastAttempt=0;
 try{const cached=JSON.parse(localStorage.getItem(key));if(cached?.feeds?.length&&Date.parse(cached.savedAt)>Date.parse(state.savedAt)){state=cached;const checks=SOURCES.map(s=>Date.parse(cached.feeds.find(f=>f.id===s.id)?.checkedAt));if(checks.every(Number.isFinite))lastAttempt=Math.min(...checks);}}catch{}
 const time=new Intl.DateTimeFormat('el-GR',{timeZone:'Europe/Athens',day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
 function render(message){
  const rows=headlines(state.feeds);
  if(rows.length){list.replaceChildren(...rows.map(item=>{
   const a=document.createElement('a');a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';
   const title=document.createElement('strong');title.textContent=item.title;
   const meta=document.createElement('small');meta.textContent=item.source+(item.publishedAt?' · '+time.format(new Date(item.publishedAt)):'');
   const copy=document.createElement('span');copy.className='feed-copy';copy.append(title,meta);if(item.thumbnail){const img=document.createElement('img');img.className='feed-thumb';img.src=item.thumbnail;img.alt='';img.loading='lazy';img.width=72;img.height=54;img.referrerPolicy='no-referrer';img.addEventListener('error',()=>img.remove(),{once:true});a.append(img);}a.append(copy);return a;
  }));}
  status.textContent=message;
 }
 async function refresh(){
  if(busy||document.hidden||Date.now()-lastAttempt<REFRESH_MS)return;
  busy=true;lastAttempt=Date.now();
  try{
   const response=await fetch('https://raw.githubusercontent.com/CharvGeo/GNN/main/dist/feed-snapshot.json?t='+Math.floor(Date.now()/REFRESH_MS),{signal:AbortSignal.timeout(12000),credentials:'omit',referrerPolicy:'no-referrer'});
   if(!response.ok)throw Error('Feed unavailable');
   const data=await response.json();if(!Array.isArray(data.feeds)||!data.savedAt)throw Error('Invalid feed');
   const feeds=SOURCES.map(source=>{const feed=data.feeds.find(f=>f.id===source.id);const items=cleanItems((feed?.items||[]).map(i=>({...i,link:i.url,pubDate:i.publishedAt})),source);if(!items.length)throw Error('Missing feed');return {id:source.id,items,checkedAt:feed.checkedAt};});
   if(Date.parse(data.savedAt)>=Date.parse(state.savedAt))state={feeds,savedAt:data.savedAt};
   try{localStorage.setItem(key,JSON.stringify(state));}catch{}
   render((Date.now()-Date.parse(state.savedAt)>60*60000?'Αποθηκευμένη ροή: ':'Τελευταία ενημέρωση: ')+time.format(new Date(state.savedAt))+' · Ώρα Ελλάδας');
  }catch{render('Αποθηκευμένη ροή: '+time.format(new Date(state.savedAt))+' · Ώρα Ελλάδας');}
  busy=false;
 }
 render(Date.now()-lastAttempt<REFRESH_MS?'Τελευταίος έλεγχος: '+time.format(new Date(lastAttempt))+' · Ώρα Ελλάδας':'Αποθηκευμένη ροή: '+time.format(new Date(state.savedAt))+' · Έλεγχος για νεότερα…');
 refresh();
 setInterval(refresh,60000);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
}
