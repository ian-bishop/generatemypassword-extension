'use strict';
const $ = id => document.getElementById(id);
const baseSets = {lower:'abcdefghijklmnopqrstuvwxyz',upper:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',digits:'0123456789',symbols:'!@#$%^&*()-_=+[]{};:,.?'};
const prefsKey='generatemypassword-prefs-v1'; // Preserve user settings on upgrades
const prefIds=['length','lower','upper','digits','symbols','ambiguous','wordCount','separator','capitalize'];
let mode='password',visible=true,currentValue='',words=null;
function randomInt(max) {
  if (!Number.isSafeInteger(max)||max<1||max>4294967296) throw new Error('Invalid random range');
  const limit=Math.floor(4294967296/max)*max;
  const nums=new Uint32Array(1);let n;
  do { crypto.getRandomValues(nums);n=nums[0]; } while(n>=limit);
  return n%max;
}
function selectedSets(){const exclude=$('ambiguous').checked;return Object.keys(baseSets).filter(id=>$(id).checked).map(id=>exclude?baseSets[id].replace(/[0O1lI]/g,''):baseSets[id]);}
function makePassword(){
  const len=Number($('length').value), sets=selectedSets();
  if(!sets.length)throw new Error('Select at least one character type.');
  if(len<sets.length)throw new Error('Length is too short for selected character types.');
  const pool=sets.join(''), result=sets.map(set=>set[randomInt(set.length)]);
  while(result.length<len)result.push(pool[randomInt(pool.length)]);
  for(let i=result.length-1;i>0;i--){const j=randomInt(i+1);[result[i],result[j]]=[result[j],result[i]];}
  // Conservative character-space estimate, not a guarantee of attack resistance.
  return {value:result.join(''),bits:len*Math.log2(pool.length)};
}
async function loadWords(){
  if(words)return;
  const resp=await fetch(chrome.runtime.getURL('words.json'));
  if(!resp.ok)throw new Error('Local wordlist could not be loaded.');
  const result=await resp.json();
  if(!Array.isArray(result)||result.length!==7776||new Set(result).size!==result.length||!result.every(w=>typeof w==='string'&&/^[a-z]+(?:-[a-z]+)*$/.test(w)))throw new Error('Invalid local wordlist.');
  words=result;$('wordlistInfo').textContent=words.length.toLocaleString('en-US');
}
function makePhrase(){
  const count=Number($('wordCount').value),separator=$('separator').value,capital=$('capitalize').checked;
  const result=Array.from({length:count},()=>words[randomInt(words.length)]).map(w=>capital?w[0].toUpperCase()+w.slice(1):w);
  return {value:result.join(separator),bits:count*Math.log2(words.length)};
}
function display(){
  $('result').textContent=visible?currentValue:'•'.repeat(Math.min(currentValue.length,30));
  $('result').classList.toggle('concealed',!visible);
  $('visibility').textContent=visible?'Hide':'Show';$('visibility').setAttribute('aria-pressed',String(visible));
}
function strength(bits){
  const label=bits<50?'Fair':bits<75?'Strong':bits<100?'Very strong':'Excellent';
  $('strengthText').textContent=label;
  $('entropy').textContent='≈ '+(Math.round(bits*10)/10)+' bits';
  const fill=$('meterFill');fill.style.width=Math.min(100,Math.round(bits/128*100))+'%';
  fill.style.background=bits<50?'#d88a38':bits<75?'#3c91bc':'#21966d';
}
function save(){
  const data={mode};for(const id of prefIds){const e=$(id);data[id]=e.type==='checkbox'?e.checked:e.value;}
  try{localStorage.setItem(prefsKey,JSON.stringify(data));}catch{} // Settings only; never save output.
}
function restore(){
  try{const data=JSON.parse(localStorage.getItem(prefsKey)||'{}');for(const id of prefIds){const e=$(id);if(data[id]===undefined)continue;if(e.type==='checkbox'&&typeof data[id]==='boolean')e.checked=data[id];else if(e.tagName==='SELECT'&&[...e.options].some(o=>o.value===String(data[id])))e.value=data[id];else if(id==='length'&&Number.isInteger(Number(data[id])))e.value=Math.min(128,Math.max(8,Number(data[id])));}if(data.mode==='phrase')mode='phrase';}catch{}
  $('lengthNumber').value=$('length').value;
}
async function generate(){
  $('error').textContent='';$('generate').disabled=true;
  try{
    if(mode==='phrase')await loadWords();
    const generated=mode==='phrase'?makePhrase():makePassword();
    currentValue=generated.value;display();strength(generated.bits);$('copy').textContent='Copy';
  }catch(e){currentValue='';display();$('strengthText').textContent='Unavailable';$('entropy').textContent='—';$('meterFill').style.width='0';$('error').textContent=e.message;}
  finally{$('generate').disabled=false;}
}
function setMode(next){
  mode=next;const phrase=mode==='phrase';
  $('passwordPanel').hidden=phrase;$('phrasePanel').hidden=!phrase;
  $('passwordTab').classList.toggle('active',!phrase);$('phraseTab').classList.toggle('active',phrase);
  $('passwordTab').setAttribute('aria-selected',String(!phrase));$('phraseTab').setAttribute('aria-selected',String(phrase));
  $('resultType').textContent=phrase?'passphrase':'password';$('generate').textContent=phrase?'Generate passphrase':'Generate password';save();generate();
}
restore();
$('passwordTab').addEventListener('click',()=>setMode('password'));
$('phraseTab').addEventListener('click',()=>setMode('phrase'));
$('length').addEventListener('input',()=>{$('lengthNumber').value=$('length').value;save();generate();});
$('lengthNumber').addEventListener('change',()=>{const n=Number($('lengthNumber').value);$('length').value=Number.isFinite(n)?Math.min(128,Math.max(8,Math.round(n))):20;$('lengthNumber').value=$('length').value;save();generate();});
for(const id of prefIds.filter(x=>x!=='length'))$(id).addEventListener('change',()=>{save();generate();});
$('visibility').addEventListener('click',()=>{visible=!visible;display();});
$('generate').addEventListener('click',generate);
$('copy').addEventListener('click',async()=>{if(!currentValue)return;try{await navigator.clipboard.writeText(currentValue);$('copy').textContent='Copied!';}catch{$('error').textContent='Could not copy automatically. Show and manually select the generated value.';}});
setMode(mode);
