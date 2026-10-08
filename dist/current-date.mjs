export function greekDate(now=new Date()){
 const label=new Intl.DateTimeFormat('el-GR',{timeZone:'Europe/Athens',weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(now);
 return label.charAt(0).toLocaleUpperCase('el-GR')+label.slice(1);
}
if(typeof document!=='undefined'){
 const update=()=>{const label=greekDate();document.querySelectorAll('[data-current-date]').forEach(el=>{if(el.textContent!==label)el.textContent=label;});};
 update();
 setInterval(update,1000);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)update();});
 window.addEventListener('pageshow',update);
}
