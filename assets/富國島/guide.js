'use strict';

const spots = {
  vinwonders: { region:'north', number:'01', name:'珍珠樂園 VinWonders', short:'珍珠樂園', subtitle:'喜歡遊樂設施，就多留一點時間在這裡。', x:178, y:166, labelX:154, labelY:143, anchor:'end', query:'VinWonders Phu Quoc', enjoy:'想玩遊樂設施可以選珍珠樂園。先看園區地圖，挑自己最想玩的幾項，不用每一項都排到。', pace:'大家進園後先確認集合時間和地點。中午找地方吃飯、補水，走累了就休息，別一路玩到集合前才趕路。', weather:'下雨先看哪些設施還有開放；遇到打雷或大風雨，就配合園方安排，別急著往下一個設施跑。' },
  safari: { region:'north', number:'02', name:'Safari 野生動物園', short:'Safari 動物園', subtitle:'看動物、逛園區，鞋子穿好走一點。', x:279, y:158, labelX:282, labelY:129, query:'Vinpearl Safari Phu Quoc', enjoy:'喜歡動物，或帶小朋友一起來，可以考慮 Safari。看到有興趣的動物就多看一下，不用一路趕著走。', pace:'先看園區路線和接駁安排，水和防曬記得帶。帶長輩或小朋友，休息時間多留一點。', weather:'雨大就先找地方躲雨。接駁和體驗有沒有調整，看園方當天公告就好。' },
  grandworld: { region:'north', number:'03', name:'大世界 Grand World', short:'大世界', subtitle:'想逛街、吃東西、拍照，可以來大世界。', x:195, y:233, labelX:166, labelY:240, anchor:'end', query:'Grand World Phu Quoc', enjoy:'這裡適合逛街區、拍照，走累了找間店坐下吃點東西。想看活動的人，先確認當天有沒有安排。', pace:'散步可以挑比較不熱的時段。自由活動前先記好集合點，別逛到另一頭才發現快集合了。', weather:'下雨先進店家休息。有想看的表演或活動，出發前再確認，別冒雨過去卻撲空。' },
  sanato: { region:'central', number:'04', name:'Sunset Sanato Beach', short:'Sunset Sanato', subtitle:'來這裡主要是海邊拍照，天氣好再看夕陽。', x:255, y:415, labelX:224, labelY:426, anchor:'end', query:'Sunset Sanato Beach Club Phu Quoc', enjoy:'Sunset Sanato 有海邊裝置可以拍照，也可以散步看海。夕陽要看當天天氣，沒有夕陽也不用一直等。', pace:'出發前確認有沒有開放、怎麼入場。拍完照可以坐下喝點東西，不用整段時間都忙著拍。', weather:'風雨變大就先離開沙灘，到室內休息。能不能下水，看現場海況和警示，不要只看別人有沒有下去。' },
  nightmarket: { region:'central', number:'05', name:'陽東夜市 Dương Đông', short:'陽東夜市', subtitle:'晚餐或飯後想逛逛，可以安排夜市。', x:224, y:332, labelX:193, labelY:333, anchor:'end', query:'Phu Quoc Night Market Duong Dong', enjoy:'先走一圈，看看想吃什麼再買。幾個人一起分著吃，就能多試幾樣，也比較不容易點太多。', pace:'海鮮先問清楚是算一份、算重量，還是另外收料理費。集合時間、地點先記好，再各自去逛。', weather:'雨大時先找有遮蔽的店家吃飯，不用硬把整條逛完；地上濕，走路慢一點。' },
  airport: { region:'central', number:'06', name:'富國島機場 PQC', short:'富國島機場', subtitle:'到達和回程那天，行程別排太滿。', x:301, y:384, labelX:326, labelY:395, query:'Phu Quoc International Airport', enjoy:'到了先確認接送、整理行李，再去飯店安頓。剛下飛機想吃飯或休息都很正常，不急著馬上跑景點。', pace:'回程把車程、報到和安檢時間留好。跟團就照領隊通知集合，護照和登機要用的東西先放在隨身包。', weather:'下雨或路上塞車，去機場就多抓一點時間。航班和接送有沒有變動，以航空公司和領隊通知為準。' },
  sunsettown: { region:'south', number:'07', name:'日落小鎮 Sunset Town', short:'日落小鎮', subtitle:'地中海風格的建築，適合走走拍照。', x:310, y:494, labelX:279, labelY:488, anchor:'end', query:'Sunset Town Phu Quoc', enjoy:'大家常說的「地中海」就是這一帶。沿著街區拍照、找間店喝飲料，想看海也可以一起安排。', pace:'這裡走路會遇到坡道和階梯，穿好走的鞋。太熱就先休息，不用為了拍照一直曬。', weather:'下雨先找室內店家坐一下，階梯濕的時候慢慢走。夕陽看天氣，不用把整個傍晚都押在等夕陽上。' },
  kissbridge: { region:'south', number:'08', name:'親吻橋 Kiss Bridge', short:'親吻橋', subtitle:'看橋、看海，也可以和同行的人拍張照。', x:295, y:536, labelX:264, labelY:542, anchor:'end', query:'Kiss Bridge Phu Quoc', enjoy:'親吻橋在日落小鎮這一帶，可以一起安排。想拍照就留一點時間，拍完也可以看看海，不用趕著走。', pace:'先確認當天開放和入場方式，再配合自己的行程安排。跟團的人記得留時間走回集合點。', weather:'橋上比較空曠，風雨大時先去室內。能不能上橋，依現場開放情況為準。' },
  cablecar: { region:'south', number:'09', name:'跨海纜車與香島 Hòn Thơm', short:'跨海纜車・香島', subtitle:'搭纜車去香島，記得先確認回程安排。', x:340, y:567, labelX:369, labelY:575, query:'Sun World Hon Thom Cable Car Phu Quoc', enjoy:'搭纜車的途中就能看海和周圍島嶼。到了香島，再按自己的體力選活動；想休息，也不用每一項都玩。', pace:'先看今天纜車有沒有正常營運、票券包含哪些項目，還有什麼時候要回來。別玩到最後才開始找回程路線。', weather:'風雨可能影響纜車和跨海活動，先看 Sun World 公告。遇到停駛就調整安排，別為了原本的計畫勉強出發。' }
};
const regions = {north:'01 / 北島・樂園與動物園',central:'02 / 中島・沙灘與夜市',south:'03 / 南島・纜車與香島'};

