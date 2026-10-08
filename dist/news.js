const normalize=s=>s.normalize('NFD').replace(/\p{M}/gu,'').toLocaleLowerCase('el').replace(/ς/g,'σ');
const search=document.querySelector('#news-search');
if(search){const cards=[...document.querySelectorAll('[data-story]')];const update=()=>{let found=0;const q=normalize(search.value.trim());for(const card of cards){card.hidden=!normalize(card.dataset.search).includes(q);if(!card.hidden)found++;}document.querySelector('#search-count').textContent=found+' από '+cards.length+' άρθρα';document.querySelector('#search-empty').hidden=found>0;};search.addEventListener('input',update);update();}
const share=document.querySelector('#share-article');
if(share)share.addEventListener('click',async()=>{const status=document.querySelector('#share-status');try{await navigator.clipboard.writeText(location.href);status.textContent='Ο σύνδεσμος αντιγράφηκε.';}catch{status.textContent='Αντιγράψτε τη διεύθυνση από τη γραμμή του browser.';}});
