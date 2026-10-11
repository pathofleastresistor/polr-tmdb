var Dt=Object.defineProperty;var Ht=(o,t,e)=>t in o?Dt(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var U=(o,t,e)=>(Ht(o,typeof t!="symbol"?t+"":t,e),e);var F=globalThis,V=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,it=Symbol(),pt=new WeakMap,R=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==it)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(V&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=pt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&pt.set(e,t))}return t}toString(){return this.cssText}},ht=o=>new R(typeof o=="string"?o:o+"",void 0,it),Q=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((s,i,r)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[r+1],o[0]);return new R(e,o,it)},ut=(o,t)=>{if(V)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=F.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,o.appendChild(s)}},st=V?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return ht(e)})(o):o;var{is:Bt,defineProperty:Wt,getOwnPropertyDescriptor:qt,getOwnPropertyNames:Ft,getOwnPropertySymbols:Vt,getPrototypeOf:Qt}=Object,w=globalThis,gt=w.trustedTypes,Kt=gt?gt.emptyScript:"",Yt=w.reactiveElementPolyfillSupport,L=(o,t)=>o,ot={toAttribute(o,t){switch(t){case Boolean:o=o?Kt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},mt=(o,t)=>!Bt(o,t),_t={attribute:!0,type:String,converter:ot,reflect:!1,useDefault:!1,hasChanged:mt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),w.litPropertyMetadata??(w.litPropertyMetadata=new WeakMap);var b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_t){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Wt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:r}=qt(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:i,set(a){let p=i?.call(this);r?.call(this,a),this.requestUpdate(t,p,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_t}static _$Ei(){if(this.hasOwnProperty(L("elementProperties")))return;let t=Qt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(L("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(L("properties"))){let e=this.properties,s=[...Ft(e),...Vt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(st(i))}else t!==void 0&&e.push(st(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ut(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:ot).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),a=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:ot;this._$Em=i;let p=a.fromAttribute(e,r.type);this[i]=p??this._$Ej?.get(i)??p,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(t!==void 0){let a=this.constructor;if(i===!1&&(r=this[t]),s??(s=a.getPropertyOptions(t)),!((s.hasChanged??mt)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},a){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??e??this[t]),r!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:a}=r,p=this[i];a!==!0||this._$AL.has(i)||p===void 0||this.C(i,void 0,r,p)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[L("elementProperties")]=new Map,b[L("finalized")]=new Map,Yt?.({ReactiveElement:b}),(w.reactiveElementVersions??(w.reactiveElementVersions=[])).push("2.1.2");var j=globalThis,ft=o=>o,K=j.trustedTypes,vt=K?K.createPolicy("lit-html",{createHTML:o=>o}):void 0,at="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,nt="?"+x,Jt=`<${nt}>`,E=document,I=()=>E.createComment(""),D=o=>o===null||typeof o!="object"&&typeof o!="function",lt=Array.isArray,At=o=>lt(o)||typeof o?.[Symbol.iterator]=="function",rt=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,xt=/>/g,S=RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$t=/'/g,yt=/"/g,St=/^(?:script|style|textarea|title)$/i,dt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),n=dt(1),ne=dt(2),le=dt(3),$=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),wt=new WeakMap,k=E.createTreeWalker(E,129);function kt(o,t){if(!lt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return vt!==void 0?vt.createHTML(t):t}var Et=(o,t)=>{let e=o.length-1,s=[],i,r=t===2?"<svg>":t===3?"<math>":"",a=O;for(let p=0;p<e;p++){let d=o[p],u,f,c=-1,g=0;for(;g<d.length&&(a.lastIndex=g,f=a.exec(d),f!==null);)g=a.lastIndex,a===O?f[1]==="!--"?a=bt:f[1]!==void 0?a=xt:f[2]!==void 0?(St.test(f[2])&&(i=RegExp("</"+f[2],"g")),a=S):f[3]!==void 0&&(a=S):a===S?f[0]===">"?(a=i??O,c=-1):f[1]===void 0?c=-2:(c=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?S:f[3]==='"'?yt:$t):a===yt||a===$t?a=S:a===bt||a===xt?a=O:(a=S,i=void 0);let h=a===S&&o[p+1].startsWith("/>")?" ":"";r+=a===O?d+Jt:c>=0?(s.push(u),d.slice(0,c)+at+d.slice(c)+x+h):d+x+(c===-2?p:h)}return[kt(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},H=class o{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,a=0,p=t.length-1,d=this.parts,[u,f]=Et(t,e);if(this.el=o.createElement(u,s),k.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=k.nextNode())!==null&&d.length<p;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(at)){let g=f[a++],h=i.getAttribute(c).split(x),m=/([.?@])?(.*)/.exec(g);d.push({type:1,index:r,name:m[2],strings:h,ctor:m[1]==="."?J:m[1]==="?"?G:m[1]==="@"?Z:T}),i.removeAttribute(c)}else c.startsWith(x)&&(d.push({type:6,index:r}),i.removeAttribute(c));if(St.test(i.tagName)){let c=i.textContent.split(x),g=c.length-1;if(g>0){i.textContent=K?K.emptyScript:"";for(let h=0;h<g;h++)i.append(c[h],I()),k.nextNode(),d.push({type:2,index:++r});i.append(c[g],I())}}}else if(i.nodeType===8)if(i.data===nt)d.push({type:2,index:r});else{let c=-1;for(;(c=i.data.indexOf(x,c+1))!==-1;)d.push({type:7,index:r}),c+=x.length-1}r++}}static createElement(t,e){let s=E.createElement("template");return s.innerHTML=t,s}};function C(o,t,e=o,s){if(t===$)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,r=D(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(o),i._$AT(o,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=C(o,i._$AS(o,t.values),i,s)),t}var Y=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??E).importNode(e,!0);k.currentNode=i;let r=k.nextNode(),a=0,p=0,d=s[0];for(;d!==void 0;){if(a===d.index){let u;d.type===2?u=new P(r,r.nextSibling,this,t):d.type===1?u=new d.ctor(r,d.name,d.strings,this,t):d.type===6&&(u=new X(r,this,t)),this._$AV.push(u),d=s[++p]}a!==d?.index&&(r=k.nextNode(),a++)}return k.currentNode=E,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},P=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),D(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==$&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):At(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=H.createElement(kt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new Y(i,this),a=r.u(this.options);r.p(e),this.T(a),this._$AH=r}}_$AC(t){let e=wt.get(t.strings);return e===void 0&&wt.set(t.strings,e=new H(t)),e}k(t){lt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let r of t)i===e.length?e.push(s=new o(this.O(I()),this.O(I()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ft(t).nextSibling;ft(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(t,e=this,s,i){let r=this.strings,a=!1;if(r===void 0)t=C(this,t,e,0),a=!D(t)||t!==this._$AH&&t!==$,a&&(this._$AH=t);else{let p=t,d,u;for(t=r[0],d=0;d<r.length-1;d++)u=C(this,p[s+d],e,d),u===$&&(u=this._$AH[d]),a||(a=!D(u)||u!==this._$AH[d]),u===l?t=l:t!==l&&(t+=(u??"")+r[d+1]),this._$AH[d]=u}a&&!i&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},J=class extends T{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}},G=class extends T{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}},Z=class extends T{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??l)===$)return;let s=this._$AH,i=t===l&&s!==l||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==l&&(s===l||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},X=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}},Ct={M:at,P:x,A:nt,C:1,L:Et,R:Y,D:At,V:C,I:P,H:T,N:G,U:Z,B:J,F:X},Gt=j.litHtmlPolyfillSupport;Gt?.(H,P),(j.litHtmlVersions??(j.litHtmlVersions=[])).push("3.3.2");var Tt=(o,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let r=e?.renderBefore??null;s._$litPart$=i=new P(t.insertBefore(I(),r),r,void 0,e??{})}return i._$AI(o),i};var B=globalThis,y=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Tt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return $}};y._$litElement$=!0,y.finalized=!0,B.litElementHydrateSupport?.({LitElement:y});var Zt=B.litElementPolyfillSupport;Zt?.({LitElement:y});(B.litElementVersions??(B.litElementVersions=[])).push("4.2.2");var zt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Pt=o=>(...t)=>({_$litDirective$:o,values:t}),tt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Xt}=Ct,Nt=o=>o;var Mt=()=>document.createComment(""),N=(o,t,e)=>{let s=o._$AA.parentNode,i=t===void 0?o._$AB:t._$AA;if(e===void 0){let r=s.insertBefore(Mt(),i),a=s.insertBefore(Mt(),i);e=new Xt(r,a,o,o.options)}else{let r=e._$AB.nextSibling,a=e._$AM,p=a!==o;if(p){let d;e._$AQ?.(o),e._$AM=o,e._$AP!==void 0&&(d=o._$AU)!==a._$AU&&e._$AP(d)}if(r!==i||p){let d=e._$AA;for(;d!==r;){let u=Nt(d).nextSibling;Nt(s).insertBefore(d,i),d=u}}}return e},A=(o,t,e=o)=>(o._$AI(t,e),o),te={},Ut=(o,t=te)=>o._$AH=t,Rt=o=>o._$AH,et=o=>{o._$AR(),o._$AA.remove()};var Lt=(o,t,e)=>{let s=new Map;for(let i=t;i<=e;i++)s.set(o[i],i);return s},M=Pt(class extends tt{constructor(o){if(super(o),o.type!==zt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(o,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let i=[],r=[],a=0;for(let p of o)i[a]=s?s(p,a):a,r[a]=e(p,a),a++;return{values:r,keys:i}}render(o,t,e){return this.dt(o,t,e).values}update(o,[t,e,s]){let i=Rt(o),{values:r,keys:a}=this.dt(t,e,s);if(!Array.isArray(i))return this.ut=a,r;let p=this.ut??(this.ut=[]),d=[],u,f,c=0,g=i.length-1,h=0,m=r.length-1;for(;c<=g&&h<=m;)if(i[c]===null)c++;else if(i[g]===null)g--;else if(p[c]===a[h])d[h]=A(i[c],r[h]),c++,h++;else if(p[g]===a[m])d[m]=A(i[g],r[m]),g--,m--;else if(p[c]===a[m])d[m]=A(i[c],r[m]),N(o,d[m+1],i[c]),c++,m--;else if(p[g]===a[h])d[h]=A(i[g],r[h]),N(o,i[c],i[g]),g--,h++;else if(u===void 0&&(u=Lt(a,h,m),f=Lt(p,c,g)),u.has(p[c]))if(u.has(p[g])){let _=f.get(a[h]),v=_!==void 0?i[_]:null;if(v===null){let z=N(o,i[c]);A(z,r[h]),d[h]=z}else d[h]=A(v,r[h]),N(o,i[c],v),i[_]=null;h++}else et(i[g]),g--;else et(i[c]),c++;for(;h<=m;){let _=N(o,d[m+1]);A(_,r[h]),d[h++]=_}for(;c<=g;){let _=i[c++];_!==null&&et(_)}return this.ut=a,Ut(o,d),$}});function Ot(o){return o?new Date(o+"T12:00:00").toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}):""}var jt={want_to_watch:"Up Next",watching:"Watching",watched:"Watched",paused:"Watching",suggested:"Suggested",dismissed:"Not for us"},ct=["new","soon","upnext","suggested"],ee=["Too stressful","Too slow","Feels dated","Not our genre","Already seen it","Just not interested"],It={want_to_watch:"#6d6d6d",watching:"#1976d2",watched:"#2e7d32",paused:"#1976d2",suggested:"#7b1fa2",dismissed:"#6d6d6d"},W=class extends y{constructor(){super(),this._items=[],this._section=null,this._detail=null,this._dismissing=null,this._toast=null,this._loaded=!1,this._unsubEvents=null,this._seasonCache={},this._modal=null,this._libraryFilter="all",this._previewLoading=!1,this._previewSeq=0,this._onKeydown=t=>{t.key==="Escape"&&this._closeTopLayer()},this._searchQuery="",this._searchType="",this._searchResults=null,this._searching=!1,this._adding=new Set,this._searchSeq=0}static getConfigElement(){return document.createElement("polr-tmdb-card-editor")}static getStubConfig(){return{title:"Watch Tonight"}}setConfig(t){let e=(t.sections||ct).filter(i=>ct.includes(i));if(!e.length)throw new Error("sections must include at least one of: "+ct.join(", "));let s=(t.tvs||[]).map(i=>typeof i=="string"?{entity:i}:i);for(let i of s)if(!i.entity||!i.entity.startsWith("media_player."))throw new Error("Each entry in tvs needs a media_player entity");this._config={title:"Watch Tonight",search:!0,...t,sections:e,tvs:s},t.default_section&&e.includes(t.default_section)?this._section=t.default_section:e.includes(this._section)||(this._section=e[0])}set hass(t){this._hass=t,this._loaded||(this._loaded=!0,this._loadItems(),this._subscribeEvents())}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKeydown),this._loaded&&!this._unsubEvents&&(this._loadItems(),this._subscribeEvents())}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKeydown),clearTimeout(this._searchTimer),this._unsubEvents&&this._unsubEvents.then(t=>t&&t()),this._unsubEvents=null}async _loadItems(){try{this._items=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/items"})||[]}catch(t){console.error("polr-tmdb-card: load failed",t)}}async _subscribeEvents(){this._unsubEvents=this._hass.connection.subscribeEvents(t=>{this._loadItems();let e=t.data.item;!this._detail||!e||(e.item_id===this._detail.item_id?this._detail=t.data.action==="remove"?null:e:!this._detail.item_id&&this._sameTitle(e,this._detail)&&(this._detail=e))},"polr_tmdb_updated")}async _updateItem(t,e){let s=Object.fromEntries(Object.entries(e).filter(([,i])=>i!=null));try{await this._hass.connection.sendMessagePromise({type:"polr_tmdb/update",item_id:t,...s})}catch(i){console.error("polr-tmdb-card: update failed",i)}}async _callService(t,e,s){try{await this._hass.callService("polr_tmdb",t,e),s&&this._showToast(s)}catch(i){console.error(`polr-tmdb-card: ${t} failed`,i),this._showToast(i?.message||"Something went wrong")}}_showToast(t){this._toast=t,clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>this._toast=null,3500)}_tvName(t){return t.name||this._hass?.states?.[t.entity]?.attributes?.friendly_name||t.entity}_openOnTv(t,e){this._showToast(`Opening ${t.title} on ${this._tvName(e)}\u2026`),this._callService("open_on_tv",{item_id:t.item_id,entity_id:e.entity})}_addSuggestion(t){this._callService("update_status",{item_id:t.item_id,status:"want_to_watch"},`Added ${t.title} to Up Next`),this._detail?.item_id===t.item_id&&(this._detail={...t,status:"want_to_watch"})}_dismiss(t,e){this._dismissing=null,this._callService("dismiss",{item_id:t.item_id,reason:e||""},`Passed on ${t.title}`),this._detail?.item_id===t.item_id&&(this._detail=null)}async _removeItem(t){if(confirm("Remove from watchlist?"))try{await this._hass.connection.sendMessagePromise({type:"polr_tmdb/remove",item_id:t})}catch(e){console.error("polr-tmdb-card: remove failed",e)}}async _fetchSeasonEpisodes(t,e){let s=`${t}:${e}`;if(!this._seasonCache[s])try{let i=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/season",tmdb_id:t,season_number:e});this._seasonCache[s]=i||[],this.requestUpdate()}catch(i){console.error("season fetch",i)}}_getSeasonEpisodes(t,e){if(!e)return[];let s=`${t}:${e}`;return this._seasonCache[s]?this._seasonCache[s]:(this._fetchSeasonEpisodes(t,e),null)}_openModal(t){this._modal=t,t==="search"&&this.updateComplete.then(()=>this.renderRoot.querySelector(".search-input")?.focus())}_closeModal(){this._modal=null,this._dismissing=null}_closeDetail(){this._detail=null,this._dismissing=null,this._previewSeq++,this._previewLoading=!1}_closeTopLayer(){this._detail?this._closeDetail():this._modal&&this._closeModal()}_sameTitle(t,e){return t.tmdb_id===e.tmdb_id&&t.media_type===e.media_type}_onSearchInput(t){this._searchQuery=t,clearTimeout(this._searchTimer),this._searchTimer=setTimeout(()=>this._runSearch(),400)}_setSearchType(t){this._searchType=t,this._runSearch()}async _runSearch(){clearTimeout(this._searchTimer);let t=this._searchQuery.trim(),e=++this._searchSeq;if(!t){this._searchResults=null,this._searching=!1;return}this._searching=!0;let s={query:t,limit:20};this._searchType&&(s.media_type=this._searchType);try{let i=await this._hass.connection.sendMessagePromise({type:"call_service",domain:"polr_tmdb",service:"search",service_data:s,return_response:!0});e===this._searchSeq&&(this._searchResults=i?.response?.results||[])}catch(i){console.error("polr-tmdb-card: search failed",i),e===this._searchSeq&&(this._searchResults=[],this._showToast(i?.message||"Search failed"))}finally{e===this._searchSeq&&(this._searching=!1)}}_itemForResult(t){return this._items.find(e=>this._sameTitle(e,t))}_openResult(t){let e=this._itemForResult(t);if(e){this._detail=e;return}this._openPreview(t)}async _openPreview(t){let e=++this._previewSeq;this._detail={item_id:null,status:null,tmdb_id:t.tmdb_id,media_type:t.media_type,title:t.title,poster_path:t.poster_url,backdrop_path:t.backdrop_url,overview:t.overview,vote_average:t.rating,release_date:t.year||""},this._previewLoading=!0;try{let s=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/preview",tmdb_id:t.tmdb_id,media_type:t.media_type});e===this._previewSeq&&!this._detail?.item_id&&(this._detail=s)}catch(s){console.error("polr-tmdb-card: preview failed",s)}finally{e===this._previewSeq&&(this._previewLoading=!1)}}async _addTitle(t,e="want_to_watch"){let s=`${t.media_type}:${t.tmdb_id}`;this._adding=new Set([...this._adding,s]);try{let i=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/add",tmdb_id:t.tmdb_id,media_type:t.media_type,status:e});await this._loadItems(),this._showToast(`Added ${t.title} to ${e==="watching"?"Watching":"Up Next"}`),this._detail&&!this._detail.item_id&&this._sameTitle(this._detail,t)&&(this._detail=i)}catch(i){console.error("polr-tmdb-card: add failed",i),this._showToast(i?.message||"Couldn't add that title")}finally{let i=new Set(this._adding);i.delete(s),this._adding=i}}_isAdding(t){return this._adding.has(`${t.media_type}:${t.tmdb_id}`)}_libraryItems(t){return[...t==="all"?this._items.filter(s=>s.status!=="dismissed"):t==="watching"?this._items.filter(s=>this._isWatching(s)):this._items.filter(s=>s.status===t)].sort((s,i)=>s.title.localeCompare(i.title))}_today(){let t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}_isWatching(t){return t.status==="watching"||t.status==="paused"}_hasNewEpisode(t){if(t.status==="watched")return!1;if(t.has_new_episode)return!0;let e=t.next_episode_to_air;if(!e?.air_date||e.air_date>this._today())return!1;let s=t.current_season||0,i=t.current_episode||0;return s===0&&i===0?!0:e.season_number>s||e.season_number===s&&e.episode_number>i}_daysUntil(t){if(!t)return null;let e=new Date(t+"T12:00:00")-new Date;return Math.ceil(e/864e5)}_isComingSoon(t){if(t.media_type!=="tv"||!this._isWatching(t)||this._hasNewEpisode(t))return!1;let e=t.next_episode_to_air;if(!e?.air_date)return!1;let s=this._daysUntil(e.air_date);return s!==null&&s>0&&s<=14}get _newItems(){return this._items.filter(t=>["watching","paused"].includes(t.status)&&this._hasNewEpisode(t)).sort((t,e)=>t.title.localeCompare(e.title))}get _soonItems(){return this._items.filter(t=>this._isComingSoon(t)).sort((t,e)=>{let s=t.next_episode_to_air?.air_date||"9999",i=e.next_episode_to_air?.air_date||"9999";return s.localeCompare(i)})}get _upNextItems(){return this._items.filter(t=>t.status==="want_to_watch").sort((t,e)=>t.title.localeCompare(e.title))}get _suggestedItems(){return this._items.filter(t=>t.status==="suggested").sort((t,e)=>(e.suggestion?.suggested_at||"").localeCompare(t.suggestion?.suggested_at||""))}_itemsFor(t){return t==="new"?this._newItems:t==="soon"?this._soonItems:t==="suggested"?this._suggestedItems:this._upNextItems}render(){if(!this._config)return l;let t={new:"New",soon:"Coming Soon",upnext:"Up Next",suggested:"Suggested"},e=this._config.sections.map(i=>({id:i,label:t[i],count:this._itemsFor(i).length})),s=this._itemsFor(this._section);return n`
      <ha-card>
        <div class="card-header">
          <span class="card-title">${this._config.title}</span>
          <div class="header-actions">
            ${this._config.search?n`
              <button class="icon-btn" title="Search" aria-label="Search" @click=${()=>this._openModal("search")}>
                <ha-icon icon="mdi:magnify"></ha-icon>
              </button>`:l}
            <button class="icon-btn" title="Library" aria-label="Library" @click=${()=>this._openModal("library")}>
              <ha-icon icon="mdi:bookshelf"></ha-icon>
            </button>
          </div>
        </div>
        ${e.length>1?n`
          <div class="section-bar">
            ${this._renderSegmented(e.map(({id:i,label:r,count:a})=>({id:i,label:r,count:a})),this._section,i=>this._section=i)}
          </div>`:l}

        ${s.length===0?this._renderEmpty():this._section==="suggested"?n`<div class="suggestion-list">${M(s,i=>i.item_id,i=>this._renderSuggestion(i))}</div>`:this._section==="new"||this._section==="soon"?n`<div class="wide-row">${M(s,i=>i.item_id,i=>this._renderWideTile(i))}</div>`:n`<div class="poster-row">${M(s,i=>i.item_id,i=>this._renderPoster(i))}</div>`}

        ${this._toast?n`<div class="toast">${this._toast}</div>`:l}
      </ha-card>

      ${this._modal==="search"?this._renderSearchModal():l}
      ${this._modal==="library"?this._renderLibraryModal():l}
      ${this._detail?this._renderDetailDialog():l}
    `}_renderSegmented(t,e,s){return n`
      <div class="segmented" role="tablist">
        ${t.map(i=>n`
          <button class="segment ${i.id===e?"segment-selected":""}" role="tab"
            aria-selected=${i.id===e?"true":"false"}
            style=${i.id===e&&i.color?`--segment-color:${i.color}`:""}
            @click=${()=>s(i.id)}>
            <span class="segment-label">${i.label}</span>
            ${i.count?n`<span class="segment-count">${i.count}</span>`:l}
          </button>
        `)}
      </div>
    `}_renderModal(t,e,s=l){return n`
      <div class="modal-overlay" @click=${i=>i.target===i.currentTarget&&this._closeModal()}>
        <div class="modal" role="dialog" aria-label="${t}">
          <div class="modal-header">
            <span class="modal-title">${t}</span>
            <button class="modal-close" title="Close" @click=${()=>this._closeModal()}>✕</button>
          </div>
          ${s}
          <div class="modal-body">${e}</div>
          ${this._toast&&!this._detail?n`<div class="toast">${this._toast}</div>`:l}
        </div>
      </div>
    `}_renderSearchModal(){let t=[["","All"],["tv","TV"],["movie","Movies"]],e=this._searchResults,s=n`
      <div class="modal-toolbar">
        <input class="search-input" type="search" placeholder="Search movies & shows…" enterkeyhint="search"
          .value=${this._searchQuery}
          @input=${r=>this._onSearchInput(r.target.value)}
          @keydown=${r=>r.key==="Enter"&&this._runSearch()} />
        ${this._renderSegmented(t.map(([r,a])=>({id:r,label:a})),this._searchType,r=>this._setSearchType(r))}
      </div>
    `,i=this._searching&&!e?.length?n`<div class="modal-note">Searching…</div>`:e===null?n`<div class="modal-note">Find a movie or show. Tap it for details, or + to add it to Up Next.</div>`:e.length===0?n`<div class="modal-note">No matches for “${this._searchQuery.trim()}”.</div>`:n`<div class="modal-grid">${M(e,r=>`${r.media_type}:${r.tmdb_id}`,r=>this._renderSearchTile(r))}</div>`;return this._renderModal("Search",i,s)}_renderSearchTile(t){let e=this._itemForResult(t),s=this._isAdding(t),i=[t.year,t.media_type==="tv"?"TV":"Movie"].filter(Boolean).join(" \xB7 ");return n`
      <div class="poster" @click=${()=>this._openResult(t)}>
        ${t.poster_url?n`<img class="poster-img" src="${t.poster_url}" alt="${t.title}" loading="lazy" />`:n`<div class="poster-fallback">${t.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}
        ${e?n`<span class="status-badge" style="background:${It[e.status]||"#6d6d6d"}">${jt[e.status]||e.status}</span>`:n`<button class="quick-add" title="Add to Up Next" ?disabled=${s}
              @click=${r=>{r.stopPropagation(),this._addTitle(t)}}>
              <ha-icon icon="${s?"mdi:loading":"mdi:plus"}"></ha-icon>
            </button>`}
        <div class="poster-title">${t.title}</div>
        <div class="poster-sub">${i}</div>
      </div>
    `}_renderLibraryModal(){let t=[["all","All"],["watching","Watching"],["want_to_watch","Up Next"],["suggested","Suggested"],["watched","Watched"],["dismissed","Not for us"]],e=this._libraryItems(this._libraryFilter),s=n`
      <div class="modal-toolbar">
        <div class="chip-row">
          ${t.map(([r,a])=>{let p=this._libraryItems(r).length;return n`
              <button class="chip ${this._libraryFilter===r?"chip-selected":""}"
                @click=${()=>this._libraryFilter=r}>
                ${this._libraryFilter===r?n`<ha-icon icon="mdi:check"></ha-icon>`:l}
                ${a}${p>0?n`<span class="chip-count">${p}</span>`:l}
              </button>`})}
        </div>
      </div>
    `,i=e.length===0?n`<div class="modal-note">
          ${this._libraryFilter==="all"?"Your list is empty.":"Nothing here."}
          ${this._config.search?n`<button class="action" @click=${()=>this._openModal("search")}>
            <ha-icon icon="mdi:magnify"></ha-icon> Find something</button>`:l}
        </div>`:n`<div class="modal-grid">${M(e,r=>r.item_id,r=>this._renderPoster(r,!0))}</div>`;return this._renderModal("Library",i,s)}_renderEmpty(){let t={new:{icon:"mdi:check-circle-outline",heading:"All caught up!",sub:"No new episodes to watch right now."},soon:{icon:"mdi:calendar-blank-outline",heading:"Nothing coming soon",sub:"No new episodes airing in the next 2 weeks."},upnext:{icon:"mdi:playlist-play",heading:"Queue is empty",sub:"Add something to your watchlist to get started."},suggested:{icon:"mdi:lightbulb-on-outline",heading:"No suggestions right now",sub:"New ones arrive with the next weekly pass."}},{icon:e,heading:s,sub:i}=t[this._section]||t.upnext;return n`
      <div class="empty-state">
        <ha-icon class="empty-icon" .icon=${e}></ha-icon>
        <div class="empty-heading">${s}</div>
        <div class="empty-sub">${i}</div>
        ${this._section==="upnext"&&this._config.search?n`
          <button class="action" @click=${()=>this._openModal("search")}>
            <ha-icon icon="mdi:magnify"></ha-icon> Find something
          </button>`:l}
      </div>
    `}_renderTitleArt(t,e=""){return t.logo_path?n`<img class="title-logo ${e}" src="${t.logo_path}" alt="${t.title}" loading="lazy" />`:n`<div class="title-text ${e}">${t.title}</div>`}_epLabel(t){return t?`S${t.season_number} \xB7 E${t.episode_number}${t.name?` \xB7 ${t.name}`:""}`:""}_renderWideTile(t){let e=this._isComingSoon(t),s=e?t.next_episode_to_air:t.last_episode_to_air,i=e&&s?.air_date?this._daysUntil(s.air_date):null,r=!e&&s?.still_path||t.backdrop_path||t.poster_path;return n`
      <div class="wide-tile" @click=${()=>this._detail=t}>
        ${r?n`<img class="wide-img" src="${r}" alt="" loading="lazy" />`:n`<div class="wide-img wide-fallback">${t.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}
        <div class="wide-fade"></div>
        ${this._hasNewEpisode(t)?n`<span class="new-badge">NEW</span>`:l}
        ${i!==null?n`<span class="soon-badge">${i===1?"Tomorrow":`In ${i} days`}</span>`:l}
        <div class="wide-caption">
          ${this._renderTitleArt(t,"wide-logo")}
          ${s?n`<div class="wide-sub">${this._epLabel(s)}</div>`:l}
        </div>
      </div>
    `}_renderPoster(t,e=!1){let s=t.next_episode_to_air,i=this._isComingSoon(t)&&s?.air_date?this._daysUntil(s.air_date):null;return n`
      <div class="poster" @click=${()=>this._detail=t}>
        ${t.poster_path?n`<img class="poster-img" src="${t.poster_path}" alt="${t.title}" loading="lazy" />`:n`<div class="poster-fallback">${t.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}

        ${this._hasNewEpisode(t)?n`<span class="new-badge">NEW</span>`:l}
        ${e&&this._libraryFilter==="all"?n`
          <span class="status-badge" style="background:${It[t.status]||"#6d6d6d"}">${jt[t.status]||t.status}</span>
        `:l}

        ${i!==null?n`
          <span class="soon-badge">${i===1?"Tomorrow":`${i}d`}</span>
        `:l}

        <div class="poster-title">${t.title}</div>
      </div>
    `}_streamingNames(t){return(t.watch_providers?.flatrate||[]).map(e=>e.provider_name)}_renderSuggestion(t){let e=[t.release_date?.slice(0,4),t.media_type==="tv"&&t.seasons?`${t.seasons} season${t.seasons===1?"":"s"}`:null,t.watch_link?.service||this._streamingNames(t)[0]].filter(Boolean).join(" \xB7 ");return n`
      <div class="suggestion">
        <div class="suggestion-banner" @click=${()=>this._detail=t}>
          ${t.backdrop_path||t.poster_path?n`<img class="wide-img ${t.backdrop_path?"":"img-blur"}" src="${t.backdrop_path||t.poster_path}" alt="" loading="lazy" />`:n`<div class="wide-img wide-fallback">${t.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}
          <div class="wide-fade"></div>
          <div class="wide-caption">
            ${this._renderTitleArt(t,"wide-logo")}
            <div class="wide-sub">${e}</div>
          </div>
        </div>
        <div class="suggestion-body">
          ${t.suggestion?.reason?n`<div class="suggestion-reason">${t.suggestion.reason}</div>`:l}
          ${this._dismissing===t.item_id?this._renderDismissChooser(t):n`
              <div class="suggestion-actions">
                <button class="action action-primary" @click=${()=>this._addSuggestion(t)}>
                  <ha-icon icon="mdi:playlist-plus"></ha-icon> Add
                </button>
                <button class="action" @click=${()=>this._dismissing=t.item_id}>
                  <ha-icon icon="mdi:thumb-down-outline"></ha-icon> Not for us
                </button>
                ${t.trailer_url?n`
                  <a class="action" href="${t.trailer_url}" target="_blank" rel="noopener">
                    <ha-icon icon="mdi:play-circle-outline"></ha-icon> Trailer
                  </a>`:l}
              </div>
              ${this._renderTvButtons(t)}`}
        </div>
      </div>
    `}_renderTvButtons(t){return!t.watch_link?.url||!this._config.tvs.length?l:n`
      <div class="tv-row">
        <span class="tv-label">Open on</span>
        ${this._config.tvs.map(e=>n`
          <button class="action action-tint" @click=${()=>this._openOnTv(t,e)}>
            <ha-icon icon="mdi:television-play"></ha-icon> ${this._tvName(e)}
          </button>
        `)}
      </div>
    `}_renderDismissChooser(t){return n`
      <div class="dismiss-chooser">
        <div class="dismiss-prompt">What's the reason?</div>
        <div class="dismiss-reasons">
          ${ee.map(e=>n`<button class="chip" @click=${()=>this._dismiss(t,e)}>${e}</button>`)}
        </div>
        <div class="dismiss-custom">
          <input class="dismiss-input" type="text" maxlength="200" placeholder="Or say why…"
            @keydown=${e=>{e.key==="Enter"&&e.target.value.trim()&&this._dismiss(t,e.target.value.trim())}} />
          <button class="action" @click=${()=>this._dismissing=null}>Cancel</button>
        </div>
      </div>
    `}_renderProgress(t){let e=t.seasons||0,s=t.current_season||"",i=s?this._getSeasonEpisodes(t.tmdb_id,s):[],r=t.last_episode_to_air,a=t.next_episode_to_air,p=this._today(),d=i?i.filter(_=>!_.air_date||_.air_date<=p):[],u=a&&a.air_date&&a.air_date<=p,f=t.current_season||0,c=t.current_episode||0,g=a&&(a.season_number>f||a.season_number===f&&a.episode_number>c),h=t.has_new_episode||u&&g,m=t.has_new_episode?r:u&&g?a:null;return n`
      <div class="section-label">Progress ${e?`(${e} seasons)`:""}</div>

      ${h&&m?n`
        <div class="new-ep-alert">
          <strong>New:</strong> S${m.season_number}E${m.episode_number}${m.name?` \xB7 ${m.name}`:""}
        </div>
      `:l}

      ${a&&!u?n`
        <div class="upcoming-ep">Next: S${a.season_number}E${a.episode_number}${a.air_date?` \xB7 ${Ot(a.air_date)}`:""}</div>
      `:l}

      <div class="progress-row">
        <label class="select-label">
          <span>Season</span>
          <select class="ep-select" @change=${_=>{let z={current_season:parseInt(_.target.value)||null};t.status==="want_to_watch"&&(z.status="watching"),this._updateItem(t.item_id,z),this._detail={...t,...z,current_episode:null}}}>
            <option value="">—</option>
            ${Array.from({length:e},(_,v)=>v+1).map(_=>n`
              <option value="${_}" ?selected=${s===_}>Season ${_}</option>
            `)}
          </select>
        </label>
        <label class="select-label">
          <span>Episode</span>
          <select class="ep-select" ?disabled=${!s||i===null}
            @change=${_=>{let v=_.target.value?parseInt(_.target.value,10):null;v&&(this._updateItem(t.item_id,{current_episode:v}),this._detail={...t,current_episode:v})}}>
            <option value="">—</option>
            ${i===null?n`<option disabled>Loading…</option>`:d.map(_=>n`
                  <option value="${_.episode_number}" ?selected=${t.current_episode===_.episode_number}>
                    E${_.episode_number}${_.name?` \xB7 ${_.name}`:""}
                  </option>
                `)}
          </select>
        </label>
      </div>

      ${r?n`<div class="ep-latest-hint">Latest aired: S${r.season_number}E${r.episode_number}</div>`:l}
    `}_renderStatusActions(t){if(["suggested","dismissed"].includes(t.status))return l;let e=async a=>{await this._updateItem(t.item_id,{status:a}),this._detail={...t,status:a}},s=t.media_type==="tv",i,r=null;return t.status==="watched"?i={label:"Watch again",icon:"mdi:replay",status:s?"watching":"want_to_watch"}:this._isWatching(t)?(i={label:"Mark watched",icon:"mdi:check",status:"watched"},r={label:"Back to Up Next",icon:"mdi:playlist-plus",status:"want_to_watch"}):s?i={label:"Start watching",icon:"mdi:play-circle-outline",status:"watching"}:i={label:"Mark watched",icon:"mdi:check",status:"watched"},n`
      <div class="preview-actions">
        <button class="action action-primary" @click=${()=>e(i.status)}>
          <ha-icon icon="${i.icon}"></ha-icon> ${i.label}
        </button>
        ${r?n`<button class="action" @click=${()=>e(r.status)}>
          <ha-icon icon="${r.icon}"></ha-icon> ${r.label}
        </button>`:l}
      </div>
    `}_renderItemControls(t){return n`
      ${this._renderTvButtons(t)}

      ${this._renderStatusActions(t)}

      ${t.media_type==="tv"?this._renderProgress(t):l}

      <div class="section-label">Your Rating</div>
      <div class="stars">
        ${[1,2,3,4,5,6,7,8,9,10].map(e=>n`
          <span class="star ${(t.rating||0)>=e?"star-on":""}"
            @click=${async()=>{await this._updateItem(t.item_id,{rating:e}),this._detail={...t,rating:e}}}>★</span>
        `)}
        ${t.rating?n`<span class="rating-num">${t.rating}/10</span>`:l}
      </div>

      <div class="section-label">Notes</div>
      <textarea class="notes" placeholder="Your notes…" .value=${t.notes||""}
        @change=${e=>{this._updateItem(t.item_id,{notes:e.target.value}),this._detail={...t,notes:e.target.value}}}></textarea>
    `}_renderPreviewActions(t){let e=this._isAdding(t);return n`
      <div class="preview-actions">
        <button class="action action-primary" ?disabled=${e} @click=${()=>this._addTitle(t,"want_to_watch")}>
          <ha-icon icon="${e?"mdi:loading":"mdi:playlist-plus"}"></ha-icon> Add to Up Next
        </button>
      </div>
      ${this._previewLoading?n`<div class="preview-loading">Loading details…</div>`:l}
    `}_metaLine(t){let e=Math.floor((t.runtime||0)/60),s=(t.runtime||0)%60,i=t.media_type==="tv"?t.seasons?`${t.seasons} season${t.seasons===1?"":"s"}`:null:t.runtime?e?`${e}h ${s}m`:`${s}m`:null;return[t.release_date?.slice(0,4),i,t.genres?.slice(0,2).join(", "),t.vote_average?`\u2605 ${Number(t.vote_average).toFixed(1)}`:null,t.networks?.[0]].filter(Boolean).join(" \xB7 ")}_renderEpisodeCards(t){let e=[["Next episode",t.next_episode_to_air],["Latest episode",t.last_episode_to_air]].filter(([,s])=>s?.episode_number);return e.length?n`
      <div class="episode-cards">
        ${e.map(([s,i])=>n`
          <div class="episode-card">
            ${i.still_path?n`<img class="episode-still" src="${i.still_path}" alt="" loading="lazy" />`:n`<div class="episode-still episode-still-empty"><ha-icon icon="mdi:television-classic"></ha-icon></div>`}
            <div class="episode-info">
              <div class="episode-label">${s}${i.air_date?n` · ${Ot(i.air_date)}`:l}</div>
              <div class="episode-name">${this._epLabel(i)}</div>
            </div>
          </div>
        `)}
      </div>
    `:l}_renderCast(t){return n`
      <div class="section-label">Cast</div>
      <div class="cast-row">
        ${t.cast.map(e=>n`
          <div class="cast-member">
            ${e.profile_path?n`<img class="cast-photo" src="${e.profile_path}" alt="${e.name}" loading="lazy" />`:n`<div class="cast-photo cast-photo-empty"><ha-icon icon="mdi:account"></ha-icon></div>`}
            <div class="cast-name">${e.name}</div>
            ${e.character?n`<div class="cast-character">${e.character}</div>`:l}
          </div>
        `)}
      </div>
    `}_renderDetailDialog(){let t=this._detail;return n`
      <div class="dialog-overlay" @click=${e=>e.target===e.currentTarget&&this._closeDetail()}>
        <div class="dialog">
          <div class="dialog-topbar">
            ${t.item_id?n`
              <button class="dialog-btn" title="Remove from watchlist" @click=${()=>this._removeItem(t.item_id)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
            `:l}
            <button class="dialog-btn" title="Close" @click=${()=>this._closeDetail()}>✕</button>
          </div>

          <div class="hero">
            ${t.backdrop_path||t.poster_path?n`<img class="hero-img ${t.backdrop_path?"":"img-blur"}" src="${t.backdrop_path||t.poster_path}" alt="" />`:l}
            <div class="hero-fade"></div>
            <div class="hero-caption">
              ${this._renderTitleArt(t,"hero-logo")}
              <div class="hero-meta">${this._metaLine(t)}</div>
              ${t.trailer_url?n`
                <a class="action action-light" href="${t.trailer_url}" target="_blank" rel="noopener">
                  <ha-icon icon="mdi:play"></ha-icon> Trailer
                </a>`:l}
            </div>
          </div>

          <div class="dialog-content">
            ${t.poster_path&&t.backdrop_path?n`
              <div class="dialog-left"><img class="dialog-poster" src="${t.poster_path}" alt="${t.title}" /></div>
            `:l}
            <div class="dialog-right">
              ${t.tagline?n`<p class="tagline">${t.tagline}</p>`:l}
              <p class="dialog-overview">${t.overview}</p>
              ${t.media_type==="tv"?this._renderEpisodeCards(t):l}

              ${t.status==="suggested"?n`
                <div class="suggestion-box">
                  ${t.suggestion?.reason?n`<div><strong>Why it's here:</strong> ${t.suggestion.reason}</div>`:l}
                  ${this._dismissing===t.item_id?this._renderDismissChooser(t):n`<div class="suggestion-actions">
                        <button class="action action-primary" @click=${()=>this._addSuggestion(t)}>
                          <ha-icon icon="mdi:playlist-plus"></ha-icon> Add to Up Next
                        </button>
                        <button class="action" @click=${()=>this._dismissing=t.item_id}>
                          <ha-icon icon="mdi:thumb-down-outline"></ha-icon> Not for us
                        </button>
                      </div>`}
                </div>
              `:l}

              ${t.item_id?this._renderItemControls(t):this._renderPreviewActions(t)}

              ${t.cast?.length?this._renderCast(t):l}

              ${t.watch_providers&&Object.keys(t.watch_providers).length>0?n`
                <div class="section-label">Where to Watch</div>
                <div class="providers">
                  ${t.watch_providers.flatrate?.length?n`
                    <div class="provider-row">
                      <span class="provider-type">Stream</span>
                      ${t.watch_providers.flatrate.map(e=>n`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${e.logo_path}" title="${e.provider_name}" alt="${e.provider_name}" />
                      `)}
                    </div>
                  `:l}
                  ${t.watch_providers.rent?.length?n`
                    <div class="provider-row">
                      <span class="provider-type">Rent</span>
                      ${t.watch_providers.rent.map(e=>n`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${e.logo_path}" title="${e.provider_name}" alt="${e.provider_name}" />
                      `)}
                    </div>
                  `:l}
                  ${t.watch_providers.buy?.length?n`
                    <div class="provider-row">
                      <span class="provider-type">Buy</span>
                      ${t.watch_providers.buy.map(e=>n`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${e.logo_path}" title="${e.provider_name}" alt="${e.provider_name}" />
                      `)}
                    </div>
                  `:l}
                </div>
              `:l}

            </div>
          </div>
        </div>
      </div>
    `}};U(W,"properties",{_hass:{state:!0},_config:{state:!0},_items:{state:!0},_section:{state:!0},_detail:{state:!0},_dismissing:{state:!0},_toast:{state:!0},_modal:{state:!0},_libraryFilter:{state:!0},_previewLoading:{state:!0},_searchQuery:{state:!0},_searchType:{state:!0},_searchResults:{state:!0},_searching:{state:!0},_adding:{state:!0}}),U(W,"styles",Q`
    /* Controls follow HA's tile card features: borderless, tinted,
       42px tall with 12px corners (themes can override both). */
    :host {
      --polr-control-height: var(--feature-height, 42px);
      --polr-radius: var(--feature-border-radius, 12px);
      --polr-control-bg: color-mix(in srgb, var(--disabled-color, #bdbdbd) 20%, transparent);
      --polr-control-bg-hover: color-mix(in srgb, var(--disabled-color, #bdbdbd) 32%, transparent);
      --polr-font-size: var(--ha-font-size-m, 14px);
      --polr-font-weight: var(--ha-font-weight-medium, 500);
    }
    ha-card { display: flex; flex-direction: column; overflow: hidden; container-type: inline-size; }
    button, a.action { font-family: inherit; -webkit-tap-highlight-color: transparent; }

    .card-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 12px 8px 4px 16px; min-height: 40px; }
    .card-title { font-size: var(--ha-card-header-font-size, 1.2rem); font-weight: 500; color: var(--ha-card-header-color, var(--primary-text-color)); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .header-actions { display: flex; align-items: center; gap: 0; flex-shrink: 0; }
    /* Same shape as ha-icon-button */
    .icon-btn {
      width: 40px; height: 40px; border-radius: 50%; border: none; background: transparent; cursor: pointer;
      color: var(--secondary-text-color); display: flex; align-items: center; justify-content: center; --mdc-icon-size: 24px;
      transition: background-color 0.15s, color 0.15s;
    }
    .icon-btn:hover { background: var(--polr-control-bg); color: var(--primary-text-color); }
    .section-bar { padding: 8px 16px 12px; }

    /* Segmented control (ha-control-select) */
    .segmented {
      display: flex; height: var(--polr-control-height); border-radius: var(--polr-radius);
      background: var(--polr-control-bg); overflow: hidden;
    }
    .segment {
      flex: 1 1 auto; min-width: 0; display: flex; align-items: center; justify-content: center; gap: 6px;
      padding: 0 8px; border: none; border-radius: var(--polr-radius); background: transparent; cursor: pointer;
      color: var(--primary-text-color); font-size: var(--polr-font-size); font-weight: var(--polr-font-weight);
      transition: background-color 0.18s, color 0.18s;
    }
    .segment:hover:not(.segment-selected) { background: var(--polr-control-bg); }
    .segment-selected { background: var(--segment-color, var(--primary-color)); color: var(--text-primary-color, #fff); }
    .segment-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .segment-count {
      flex-shrink: 0; min-width: 18px; height: 18px; padding: 0 5px; box-sizing: border-box; border-radius: 9px;
      font-size: 11px; font-weight: 700; line-height: 18px; text-align: center;
      background: var(--polr-control-bg-hover); color: inherit;
    }
    .segment-selected .segment-count { background: rgba(255,255,255,0.28); }
    /* Narrow cards (phones, sidebar columns): full labels beat counts */
    @container (max-width: 440px) {
      .section-bar .segment-count { display: none; }
      .section-bar .segment { padding: 0 4px; }
    }

    /* Buttons (ha-control-button) */
    .action {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      height: var(--polr-control-height); padding: 0 16px; box-sizing: border-box;
      border: none; border-radius: var(--polr-radius); background: var(--polr-control-bg);
      color: var(--primary-text-color); cursor: pointer; text-decoration: none; white-space: nowrap;
      font-size: var(--polr-font-size); font-weight: var(--polr-font-weight); --mdc-icon-size: 20px;
      transition: background-color 0.15s, filter 0.15s;
    }
    .action:hover { background: var(--polr-control-bg-hover); }
    .action[disabled] { opacity: 0.6; cursor: default; }
    .action-primary { background: var(--primary-color); color: var(--text-primary-color, #fff); }
    .action-primary:hover { background: var(--primary-color); filter: brightness(1.08); }
    .action-tint { background: color-mix(in srgb, var(--primary-color) 20%, transparent); color: var(--primary-color); }
    .action-tint:hover { background: color-mix(in srgb, var(--primary-color) 30%, transparent); }
    .action-light { background: rgba(255,255,255,0.92); color: #111; }
    .action-light:hover { background: #fff; }

    /* Filter chips (ha-filter-chip) */
    .chip-row { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding-bottom: 2px; }
    .chip-row::-webkit-scrollbar { display: none; }
    .chip {
      flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; box-sizing: border-box;
      border-radius: 8px; border: 1px solid var(--outline-color, var(--divider-color, #555)); background: transparent;
      color: var(--primary-text-color); cursor: pointer; font-size: 13px; font-weight: 500; white-space: nowrap; --mdc-icon-size: 16px;
    }
    .chip:hover { background: var(--polr-control-bg); }
    .chip-selected { border-color: transparent; background: color-mix(in srgb, var(--primary-color) 20%, transparent); color: var(--primary-text-color); }
    .chip-selected:hover { background: color-mix(in srgb, var(--primary-color) 28%, transparent); }
    .chip-count { font-size: 11px; font-weight: 700; color: var(--secondary-text-color); }

    /* Horizontal poster row */
    .poster-row {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 8px; padding: 0 16px 16px;
    }

    .poster {
      position: relative; border-radius: 6px; overflow: hidden;
      cursor: pointer; background: var(--secondary-background-color, #222);
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .poster:hover { transform: scale(1.04); box-shadow: 0 4px 16px rgba(0,0,0,0.4); }
    .poster-img { width: 100%; aspect-ratio: 2/3; object-fit: cover; display: block; }
    .poster-fallback { width: 100%; aspect-ratio: 2/3; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; background: var(--secondary-background-color, #2a2a2a); }
    .poster-title { padding: 5px 6px; font-size: 0.72rem; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--primary-text-color); }

    .new-badge {
      position: absolute; top: 5px; right: 5px;
      background: #ff9800; border-radius: 3px;
      padding: 1px 5px; font-size: 0.58rem; font-weight: 700; color: #fff; letter-spacing: 0.5px;
    }
    .soon-badge {
      position: absolute; top: 5px; right: 5px;
      background: rgba(0,0,0,0.65); border-radius: 3px;
      padding: 1px 5px; font-size: 0.62rem; font-weight: 600; color: #fff;
    }


    /* Wide art tiles (New, Coming Soon) and suggestion banners */
    .wide-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; padding: 0 16px 16px; }
    .wide-tile { position: relative; aspect-ratio: 16/9; border-radius: 10px; overflow: hidden; cursor: pointer; background: var(--secondary-background-color, #222); }
    .wide-tile:hover .wide-img { transform: scale(1.04); }
    .wide-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.35s ease; }
    .wide-fallback { display: flex; align-items: center; justify-content: center; font-size: 2.5rem; }
    .img-blur { filter: blur(18px) brightness(0.7); transform: scale(1.2); }
    .wide-fade { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 70%); }
    .wide-caption { position: absolute; left: 12px; right: 12px; bottom: 10px; display: flex; flex-direction: column; align-items: flex-start; gap: 4px; color: #fff; }
    .title-logo { display: block; object-fit: contain; object-position: left bottom; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6)); }
    .title-text { font-weight: 700; line-height: 1.15; text-shadow: 0 2px 8px rgba(0,0,0,0.7); }
    .wide-logo.title-logo { max-width: 65%; max-height: 52px; }
    .wide-logo.title-text { font-size: 1.1rem; }
    .wide-sub { font-size: 0.75rem; opacity: 0.9; text-shadow: 0 1px 4px rgba(0,0,0,0.8); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
    .wide-tile .new-badge, .wide-tile .soon-badge { top: 8px; right: 8px; font-size: 0.66rem; padding: 2px 7px; }

    /* Suggestions */
    .suggestion-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; padding: 4px 16px 16px; }
    .suggestion { display: flex; flex-direction: column; border-radius: 10px; overflow: hidden; background: var(--secondary-background-color, #222); }
    .suggestion-banner { position: relative; aspect-ratio: 16/9; cursor: pointer; overflow: hidden; }
    .suggestion-banner:hover .wide-img { transform: scale(1.03); }
    .suggestion .suggestion-body { padding: 10px 12px 12px; }
    .suggestion-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
    .suggestion-meta { font-size: 0.75rem; color: var(--secondary-text-color); }
    .suggestion-reason { font-size: 0.84rem; line-height: 1.45; color: var(--primary-text-color); }
    .suggestion-actions { display: flex; gap: 8px; margin-top: 6px; }
    .suggestion-actions .action { flex: 1 1 0; min-width: 0; padding: 0 10px; }
    .suggestion-box { display: flex; flex-direction: column; gap: 6px; font-size: 0.82rem; line-height: 1.45; padding: 8px 10px; border-radius: 8px; margin-bottom: 6px; background: rgba(123,31,162,0.12); border: 1px solid rgba(123,31,162,0.45); }
    .tv-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 8px; }
    .tv-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--secondary-text-color); }
    .dismiss-chooser { display: flex; flex-direction: column; gap: 6px; margin-top: 4px; }
    .dismiss-prompt { font-size: 0.75rem; color: var(--secondary-text-color); }
    .dismiss-reasons { display: flex; flex-wrap: wrap; gap: 8px; }
    .dismiss-custom { display: flex; gap: 8px; }
    /* Text fields */
    .search-input, .dismiss-input, .notes, .ep-select {
      box-sizing: border-box; border-radius: var(--polr-radius); border: 1px solid transparent;
      background: var(--polr-control-bg); color: var(--primary-text-color); font-family: inherit;
      font-size: var(--polr-font-size);
    }
    .search-input:focus, .dismiss-input:focus, .notes:focus, .ep-select:focus { outline: none; border-color: var(--primary-color); }
    .search-input { width: 100%; height: var(--polr-control-height); padding: 0 14px; font-size: 16px; }
    .dismiss-input { flex: 1; min-width: 0; height: var(--polr-control-height); padding: 0 12px; }

    /* Modals (search, library) */
    .modal-overlay { position: fixed; inset: 0; z-index: 9998; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; padding: 16px; }
    .modal {
      background: var(--card-background-color, #1e1e1e); color: var(--primary-text-color);
      border-radius: 12px; width: 100%; max-width: 760px; height: min(760px, 90vh);
      display: flex; flex-direction: column; overflow: hidden;
    }
    .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px 8px; }
    .modal-title { font-size: 1.1rem; font-weight: 600; }
    .modal-close { background: none; border: none; color: var(--secondary-text-color); font-size: 1rem; cursor: pointer; width: 32px; height: 32px; border-radius: 50%; }
    .modal-close:hover { color: var(--primary-text-color); background: var(--secondary-background-color, #333); }
    .modal-toolbar { display: flex; flex-direction: column; gap: 8px; padding: 0 16px 10px; }
    .modal-body { flex: 1; overflow-y: auto; padding: 0 16px 16px; }
    .modal-note { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 40px 16px; text-align: center; font-size: 0.88rem; color: var(--secondary-text-color); }
    .modal-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; }
    .modal .toast { margin: 0 16px 12px; }
    .poster-sub { padding: 0 6px 6px; margin-top: -3px; font-size: 0.68rem; color: var(--secondary-text-color); }
    .status-badge {
      position: absolute; top: 5px; left: 5px; max-width: calc(100% - 44px);
      border-radius: 3px; padding: 1px 5px; font-size: 0.6rem; font-weight: 600; color: #fff;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .quick-add {
      position: absolute; top: 5px; right: 5px; width: 32px; height: 32px; border-radius: 50%;
      border: none; background: var(--primary-color); color: #fff; cursor: pointer;
      display: flex; align-items: center; justify-content: center; --mdc-icon-size: 20px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.4);
    }
    .quick-add[disabled] { opacity: 0.7; cursor: default; }
    .preview-actions { display: flex; flex-wrap: wrap; gap: 8px; margin: 6px 0 8px; }
    .preview-loading { font-size: 0.75rem; color: var(--secondary-text-color); }
    .empty-state .action { margin-top: 8px; }
    @media (max-width: 600px) {
      .modal-overlay { padding: 0; }
      .modal { max-width: none; height: 100%; border-radius: 0; }
      .modal-grid { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 8px; }
    }
    .toast { margin: 0 16px 12px; padding: 8px 12px; border-radius: 8px; font-size: 0.8rem; background: var(--secondary-background-color, #333); color: var(--primary-text-color); }

    .empty-state {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 32px 16px 40px; gap: 8px; text-align: center;
    }
    .empty-icon { --mdc-icon-size: 48px; color: var(--divider-color); margin-bottom: 4px; }
    .empty-heading { font-size: 1rem; font-weight: 600; color: var(--secondary-text-color); }
    .empty-sub { font-size: 0.82rem; color: var(--disabled-text-color, var(--secondary-text-color)); opacity: 0.7; max-width: 240px; line-height: 1.4; }

    /* Dialog */
    .dialog-overlay { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; padding: 16px; }
    .dialog { background: var(--card-background-color, #1e1e1e); border-radius: 14px; width: 100%; max-width: 720px; max-height: 92vh; overflow-y: auto; position: relative; }
    .dialog-topbar { position: sticky; top: 0; height: 0; z-index: 3; display: flex; justify-content: flex-end; gap: 6px; padding-right: 10px; }
    .dialog-btn { margin-top: 10px; width: 34px; height: 34px; border-radius: 50%; border: none; cursor: pointer; background: rgba(0,0,0,0.55); color: #fff; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; --mdc-icon-size: 18px; backdrop-filter: blur(6px); }
    .dialog-btn:hover { background: rgba(0,0,0,0.8); }
    .hero { position: relative; aspect-ratio: 16/9; max-height: 400px; width: 100%; overflow: hidden; background: #000; }
    .hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 20%; }
    /* Always darkens (never fades to the card colour): the caption is white
       in light themes too. */
    .hero-fade { position: absolute; inset: 0; background:
      linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0) 75%),
      linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 60%); }
    .hero-caption { position: absolute; left: 20px; right: 20px; bottom: 14px; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; color: #fff; }
    .hero-logo.title-logo { max-width: min(60%, 360px); max-height: 110px; }
    .hero-logo.title-text { font-size: 1.7rem; }
    .hero-meta { font-size: 0.82rem; opacity: 0.92; text-shadow: 0 1px 4px rgba(0,0,0,0.8); }
    .tagline { margin: 0 0 6px; font-style: italic; font-size: 0.88rem; color: var(--secondary-text-color); }
    .episode-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 8px; margin: 4px 0 8px; }
    .episode-card { display: flex; gap: 10px; align-items: center; padding: 6px; border-radius: 8px; background: var(--secondary-background-color, #2a2a2a); }
    .episode-still { width: 96px; aspect-ratio: 16/9; border-radius: 5px; object-fit: cover; flex-shrink: 0; }
    .episode-still-empty { display: flex; align-items: center; justify-content: center; background: rgba(127,127,127,0.2); color: var(--secondary-text-color); --mdc-icon-size: 22px; }
    .episode-info { min-width: 0; }
    .episode-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--secondary-text-color); }
    .episode-name { font-size: 0.8rem; font-weight: 500; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
    .cast-row { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 6px; scrollbar-width: thin; }
    .cast-member { flex: 0 0 76px; text-align: center; }
    .cast-photo { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; object-position: center 20%; display: block; margin: 0 auto 4px; background: var(--secondary-background-color, #2a2a2a); }
    .cast-photo-empty { display: flex; align-items: center; justify-content: center; color: var(--secondary-text-color); --mdc-icon-size: 30px; }
    .cast-name { font-size: 0.72rem; font-weight: 600; line-height: 1.2; }
    .cast-character { font-size: 0.66rem; color: var(--secondary-text-color); line-height: 1.2; margin-top: 1px; }
    .dialog-content { display: flex; gap: 16px; padding: 16px 20px 20px; }
    .dialog-left { flex-shrink: 0; }
    .dialog-poster { width: 110px; border-radius: 8px; box-shadow: 0 6px 20px rgba(0,0,0,0.45); }
    .dialog-right { flex: 1; min-width: 0; }
    .dialog-overview { font-size: 0.86rem; line-height: 1.55; margin: 0 0 10px; }
    .section-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: var(--secondary-text-color); margin: 10px 0 5px; }
    .progress-row { display: flex; gap: 12px; flex-wrap: wrap; }
    .select-label { display: flex; flex-direction: column; gap: 3px; flex: 1; font-size: 0.78rem; }
    .select-label span { font-size: 0.7rem; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.5px; }
    .ep-select { width: 100%; height: var(--polr-control-height); padding: 0 10px; cursor: pointer; }
    .ep-select option { background: var(--card-background-color, #1e1e1e); color: var(--primary-text-color); }
    .ep-select:disabled { opacity: 0.5; cursor: default; }
    .new-ep-alert { font-size: 0.85rem; padding: 10px 12px; border-radius: var(--polr-radius); margin-bottom: 6px; background: color-mix(in srgb, var(--warning-color, #ff9800) 18%, transparent); color: var(--warning-color, #ff9800); }
    .new-ep-alert strong { color: var(--primary-text-color); }
    .upcoming-ep { font-size: 0.75rem; color: var(--secondary-text-color); margin-bottom: 5px; }
    .ep-latest-hint { font-size: 0.72rem; color: var(--secondary-text-color); margin-top: 3px; }
    .stars { display: flex; align-items: center; gap: 1px; }
    .star { font-size: 1.3rem; cursor: pointer; color: var(--secondary-text-color, #555); user-select: none; }
    .star-on { color: #ffd600; }
    .rating-num { margin-left: 8px; font-size: 0.8rem; color: var(--secondary-text-color); }
    .notes { width: 100%; padding: 10px 12px; resize: vertical; min-height: 64px; }
    .providers { display: flex; flex-direction: column; gap: 5px; margin-bottom: 4px; }
    .provider-row { display: flex; align-items: center; gap: 6px; }
    .provider-type { font-size: 0.7rem; color: var(--secondary-text-color); min-width: 38px; text-transform: uppercase; letter-spacing: 0.4px; }
    .provider-logo { width: 30px; height: 30px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
    @media (max-width: 600px) {
      .dialog-overlay { padding: 0; }
      .dialog { max-width: none; height: 100%; max-height: none; border-radius: 0; }
      .dialog-left { display: none; }
      .dialog-content { padding: 4px 16px 24px; }
      .hero-caption { left: 16px; right: 16px; }
      .hero-logo.title-logo { max-height: 80px; max-width: 70%; }
      .wide-row { grid-template-columns: 1fr; }
    }
  `);var q=class extends y{setConfig(t){this._config=t}_valueChanged(t){let e=t.target.dataset.field,s=t.target.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,[e]:s}}}))}render(){return this._config?n`
      <div class="editor">
        <label>Title
          <input type="text" data-field="title" .value=${this._config.title||""} @change=${this._valueChanged} />
        </label>
      </div>
    `:l}};U(q,"properties",{hass:{type:Object},_config:{state:!0}}),U(q,"styles",Q`
    .editor { display: flex; flex-direction: column; gap: 10px; padding: 8px; }
    label { display: flex; flex-direction: column; gap: 4px; font-size: 0.9rem; }
    input { padding: 6px; border-radius: 4px; border: 1px solid var(--divider-color, #ccc); background: transparent; color: inherit; }
  `);customElements.get("polr-tmdb-card")||(customElements.define("polr-tmdb-card",W),customElements.define("polr-tmdb-card-editor",q),window.customCards=window.customCards||[],window.customCards.push({type:"polr-tmdb-card",name:"TMDB Shows & Movies",description:"What to watch tonight, and what to try next.",preview:!1}));
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/repeat.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