const svgNS='http://www.w3.org/2000/svg';
const pins=document.getElementById('map-pins');
const mapCanvas=document.querySelector('.map-canvas');
const mobileLegend=document.createElement('div');
mobileLegend.className='mobile-legend';
mobileLegend.setAttribute('aria-label','地圖上的地點');
mapCanvas.append(mobileLegend);
let activeRegion='';
let navigationLock=0;
let dialogOpener=null;

function svgNode(tag,attrs,text){const el=document.createElementNS(svgNS,tag);Object.entries(attrs).forEach(([key,val])=>el.setAttribute(key,String(val)));if(text)el.textContent=text;return el;}
function setRegion(region){
  if(!regions[region]||activeRegion===region)return;
  activeRegion=region;
  document.getElementById('map-current').textContent=regions[region];
  document.querySelectorAll('[data-zone]').forEach(el=>el.classList.toggle('is-active',el.dataset.zone===region));
  document.querySelectorAll('.region-nav [data-region],.zone-links [data-region]').forEach(el=>{const active=el.dataset.region===region;el.classList.toggle('is-active',active);if(active)el.setAttribute('aria-current','true');else el.removeAttribute('aria-current');});
  pins.replaceChildren();mobileLegend.replaceChildren();
  if(region==='south'){
    pins.append(svgNode('path',{d:'M340 567L342 636',class:'cable-route'}));
    pins.append(svgNode('text',{x:368,y:646,class:'island-name'},'香島'));
  }
  Object.entries(spots).filter(([,spot])=>spot.region===region).forEach(([id,spot])=>{
    const group=svgNode('g',{class:'pin',role:'button',tabindex:0,'data-spot':id,'aria-label':`查看${spot.name}度假建議`});
    group.append(svgNode('rect',{x:spot.x-25,y:spot.y-25,width:50,height:50,class:'hit-area'}));
    group.append(svgNode('circle',{cx:spot.x,cy:spot.y,r:14,class:'pin-dot'}));
    group.append(svgNode('text',{x:spot.x,y:spot.y+4,class:'pin-number'},spot.number));
    group.append(svgNode('text',{x:spot.labelX,y:spot.labelY,'text-anchor':spot.anchor||'start',class:'pin-label'},spot.short));
    pins.append(group);
    const button=document.createElement('button');button.type='button';button.dataset.spot=id;
    const number=document.createElement('span');number.textContent=spot.number;
    const name=document.createElement('span');name.textContent=spot.short;
    button.append(number,name);mobileLegend.append(button);
  });
}

