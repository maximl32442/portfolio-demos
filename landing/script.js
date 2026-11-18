const burger=document.querySelector('.burger'),menu=document.getElementById('menu');
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Закрыть меню':'Открыть меню')});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded','false')}));
const form=document.querySelector('.form'),phone=form.phone;
document.querySelectorAll('[data-plan]').forEach(b=>b.addEventListener('click',()=>{form.plan.value=b.dataset.plan}));
function phoneDigits(raw){let v=raw.trim(),d;
 if(v.startsWith('+7'))d=v.slice(2).replace(/\D/g,'');
 else{d=v.replace(/\D/g,'');if(/^[78]/.test(d))d=d.slice(1)}
 return d.slice(0,10)}
function phoneFormat(d){if(!d)return '';let s='+7 ('+d.slice(0,3);if(d.length>3)s+=') '+d.slice(3,6);if(d.length>6)s+='-'+d.slice(6,8);if(d.length>8)s+='-'+d.slice(8,10);return s}
let prevD='';
phone.addEventListener('input',e=>{const raw=phone.value,caret=phone.selectionStart??raw.length;
 const before=raw.slice(0,caret),pref=before.trim().startsWith('+7')?2:0;
 let n=before.slice(pref).replace(/\D/g,'').length;if(!pref&&/^[78]/.test(raw.replace(/\D/g,''))&&n>0)n--;
 let d=phoneDigits(raw);
 if(!d&&/^\+7?\s?\(?$/.test(raw.trim())){prevD='';return}
 if(e.inputType==='deleteContentBackward'&&d===prevD&&n>0){d=d.slice(0,n-1)+d.slice(n);n--}
 prevD=d;const out=phoneFormat(d);phone.value=out;
 let pos=out.length;if(n<d.length){let c=0;pos=4;for(let i=4;i<out.length;i++){if(/\d/.test(out[i])){c++;if(c===n){pos=i+1;break}}}if(n===0)pos=4}
 try{phone.setSelectionRange(pos,pos)}catch(e){}});
const checks={name:v=>v.trim().length>=2,phone:v=>phoneDigits(v).length===10,agree:(v,el)=>el.checked};
form.addEventListener('submit',e=>{e.preventDefault();let ok=true;
 for(const [n,fn] of Object.entries(checks)){const el=form[n],bad=!fn(el.value,el);el.closest('label').classList.toggle('invalid',bad);el.setAttribute('aria-invalid',bad);if(bad&&ok){el.focus();ok=false}}
 if(ok){form.querySelector('.success').hidden=false;form.querySelector('button').disabled=true}});
form.addEventListener('input',e=>{const l=e.target.closest('label');if(l)l.classList.remove('invalid')});
