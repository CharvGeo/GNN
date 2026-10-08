const search=document.querySelector('#search');
const cards=[...document.querySelectorAll('article')];
const normalize=s=>s.normalize('NFD').replace(/\p{M}/gu,'').toLocaleLowerCase('el').replace(/ς/g,'σ');
search.addEventListener('input',()=>{const query=normalize(search.value.trim());let count=0;for(const card of cards){card.hidden=!normalize(card.dataset.search).includes(query);if(!card.hidden)count++;}document.querySelector('#count').textContent=count+' από '+cards.length+' αναρτήσεις';document.querySelector('#empty').hidden=count!==0;});