function updateMobileMapHeight(){document.documentElement.style.setProperty('--mobile-map-height',`${Math.ceil(document.querySelector('.map-column').getBoundingClientRect().height)}px`);}
if('ResizeObserver' in window)new ResizeObserver(updateMobileMapHeight).observe(document.querySelector('.map-sticky'));
window.addEventListener('resize',updateMobileMapHeight);

function navigateRegion(region){
  setRegion(region);navigationLock=performance.now()+1000;
  history.replaceState(null,'',`#${region}`);
  document.getElementById(region).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
}
document.addEventListener('click',event=>{
  const spotButton=event.target.closest('[data-spot]');
  if(spotButton){openSpot(spotButton.dataset.spot,spotButton);return;}
  const regionLink=event.target.closest('a[data-region]');
  if(regionLink){event.preventDefault();navigateRegion(regionLink.dataset.region);return;}
});
pins.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&event.target.matches('[data-spot]')){event.preventDefault();openSpot(event.target.dataset.spot,event.target);}});

const dialog=document.getElementById('spot-dialog');
function openSpot(id,opener){
  const spot=spots[id];if(!spot)return;dialogOpener=opener;
  document.getElementById('spot-zone').textContent=regions[spot.region];
  document.getElementById('spot-title').textContent=spot.name;
  document.getElementById('spot-subtitle').textContent=spot.subtitle;
  ['enjoy','pace','weather'].forEach(key=>document.getElementById(`spot-${key}`).textContent=spot[key]);
  document.getElementById('spot-map').href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.query)}`;
  dialog.showModal();document.body.classList.add('modal-open');
}
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(dialogOpener?.isConnected)dialogOpener.focus({preventScroll:true});});

let scrollQueued=false;
function syncScroll(){
  scrollQueued=false;if(performance.now()<navigationLock||dialog.open)return;
  const mobile=matchMedia('(max-width:720px)').matches;
  const short=matchMedia('(max-height:600px)').matches;
  const mapBottom=document.querySelector('.map-column').getBoundingClientRect().bottom;
  const reference=mobile&&!short?Math.min(mapBottom+90,innerHeight*.8):innerHeight*.45;
  const stories=[...document.querySelectorAll('[data-story]')];
  let selected=stories[0];
  stories.forEach(story=>{if(story.getBoundingClientRect().top<=reference)selected=story;});
  setRegion(selected.dataset.story);
}
window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(syncScroll);}},{passive:true});
window.addEventListener('hashchange',()=>{const region=location.hash.slice(1);if(regions[region])setRegion(region);});

document.getElementById('copy-button').addEventListener('click',async()=>{
  const summary=document.getElementById('summary-copy');const status=document.getElementById('copy-status');
  try{await navigator.clipboard.writeText([...summary.querySelectorAll('p,li')].map(el=>el.textContent.trim()).join('\n'));status.textContent='已複製，可以貼到 LINE 或筆記收藏。';}
  catch{document.getElementById('summary').open=true;const range=document.createRange();range.selectNodeContents(summary);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent='已選取重點，請長按或使用複製快捷鍵收藏。';}
});
setRegion(regions[location.hash.slice(1)]?location.hash.slice(1):'north');
updateMobileMapHeight();
window.addEventListener('load',()=>{const region=location.hash.slice(1);if(regions[region])navigateRegion(region);else syncScroll();});
