const $=s=>document.querySelector(s),fmt=n=>Math.round(n).toLocaleString('ru-RU')+' ₽';
const form=$('#calcForm'),area=$('#area');let baths=1,shown=0;
function calc(){const a=+area.value,rate=+form.type.value,k=+form.home.value;$('#areaOut').textContent=a;
 const rows=[['Работы и отделка',a*rate*k]];if(baths)rows.push([`Санузлы × ${baths}`,baths*85000]);let pct=0;
 form.querySelectorAll('.checks input:checked').forEach(c=>{const[t,v]=c.value.split(':'),name=c.parentElement.querySelector('span').firstChild.textContent.trim();
  if(t==='area')rows.push([name,a*v]);if(t==='fix')rows.push([name,+v]);if(t==='pct')pct+=+v});
 let sum=rows.reduce((s,r)=>s+r[1],0);if(pct){const p=sum*pct/100;rows.push([`Черновые материалы +${pct}%`,p]);sum+=p}
 $('#breakdown').innerHTML=rows.map(r=>`<li><span>${r[0]}</span><span>${fmt(r[1])}</span></li>`).join('');
 const base=rate>=12000?[14,12]:rate>=7500?[8,15]:[3,25],weeks=base[0]+Math.round((a-15)/base[1])+Math.max(0,baths-1);
 $('#term').textContent=`около ${weeks} ${weeks%10===1&&weeks%100!==11?'недели':'недель'}`;animate(sum)}
function animate(to){const from=shown,t0=performance.now(),el=$('#sum');
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){shown=to;el.textContent=fmt(to);return}
 (function f(t){const p=Math.min(1,(t-t0)/350),v=from+(to-from)*(1-Math.pow(1-p,3));el.textContent=fmt(v);shown=v;if(p<1)requestAnimationFrame(f)})(t0)}
form.addEventListener('input',calc);
document.querySelectorAll('.stepper button').forEach(b=>b.onclick=()=>{baths=Math.min(4,Math.max(0,baths+ +b.dataset.d));$('#baths').textContent=baths;calc()});
calc();
// Квиз с ветвлением
const Q={
 start:{t:'Какое у вас жильё?',o:[['🏢','Новостройка без отделки','nb'],['🏠','Вторичка, нужно обновить','sec']]},
 nb:{t:'Есть ли дизайн-проект?',o:[['📐','Да, проект готов','design'],['🤔','Нет, но хочу красиво','style'],['🔑','Нет, нужно быстро заехать','budget']]},
 sec:{t:'В каком состоянии квартира?',o:[['✨','Нужно освежить стены и пол','cosm'],['🔌','Менять электрику и трубы','cap'],['🧱','Перепланировка','cap']]},
 style:{t:'Какой стиль ближе?',o:[['🌿','Светлый скандинавский','budget'],['🖤','Современный контрастный','design'],['🪵','Тёплый с деревом','design']]},
 budget:{t:'Когда планируете заезжать?',o:[['⚡','В течение 2 месяцев','R_cap'],['📅','Не тороплюсь','R_cap']]},
 cosm:{t:'Живёте ли вы в квартире во время ремонта?',o:[['🛋','Да, ремонтируем по комнатам','R_cosm'],['🧳','Нет, съеду','R_cosm']]},
 cap:{t:'Сколько санузлов?',o:[['1️⃣','Один','R_cap'],['2️⃣','Два и больше','R_cap']]},
 design:{t:'Важна ли авторская мебель на заказ?',o:[['✅','Да, нужна','R_des'],['➖','Нет, готовая подойдёт','R_des']]}
};
const R={R_cosm:['Косметический ремонт','Обновим отделку без вскрытия стен. Работы по комнатам можно вести, пока вы живёте в квартире.','3 500 ₽/м²','от 3 недель','3500'],
 R_cap:['Капитальный ремонт','Заменим инженерные системы, выровняем стены и полы и сдадим квартиру готовой к заезду.','7 500 ₽/м²','от 8 недель','7500'],
 R_des:['Дизайнерский ремонт','Сделаем по проекту с авторским надзором, сложными материалами и мебелью на заказ.','12 000 ₽/м²','от 14 недель','12000']};
let path=['start'];
function render(){const id=path[path.length-1],box=$('#qBody'),total=4,step=Math.min(path.length,total);
 $('#back').style.visibility=path.length>1?'visible':'hidden';
 if(R[id]){const[r,d,p,t,v]=R[id];$('#prog').style.width='100%';$('#stepLabel').textContent='Готово';
  box.innerHTML=`<div class="result q-anim"><div><p class="eyebrow">Вам подойдёт</p><h3>${r}</h3><p>${d}</p></div><div class="res-card"><span>Ориентир цены</span><b>${p}</b><span>Срок: ${t}</span><button class="btn" id="apply">Подставить в калькулятор</button></div></div>`;
  $('#apply').onclick=()=>{form.type.value=v;form.home.value=path.includes('nb')?'0.9':'1';calc();$('#calc').scrollIntoView({behavior:'smooth'})};return}
 const q=Q[id];$('#prog').style.width=(step-1)/total*100+'%';$('#stepLabel').textContent=`Шаг ${step}`;
 box.innerHTML=`<div class="q-anim"><p class="q-title">${q.t}</p><div class="opts">${q.o.map(o=>`<button class="opt" data-n="${o[2]}"><i>${o[0]}</i>${o[1]}</button>`).join('')}</div></div>`;
 box.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{path.push(b.dataset.n);render();box.querySelector('button')?.focus({preventScroll:true})})}
$('#back').onclick=()=>{if(path.length>1){path.pop();render()}};
$('#toQuiz').onclick=()=>$('#quiz').scrollIntoView({behavior:'smooth'});
render();
