"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8592],{7160:(D,p,n)=>{n.d(p,{c:()=>r});var h=n(2361),m=n(7683),c=n(3139);const r=(i,a)=>{let e,t;const o=(u,g,f)=>{if("undefined"==typeof document)return;const d=document.elementFromPoint(u,g);d&&a(d)?d!==e&&(v(),l(d,f)):v()},l=(u,g)=>{e=u,t||(t=e);const f=e;(0,h.c)(()=>f.classList.add("ion-activated")),g()},v=(u=!1)=>{if(!e)return;const g=e;(0,h.c)(()=>g.classList.remove("ion-activated")),u&&t!==e&&e.click(),e=void 0};return(0,c.createGesture)({el:i,gestureName:"buttonActiveDrag",threshold:0,onStart:u=>o(u.currentX,u.currentY,m.a),onMove:u=>o(u.currentX,u.currentY,m.b),onEnd:()=>{v(!0),(0,m.h)(),t=void 0}})}},5062:(D,p,n)=>{n.d(p,{i:()=>h});const h=m=>m&&""!==m.dir?"rtl"===m.dir.toLowerCase():"rtl"===(null==document?void 0:document.dir.toLowerCase())},1112:(D,p,n)=>{n.r(p),n.d(p,{startFocusVisible:()=>r});const h="ion-focused",c=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],r=i=>{let a=[],e=!0;const t=i?i.shadowRoot:document,o=i||document.body,l=_=>{a.forEach(E=>E.classList.remove(h)),_.forEach(E=>E.classList.add(h)),a=_},v=()=>{e=!1,l([])},u=_=>{e=c.includes(_.key),e||l([])},g=_=>{if(e&&_.composedPath){const E=_.composedPath().filter(w=>!!w.classList&&w.classList.contains("ion-focusable"));l(E)}},f=()=>{t.activeElement===o&&l([])};return t.addEventListener("keydown",u),t.addEventListener("focusin",g),t.addEventListener("focusout",f),t.addEventListener("touchstart",v),t.addEventListener("mousedown",v),{destroy:()=>{t.removeEventListener("keydown",u),t.removeEventListener("focusin",g),t.removeEventListener("focusout",f),t.removeEventListener("touchstart",v),t.removeEventListener("mousedown",v)},setFocus:l}}},1878:(D,p,n)=>{n.d(p,{C:()=>i,a:()=>c,d:()=>r});var h=n(5861),m=n(3756);const c=function(){var a=(0,h.Z)(function*(e,t,o,l,v,u){var g;if(e)return e.attachViewToDom(t,o,v,l);if(!(u||"string"==typeof o||o instanceof HTMLElement))throw new Error("framework delegate is missing");const f="string"==typeof o?null===(g=t.ownerDocument)||void 0===g?void 0:g.createElement(o):o;return l&&l.forEach(d=>f.classList.add(d)),v&&Object.assign(f,v),t.appendChild(f),yield new Promise(d=>(0,m.c)(f,d)),f});return function(t,o,l,v,u,g){return a.apply(this,arguments)}}(),r=(a,e)=>{if(e){if(a){const t=e.parentElement;return a.removeViewFromDom(t,e)}e.remove()}return Promise.resolve()},i=()=>{let a,e;return{attachViewToDom:function(){var l=(0,h.Z)(function*(v,u,g={},f=[]){var d,_;if(a=v,u){const w="string"==typeof u?null===(d=a.ownerDocument)||void 0===d?void 0:d.createElement(u):u;f.forEach(s=>w.classList.add(s)),Object.assign(w,g),a.appendChild(w),yield new Promise(s=>(0,m.c)(w,s))}else if(a.children.length>0){const w=null===(_=a.ownerDocument)||void 0===_?void 0:_.createElement("div");f.forEach(s=>w.classList.add(s)),w.append(...a.children),a.appendChild(w)}const E=document.querySelector("ion-app")||document.body;return e=document.createComment("ionic teleport"),a.parentNode.insertBefore(e,a),E.appendChild(a),a});return function(u,g){return l.apply(this,arguments)}}(),removeViewFromDom:()=>(a&&e&&(e.parentNode.insertBefore(a,e),e.remove()),Promise.resolve())}}},7683:(D,p,n)=>{n.d(p,{a:()=>c,b:()=>r,c:()=>m,d:()=>a,h:()=>i});const h={getEngine(){var e;const t=window;return t.TapticEngine||(null===(e=t.Capacitor)||void 0===e?void 0:e.isPluginAvailable("Haptics"))&&t.Capacitor.Plugins.Haptics},available(){return!!this.getEngine()},isCordova:()=>!!window.TapticEngine,isCapacitor:()=>!!window.Capacitor,impact(e){const t=this.getEngine();if(!t)return;const o=this.isCapacitor()?e.style.toUpperCase():e.style;t.impact({style:o})},notification(e){const t=this.getEngine();if(!t)return;const o=this.isCapacitor()?e.style.toUpperCase():e.style;t.notification({style:o})},selection(){this.impact({style:"light"})},selectionStart(){const e=this.getEngine();!e||(this.isCapacitor()?e.selectionStart():e.gestureSelectionStart())},selectionChanged(){const e=this.getEngine();!e||(this.isCapacitor()?e.selectionChanged():e.gestureSelectionChanged())},selectionEnd(){const e=this.getEngine();!e||(this.isCapacitor()?e.selectionEnd():e.gestureSelectionEnd())}},m=()=>{h.selection()},c=()=>{h.selectionStart()},r=()=>{h.selectionChanged()},i=()=>{h.selectionEnd()},a=e=>{h.impact(e)}},207:(D,p,n)=>{n.d(p,{a:()=>v,b:()=>g,f:()=>l,g:()=>o,i:()=>t,p:()=>f,s:()=>u});var h=n(5861),m=n(3756),c=n(7208);const i="ion-content",a=".ion-content-scroll-host",e=`${i}, ${a}`,t=d=>d&&"ION-CONTENT"===d.tagName,o=function(){var d=(0,h.Z)(function*(_){return t(_)?(yield new Promise(E=>(0,m.c)(_,E)),_.getScrollElement()):_});return function(E){return d.apply(this,arguments)}}(),l=d=>d.querySelector(a)||d.querySelector(e),v=d=>d.closest(e),u=(d,_)=>t(d)?d.scrollToTop(_):Promise.resolve(d.scrollTo({top:0,left:0,behavior:_>0?"smooth":"auto"})),g=(d,_,E,w)=>t(d)?d.scrollByPoint(_,E,w):Promise.resolve(d.scrollBy({top:E,left:_,behavior:w>0?"smooth":"auto"})),f=d=>(0,c.a)(d,i)},7208:(D,p,n)=>{n.d(p,{a:()=>c,b:()=>m,p:()=>h});const h=r=>console.warn(`[Ionic Warning]: ${r}`),m=(r,...i)=>console.error(`[Ionic Error]: ${r}`,...i),c=(r,...i)=>console.error(`<${r.tagName.toLowerCase()}> must be used inside ${i.join(" or ")}.`)},8439:(D,p,n)=>{n.d(p,{s:()=>h});const h=t=>{try{if(t instanceof class e{constructor(o){this.value=o}})return t.value;if(!r()||"string"!=typeof t||""===t)return t;const o=document.createDocumentFragment(),l=document.createElement("div");o.appendChild(l),l.innerHTML=t,a.forEach(f=>{const d=o.querySelectorAll(f);for(let _=d.length-1;_>=0;_--){const E=d[_];E.parentNode?E.parentNode.removeChild(E):o.removeChild(E);const w=c(E);for(let s=0;s<w.length;s++)m(w[s])}});const v=c(o);for(let f=0;f<v.length;f++)m(v[f]);const u=document.createElement("div");u.appendChild(o);const g=u.querySelector("div");return null!==g?g.innerHTML:u.innerHTML}catch(o){return console.error(o),""}},m=t=>{if(t.nodeType&&1!==t.nodeType)return;for(let l=t.attributes.length-1;l>=0;l--){const v=t.attributes.item(l),u=v.name;if(!i.includes(u.toLowerCase())){t.removeAttribute(u);continue}const g=v.value;null!=g&&g.toLowerCase().includes("javascript:")&&t.removeAttribute(u)}const o=c(t);for(let l=0;l<o.length;l++)m(o[l])},c=t=>null!=t.children?t.children:t.childNodes,r=()=>{var t;const o=window,l=null===(t=null==o?void 0:o.Ionic)||void 0===t?void 0:t.config;return!l||(l.get?l.get("sanitizerEnabled",!0):!0===l.sanitizerEnabled||void 0===l.sanitizerEnabled)},i=["class","id","href","src","name","slot"],a=["script","style","iframe","meta","link","object","embed"]},8117:(D,p,n)=>{n.d(p,{a:()=>h,b:()=>v,c:()=>a,d:()=>u,e:()=>s,f:()=>c,g:()=>m,h:()=>E,i:()=>e,j:()=>o,k:()=>g,l:()=>t,m:()=>i,n:()=>r,o:()=>l,p:()=>f,q:()=>d,r:()=>_,s:()=>w});const h="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Arrow Back</title><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",m="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Arrow Down</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",c="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Back</title><path d='M368 64L144 256l224 192V64z'/></svg>",r="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Down</title><path d='M64 144l192 224 192-224H64z'/></svg>",i="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Up</title><path d='M448 368L256 144 64 368h384z'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Back</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",e="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Down</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",t="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Forward</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Forward</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",l="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close</title><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",v="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close Circle</title><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close</title><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",g="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Ellipsis Horizontal</title><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Menu</title><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",d="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Menu</title><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",_="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Reorder Three</title><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",E="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Reorder Two</title><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",w="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Search</title><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Search</title><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},1316:(D,p,n)=>{n.r(p),n.d(p,{KEYBOARD_DID_CLOSE:()=>m,KEYBOARD_DID_OPEN:()=>h,copyVisualViewport:()=>w,keyboardDidClose:()=>f,keyboardDidOpen:()=>u,keyboardDidResize:()=>g,resetKeyboardAssist:()=>e,setKeyboardClose:()=>v,setKeyboardOpen:()=>l,startKeyboardAssist:()=>t,trackViewportChanges:()=>E});const h="ionKeyboardDidShow",m="ionKeyboardDidHide";let r={},i={},a=!1;const e=()=>{r={},i={},a=!1},t=s=>{o(s),s.visualViewport&&(i=w(s.visualViewport),s.visualViewport.onresize=()=>{E(s),u()||g(s)?l(s):f(s)&&v(s)})},o=s=>{s.addEventListener("keyboardDidShow",y=>l(s,y)),s.addEventListener("keyboardDidHide",()=>v(s))},l=(s,y)=>{d(s,y),a=!0},v=s=>{_(s),a=!1},u=()=>{const s=(r.height-i.height)*i.scale;return!a&&r.width===i.width&&s>150},g=s=>a&&!f(s),f=s=>a&&i.height===s.innerHeight,d=(s,y)=>{const C=y?y.keyboardHeight:s.innerHeight-i.height,M=new CustomEvent(h,{detail:{keyboardHeight:C}});s.dispatchEvent(M)},_=s=>{const y=new CustomEvent(m);s.dispatchEvent(y)},E=s=>{r=Object.assign({},i),i=w(s.visualViewport)},w=s=>({width:Math.round(s.width),height:Math.round(s.height),offsetTop:s.offsetTop,offsetLeft:s.offsetLeft,pageTop:s.pageTop,pageLeft:s.pageLeft,scale:s.scale})},7741:(D,p,n)=>{n.d(p,{S:()=>m});const m={bubbles:{dur:1e3,circles:9,fn:(c,r,i)=>{const a=c*r/i-c+"ms",e=2*Math.PI*r/i;return{r:5,style:{top:9*Math.sin(e)+"px",left:9*Math.cos(e)+"px","animation-delay":a}}}},circles:{dur:1e3,circles:8,fn:(c,r,i)=>{const a=r/i,e=c*a-c+"ms",t=2*Math.PI*a;return{r:5,style:{top:9*Math.sin(t)+"px",left:9*Math.cos(t)+"px","animation-delay":e}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(c,r)=>({r:6,style:{left:9-9*r+"px","animation-delay":-110*r+"ms"}})},lines:{dur:1e3,lines:8,fn:(c,r,i)=>({y1:14,y2:26,style:{transform:`rotate(${360/i*r+(r<i/2?180:-180)}deg)`,"animation-delay":c*r/i-c+"ms"}})},"lines-small":{dur:1e3,lines:8,fn:(c,r,i)=>({y1:12,y2:20,style:{transform:`rotate(${360/i*r+(r<i/2?180:-180)}deg)`,"animation-delay":c*r/i-c+"ms"}})},"lines-sharp":{dur:1e3,lines:12,fn:(c,r,i)=>({y1:17,y2:29,style:{transform:`rotate(${30*r+(r<6?180:-180)}deg)`,"animation-delay":c*r/i-c+"ms"}})},"lines-sharp-small":{dur:1e3,lines:12,fn:(c,r,i)=>({y1:12,y2:20,style:{transform:`rotate(${30*r+(r<6?180:-180)}deg)`,"animation-delay":c*r/i-c+"ms"}})}}},6546:(D,p,n)=>{n.r(p),n.d(p,{createSwipeBackGesture:()=>i});var h=n(3756),m=n(5062),c=n(3139);n(3509);const i=(a,e,t,o,l)=>{const v=a.ownerDocument.defaultView,u=(0,m.i)(a),f=s=>u?-s.deltaX:s.deltaX;return(0,c.createGesture)({el:a,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:s=>(s=>{const{startX:C}=s;return u?C>=v.innerWidth-50:C<=50})(s)&&e(),onStart:t,onMove:s=>{const C=f(s)/v.innerWidth;o(C)},onEnd:s=>{const y=f(s),C=v.innerWidth,M=y/C,O=(s=>u?-s.velocityX:s.velocityX)(s),L=O>=0&&(O>.2||y>C/2),b=(L?1-M:M)*C;let T=0;if(b>5){const P=b/Math.abs(O);T=Math.min(P,540)}l(L,M<=0?.01:(0,h.l)(0,M,.9999),T)}})}},2854:(D,p,n)=>{n.d(p,{c:()=>c,g:()=>i,h:()=>m,o:()=>e});var h=n(5861);const m=(t,o)=>null!==o.closest(t),c=(t,o)=>"string"==typeof t&&t.length>0?Object.assign({"ion-color":!0,[`ion-color-${t}`]:!0},o):o,i=t=>{const o={};return(t=>void 0!==t?(Array.isArray(t)?t:t.split(" ")).filter(l=>null!=l).map(l=>l.trim()).filter(l=>""!==l):[])(t).forEach(l=>o[l]=!0),o},a=/^[a-z][a-z0-9+\-.]*:/,e=function(){var t=(0,h.Z)(function*(o,l,v,u){if(null!=o&&"#"!==o[0]&&!a.test(o)){const g=document.querySelector("ion-router");if(g)return null!=l&&l.preventDefault(),g.push(o,v,u)}return!1});return function(l,v,u,g){return t.apply(this,arguments)}}()},5945:(D,p,n)=>{n.d(p,{j:()=>g});var h=n(655),m=n(2096),c=n(1228),r=n(9265),i=n(9010),a=n(7091),e=n(1301),t=n(5529),o=n(2654),l=n(4850),v=n(7221),u=n(537);let g=class{constructor(d,_,E,w){this.authService=d,this.cryptoService=_,this.utils=E,this.router=w,this.nav=e.k,this.loggedUser=new t.xQ}canActivate(d,_){let E=new o.w;return E=this.authService.checkUser().pipe((0,l.U)(w=>w.authorized.active?this.accept(w):this.reject(w)),(0,v.K)(w=>(this.reject(w),this.loggedUser.asObservable())),(0,u.x)(()=>{E.closed||E.unsubscribe()})).subscribe(),this.loggedUser.asObservable()}accept(d){this.utils.localStorageSetItem("userSession",this.cryptoService.encondeJwt(d.authorized)),this.loggedUser.next(!0)}reject(d){200!==d.status&&this.utils.localStorageRemoveItem("userSession"),this.loggedUser.next(!1),this.router.navigate([`/${this.nav.login.route}`])}};g.ctorParameters=()=>[{type:c.e},{type:i.$},{type:r.F},{type:a.F0}],g=(0,h.gn)([(0,m.GSi)({providedIn:"root"})],g)},6847:(D,p,n)=>{n.d(p,{tJ:()=>h,Hi:()=>m,Dl:()=>c,WY:()=>r});const h="Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",m="Infelizmente o que voc\xea procura foi exclu\xeddo ou n\xe3o existe mais.",c="Usu\xe1rio ou senha inv\xe1lidos.",r="Voc\xea n\xe3o est\xe1 autorizado a fazer esse tipo de a\xe7\xe3o!"},6364:(D,p,n)=>{n.d(p,{nV:()=>h,kj:()=>m,cX:()=>c,n7:()=>r});const h=[{name:"P\xe9ssimo",id:"pessimo",value:1},{name:"Ruim",id:"ruim",value:2},{name:"Regular",id:"regular",value:3},{name:"Bom",id:"bom",value:4},{name:"\xd3timo",id:"otimo",value:5}],m={name:"Indispon\xedvel",id:"indisponivel",value:0},c=[{title:"Interior",subtitle:"Beleza, acabamento e espa\xe7o",value:"inside",valuation:null},{title:"Exterior",subtitle:"Beleza e acabamento",value:"outside",valuation:null},{title:"Conforto",subtitle:"Dirigibilidade e itens de s\xe9rie",value:"confort",valuation:null},{title:"Seguran\xe7a",subtitle:"Estabilidade e frenagem",value:"safety",valuation:null},{title:"Consumo",subtitle:"Autonomia e manuten\xe7\xe3o",value:"consumption",valuation:null},{title:"Durabilidade",subtitle:"Reparos e manuten\xe7\xe3o",value:"durability",valuation:null},{title:"Custo-benef\xedcio",subtitle:"Vale a pena? Recomendaria?",value:"worth",valuation:null}],r=[{title:"Servi\xe7os",subtitle:"Revis\xe3o e manuten\xe7\xe3o",value:"services",valuation:null},{title:"Atendimento",subtitle:"Cordialidade e cumprimeto de prazos",value:"people",valuation:null},{title:"Pre\xe7os",subtitle:"Carros, pe\xe7as e servi\xe7os",value:"prices",valuation:null},{title:"Credibilidade",subtitle:"Transmite confian\xe7a em seus produtos e servi\xe7os?",value:"credibility",valuation:null},{title:"Satisfa\xe7\xe3o",subtitle:"Recomendaria ou compraria novamente?",value:"satisfaction",valuation:null}]},5907:(D,p,n)=>{n.d(p,{T:()=>i});var h=n(655),m=n(2096),c=n(520),r=n(967);let i=class{constructor(e){this.http=e}getItens(e,t,o){const l=`${r.N.middlewareEndpoint}/${e}`,v={};return t&&o&&(v.page=t,v.perpage=o),this.http.get(l,{params:v})}deleteItem(e,t){const o=`${e}/${t}`,l=`${r.N.middlewareEndpoint}/${o}`;return this.http.delete(l,{withCredentials:!0})}createItem(e,t,o){const l=o?`${e}/${o}`:e,v=`${r.N.middlewareEndpoint}/${l}`;return this.http.post(v,t,{withCredentials:!0})}filterItem(e,t){const o=`${r.N.middlewareEndpoint}/${e}`;return this.http.post(o,t,{withCredentials:!0})}};i.ctorParameters=()=>[{type:c.eN}],i=(0,h.gn)([(0,m.GSi)({providedIn:"root"})],i)},8294:(D,p,n)=>{n.d(p,{o:()=>c});var h=n(655),m=n(2096);let c=class{constructor(){}saveModel(i){this.selectedModel=i}getModel(){return this.selectedModel}clearModel(){this.selectedModel=null}};c.ctorParameters=()=>[],c=(0,h.gn)([(0,m.GSi)({providedIn:"root"})],c)}}]);