var Ie=Object.defineProperty;var je=(r,e,t)=>e in r?Ie(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var O=(r,e,t)=>(je(r,typeof e!="symbol"?e+"":e,t),t);var V=globalThis,q=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,se=Symbol(),he=new WeakMap,R=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(q&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=he.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&he.set(t,e))}return e}toString(){return this.cssText}},ue=r=>new R(typeof r=="string"?r:r+"",void 0,se),F=(r,...e)=>{let t=r.length===1?r[0]:e.reduce((s,i,a)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[a+1],r[0]);return new R(t,r,se)},ge=(r,e)=>{if(q)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),i=V.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,r.appendChild(s)}},ie=q?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return ue(t)})(r):r;var{is:Le,defineProperty:Be,getOwnPropertyDescriptor:We,getOwnPropertyNames:Ve,getOwnPropertySymbols:qe,getPrototypeOf:Fe}=Object,w=globalThis,_e=w.trustedTypes,Qe=_e?_e.emptyScript:"",Ke=w.reactiveElementPolyfillSupport,U=(r,e)=>r,re={toAttribute(r,e){switch(e){case Boolean:r=r?Qe:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},fe=(r,e)=>!Le(r,e),me={attribute:!0,type:String,converter:re,reflect:!1,useDefault:!1,hasChanged:fe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),w.litPropertyMetadata??(w.litPropertyMetadata=new WeakMap);var $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=me){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&Be(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){let{get:i,set:a}=We(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){let p=i?.call(this);a?.call(this,o),this.requestUpdate(e,p,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??me}static _$Ei(){if(this.hasOwnProperty(U("elementProperties")))return;let e=Fe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(U("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(U("properties"))){let t=this.properties,s=[...Ve(t),...qe(t)];for(let i of s)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let i of s)t.unshift(ie(i))}else e!==void 0&&t.push(ie(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ge(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){let a=(s.converter?.toAttribute!==void 0?s.converter:re).toAttribute(t,s.type);this._$Em=e,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,t){let s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let a=s.getPropertyOptions(i),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:re;this._$Em=i;let p=o.fromAttribute(t,a.type);this[i]=p??this._$Ej?.get(i)??p,this._$Em=null}}requestUpdate(e,t,s,i=!1,a){if(e!==void 0){let o=this.constructor;if(i===!1&&(a=this[e]),s??(s=o.getPropertyOptions(e)),!((s.hasChanged??fe)(a,t)||s.useDefault&&s.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:a},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),a!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,a]of s){let{wrapped:o}=a,p=this[i];o!==!0||this._$AL.has(i)||p===void 0||this.C(i,void 0,a,p)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[U("elementProperties")]=new Map,$[U("finalized")]=new Map,Ke?.({ReactiveElement:$}),(w.reactiveElementVersions??(w.reactiveElementVersions=[])).push("2.1.2");var D=globalThis,ve=r=>r,Q=D.trustedTypes,$e=Q?Q.createPolicy("lit-html",{createHTML:r=>r}):void 0,ae="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,ne="?"+x,Ye=`<${ne}>`,k=document,H=()=>k.createComment(""),I=r=>r===null||typeof r!="object"&&typeof r!="function",le=Array.isArray,Se=r=>le(r)||typeof r?.[Symbol.iterator]=="function",oe=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xe=/-->/g,ye=/>/g,S=RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,we=/"/g,Ee=/^(?:script|style|textarea|title)$/i,ce=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),n=ce(1),nt=ce(2),lt=ce(3),y=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Ae=new WeakMap,E=k.createTreeWalker(k,129);function ke(r,e){if(!le(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return $e!==void 0?$e.createHTML(e):e}var Ce=(r,e)=>{let t=r.length-1,s=[],i,a=e===2?"<svg>":e===3?"<math>":"",o=M;for(let p=0;p<t;p++){let l=r[p],u,f,c=-1,g=0;for(;g<l.length&&(o.lastIndex=g,f=o.exec(l),f!==null);)g=o.lastIndex,o===M?f[1]==="!--"?o=xe:f[1]!==void 0?o=ye:f[2]!==void 0?(Ee.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=S):f[3]!==void 0&&(o=S):o===S?f[0]===">"?(o=i??M,c=-1):f[1]===void 0?c=-2:(c=o.lastIndex-f[2].length,u=f[1],o=f[3]===void 0?S:f[3]==='"'?we:be):o===we||o===be?o=S:o===xe||o===ye?o=M:(o=S,i=void 0);let h=o===S&&r[p+1].startsWith("/>")?" ":"";a+=o===M?l+Ye:c>=0?(s.push(u),l.slice(0,c)+ae+l.slice(c)+x+h):l+x+(c===-2?p:h)}return[ke(r,a+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},j=class r{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let a=0,o=0,p=e.length-1,l=this.parts,[u,f]=Ce(e,t);if(this.el=r.createElement(u,s),E.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=E.nextNode())!==null&&l.length<p;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(ae)){let g=f[o++],h=i.getAttribute(c).split(x),m=/([.?@])?(.*)/.exec(g);l.push({type:1,index:a,name:m[2],strings:h,ctor:m[1]==="."?Y:m[1]==="?"?J:m[1]==="@"?G:T}),i.removeAttribute(c)}else c.startsWith(x)&&(l.push({type:6,index:a}),i.removeAttribute(c));if(Ee.test(i.tagName)){let c=i.textContent.split(x),g=c.length-1;if(g>0){i.textContent=Q?Q.emptyScript:"";for(let h=0;h<g;h++)i.append(c[h],H()),E.nextNode(),l.push({type:2,index:++a});i.append(c[g],H())}}}else if(i.nodeType===8)if(i.data===ne)l.push({type:2,index:a});else{let c=-1;for(;(c=i.data.indexOf(x,c+1))!==-1;)l.push({type:7,index:a}),c+=x.length-1}a++}}static createElement(e,t){let s=k.createElement("template");return s.innerHTML=e,s}};function C(r,e,t=r,s){if(e===y)return e;let i=s!==void 0?t._$Co?.[s]:t._$Cl,a=I(e)?void 0:e._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(r),i._$AT(r,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=C(r,i._$AS(r,e.values),i,s)),e}var K=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??k).importNode(t,!0);E.currentNode=i;let a=E.nextNode(),o=0,p=0,l=s[0];for(;l!==void 0;){if(o===l.index){let u;l.type===2?u=new z(a,a.nextSibling,this,e):l.type===1?u=new l.ctor(a,l.name,l.strings,this,e):l.type===6&&(u=new Z(a,this,e)),this._$AV.push(u),l=s[++p]}o!==l?.index&&(a=E.nextNode(),o++)}return E.currentNode=k,i}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},z=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=C(this,e,t),I(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==y&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Se(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&I(this._$AH)?this._$AA.nextSibling.data=e:this.T(k.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=j.createElement(ke(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{let a=new K(i,this),o=a.u(this.options);a.p(t),this.T(o),this._$AH=a}}_$AC(e){let t=Ae.get(e.strings);return t===void 0&&Ae.set(e.strings,t=new j(e)),t}k(e){le(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,i=0;for(let a of e)i===t.length?t.push(s=new r(this.O(H()),this.O(H()),this,this.options)):s=t[i],s._$AI(a),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=ve(e).nextSibling;ve(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,a){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(e,t=this,s,i){let a=this.strings,o=!1;if(a===void 0)e=C(this,e,t,0),o=!I(e)||e!==this._$AH&&e!==y,o&&(this._$AH=e);else{let p=e,l,u;for(e=a[0],l=0;l<a.length-1;l++)u=C(this,p[s+l],t,l),u===y&&(u=this._$AH[l]),o||(o=!I(u)||u!==this._$AH[l]),u===d?e=d:e!==d&&(e+=(u??"")+a[l+1]),this._$AH[l]=u}o&&!i&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Y=class extends T{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},J=class extends T{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},G=class extends T{constructor(e,t,s,i,a){super(e,t,s,i,a),this.type=5}_$AI(e,t=this){if((e=C(this,e,t,0)??d)===y)return;let s=this._$AH,i=e===d&&s!==d||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,a=e!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Z=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}},Te={M:ae,P:x,A:ne,C:1,L:Ce,R:K,D:Se,V:C,I:z,H:T,N:J,U:G,B:Y,F:Z},Je=D.litHtmlPolyfillSupport;Je?.(j,z),(D.litHtmlVersions??(D.litHtmlVersions=[])).push("3.3.2");var Pe=(r,e,t)=>{let s=t?.renderBefore??e,i=s._$litPart$;if(i===void 0){let a=t?.renderBefore??null;s._$litPart$=i=new z(e.insertBefore(H(),a),a,void 0,t??{})}return i._$AI(r),i};var L=globalThis,b=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return y}};b._$litElement$=!0,b.finalized=!0,L.litElementHydrateSupport?.({LitElement:b});var Ge=L.litElementPolyfillSupport;Ge?.({LitElement:b});(L.litElementVersions??(L.litElementVersions=[])).push("4.2.2");var ze={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ne=r=>(...e)=>({_$litDirective$:r,values:e}),X=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var{I:Ze}=Te,Oe=r=>r;var Re=()=>document.createComment(""),N=(r,e,t)=>{let s=r._$AA.parentNode,i=e===void 0?r._$AB:e._$AA;if(t===void 0){let a=s.insertBefore(Re(),i),o=s.insertBefore(Re(),i);t=new Ze(a,o,r,r.options)}else{let a=t._$AB.nextSibling,o=t._$AM,p=o!==r;if(p){let l;t._$AQ?.(r),t._$AM=r,t._$AP!==void 0&&(l=r._$AU)!==o._$AU&&t._$AP(l)}if(a!==i||p){let l=t._$AA;for(;l!==a;){let u=Oe(l).nextSibling;Oe(s).insertBefore(l,i),l=u}}}return t},A=(r,e,t=r)=>(r._$AI(e,t),r),Xe={},Ue=(r,e=Xe)=>r._$AH=e,Me=r=>r._$AH,ee=r=>{r._$AR(),r._$AA.remove()};var De=(r,e,t)=>{let s=new Map;for(let i=e;i<=t;i++)s.set(r[i],i);return s},te=Ne(class extends X{constructor(r){if(super(r),r.type!==ze.CHILD)throw Error("repeat() can only be used in text expressions")}dt(r,e,t){let s;t===void 0?t=e:e!==void 0&&(s=e);let i=[],a=[],o=0;for(let p of r)i[o]=s?s(p,o):o,a[o]=t(p,o),o++;return{values:a,keys:i}}render(r,e,t){return this.dt(r,e,t).values}update(r,[e,t,s]){let i=Me(r),{values:a,keys:o}=this.dt(e,t,s);if(!Array.isArray(i))return this.ut=o,a;let p=this.ut??(this.ut=[]),l=[],u,f,c=0,g=i.length-1,h=0,m=a.length-1;for(;c<=g&&h<=m;)if(i[c]===null)c++;else if(i[g]===null)g--;else if(p[c]===o[h])l[h]=A(i[c],a[h]),c++,h++;else if(p[g]===o[m])l[m]=A(i[g],a[m]),g--,m--;else if(p[c]===o[m])l[m]=A(i[c],a[m]),N(r,l[m+1],i[c]),c++,m--;else if(p[g]===o[h])l[h]=A(i[g],a[h]),N(r,i[c],i[g]),g--,h++;else if(u===void 0&&(u=De(o,h,m),f=De(p,c,g)),u.has(p[c]))if(u.has(p[g])){let _=f.get(o[h]),v=_!==void 0?i[_]:null;if(v===null){let P=N(r,i[c]);A(P,a[h]),l[h]=P}else l[h]=A(v,a[h]),N(r,i[c],v),i[_]=null;h++}else ee(i[g]),g--;else ee(i[c]),c++;for(;h<=m;){let _=N(r,l[m+1]);A(_,a[h]),l[h++]=_}for(;c<=g;){let _=i[c++];_!==null&&ee(_)}return this.ut=o,Ue(r,l),y}});function et(r){return r?new Date(r+"T12:00:00").toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}):""}var He={want_to_watch:"Want to Watch",watching:"Watching",watched:"Watched",paused:"Paused",suggested:"Suggested",dismissed:"Not for us"},de=["new","soon","upnext","suggested"],tt=["Too stressful","Too slow","Feels dated","Not our genre","Already seen it","Just not interested"],pe={want_to_watch:"#6d6d6d",watching:"#1976d2",watched:"#2e7d32",paused:"#e65100",suggested:"#7b1fa2",dismissed:"#6d6d6d"},B=class extends b{constructor(){super(),this._items=[],this._section=null,this._detail=null,this._dismissing=null,this._toast=null,this._loaded=!1,this._unsubEvents=null,this._seasonCache={},this._searchOpen=!1,this._searchQuery="",this._searchType="",this._searchResults=null,this._searching=!1,this._adding=new Set,this._searchSeq=0}static getConfigElement(){return document.createElement("polr-tmdb-card-editor")}static getStubConfig(){return{title:"Watch Tonight"}}setConfig(e){let t=(e.sections||de).filter(i=>de.includes(i));if(!t.length)throw new Error("sections must include at least one of: "+de.join(", "));let s=(e.tvs||[]).map(i=>typeof i=="string"?{entity:i}:i);for(let i of s)if(!i.entity||!i.entity.startsWith("media_player."))throw new Error("Each entry in tvs needs a media_player entity");this._config={title:"Watch Tonight",search:!0,...e,sections:t,tvs:s},e.default_section&&t.includes(e.default_section)?this._section=e.default_section:t.includes(this._section)||(this._section=t[0])}set hass(e){this._hass=e,this._loaded||(this._loaded=!0,this._loadItems(),this._subscribeEvents())}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._searchTimer),this._unsubEvents&&this._unsubEvents.then(e=>e&&e())}async _loadItems(){try{this._items=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/items"})||[]}catch(e){console.error("polr-tmdb-card: load failed",e)}}async _subscribeEvents(){this._unsubEvents=this._hass.connection.subscribeEvents(e=>{this._loadItems(),this._detail&&e.data.item?.item_id===this._detail.item_id&&(this._detail=e.data.action==="remove"?null:e.data.item)},"polr_tmdb_updated")}async _updateItem(e,t){let s=Object.fromEntries(Object.entries(t).filter(([,i])=>i!=null));try{await this._hass.connection.sendMessagePromise({type:"polr_tmdb/update",item_id:e,...s})}catch(i){console.error("polr-tmdb-card: update failed",i)}}async _callService(e,t,s){try{await this._hass.callService("polr_tmdb",e,t),s&&this._showToast(s)}catch(i){console.error(`polr-tmdb-card: ${e} failed`,i),this._showToast(i?.message||"Something went wrong")}}_showToast(e){this._toast=e,clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>this._toast=null,3500)}_tvName(e){return e.name||this._hass?.states?.[e.entity]?.attributes?.friendly_name||e.entity}_openOnTv(e,t){this._showToast(`Opening ${e.title} on ${this._tvName(t)}\u2026`),this._callService("open_on_tv",{item_id:e.item_id,entity_id:t.entity})}_addSuggestion(e){this._callService("update_status",{item_id:e.item_id,status:"want_to_watch"},`Added ${e.title} to Up Next`),this._detail?.item_id===e.item_id&&(this._detail={...e,status:"want_to_watch"})}_dismiss(e,t){this._dismissing=null,this._callService("dismiss",{item_id:e.item_id,reason:t||""},`Passed on ${e.title}`),this._detail?.item_id===e.item_id&&(this._detail=null)}async _removeItem(e){if(confirm("Remove from watchlist?"))try{await this._hass.connection.sendMessagePromise({type:"polr_tmdb/remove",item_id:e})}catch(t){console.error("polr-tmdb-card: remove failed",t)}}async _fetchSeasonEpisodes(e,t){let s=`${e}:${t}`;if(!this._seasonCache[s])try{let i=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/season",tmdb_id:e,season_number:t});this._seasonCache[s]=i||[],this.requestUpdate()}catch(i){console.error("season fetch",i)}}_getSeasonEpisodes(e,t){if(!t)return[];let s=`${e}:${t}`;return this._seasonCache[s]?this._seasonCache[s]:(this._fetchSeasonEpisodes(e,t),null)}_toggleSearch(){this._searchOpen=!this._searchOpen,this._searchOpen?this.updateComplete.then(()=>this.renderRoot.querySelector(".search-input")?.focus()):(clearTimeout(this._searchTimer),this._searchSeq++,this._searchQuery="",this._searchResults=null,this._searching=!1)}_onSearchInput(e){this._searchQuery=e,clearTimeout(this._searchTimer),this._searchTimer=setTimeout(()=>this._runSearch(),400)}_setSearchType(e){this._searchType=e,this._runSearch()}async _runSearch(){clearTimeout(this._searchTimer);let e=this._searchQuery.trim(),t=++this._searchSeq;if(!e){this._searchResults=null,this._searching=!1;return}this._searching=!0;let s={query:e,limit:20};this._searchType&&(s.media_type=this._searchType);try{let i=await this._hass.connection.sendMessagePromise({type:"call_service",domain:"polr_tmdb",service:"search",service_data:s,return_response:!0});t===this._searchSeq&&(this._searchResults=i?.response?.results||[])}catch(i){console.error("polr-tmdb-card: search failed",i),t===this._searchSeq&&(this._searchResults=[],this._showToast(i?.message||"Search failed"))}finally{t===this._searchSeq&&(this._searching=!1)}}_itemForResult(e){return this._items.find(t=>t.tmdb_id===e.tmdb_id&&t.media_type===e.media_type)}async _addFromSearch(e){let t=`${e.media_type}:${e.tmdb_id}`;this._adding=new Set([...this._adding,t]);try{await this._hass.connection.sendMessagePromise({type:"polr_tmdb/add",tmdb_id:e.tmdb_id,media_type:e.media_type,status:"want_to_watch"}),await this._loadItems(),this._showToast(`Added ${e.title} to Up Next`)}catch(s){console.error("polr-tmdb-card: add failed",s),this._showToast(s?.message||"Couldn't add that title")}finally{let s=new Set(this._adding);s.delete(t),this._adding=s}}_today(){let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}_hasNewEpisode(e){if(e.status==="watched")return!1;if(e.has_new_episode)return!0;let t=e.next_episode_to_air;if(!t?.air_date||t.air_date>this._today())return!1;let s=e.current_season||0,i=e.current_episode||0;return s===0&&i===0?!0:t.season_number>s||t.season_number===s&&t.episode_number>i}_daysUntil(e){if(!e)return null;let t=new Date(e+"T12:00:00")-new Date;return Math.ceil(t/864e5)}_isComingSoon(e){if(e.media_type!=="tv"||e.status!=="watching"||this._hasNewEpisode(e))return!1;let t=e.next_episode_to_air;if(!t?.air_date)return!1;let s=this._daysUntil(t.air_date);return s!==null&&s>0&&s<=14}get _newItems(){return this._items.filter(e=>["watching","paused"].includes(e.status)&&this._hasNewEpisode(e)).sort((e,t)=>e.title.localeCompare(t.title))}get _soonItems(){return this._items.filter(e=>this._isComingSoon(e)).sort((e,t)=>{let s=e.next_episode_to_air?.air_date||"9999",i=t.next_episode_to_air?.air_date||"9999";return s.localeCompare(i)})}get _upNextItems(){return this._items.filter(e=>e.status==="want_to_watch").sort((e,t)=>e.title.localeCompare(t.title))}get _suggestedItems(){return this._items.filter(e=>e.status==="suggested").sort((e,t)=>(t.suggestion?.suggested_at||"").localeCompare(e.suggestion?.suggested_at||""))}_itemsFor(e){return e==="new"?this._newItems:e==="soon"?this._soonItems:e==="suggested"?this._suggestedItems:this._upNextItems}render(){if(!this._config)return d;let e={new:"New",soon:"Coming Soon",upnext:"Up Next",suggested:"Suggested"},t=this._config.sections.map(i=>({id:i,label:e[i],count:this._itemsFor(i).length})),s=this._itemsFor(this._section);return n`
      <ha-card>
        <div class="card-header">
          <div class="section-pills">
            ${t.length===1?n`<span class="single-title">${this._config.title}</span>`:t.map(({id:i,label:a,count:o})=>n`
              <button
                class="pill ${this._section===i?"pill-active":""} ${o===0?"pill-empty":""}"
                @click=${()=>{this._section=i,this._searchOpen&&this._toggleSearch()}}
              >
                ${a}${o>0?n`<span class="pill-count">${o}</span>`:d}
              </button>
            `)}
          </div>
          <div class="header-actions">
            ${this._config.search?n`
              <button class="manage-btn ${this._searchOpen?"manage-btn-active":""}" title="${this._searchOpen?"Close search":"Search"}" @click=${this._toggleSearch}>
                <ha-icon icon="${this._searchOpen?"mdi:close":"mdi:magnify"}"></ha-icon>
              </button>`:d}
            <button class="manage-btn" title="Manage watchlist" @click=${this._goToPanel}>
              <ha-icon icon="mdi:plus-circle-outline"></ha-icon>
            </button>
          </div>
        </div>

        ${this._searchOpen?this._renderSearch():s.length===0?this._renderEmpty():this._section==="suggested"?n`<div class="suggestion-list">${te(s,i=>i.item_id,i=>this._renderSuggestion(i))}</div>`:n`<div class="poster-row">${te(s,i=>i.item_id,i=>this._renderPoster(i))}</div>`}

        ${this._toast?n`<div class="toast">${this._toast}</div>`:d}
      </ha-card>

      ${this._detail?this._renderDetailDialog():d}
    `}_goToPanel(){history.pushState(null,"","/polr-tmdb"),window.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0}))}_renderSearch(){let e=[["","All"],["tv","TV"],["movie","Movies"]],t=this._searchResults;return n`
      <div class="search-bar">
        <input class="search-input" type="search" placeholder="Search movies & shows…" enterkeyhint="search"
          .value=${this._searchQuery}
          @input=${s=>this._onSearchInput(s.target.value)}
          @keydown=${s=>s.key==="Enter"&&this._runSearch()} />
        <div class="search-types">
          ${e.map(([s,i])=>n`
            <button class="pill ${this._searchType===s?"pill-active":""}" @click=${()=>this._setSearchType(s)}>${i}</button>
          `)}
        </div>
      </div>
      ${this._searching&&!t?.length?n`<div class="search-note">Searching…</div>`:t===null?n`<div class="search-note">Find a movie or show to add to Up Next.</div>`:t.length===0?n`<div class="search-note">No matches for “${this._searchQuery.trim()}”.</div>`:n`<div class="search-list">${te(t,s=>`${s.media_type}:${s.tmdb_id}`,s=>this._renderSearchResult(s))}</div>`}
    `}_renderSearchResult(e){let t=this._itemForResult(e),s=this._adding.has(`${e.media_type}:${e.tmdb_id}`),i=[e.year,e.media_type==="tv"?"TV":"Movie",e.rating?`\u2605 ${e.rating}`:null].filter(Boolean).join(" \xB7 "),a=t?()=>this._detail=t:null;return n`
      <div class="search-result">
        <div class="search-poster ${a?"clickable":""}" @click=${a||d}>
          ${e.poster_url?n`<img src="${e.poster_url}" alt="${e.title}" loading="lazy" />`:n`<div class="poster-fallback">${e.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}
        </div>
        <div class="search-body">
          <div class="search-title">${e.title}</div>
          <div class="suggestion-meta">${i}</div>
          ${e.overview?n`<div class="search-overview">${e.overview}</div>`:d}
        </div>
        <div class="search-action">
          ${t?n`<button class="status-chip" style="background:${pe[t.status]||"#6d6d6d"}" @click=${a}>
                ${He[t.status]||t.status}
              </button>`:n`<button class="action action-primary" ?disabled=${s} @click=${()=>this._addFromSearch(e)}>
                <ha-icon icon="${s?"mdi:loading":"mdi:playlist-plus"}"></ha-icon> ${s?"Adding":"Add"}
              </button>`}
        </div>
      </div>
    `}_renderEmpty(){let e={new:{icon:"mdi:check-circle-outline",heading:"All caught up!",sub:"No new episodes to watch right now."},soon:{icon:"mdi:calendar-blank-outline",heading:"Nothing coming soon",sub:"No new episodes airing in the next 2 weeks."},upnext:{icon:"mdi:playlist-play",heading:"Queue is empty",sub:"Add something to your watchlist to get started."},suggested:{icon:"mdi:lightbulb-on-outline",heading:"No suggestions right now",sub:"New ones arrive with the next weekly pass."}},{icon:t,heading:s,sub:i}=e[this._section]||e.upnext;return n`
      <div class="empty-state">
        <ha-icon class="empty-icon" .icon=${t}></ha-icon>
        <div class="empty-heading">${s}</div>
        <div class="empty-sub">${i}</div>
      </div>
    `}_renderPoster(e){let t=e.next_episode_to_air,s=this._isComingSoon(e)&&t?.air_date?this._daysUntil(t.air_date):null;return n`
      <div class="poster" @click=${()=>this._detail=e}>
        ${e.poster_path?n`<img class="poster-img" src="${e.poster_path}" alt="${e.title}" loading="lazy" />`:n`<div class="poster-fallback">${e.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}

        ${this._hasNewEpisode(e)?n`<span class="new-badge">NEW</span>`:d}

        ${s!==null?n`
          <span class="soon-badge">${s===1?"Tomorrow":`${s}d`}</span>
        `:d}

        <div class="poster-title">${e.title}</div>
      </div>
    `}_streamingNames(e){return(e.watch_providers?.flatrate||[]).map(t=>t.provider_name)}_renderSuggestion(e){let t=[e.release_date?.slice(0,4),e.media_type==="tv"&&e.seasons?`${e.seasons} season${e.seasons===1?"":"s"}`:null,e.watch_link?.service||this._streamingNames(e)[0]].filter(Boolean).join(" \xB7 ");return n`
      <div class="suggestion">
        <div class="suggestion-poster" @click=${()=>this._detail=e}>
          ${e.poster_path?n`<img src="${e.poster_path}" alt="${e.title}" loading="lazy" />`:n`<div class="poster-fallback">${e.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}
        </div>
        <div class="suggestion-body">
          <div class="suggestion-title" @click=${()=>this._detail=e}>${e.title}</div>
          <div class="suggestion-meta">${t}</div>
          ${e.suggestion?.reason?n`<div class="suggestion-reason">${e.suggestion.reason}</div>`:d}
          ${this._dismissing===e.item_id?this._renderDismissChooser(e):n`
              <div class="suggestion-actions">
                <button class="action action-primary" @click=${()=>this._addSuggestion(e)}>
                  <ha-icon icon="mdi:playlist-plus"></ha-icon> Add
                </button>
                <button class="action" @click=${()=>this._dismissing=e.item_id}>
                  <ha-icon icon="mdi:thumb-down-outline"></ha-icon> Not for us
                </button>
                ${e.trailer_url?n`
                  <a class="action" href="${e.trailer_url}" target="_blank" rel="noopener">
                    <ha-icon icon="mdi:play-circle-outline"></ha-icon> Trailer
                  </a>`:d}
              </div>
              ${this._renderTvButtons(e)}`}
        </div>
      </div>
    `}_renderTvButtons(e){return!e.watch_link?.url||!this._config.tvs.length?d:n`
      <div class="tv-row">
        <span class="tv-label">Open on</span>
        ${this._config.tvs.map(t=>n`
          <button class="tv-btn" @click=${()=>this._openOnTv(e,t)}>
            <ha-icon icon="mdi:television-play"></ha-icon> ${this._tvName(t)}
          </button>
        `)}
      </div>
    `}_renderDismissChooser(e){return n`
      <div class="dismiss-chooser">
        <div class="dismiss-prompt">What's the reason?</div>
        <div class="dismiss-reasons">
          ${tt.map(t=>n`<button class="reason-chip" @click=${()=>this._dismiss(e,t)}>${t}</button>`)}
        </div>
        <div class="dismiss-custom">
          <input class="dismiss-input" type="text" maxlength="200" placeholder="Or say why…"
            @keydown=${t=>{t.key==="Enter"&&t.target.value.trim()&&this._dismiss(e,t.target.value.trim())}} />
          <button class="action" @click=${()=>this._dismissing=null}>Cancel</button>
        </div>
      </div>
    `}_renderProgress(e){let t=e.seasons||0,s=e.current_season||"",i=s?this._getSeasonEpisodes(e.tmdb_id,s):[],a=e.last_episode_to_air,o=e.next_episode_to_air,p=this._today(),l=i?i.filter(_=>!_.air_date||_.air_date<=p):[],u=o&&o.air_date&&o.air_date<=p,f=e.current_season||0,c=e.current_episode||0,g=o&&(o.season_number>f||o.season_number===f&&o.episode_number>c),h=e.has_new_episode||u&&g,m=e.has_new_episode?a:u&&g?o:null;return n`
      <div class="section-label">Progress ${t?`(${t} seasons)`:""}</div>

      ${h&&m?n`
        <div class="new-ep-alert">
          <strong>New:</strong> S${m.season_number}E${m.episode_number}${m.name?` \xB7 ${m.name}`:""}
        </div>
      `:d}

      ${o&&!u?n`
        <div class="upcoming-ep">Next: S${o.season_number}E${o.episode_number}${o.air_date?` \xB7 ${et(o.air_date)}`:""}</div>
      `:d}

      <div class="progress-row">
        <label class="select-label">
          <span>Season</span>
          <select class="ep-select" @change=${_=>{let P={current_season:parseInt(_.target.value)||null};e.status==="want_to_watch"&&(P.status="watching"),this._updateItem(e.item_id,P),this._detail={...e,...P,current_episode:null}}}>
            <option value="">—</option>
            ${Array.from({length:t},(_,v)=>v+1).map(_=>n`
              <option value="${_}" ?selected=${s===_}>Season ${_}</option>
            `)}
          </select>
        </label>
        <label class="select-label">
          <span>Episode</span>
          <select class="ep-select" ?disabled=${!s||i===null}
            @change=${_=>{let v=_.target.value?parseInt(_.target.value,10):null;v&&(this._updateItem(e.item_id,{current_episode:v}),this._detail={...e,current_episode:v})}}>
            <option value="">—</option>
            ${i===null?n`<option disabled>Loading…</option>`:l.map(_=>n`
                  <option value="${_.episode_number}" ?selected=${e.current_episode===_.episode_number}>
                    E${_.episode_number}${_.name?` \xB7 ${_.name}`:""}
                  </option>
                `)}
          </select>
        </label>
      </div>

      ${a?n`<div class="ep-latest-hint">Latest aired: S${a.season_number}E${a.episode_number}</div>`:d}
    `}_renderDetailDialog(){let e=this._detail;return n`
      <div class="dialog-overlay" @click=${t=>t.target===t.currentTarget&&(this._detail=null)}>
        <div class="dialog">
          ${e.backdrop_path?n`<div class="dialog-backdrop" style="background-image:url('${e.backdrop_path}')"></div>`:d}

          <button class="dialog-close" @click=${()=>this._detail=null}>✕</button>
          <button class="dialog-delete" title="Remove from watchlist" @click=${()=>this._removeItem(e.item_id)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>

          <div class="dialog-content">
            <div class="dialog-left">
              ${e.poster_path?n`<img class="dialog-poster" src="${e.poster_path}" alt="${e.title}" />`:d}
            </div>
            <div class="dialog-right">
              <div class="dialog-title">${e.title}</div>
              <div class="dialog-meta">
                ${[e.release_date?.slice(0,4),e.genres?.slice(0,3).join(", "),e.vote_average?`\u2605 ${e.vote_average}`:null,e.networks?.[0]].filter(Boolean).join(" \xB7 ")}
              </div>
              <p class="dialog-overview">${e.overview}</p>

              ${e.status==="suggested"?n`
                <div class="suggestion-box">
                  ${e.suggestion?.reason?n`<div><strong>Why it's here:</strong> ${e.suggestion.reason}</div>`:d}
                  ${this._dismissing===e.item_id?this._renderDismissChooser(e):n`<div class="suggestion-actions">
                        <button class="action action-primary" @click=${()=>this._addSuggestion(e)}>
                          <ha-icon icon="mdi:playlist-plus"></ha-icon> Add to Up Next
                        </button>
                        <button class="action" @click=${()=>this._dismissing=e.item_id}>
                          <ha-icon icon="mdi:thumb-down-outline"></ha-icon> Not for us
                        </button>
                      </div>`}
                </div>
              `:d}

              ${this._renderTvButtons(e)}

              <div class="section-label">Status</div>
              <div class="status-pills">
                ${["want_to_watch","watching","watched","paused"].map(t=>n`
                  <button class="status-pill ${e.status===t?"status-pill-active":""}"
                    style="${e.status===t?`background:${pe[t]};border-color:${pe[t]}`:""}"
                    @click=${async()=>{await this._updateItem(e.item_id,{status:t}),this._detail={...e,status:t}}}
                  >${He[t]}</button>
                `)}
              </div>

              ${e.media_type==="tv"?this._renderProgress(e):d}

              <div class="section-label">Your Rating</div>
              <div class="stars">
                ${[1,2,3,4,5,6,7,8,9,10].map(t=>n`
                  <span class="star ${(e.rating||0)>=t?"star-on":""}"
                    @click=${async()=>{await this._updateItem(e.item_id,{rating:t}),this._detail={...e,rating:t}}}>★</span>
                `)}
                ${e.rating?n`<span class="rating-num">${e.rating}/10</span>`:d}
              </div>

              <div class="section-label">Notes</div>
              <textarea class="notes" placeholder="Your notes…" .value=${e.notes||""}
                @change=${t=>{this._updateItem(e.item_id,{notes:t.target.value}),this._detail={...e,notes:t.target.value}}}></textarea>

              ${e.watch_providers&&Object.keys(e.watch_providers).length>0?n`
                <div class="section-label">Where to Watch</div>
                <div class="providers">
                  ${e.watch_providers.flatrate?.length?n`
                    <div class="provider-row">
                      <span class="provider-type">Stream</span>
                      ${e.watch_providers.flatrate.map(t=>n`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${t.logo_path}" title="${t.provider_name}" alt="${t.provider_name}" />
                      `)}
                    </div>
                  `:d}
                  ${e.watch_providers.rent?.length?n`
                    <div class="provider-row">
                      <span class="provider-type">Rent</span>
                      ${e.watch_providers.rent.map(t=>n`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${t.logo_path}" title="${t.provider_name}" alt="${t.provider_name}" />
                      `)}
                    </div>
                  `:d}
                  ${e.watch_providers.buy?.length?n`
                    <div class="provider-row">
                      <span class="provider-type">Buy</span>
                      ${e.watch_providers.buy.map(t=>n`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${t.logo_path}" title="${t.provider_name}" alt="${t.provider_name}" />
                      `)}
                    </div>
                  `:d}
                </div>
              `:d}

              ${e.trailer_url?n`
                <div class="dialog-footer">
                  <a class="trailer-btn" href="${e.trailer_url}" target="_blank" rel="noopener">▶ Trailer</a>
                </div>
              `:d}
            </div>
          </div>
        </div>
      </div>
    `}};O(B,"properties",{_hass:{state:!0},_config:{state:!0},_items:{state:!0},_section:{state:!0},_detail:{state:!0},_dismissing:{state:!0},_toast:{state:!0},_searchOpen:{state:!0},_searchQuery:{state:!0},_searchType:{state:!0},_searchResults:{state:!0},_searching:{state:!0},_adding:{state:!0}}),O(B,"styles",F`
    ha-card { display: flex; flex-direction: column; overflow: hidden; }

    .card-header { padding: 16px 16px 8px; font-size: 1.1rem; font-weight: 600; color: var(--ha-card-header-color, var(--primary-text-color)); }

    /* Section pills */
    .card-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 12px 10px 16px; }
    .section-pills { display: flex; gap: 6px; flex-wrap: wrap; }
    .manage-btn {
      background: none; border: none; cursor: pointer; padding: 4px;
      color: var(--secondary-text-color); border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      --mdc-icon-size: 26px; flex-shrink: 0;
      transition: color 0.15s;
    }
    .manage-btn:hover, .manage-btn-active { color: var(--primary-color); }
    .header-actions { display: flex; align-items: center; gap: 2px; flex-shrink: 0; }
    .pill {
      display: flex; align-items: center; gap: 5px;
      padding: 4px 12px; border-radius: 16px;
      border: 1px solid var(--divider-color, #555);
      background: transparent; color: var(--secondary-text-color);
      cursor: pointer; font-size: 0.78rem; white-space: nowrap; transition: all 0.15s;
    }
    .pill-active { background: var(--primary-color); border-color: var(--primary-color); color: #fff; }
    .pill-empty { opacity: 0.45; }
    .pill-count {
      background: rgba(255,255,255,0.25); color: inherit;
      border-radius: 10px; padding: 0 5px; font-size: 0.72rem; font-weight: 700; min-width: 16px; text-align: center;
    }
    .pill-active .pill-count { background: rgba(255,255,255,0.3); }
    .pill:not(.pill-active) .pill-count { background: var(--divider-color); color: var(--primary-text-color); }

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

    .single-title { font-size: 1.05rem; font-weight: 600; }

    /* Suggestions */
    .suggestion-list { display: flex; flex-direction: column; gap: 14px; padding: 4px 16px 16px; }
    .suggestion { display: flex; gap: 12px; align-items: flex-start; }
    .suggestion-poster { flex-shrink: 0; width: 84px; border-radius: 6px; overflow: hidden; cursor: pointer; background: var(--secondary-background-color, #222); }
    .suggestion-poster img { width: 100%; aspect-ratio: 2/3; object-fit: cover; display: block; }
    .suggestion-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
    .suggestion-title { font-weight: 600; font-size: 0.98rem; cursor: pointer; }
    .suggestion-meta { font-size: 0.75rem; color: var(--secondary-text-color); }
    .suggestion-reason { font-size: 0.84rem; line-height: 1.45; color: var(--primary-text-color); }
    .suggestion-actions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
    .suggestion-box { display: flex; flex-direction: column; gap: 6px; font-size: 0.82rem; line-height: 1.45; padding: 8px 10px; border-radius: 8px; margin-bottom: 6px; background: rgba(123,31,162,0.12); border: 1px solid rgba(123,31,162,0.45); }
    .action {
      display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; min-height: 32px; box-sizing: border-box;
      border-radius: 16px; border: 1px solid var(--divider-color, #555); background: transparent;
      color: var(--primary-text-color); cursor: pointer; font-size: 0.78rem; text-decoration: none; --mdc-icon-size: 16px;
    }
    .action-primary { background: var(--primary-color); border-color: var(--primary-color); color: #fff; }
    .tv-row { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-top: 6px; }
    .tv-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--secondary-text-color); }
    .tv-btn {
      display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; min-height: 32px; box-sizing: border-box;
      border-radius: 16px; border: 1px solid var(--primary-color); background: transparent;
      color: var(--primary-color); cursor: pointer; font-size: 0.78rem; --mdc-icon-size: 16px;
    }
    .dismiss-chooser { display: flex; flex-direction: column; gap: 6px; margin-top: 4px; }
    .dismiss-prompt { font-size: 0.75rem; color: var(--secondary-text-color); }
    .dismiss-reasons { display: flex; flex-wrap: wrap; gap: 6px; }
    .reason-chip { padding: 5px 10px; min-height: 30px; border-radius: 14px; border: 1px solid var(--divider-color, #555); background: transparent; color: var(--primary-text-color); cursor: pointer; font-size: 0.76rem; }
    .dismiss-custom { display: flex; gap: 6px; }
    .dismiss-input { flex: 1; min-width: 0; padding: 6px 8px; border-radius: 6px; border: 1px solid var(--divider-color, #555); background: transparent; color: var(--primary-text-color); font-size: 0.8rem; }
    /* Search */
    .search-bar { display: flex; flex-direction: column; gap: 8px; padding: 0 16px 10px; }
    .search-input {
      width: 100%; box-sizing: border-box; padding: 8px 12px; border-radius: 18px;
      border: 1px solid var(--divider-color, #555); background: transparent;
      color: var(--primary-text-color); font-size: 0.9rem; font-family: inherit;
    }
    .search-input:focus { outline: none; border-color: var(--primary-color); }
    .search-types { display: flex; gap: 6px; }
    .search-note { padding: 20px 16px 28px; text-align: center; font-size: 0.85rem; color: var(--secondary-text-color); }
    .search-list { display: flex; flex-direction: column; gap: 10px; padding: 0 16px 16px; max-height: 480px; overflow-y: auto; }
    .search-result { display: flex; gap: 10px; align-items: center; }
    .search-poster { flex-shrink: 0; width: 46px; border-radius: 4px; overflow: hidden; background: var(--secondary-background-color, #222); }
    .search-poster img { width: 100%; aspect-ratio: 2/3; object-fit: cover; display: block; }
    .search-poster .poster-fallback { font-size: 1.3rem; }
    .clickable { cursor: pointer; }
    .search-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
    .search-title { font-weight: 600; font-size: 0.9rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .search-overview { font-size: 0.75rem; line-height: 1.35; color: var(--secondary-text-color); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .search-action { flex-shrink: 0; }
    .search-action .action[disabled] { opacity: 0.7; cursor: default; }
    .status-chip { padding: 5px 10px; min-height: 30px; border-radius: 14px; border: none; color: #fff; cursor: pointer; font-size: 0.74rem; white-space: nowrap; }
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
    .dialog { background: var(--card-background-color, #1e1e1e); border-radius: 12px; width: 100%; max-width: 640px; max-height: 90vh; overflow-y: auto; position: relative; }
    .dialog-backdrop { width: 100%; height: 180px; background-size: cover; background-position: center top; border-radius: 12px 12px 0 0; }
    .dialog-close { position: sticky; top: 8px; float: right; margin: 8px 8px 0 0; background: rgba(0,0,0,0.6); border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; color: #fff; font-size: 0.9rem; z-index: 1; }
    .dialog-delete { position: sticky; top: 8px; float: right; margin: 8px 8px 0 0; background: rgba(0,0,0,0.6); border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; z-index: 1; opacity: 0.6; display: flex; align-items: center; justify-content: center; --mdc-icon-size: 18px; color: #fff; }
    .dialog-delete:hover { opacity: 1; }
    .dialog-content { display: flex; gap: 14px; padding: 14px; clear: both; }
    .dialog-left { flex-shrink: 0; }
    .dialog-poster { width: 90px; border-radius: 5px; }
    .dialog-right { flex: 1; min-width: 0; }
    .dialog-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 4px; }
    .dialog-meta { font-size: 0.8rem; color: var(--secondary-text-color); margin-bottom: 6px; }
    .dialog-overview { font-size: 0.82rem; line-height: 1.5; max-height: 80px; overflow-y: auto; margin: 0 0 8px; }
    .section-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: var(--secondary-text-color); margin: 10px 0 5px; }
    .status-pills { display: flex; flex-wrap: wrap; gap: 5px; }
    .status-pill { padding: 3px 10px; border-radius: 14px; border: 1px solid var(--divider-color, #555); background: transparent; color: var(--primary-text-color); cursor: pointer; font-size: 0.75rem; }
    .status-pill-active { color: #fff; }
    .progress-row { display: flex; gap: 12px; flex-wrap: wrap; }
    .select-label { display: flex; flex-direction: column; gap: 3px; flex: 1; font-size: 0.78rem; }
    .select-label span { font-size: 0.7rem; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.5px; }
    .ep-select { width: 100%; padding: 5px 7px; border-radius: 5px; border: 1px solid var(--divider-color, #555); background: var(--card-background-color, #1e1e1e); color: var(--primary-text-color); font-size: 0.82rem; cursor: pointer; }
    .ep-select:disabled { opacity: 0.5; cursor: default; }
    .new-ep-alert { font-size: 0.78rem; padding: 5px 8px; border-radius: 5px; margin-bottom: 5px; background: rgba(255,152,0,0.15); border: 1px solid #ff9800; color: #ff9800; }
    .new-ep-alert strong { color: var(--primary-text-color); }
    .upcoming-ep { font-size: 0.75rem; color: var(--secondary-text-color); margin-bottom: 5px; }
    .ep-latest-hint { font-size: 0.72rem; color: var(--secondary-text-color); margin-top: 3px; }
    .stars { display: flex; align-items: center; gap: 1px; }
    .star { font-size: 1.3rem; cursor: pointer; color: var(--secondary-text-color, #555); user-select: none; }
    .star-on { color: #ffd600; }
    .rating-num { margin-left: 8px; font-size: 0.8rem; color: var(--secondary-text-color); }
    .notes { width: 100%; box-sizing: border-box; padding: 6px 8px; border-radius: 5px; border: 1px solid var(--divider-color, #555); background: transparent; color: var(--primary-text-color); font-size: 0.82rem; resize: vertical; min-height: 54px; font-family: inherit; }
    .providers { display: flex; flex-direction: column; gap: 5px; margin-bottom: 4px; }
    .provider-row { display: flex; align-items: center; gap: 6px; }
    .provider-type { font-size: 0.7rem; color: var(--secondary-text-color); min-width: 38px; text-transform: uppercase; letter-spacing: 0.4px; }
    .provider-logo { width: 30px; height: 30px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
    .dialog-footer { display: flex; margin-top: 12px; }
    .trailer-btn { padding: 5px 14px; border-radius: 16px; background: #c62828; color: #fff; text-decoration: none; font-size: 0.8rem; }
    @media (max-width: 420px) { .dialog-content { flex-direction: column; } .dialog-poster { width: 70px; } }
  `);var W=class extends b{setConfig(e){this._config=e}_valueChanged(e){let t=e.target.dataset.field,s=e.target.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,[t]:s}}}))}render(){return this._config?n`
      <div class="editor">
        <label>Title
          <input type="text" data-field="title" .value=${this._config.title||""} @change=${this._valueChanged} />
        </label>
      </div>
    `:d}};O(W,"properties",{hass:{type:Object},_config:{state:!0}}),O(W,"styles",F`
    .editor { display: flex; flex-direction: column; gap: 10px; padding: 8px; }
    label { display: flex; flex-direction: column; gap: 4px; font-size: 0.9rem; }
    input { padding: 6px; border-radius: 4px; border: 1px solid var(--divider-color, #ccc); background: transparent; color: inherit; }
  `);customElements.define("polr-tmdb-card",B);customElements.define("polr-tmdb-card-editor",W);window.customCards=window.customCards||[];window.customCards.push({type:"polr-tmdb-card",name:"TMDB Shows & Movies",description:"What to watch tonight, and what to try next.",preview:!1});
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
