'use strict';
const spots={"basilica": {"region": "city", "number": "01", "name": "聖嬰教堂 Basilica Minore del Santo Niño", "short": "聖嬰教堂", "x": 255, "y": 252, "labelX": 228, "labelY": 240, "subtitle": "教堂參觀，衣服先穿對。", "enjoy": "來這裡看看教堂建築，也感受當地人的信仰生活。遇到禮拜或祈禱，放輕聲音，不要擋住通道。", "pace": "有袖上衣、長褲或過膝裙最省事；這團建議穿包鞋，不穿拖鞋。短褲、短裙、露肩和破洞褲先避開。", "weather": "開放區域與服裝檢查以教堂現場為準；不能入內時，不勉強闖入。", "query": "Basilica Minore del Santo Nino Cebu", "anchor": "end"}, "cross": {"region": "city", "number": "02", "name": "麥哲倫十字架 Magellan’s Cross", "short": "麥哲倫十字架", "x": 243, "y": 294, "labelX": 216, "labelY": 310, "subtitle": "一起看看宿霧的歷史地標。", "enjoy": "這一站看的是宿霧的重要歷史地標。走到亭子裡看看十字架與上方壁畫，聽聽這段歷史。", "pace": "和聖嬰教堂在同一帶，可以一起認識。市區走路參觀，隨身包和手機記得顧好。", "weather": "遇到雨先避雨，石地濕的時候慢慢走；開放範圍依現場安排。", "query": "Magellans Cross Cebu", "anchor": "end"}, "oslob": {"region": "south", "number": "03", "name": "Oslob 鯨鯊觀賞", "short": "Oslob 鯨鯊", "x": 143, "y": 518, "labelX": 166, "labelY": 523, "subtitle": "宿霧南部，這天要留體力。", "enjoy": "我們會到 Oslob 看鯨鯊。能不能下水、活動是否照常，要看海況、現場安排和自己的身體狀況。", "pace": "從市區往南是一段長車程，前一晚早點休息。帶泳衣、毛巾、換洗衣物和防水袋，不會游泳或不舒服先告訴領隊。", "weather": "不管是浮潛還是潛水，看鯨鯊都要保持距離，不碰、不追、不自行餵食，拍照不用閃光燈；下水前聽完現場簡報。這裡有餵食聚集鯨鯊的方式，涉及生態爭議，可依自己的意願選擇是否參加。", "query": "Oslob Whale Shark Watching Tan awan"}, "hills": {"region": "bohol", "number": "04", "name": "巧克力山 Chocolate Hills", "short": "巧克力山", "x": 455, "y": 374, "labelX": 478, "labelY": 379, "subtitle": "看一顆顆圓圓的小山丘。", "enjoy": "到觀景區看看連綿的小山丘，照片可以拍寬一點，才看得出整片山的樣子。山色會隨季節改變，不是每次都像巧克力色。", "pace": "上觀景區可能需要爬階梯，穿好走的鞋，依體力慢慢上去，不用跟別人比速度。", "weather": "下雨階梯濕滑，能見度也可能比較差；拍照注意腳下，雷雨時配合現場安排。", "query": "Chocolate Hills Complex Carmen Bohol"}, "tarsier": {"region": "bohol", "number": "05", "name": "眼鏡猴 Bohol Tarsier Conservation Area", "short": "眼鏡猴園區", "x": 414, "y": 431, "labelX": 405, "labelY": 465, "subtitle": "安靜看，牠們才不會被打擾。", "enjoy": "眼鏡猴小小一隻，要細心找找樹上才容易發現。找到後可以慢慢看、慢慢拍，不要打擾牠們休息。", "pace": "這一站是 Bohol Tarsier Conservation Area。沿著園方安排的路線參觀，看到牠們休息時，安靜看就好。", "weather": "不碰、不餵、不搖樹枝、不開閃光燈，也不要為了照片叫醒牠們。雨天穿防滑鞋，照園方動線參觀。", "query": "Bohol Tarsier Conservation Area Bilar", "anchor": "middle"}, "caohagan": {"region": "islands", "number": "06", "name": "資生堂島 Caohagan Island", "short": "資生堂島", "x": 330, "y": 302, "labelX": 353, "labelY": 307, "subtitle": "浮潛看海，再上島走走。", "enjoy": "大家常說的資生堂島，就是 Caohagan Island。這一站會安排浮潛，看看水面下的風景，上島後再走走、看看海。實際下水安排依當天海況調整。", "pace": "出海帶毛巾、替換衣物、防水袋和飲水。上船穿好救生衣，容易暈船的人先詢問醫師或藥師適合自己的準備方式。", "weather": "出海看風浪和船班安排，取消或改路線就跟著調整。不要踩珊瑚，也不要把珊瑚、貝殼或海洋生物帶走。", "query": "Caohagan Island Cebu"}};
const regions={"city": "01 / 宿霧市區", "south": "02 / 宿霧南部", "bohol": "03 / 薄荷島", "islands": "04 / 離島出海"};
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
  Object.entries(spots).filter(([,spot])=>spot.region===region).forEach(([id,spot])=>{
    const group=svgNode('g',{class:'pin',role:'button',tabindex:0,'data-spot':id,'aria-label':`查看${spot.name}旅行重點`});
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

const spotPhotos={"oslob": {"src": "assets/宿霧/whale-sharks.jpg", "alt": "水下的鯨鯊與潛水者"}, "hills": {"src": "assets/宿霧/chocolate-hills.jpg", "alt": "巧克力山觀景平台與連綿山丘"}, "tarsier": {"src": "assets/宿霧/tarsier.jpg", "alt": "躲在葉片與樹枝間休息的眼鏡猴"}};
const dialog=document.getElementById('spot-dialog');
function openSpot(id,opener){
  const spot=spots[id];if(!spot)return;dialogOpener=opener;
  document.getElementById('spot-zone').textContent=regions[spot.region];
  document.getElementById('spot-title').textContent=spot.name;
  document.getElementById('spot-subtitle').textContent=spot.subtitle;
  ['enjoy','pace','weather'].forEach(key=>document.getElementById(`spot-${key}`).textContent=spot[key]);
  document.getElementById('spot-map').href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.query)}`;
  const photo=document.getElementById('spot-photo');
  photo.hidden=!spotPhotos[id];
  if(spotPhotos[id]){photo.src=spotPhotos[id].src;photo.alt=spotPhotos[id].alt;}else{photo.removeAttribute('src');photo.alt='';}
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
setRegion(regions[location.hash.slice(1)]?location.hash.slice(1):'city');
updateMobileMapHeight();
window.addEventListener('load',()=>{const region=location.hash.slice(1);if(regions[region])navigateRegion(region);else syncScroll();});
