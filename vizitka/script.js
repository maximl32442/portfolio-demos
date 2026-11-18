const b=document.querySelector('.burger'),m=document.getElementById('menu');
b&&b.addEventListener('click',()=>{const o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
const lb=document.querySelector('.lightbox');
if(lb){const items=[...document.querySelectorAll('.gallery button')];let i=0;const fr=lb.querySelector('.frame'),tx=lb.querySelector('.lb-text');
 const show=n=>{i=(n+items.length)%items.length;fr.innerHTML=items[i].innerHTML;tx.textContent=items[i].dataset.title;lb.classList.add('open');lb.querySelector('.lb-close').focus()};
 items.forEach((it,n)=>it.addEventListener('click',()=>show(n)));
 lb.querySelector('.lb-close').onclick=()=>{lb.classList.remove('open');items[i].focus()};
 lb.querySelector('.lb-prev').onclick=()=>show(i-1);lb.querySelector('.lb-next').onclick=()=>show(i+1);
 lb.addEventListener('click',e=>{if(e.target===lb)lb.querySelector('.lb-close').click()});
 document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')lb.querySelector('.lb-close').click();if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});}
const bf=document.querySelector('.bform');
if(bf){bf.addEventListener('submit',e=>{e.preventDefault();let ok=true;
 const rules={name:el=>el.value.trim().length>=2,phone:el=>{const n=el.value.replace(/\D/g,'').length;return n>=10&&n<=11},agree:el=>el.checked};
 for(const [k,fn] of Object.entries(rules)){const el=bf[k],bad=!fn(el);el.closest('label').classList.toggle('invalid',bad);el.setAttribute('aria-invalid',bad);if(bad&&ok){el.focus();ok=false}}
 if(ok){bf.querySelector('.ok').hidden=false;bf.querySelector('button').disabled=true}});
 bf.addEventListener('input',e=>e.target.closest('label')?.classList.remove('invalid'))}
