var De=Object.defineProperty;var Ie=(o,e,t)=>e in o?De(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var N=(o,e,t)=>(Ie(o,typeof e!="symbol"?e+"":e,t),t);var q=globalThis,F=q.ShadowRoot&&(q.ShadyCSS===void 0||q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,te=Symbol(),pe=new WeakMap,U=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==te)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(F&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=pe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&pe.set(t,e))}return e}toString(){return this.cssText}},he=o=>new U(typeof o=="string"?o:o+"",void 0,te),V=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((s,i,r)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[r+1],o[0]);return new U(t,o,te)},ue=(o,e)=>{if(F)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),i=q.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,o.appendChild(s)}},se=F?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return he(t)})(o):o;var{is:He,defineProperty:We,getOwnPropertyDescriptor:Be,getOwnPropertyNames:qe,getOwnPropertySymbols:Fe,getPrototypeOf:Ve}=Object,$=globalThis,ge=$.trustedTypes,Ke=ge?ge.emptyScript:"",Qe=$.reactiveElementPolyfillSupport,L=(o,e)=>o,ie={toAttribute(o,e){switch(e){case Boolean:o=o?Ke:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},me=(o,e)=>!He(o,e),_e={attribute:!0,type:String,converter:ie,reflect:!1,useDefault:!1,hasChanged:me};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);var v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_e){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&We(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){let{get:i,set:r}=Be(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:i,set(n){let c=i?.call(this);r?.call(this,n),this.requestUpdate(e,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_e}static _$Ei(){if(this.hasOwnProperty(L("elementProperties")))return;let e=Ve(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(L("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(L("properties"))){let t=this.properties,s=[...qe(t),...Fe(t)];for(let i of s)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let i of s)t.unshift(se(i))}else e!==void 0&&t.push(se(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ue(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:ie).toAttribute(t,s.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){let s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:ie;this._$Em=i;let c=n.fromAttribute(t,r.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(e,t,s,i=!1,r){if(e!==void 0){let n=this.constructor;if(i===!1&&(r=this[e]),s??(s=n.getPropertyOptions(e)),!((s.hasChanged??me)(r,t)||s.useDefault&&s.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:n}=r,c=this[i];n!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,r,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[L("elementProperties")]=new Map,v[L("finalized")]=new Map,Qe?.({ReactiveElement:v}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.2");var j=globalThis,fe=o=>o,K=j.trustedTypes,ve=K?K.createPolicy("lit-html",{createHTML:o=>o}):void 0,re="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,ae="?"+b,Ye=`<${ae}>`,E=document,O=()=>E.createComment(""),D=o=>o===null||typeof o!="object"&&typeof o!="function",ne=Array.isArray,Ae=o=>ne(o)||typeof o?.[Symbol.iterator]=="function",oe=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,be=/-->/g,xe=/>/g,S=RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ye=/'/g,$e=/"/g,Se=/^(?:script|style|textarea|title)$/i,le=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),a=le(1),nt=le(2),lt=le(3),x=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),we=new WeakMap,k=E.createTreeWalker(E,129);function ke(o,e){if(!ne(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return ve!==void 0?ve.createHTML(e):e}var Ee=(o,e)=>{let t=o.length-1,s=[],i,r=e===2?"<svg>":e===3?"<math>":"",n=R;for(let c=0;c<t;c++){let l=o[c],u,m,p=-1,_=0;for(;_<l.length&&(n.lastIndex=_,m=n.exec(l),m!==null);)_=n.lastIndex,n===R?m[1]==="!--"?n=be:m[1]!==void 0?n=xe:m[2]!==void 0?(Se.test(m[2])&&(i=RegExp("</"+m[2],"g")),n=S):m[3]!==void 0&&(n=S):n===S?m[0]===">"?(n=i??R,p=-1):m[1]===void 0?p=-2:(p=n.lastIndex-m[2].length,u=m[1],n=m[3]===void 0?S:m[3]==='"'?$e:ye):n===$e||n===ye?n=S:n===be||n===xe?n=R:(n=S,i=void 0);let g=n===S&&o[c+1].startsWith("/>")?" ":"";r+=n===R?l+Ye:p>=0?(s.push(u),l.slice(0,p)+re+l.slice(p)+b+g):l+b+(p===-2?c:g)}return[ke(o,r+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},I=class o{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,n=0,c=e.length-1,l=this.parts,[u,m]=Ee(e,t);if(this.el=o.createElement(u,s),k.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=k.nextNode())!==null&&l.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let p of i.getAttributeNames())if(p.endsWith(re)){let _=m[n++],g=i.getAttribute(p).split(b),h=/([.?@])?(.*)/.exec(_);l.push({type:1,index:r,name:h[2],strings:g,ctor:h[1]==="."?Y:h[1]==="?"?J:h[1]==="@"?G:T}),i.removeAttribute(p)}else p.startsWith(b)&&(l.push({type:6,index:r}),i.removeAttribute(p));if(Se.test(i.tagName)){let p=i.textContent.split(b),_=p.length-1;if(_>0){i.textContent=K?K.emptyScript:"";for(let g=0;g<_;g++)i.append(p[g],O()),k.nextNode(),l.push({type:2,index:++r});i.append(p[_],O())}}}else if(i.nodeType===8)if(i.data===ae)l.push({type:2,index:r});else{let p=-1;for(;(p=i.data.indexOf(b,p+1))!==-1;)l.push({type:7,index:r}),p+=b.length-1}r++}}static createElement(e,t){let s=E.createElement("template");return s.innerHTML=e,s}};function C(o,e,t=o,s){if(e===x)return e;let i=s!==void 0?t._$Co?.[s]:t._$Cl,r=D(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(o),i._$AT(o,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=C(o,i._$AS(o,e.values),i,s)),e}var Q=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??E).importNode(t,!0);k.currentNode=i;let r=k.nextNode(),n=0,c=0,l=s[0];for(;l!==void 0;){if(n===l.index){let u;l.type===2?u=new P(r,r.nextSibling,this,e):l.type===1?u=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(u=new Z(r,this,e)),this._$AV.push(u),l=s[++c]}n!==l?.index&&(r=k.nextNode(),n++)}return k.currentNode=E,i}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},P=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=C(this,e,t),D(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==x&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ae(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=I.createElement(ke(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{let r=new Q(i,this),n=r.u(this.options);r.p(t),this.T(n),this._$AH=r}}_$AC(e){let t=we.get(e.strings);return t===void 0&&we.set(e.strings,t=new I(e)),t}k(e){ne(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,i=0;for(let r of e)i===t.length?t.push(s=new o(this.O(O()),this.O(O()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=fe(e).nextSibling;fe(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(e,t=this,s,i){let r=this.strings,n=!1;if(r===void 0)e=C(this,e,t,0),n=!D(e)||e!==this._$AH&&e!==x,n&&(this._$AH=e);else{let c=e,l,u;for(e=r[0],l=0;l<r.length-1;l++)u=C(this,c[s+l],t,l),u===x&&(u=this._$AH[l]),n||(n=!D(u)||u!==this._$AH[l]),u===d?e=d:e!==d&&(e+=(u??"")+r[l+1]),this._$AH[l]=u}n&&!i&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Y=class extends T{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},J=class extends T{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},G=class extends T{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=C(this,e,t,0)??d)===x)return;let s=this._$AH,i=e===d&&s!==d||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Z=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}},Ce={M:re,P:b,A:ae,C:1,L:Ee,R:Q,D:Ae,V:C,I:P,H:T,N:J,U:G,B:Y,F:Z},Je=j.litHtmlPolyfillSupport;Je?.(I,P),(j.litHtmlVersions??(j.litHtmlVersions=[])).push("3.3.2");var Te=(o,e,t)=>{let s=t?.renderBefore??e,i=s._$litPart$;if(i===void 0){let r=t?.renderBefore??null;s._$litPart$=i=new P(e.insertBefore(O(),r),r,void 0,t??{})}return i._$AI(o),i};var H=globalThis,y=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Te(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return x}};y._$litElement$=!0,y.finalized=!0,H.litElementHydrateSupport?.({LitElement:y});var Ge=H.litElementPolyfillSupport;Ge?.({LitElement:y});(H.litElementVersions??(H.litElementVersions=[])).push("4.2.2");var ze={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Pe=o=>(...e)=>({_$litDirective$:o,values:e}),X=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var{I:Ze}=Ce,Me=o=>o;var Ne=()=>document.createComment(""),M=(o,e,t)=>{let s=o._$AA.parentNode,i=e===void 0?o._$AB:e._$AA;if(t===void 0){let r=s.insertBefore(Ne(),i),n=s.insertBefore(Ne(),i);t=new Ze(r,n,o,o.options)}else{let r=t._$AB.nextSibling,n=t._$AM,c=n!==o;if(c){let l;t._$AQ?.(o),t._$AM=o,t._$AP!==void 0&&(l=o._$AU)!==n._$AU&&t._$AP(l)}if(r!==i||c){let l=t._$AA;for(;l!==r;){let u=Me(l).nextSibling;Me(s).insertBefore(l,i),l=u}}}return t},w=(o,e,t=o)=>(o._$AI(e,t),o),Xe={},Ue=(o,e=Xe)=>o._$AH=e,Le=o=>o._$AH,ee=o=>{o._$AR(),o._$AA.remove()};var Re=(o,e,t)=>{let s=new Map;for(let i=e;i<=t;i++)s.set(o[i],i);return s},A=Pe(class extends X{constructor(o){if(super(o),o.type!==ze.CHILD)throw Error("repeat() can only be used in text expressions")}dt(o,e,t){let s;t===void 0?t=e:e!==void 0&&(s=e);let i=[],r=[],n=0;for(let c of o)i[n]=s?s(c,n):n,r[n]=t(c,n),n++;return{values:r,keys:i}}render(o,e,t){return this.dt(o,e,t).values}update(o,[e,t,s]){let i=Le(o),{values:r,keys:n}=this.dt(e,t,s);if(!Array.isArray(i))return this.ut=n,r;let c=this.ut??(this.ut=[]),l=[],u,m,p=0,_=i.length-1,g=0,h=r.length-1;for(;p<=_&&g<=h;)if(i[p]===null)p++;else if(i[_]===null)_--;else if(c[p]===n[g])l[g]=w(i[p],r[g]),p++,g++;else if(c[_]===n[h])l[h]=w(i[_],r[h]),_--,h--;else if(c[p]===n[h])l[h]=w(i[p],r[h]),M(o,l[h+1],i[p]),p++,h--;else if(c[_]===n[g])l[g]=w(i[_],r[g]),M(o,i[p],i[_]),_--,g++;else if(u===void 0&&(u=Re(n,g,h),m=Re(c,p,_)),u.has(c[p]))if(u.has(c[_])){let f=m.get(n[g]),z=f!==void 0?i[f]:null;if(z===null){let ce=M(o,i[p]);w(ce,r[g]),l[g]=ce}else l[g]=w(z,r[g]),M(o,i[p],z),i[f]=null;g++}else ee(i[_]),_--;else ee(i[p]),p++;for(;g<=h;){let f=M(o,l[h+1]);w(f,r[g]),l[g++]=f}for(;p<=_;){let f=i[p++];f!==null&&ee(f)}return this.ut=n,Ue(o,l),x}});function et(o){return o?new Date(o+"T12:00:00").toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}):""}var je={want_to_watch:"Up Next",watching:"Watching",watched:"Watched",paused:"Watching",suggested:"Suggested",dismissed:"Not for us"},de=["new","soon","upnext","suggested"],tt=["Too stressful","Too slow","Feels dated","Not our genre","Already seen it","Just not interested"],Oe={want_to_watch:"#6d6d6d",watching:"#1976d2",watched:"#2e7d32",paused:"#1976d2",suggested:"#7b1fa2",dismissed:"#6d6d6d"},W=class extends y{constructor(){super(),this._items=[],this._detail=null,this._dismissing=null,this._toast=null,this._loaded=!1,this._unsubEvents=null,this._seasonCache={},this._modal=null,this._libraryFilter="all",this._previewLoading=!1,this._previewSeq=0,this._onKeydown=e=>{e.key==="Escape"&&this._closeTopLayer()},this._searchQuery="",this._searchType="",this._searchResults=null,this._searching=!1,this._adding=new Set,this._searchSeq=0}static getConfigElement(){return document.createElement("polr-tmdb-card-editor")}static getStubConfig(){return{title:"Watch Tonight"}}setConfig(e){let t=(e.sections||de).filter(i=>de.includes(i));if(!t.length)throw new Error("sections must include at least one of: "+de.join(", "));let s=(e.tvs||[]).map(i=>typeof i=="string"?{entity:i}:i);for(let i of s)if(!i.entity||!i.entity.startsWith("media_player."))throw new Error("Each entry in tvs needs a media_player entity");this._config={title:"Watch Tonight",search:!0,...e,sections:t,tvs:s}}set hass(e){this._hass=e,this._loaded||(this._loaded=!0,this._loadItems(),this._subscribeEvents())}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKeydown),this._loaded&&!this._unsubEvents&&(this._loadItems(),this._subscribeEvents())}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKeydown),clearTimeout(this._searchTimer),this._unsubEvents&&this._unsubEvents.then(e=>e&&e()),this._unsubEvents=null}async _loadItems(){try{this._items=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/items"})||[]}catch(e){console.error("polr-tmdb-card: load failed",e)}}async _subscribeEvents(){this._unsubEvents=this._hass.connection.subscribeEvents(e=>{this._loadItems();let t=e.data.item;!this._detail||!t||(t.item_id===this._detail.item_id?this._detail=e.data.action==="remove"?null:t:!this._detail.item_id&&this._sameTitle(t,this._detail)&&(this._detail=t))},"polr_tmdb_updated")}async _updateItem(e,t){let s=Object.fromEntries(Object.entries(t).filter(([,i])=>i!=null));try{await this._hass.connection.sendMessagePromise({type:"polr_tmdb/update",item_id:e,...s})}catch(i){console.error("polr-tmdb-card: update failed",i)}}async _callService(e,t,s){try{await this._hass.callService("polr_tmdb",e,t),s&&this._showToast(s)}catch(i){console.error(`polr-tmdb-card: ${e} failed`,i),this._showToast(i?.message||"Something went wrong")}}_showToast(e){this._toast=e,clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>this._toast=null,3500)}_tvName(e){return e.name||this._hass?.states?.[e.entity]?.attributes?.friendly_name||e.entity}_openOnTv(e,t){this._showToast(`Opening ${e.title} on ${this._tvName(t)}\u2026`),this._callService("open_on_tv",{item_id:e.item_id,entity_id:t.entity})}_addSuggestion(e){this._callService("update_status",{item_id:e.item_id,status:"want_to_watch"},`Added ${e.title} to Up Next`),this._detail?.item_id===e.item_id&&(this._detail={...e,status:"want_to_watch"})}_dismiss(e,t){this._dismissing=null,this._callService("dismiss",{item_id:e.item_id,reason:t||""},`Passed on ${e.title}`),this._detail?.item_id===e.item_id&&(this._detail=null)}async _removeItem(e){if(confirm("Remove from watchlist?"))try{await this._hass.connection.sendMessagePromise({type:"polr_tmdb/remove",item_id:e})}catch(t){console.error("polr-tmdb-card: remove failed",t)}}async _fetchSeasonEpisodes(e,t){let s=`${e}:${t}`;if(!this._seasonCache[s])try{let i=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/season",tmdb_id:e,season_number:t});this._seasonCache[s]=i||[],this.requestUpdate()}catch(i){console.error("season fetch",i)}}_getSeasonEpisodes(e,t){if(!t)return[];let s=`${e}:${t}`;return this._seasonCache[s]?this._seasonCache[s]:(this._fetchSeasonEpisodes(e,t),null)}_openModal(e){this._modal=e,e==="search"&&this.updateComplete.then(()=>this.renderRoot.querySelector(".search-input")?.focus())}_closeModal(){this._modal=null,this._dismissing=null}_closeDetail(){this._detail=null,this._editingProgress=null,this._dismissing=null,this._previewSeq++,this._previewLoading=!1}_closeTopLayer(){this._detail?this._closeDetail():this._modal&&this._closeModal()}_sameTitle(e,t){return e.tmdb_id===t.tmdb_id&&e.media_type===t.media_type}_onSearchInput(e){this._searchQuery=e,clearTimeout(this._searchTimer),this._searchTimer=setTimeout(()=>this._runSearch(),400)}_setSearchType(e){this._searchType=e,this._runSearch()}async _runSearch(){clearTimeout(this._searchTimer);let e=this._searchQuery.trim(),t=++this._searchSeq;if(!e){this._searchResults=null,this._searching=!1;return}this._searching=!0;let s={query:e,limit:20};this._searchType&&(s.media_type=this._searchType);try{let i=await this._hass.connection.sendMessagePromise({type:"call_service",domain:"polr_tmdb",service:"search",service_data:s,return_response:!0});t===this._searchSeq&&(this._searchResults=i?.response?.results||[])}catch(i){console.error("polr-tmdb-card: search failed",i),t===this._searchSeq&&(this._searchResults=[],this._showToast(i?.message||"Search failed"))}finally{t===this._searchSeq&&(this._searching=!1)}}_itemForResult(e){return this._items.find(t=>this._sameTitle(t,e))}_openResult(e){let t=this._itemForResult(e);if(t){this._detail=t;return}this._openPreview(e)}async _openPreview(e){let t=++this._previewSeq;this._detail={item_id:null,status:null,tmdb_id:e.tmdb_id,media_type:e.media_type,title:e.title,poster_path:e.poster_url,backdrop_path:e.backdrop_url,overview:e.overview,vote_average:e.rating,release_date:e.year||""},this._previewLoading=!0;try{let s=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/preview",tmdb_id:e.tmdb_id,media_type:e.media_type});t===this._previewSeq&&!this._detail?.item_id&&(this._detail=s)}catch(s){console.error("polr-tmdb-card: preview failed",s)}finally{t===this._previewSeq&&(this._previewLoading=!1)}}async _addTitle(e,t="want_to_watch"){let s=`${e.media_type}:${e.tmdb_id}`;this._adding=new Set([...this._adding,s]);try{let i=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/add",tmdb_id:e.tmdb_id,media_type:e.media_type,status:t});await this._loadItems(),this._showToast(`Added ${e.title} to ${t==="watching"?"Watching":"Up Next"}`),this._detail&&!this._detail.item_id&&this._sameTitle(this._detail,e)&&(this._detail=i)}catch(i){console.error("polr-tmdb-card: add failed",i),this._showToast(i?.message||"Couldn't add that title")}finally{let i=new Set(this._adding);i.delete(s),this._adding=i}}_isAdding(e){return this._adding.has(`${e.media_type}:${e.tmdb_id}`)}_libraryItems(e){return[...e==="all"?this._items.filter(s=>s.status!=="dismissed"):e==="watching"?this._items.filter(s=>this._isWatching(s)):this._items.filter(s=>s.status===e)].sort((s,i)=>s.title.localeCompare(i.title))}_today(){let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}_isWatching(e){return e.status==="watching"||e.status==="paused"}_hasNewEpisode(e){if(e.status==="watched")return!1;if(e.has_new_episode)return!0;let t=e.next_episode_to_air;if(!t?.air_date||t.air_date>this._today())return!1;let s=e.current_season||0,i=e.current_episode||0;return s===0&&i===0?!0:t.season_number>s||t.season_number===s&&t.episode_number>i}_daysUntil(e){if(!e)return null;let t=new Date(e+"T12:00:00")-new Date;return Math.ceil(t/864e5)}_isComingSoon(e){if(e.media_type!=="tv"||!this._isWatching(e)||this._hasNewEpisode(e))return!1;let t=e.next_episode_to_air;if(!t?.air_date)return!1;let s=this._daysUntil(t.air_date);return s!==null&&s>0&&s<=14}get _newItems(){return this._items.filter(e=>["watching","paused"].includes(e.status)&&this._hasNewEpisode(e)).sort((e,t)=>e.title.localeCompare(t.title))}get _soonItems(){return this._items.filter(e=>this._isComingSoon(e)).sort((e,t)=>{let s=e.next_episode_to_air?.air_date||"9999",i=t.next_episode_to_air?.air_date||"9999";return s.localeCompare(i)})}get _upNextItems(){return this._items.filter(e=>e.status==="want_to_watch").sort((e,t)=>e.title.localeCompare(t.title))}get _suggestedItems(){return this._items.filter(e=>e.status==="suggested").sort((e,t)=>(t.suggestion?.suggested_at||"").localeCompare(e.suggestion?.suggested_at||""))}render(){if(!this._config)return d;let e=l=>this._config.sections.includes(l),t=e("new")?this._newItems:[],s=e("upnext")?this._upNextItems:[],i=e("soon")?this._soonItems:[],r=e("suggested")?this._suggestedItems:[],n=e("suggested")&&(this._config.default_section==="suggested"||!(e("new")||e("upnext")||e("soon"))),c=!t.length&&!s.length&&!i.length&&!(n&&r.length);return a`
      <ha-card>
        <div class="card-header">
          <span class="card-title">${this._config.title}</span>
          <div class="header-actions">
            ${e("suggested")&&!n?a`
              <button class="icon-btn icon-btn-badged" title="Suggestions" aria-label="Suggestions" @click=${()=>this._openModal("suggested")}>
                <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
                ${r.length?a`<span class="icon-badge">${r.length}</span>`:d}
              </button>`:d}
            ${this._config.search?a`
              <button class="icon-btn" title="Search" aria-label="Search" @click=${()=>this._openModal("search")}>
                <ha-icon icon="mdi:magnify"></ha-icon>
              </button>`:d}
            <button class="icon-btn" title="Library" aria-label="Library" @click=${()=>this._openModal("library")}>
              <ha-icon icon="mdi:bookshelf"></ha-icon>
            </button>
          </div>
        </div>

        ${n&&r.length?a`
          <div class="suggestion-list">${A(r,l=>l.item_id,l=>this._renderSuggestion(l))}</div>`:d}

        ${t.length?a`
          ${s.length||i.length?a`<div class="group-label">New episodes</div>`:d}
          <div class="wide-row">${A(t,l=>l.item_id,l=>this._renderWideTile(l))}</div>`:d}

        ${s.length?a`
          ${t.length||i.length?a`<div class="group-label">Up Next</div>`:d}
          <div class="poster-row">${A(s,l=>l.item_id,l=>this._renderPoster(l))}</div>`:d}

        ${i.length?a`
          <div class="group-label">Coming up</div>
          <div class="soon-list">
            ${A(i,l=>l.item_id,l=>a`
              <button class="soon-row" @click=${()=>this._detail=l}>
                <span class="soon-title">${l.title}</span>
                <span class="soon-when">${this._epLabelShort(l.next_episode_to_air)} · ${this._whenLabel(l.next_episode_to_air?.air_date)}</span>
              </button>`)}
          </div>`:d}

        ${c?this._renderEmpty():d}

        ${this._toast?a`<div class="toast">${this._toast}</div>`:d}
      </ha-card>

      ${this._modal==="search"?this._renderSearchModal():d}
      ${this._modal==="library"?this._renderLibraryModal():d}
      ${this._modal==="suggested"?this._renderSuggestionsModal():d}
      ${this._detail?this._renderDetailDialog():d}
    `}_epLabelShort(e){return e?`S${e.season_number}E${e.episode_number}`:""}_whenLabel(e){let t=this._daysUntil(e);if(t===null)return"";if(t<=1)return"Tomorrow";let s=new Date(e+"T12:00:00");return t<7?s.toLocaleDateString(void 0,{weekday:"long"}):s.toLocaleDateString(void 0,{month:"short",day:"numeric"})}_renderSuggestionsModal(){let e=this._suggestedItems,t=e.length===0?a`<div class="modal-note">No suggestions right now. New ones arrive with the next weekly pass.</div>`:a`<div class="suggestion-list suggestion-list-modal">${A(e,s=>s.item_id,s=>this._renderSuggestion(s))}</div>`;return this._renderModal("Suggestions",t)}_renderSegmented(e,t,s){return a`
      <div class="segmented" role="tablist">
        ${e.map(i=>a`
          <button class="segment ${i.id===t?"segment-selected":""}" role="tab"
            aria-selected=${i.id===t?"true":"false"}
            style=${i.id===t&&i.color?`--segment-color:${i.color}`:""}
            @click=${()=>s(i.id)}>
            <span class="segment-label">${i.label}</span>
            ${i.count?a`<span class="segment-count">${i.count}</span>`:d}
          </button>
        `)}
      </div>
    `}_renderModal(e,t,s=d){return a`
      <div class="modal-overlay" @click=${i=>i.target===i.currentTarget&&this._closeModal()}>
        <div class="modal" role="dialog" aria-label="${e}">
          <div class="modal-header">
            <span class="modal-title">${e}</span>
            <button class="modal-close" title="Close" @click=${()=>this._closeModal()}>✕</button>
          </div>
          ${s}
          <div class="modal-body">${t}</div>
          ${this._toast&&!this._detail?a`<div class="toast">${this._toast}</div>`:d}
        </div>
      </div>
    `}_renderSearchModal(){let e=[["","All"],["tv","TV"],["movie","Movies"]],t=this._searchResults,s=a`
      <div class="modal-toolbar">
        <input class="search-input" type="search" placeholder="Search movies & shows…" enterkeyhint="search"
          .value=${this._searchQuery}
          @input=${r=>this._onSearchInput(r.target.value)}
          @keydown=${r=>r.key==="Enter"&&this._runSearch()} />
        ${this._renderSegmented(e.map(([r,n])=>({id:r,label:n})),this._searchType,r=>this._setSearchType(r))}
      </div>
    `,i=this._searching&&!t?.length?a`<div class="modal-note">Searching…</div>`:t===null?a`<div class="modal-note">Find a movie or show. Tap it for details, or + to add it to Up Next.</div>`:t.length===0?a`<div class="modal-note">No matches for “${this._searchQuery.trim()}”.</div>`:a`<div class="modal-grid">${A(t,r=>`${r.media_type}:${r.tmdb_id}`,r=>this._renderSearchTile(r))}</div>`;return this._renderModal("Search",i,s)}_renderSearchTile(e){let t=this._itemForResult(e),s=this._isAdding(e),i=[e.year,e.media_type==="tv"?"TV":"Movie"].filter(Boolean).join(" \xB7 ");return a`
      <div class="poster" @click=${()=>this._openResult(e)}>
        ${e.poster_url?a`<img class="poster-img" src="${e.poster_url}" alt="${e.title}" loading="lazy" />`:a`<div class="poster-fallback">${e.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}
        ${t?a`<span class="status-badge" style="background:${Oe[t.status]||"#6d6d6d"}">${je[t.status]||t.status}</span>`:a`<button class="quick-add" title="Add to Up Next" ?disabled=${s}
              @click=${r=>{r.stopPropagation(),this._addTitle(e)}}>
              <ha-icon icon="${s?"mdi:loading":"mdi:plus"}"></ha-icon>
            </button>`}
        <div class="poster-title">${e.title}</div>
        <div class="poster-sub">${i}</div>
      </div>
    `}_renderLibraryModal(){let e=[["all","All"],["watching","Watching"],["want_to_watch","Up Next"],["suggested","Suggested"],["watched","Watched"],["dismissed","Not for us"]],t=this._libraryItems(this._libraryFilter),s=a`
      <div class="modal-toolbar">
        <div class="chip-row">
          ${e.map(([r,n])=>{let c=this._libraryItems(r).length;return a`
              <button class="chip ${this._libraryFilter===r?"chip-selected":""}"
                @click=${()=>this._libraryFilter=r}>
                ${this._libraryFilter===r?a`<ha-icon icon="mdi:check"></ha-icon>`:d}
                ${n}${c>0?a`<span class="chip-count">${c}</span>`:d}
              </button>`})}
        </div>
      </div>
    `,i=t.length===0?a`<div class="modal-note">
          ${this._libraryFilter==="all"?"Your list is empty.":"Nothing here."}
          ${this._config.search?a`<button class="action" @click=${()=>this._openModal("search")}>
            <ha-icon icon="mdi:magnify"></ha-icon> Find something</button>`:d}
        </div>`:a`<div class="modal-grid">${A(t,r=>r.item_id,r=>this._renderPoster(r,!0))}</div>`;return this._renderModal("Library",i,s)}_renderEmpty(){return a`
      <div class="empty-state">
        <ha-icon class="empty-icon" icon="mdi:check-circle-outline"></ha-icon>
        <div class="empty-heading">All caught up!</div>
        <div class="empty-sub">Nothing new to watch and nothing in your queue.</div>
        ${this._config.search?a`
          <button class="action" @click=${()=>this._openModal("search")}>
            <ha-icon icon="mdi:magnify"></ha-icon> Find something
          </button>`:d}
      </div>
    `}_renderTitleArt(e,t=""){return e.logo_path?a`<img class="title-logo ${t}" src="${e.logo_path}" alt="${e.title}" loading="lazy" />`:a`<div class="title-text ${t}">${e.title}</div>`}_epLabel(e){return e?`S${e.season_number} \xB7 E${e.episode_number}${e.name?` \xB7 ${e.name}`:""}`:""}_renderWideTile(e){let t=this._isComingSoon(e),s=t?e.next_episode_to_air:e.last_episode_to_air,i=t&&s?.air_date?this._daysUntil(s.air_date):null,r=!t&&s?.still_path||e.backdrop_path||e.poster_path;return a`
      <div class="wide-tile" @click=${()=>this._detail=e}>
        ${r?a`<img class="wide-img" src="${r}" alt="" loading="lazy" />`:a`<div class="wide-img wide-fallback">${e.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}
        <div class="wide-fade"></div>
        ${this._hasNewEpisode(e)?a`<span class="new-badge">NEW</span>`:d}
        ${i!==null?a`<span class="soon-badge">${i===1?"Tomorrow":`In ${i} days`}</span>`:d}
        <div class="wide-caption">
          ${this._renderTitleArt(e,"wide-logo")}
          ${s?a`<div class="wide-sub">${this._epLabel(s)}</div>`:d}
        </div>
      </div>
    `}_renderPoster(e,t=!1){let s=e.next_episode_to_air,i=this._isComingSoon(e)&&s?.air_date?this._daysUntil(s.air_date):null;return a`
      <div class="poster" @click=${()=>this._detail=e}>
        ${e.poster_path?a`<img class="poster-img" src="${e.poster_path}" alt="${e.title}" loading="lazy" />`:a`<div class="poster-fallback">${e.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}

        ${this._hasNewEpisode(e)?a`<span class="new-badge">NEW</span>`:d}
        ${t&&this._libraryFilter==="all"?a`
          <span class="status-badge" style="background:${Oe[e.status]||"#6d6d6d"}">${je[e.status]||e.status}</span>
        `:d}

        ${i!==null?a`
          <span class="soon-badge">${i===1?"Tomorrow":`${i}d`}</span>
        `:d}

        <div class="poster-title">${e.title}</div>
      </div>
    `}_streamingNames(e){return(e.watch_providers?.flatrate||[]).map(t=>t.provider_name)}_renderSuggestion(e){let t=[e.release_date?.slice(0,4),e.media_type==="tv"&&e.seasons?`${e.seasons} season${e.seasons===1?"":"s"}`:null,e.watch_link?.service||this._streamingNames(e)[0]].filter(Boolean).join(" \xB7 ");return a`
      <div class="suggestion">
        <div class="suggestion-banner" @click=${()=>this._detail=e}>
          ${e.backdrop_path||e.poster_path?a`<img class="wide-img ${e.backdrop_path?"":"img-blur"}" src="${e.backdrop_path||e.poster_path}" alt="" loading="lazy" />`:a`<div class="wide-img wide-fallback">${e.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}
          <div class="wide-fade"></div>
          <div class="wide-caption">
            ${this._renderTitleArt(e,"wide-logo")}
            <div class="wide-sub">${t}</div>
          </div>
        </div>
        <div class="suggestion-body">
          ${e.suggestion?.reason?a`<div class="suggestion-reason">${e.suggestion.reason}</div>`:d}
          ${this._dismissing===e.item_id?this._renderDismissChooser(e):a`
              <div class="suggestion-actions">
                <button class="action action-primary" @click=${()=>this._addSuggestion(e)}>
                  <ha-icon icon="mdi:playlist-plus"></ha-icon> Add
                </button>
                <button class="action" @click=${()=>this._dismissing=e.item_id}>
                  <ha-icon icon="mdi:thumb-down-outline"></ha-icon> Not for us
                </button>
                ${e.trailer_url?a`
                  <a class="action" href="${e.trailer_url}" target="_blank" rel="noopener">
                    <ha-icon icon="mdi:play-circle-outline"></ha-icon> Trailer
                  </a>`:d}
              </div>
              ${this._renderTvButtons(e)}`}
        </div>
      </div>
    `}_renderTvButtons(e){return!e.watch_link?.url||!this._config.tvs.length?d:a`
      <div class="tv-row">
        <span class="tv-label">Open on</span>
        ${this._config.tvs.map(t=>a`
          <button class="action action-tint" @click=${()=>this._openOnTv(e,t)}>
            <ha-icon icon="mdi:television-play"></ha-icon> ${this._tvName(t)}
          </button>
        `)}
      </div>
    `}_renderDismissChooser(e){return a`
      <div class="dismiss-chooser">
        <div class="dismiss-prompt">What's the reason?</div>
        <div class="dismiss-reasons">
          ${tt.map(t=>a`<button class="chip" @click=${()=>this._dismiss(e,t)}>${t}</button>`)}
        </div>
        <div class="dismiss-custom">
          <input class="dismiss-input" type="text" maxlength="200" placeholder="Or say why…"
            @keydown=${t=>{t.key==="Enter"&&t.target.value.trim()&&this._dismiss(e,t.target.value.trim())}} />
          <button class="action" @click=${()=>this._dismissing=null}>Cancel</button>
        </div>
      </div>
    `}_isCaughtUp(e){let t=e.last_episode_to_air;if(!t)return!1;let s=e.current_season||0,i=e.current_episode||0;return s>0&&(s>t.season_number||s===t.season_number&&i>=t.episode_number)}_progressFields(e,t,s){let i=e.last_episode_to_air,r=e.show_ended&&i&&(t>i.season_number||t===i.season_number&&s>=i.episode_number);return{current_season:t,current_episode:s,status:r?"watched":"watching"}}async _setProgress(e,t,s){let i=this._progressFields(e,t,s);await this._updateItem(e.item_id,i),this._detail={...e,...i}}_nextToWatch(e){if(!e.last_episode_to_air||this._isCaughtUp(e))return null;let s=e.current_season||0,i=e.current_episode||0;if(!s)return{season:1,episode:1};let r=this._getSeasonEpisodes(e.tmdb_id,s);if(r===null)return;let n=this._today(),c=r.find(l=>l.episode_number===i+1&&(!l.air_date||l.air_date<=n));return c?{season:s,episode:i+1,name:c.name}:{season:s+1,episode:1}}_renderProgress(e){let t=e.current_season||0,s=e.current_episode||0,i=t?this._getSeasonEpisodes(e.tmdb_id,t):[],r=Array.isArray(i)?i.find(h=>h.episode_number===s):null,n=this._isCaughtUp(e),c=this._nextToWatch(e),l=this._editingProgress===e.item_id,u;e.status==="watched"?u="Finished":t?u=`You're at S${t} \xB7 E${s}${r?.name?` \xB7 ${r.name}`:""}`:u="Not started";let m=e.status==="watched"?null:this._hasNewEpisode(e)&&t?"New episode":n?"Caught up":null,p=this._today(),_=Array.isArray(i)?i.filter(h=>!h.air_date||h.air_date<=p):[],g=e.seasons||0;return a`
      <div class="section-label">Where you are</div>
      <div class="progress-line">
        <span>${u}</span>
        ${m?a`<span class="progress-pill ${m==="Caught up"?"pill-ok":"pill-new"}">${m}</span>`:d}
      </div>

      <div class="preview-actions">
        ${e.status==="watched"?a`
          <button class="action action-primary" @click=${async()=>{let h={status:"want_to_watch",current_season:null,current_episode:null};await this._updateItem(e.item_id,h),this._detail={...e,...h}}}><ha-icon icon="mdi:replay"></ha-icon> Watch again</button>
        `:a`
          ${c!==null?a`
            <button class="action action-primary" ?disabled=${c===void 0}
              @click=${()=>this._setProgress(e,c.season,c.episode)}>
              <ha-icon icon="mdi:check"></ha-icon> Watched S${c?.season??t}E${c?.episode??s+1}
            </button>`:d}
          ${!n&&e.last_episode_to_air?a`
            <button class="action" @click=${()=>this._setProgress(e,e.last_episode_to_air.season_number,e.last_episode_to_air.episode_number)}>
              <ha-icon icon="mdi:check-all"></ha-icon> All caught up
            </button>`:d}
        `}
        <button class="link-btn" @click=${()=>this._editingProgress=l?null:e.item_id}>
          ${l?"Done":"Change\u2026"}
        </button>
      </div>

      ${l?a`
        <div class="progress-row">
          <label class="select-label">
            <span>Season</span>
            <select class="ep-select" @change=${h=>{let f=parseInt(h.target.value)||null,z={current_season:f,current_episode:null,status:f?"watching":"want_to_watch"};this._updateItem(e.item_id,z),this._detail={...e,...z}}}>
              <option value="">—</option>
              ${Array.from({length:g},(h,f)=>f+1).map(h=>a`
                <option value="${h}" ?selected=${t===h}>Season ${h}</option>
              `)}
            </select>
          </label>
          <label class="select-label">
            <span>Episode</span>
            <select class="ep-select" ?disabled=${!t||i===null}
              @change=${h=>{let f=h.target.value?parseInt(h.target.value,10):null;f&&this._setProgress(e,t,f)}}>
              <option value="">—</option>
              ${i===null?a`<option disabled>Loading…</option>`:_.map(h=>a`
                    <option value="${h.episode_number}" ?selected=${s===h.episode_number}>
                      E${h.episode_number}${h.name?` \xB7 ${h.name}`:""}
                    </option>
                  `)}
            </select>
          </label>
        </div>
      `:d}
    `}_renderMovieStatus(e){let t=e.status==="watched",s=t?"want_to_watch":"watched";return a`
      <div class="preview-actions">
        <button class="action action-primary" @click=${async()=>{await this._updateItem(e.item_id,{status:s}),this._detail={...e,status:s}}}>
          <ha-icon icon="${t?"mdi:replay":"mdi:check"}"></ha-icon> ${t?"Watch again":"Mark watched"}
        </button>
      </div>
    `}_renderItemControls(e){let t=!["suggested","dismissed"].includes(e.status);return a`
      ${this._renderTvButtons(e)}
      ${t?e.media_type==="tv"?this._renderProgress(e):this._renderMovieStatus(e):d}

      ${e.status==="watched"?a`
        <div class="section-label">Your Rating</div>
        <div class="stars">
          ${[1,2,3,4,5,6,7,8,9,10].map(s=>a`
            <span class="star ${(e.rating||0)>=s?"star-on":""}"
              @click=${async()=>{await this._updateItem(e.item_id,{rating:s}),this._detail={...e,rating:s}}}>★</span>
          `)}
          ${e.rating?a`<span class="rating-num">${e.rating}/10</span>`:d}
        </div>
      `:d}
    `}_renderPreviewActions(e){let t=this._isAdding(e);return a`
      <div class="preview-actions">
        <button class="action action-primary" ?disabled=${t} @click=${()=>this._addTitle(e,"want_to_watch")}>
          <ha-icon icon="${t?"mdi:loading":"mdi:playlist-plus"}"></ha-icon> Add to Up Next
        </button>
      </div>
      ${this._previewLoading?a`<div class="preview-loading">Loading details…</div>`:d}
    `}_metaLine(e){let t=Math.floor((e.runtime||0)/60),s=(e.runtime||0)%60,i=e.media_type==="tv"?e.seasons?`${e.seasons} season${e.seasons===1?"":"s"}`:null:e.runtime?t?`${t}h ${s}m`:`${s}m`:null;return[e.release_date?.slice(0,4),i,e.genres?.slice(0,2).join(", "),e.vote_average?`\u2605 ${Number(e.vote_average).toFixed(1)}`:null,e.networks?.[0]].filter(Boolean).join(" \xB7 ")}_renderEpisodeCards(e){let t=[["Next episode",e.next_episode_to_air]].filter(([,s])=>s?.episode_number);return t.length?a`
      <div class="episode-cards">
        ${t.map(([s,i])=>a`
          <div class="episode-card">
            ${i.still_path?a`<img class="episode-still" src="${i.still_path}" alt="" loading="lazy" />`:a`<div class="episode-still episode-still-empty"><ha-icon icon="mdi:television-classic"></ha-icon></div>`}
            <div class="episode-info">
              <div class="episode-label">${s}${i.air_date?a` · ${et(i.air_date)}`:d}</div>
              <div class="episode-name">${this._epLabel(i)}</div>
            </div>
          </div>
        `)}
      </div>
    `:d}_renderCast(e){return a`
      <div class="section-label">Cast</div>
      <div class="cast-row">
        ${e.cast.map(t=>a`
          <div class="cast-member">
            ${t.profile_path?a`<img class="cast-photo" src="${t.profile_path}" alt="${t.name}" loading="lazy" />`:a`<div class="cast-photo cast-photo-empty"><ha-icon icon="mdi:account"></ha-icon></div>`}
            <div class="cast-name">${t.name}</div>
            ${t.character?a`<div class="cast-character">${t.character}</div>`:d}
          </div>
        `)}
      </div>
    `}_renderDetailDialog(){let e=this._detail;return a`
      <div class="dialog-overlay" @click=${t=>t.target===t.currentTarget&&this._closeDetail()}>
        <div class="dialog">
          <div class="dialog-topbar">
            ${e.item_id?a`
              <button class="dialog-btn" title="Remove from watchlist" @click=${()=>this._removeItem(e.item_id)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
            `:d}
            <button class="dialog-btn" title="Close" @click=${()=>this._closeDetail()}>✕</button>
          </div>

          <div class="hero">
            ${e.backdrop_path||e.poster_path?a`<img class="hero-img ${e.backdrop_path?"":"img-blur"}" src="${e.backdrop_path||e.poster_path}" alt="" />`:d}
            <div class="hero-fade"></div>
            <div class="hero-caption">
              ${this._renderTitleArt(e,"hero-logo")}
              <div class="hero-meta">${this._metaLine(e)}</div>
              ${e.trailer_url?a`
                <a class="action action-light" href="${e.trailer_url}" target="_blank" rel="noopener">
                  <ha-icon icon="mdi:play"></ha-icon> Trailer
                </a>`:d}
            </div>
          </div>

          <div class="dialog-content">
            ${e.poster_path&&e.backdrop_path?a`
              <div class="dialog-left"><img class="dialog-poster" src="${e.poster_path}" alt="${e.title}" /></div>
            `:d}
            <div class="dialog-right">
              ${e.tagline?a`<p class="tagline">${e.tagline}</p>`:d}
              <p class="dialog-overview">${e.overview}</p>
              ${e.media_type==="tv"?this._renderEpisodeCards(e):d}

              ${e.status==="suggested"?a`
                <div class="suggestion-box">
                  ${e.suggestion?.reason?a`<div><strong>Why it's here:</strong> ${e.suggestion.reason}</div>`:d}
                  ${this._dismissing===e.item_id?this._renderDismissChooser(e):a`<div class="suggestion-actions">
                        <button class="action action-primary" @click=${()=>this._addSuggestion(e)}>
                          <ha-icon icon="mdi:playlist-plus"></ha-icon> Add to Up Next
                        </button>
                        <button class="action" @click=${()=>this._dismissing=e.item_id}>
                          <ha-icon icon="mdi:thumb-down-outline"></ha-icon> Not for us
                        </button>
                      </div>`}
                </div>
              `:d}

              ${e.item_id?this._renderItemControls(e):this._renderPreviewActions(e)}

              ${e.cast?.length?this._renderCast(e):d}

              ${e.watch_providers&&Object.keys(e.watch_providers).length>0?a`
                <div class="section-label">Where to Watch</div>
                <div class="providers">
                  ${e.watch_providers.flatrate?.length?a`
                    <div class="provider-row">
                      <span class="provider-type">Stream</span>
                      ${e.watch_providers.flatrate.map(t=>a`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${t.logo_path}" title="${t.provider_name}" alt="${t.provider_name}" />
                      `)}
                    </div>
                  `:d}
                  ${e.watch_providers.rent?.length?a`
                    <div class="provider-row">
                      <span class="provider-type">Rent</span>
                      ${e.watch_providers.rent.map(t=>a`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${t.logo_path}" title="${t.provider_name}" alt="${t.provider_name}" />
                      `)}
                    </div>
                  `:d}
                  ${e.watch_providers.buy?.length?a`
                    <div class="provider-row">
                      <span class="provider-type">Buy</span>
                      ${e.watch_providers.buy.map(t=>a`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${t.logo_path}" title="${t.provider_name}" alt="${t.provider_name}" />
                      `)}
                    </div>
                  `:d}
                </div>
              `:d}

            </div>
          </div>
        </div>
      </div>
    `}};N(W,"properties",{_hass:{state:!0},_config:{state:!0},_items:{state:!0},_detail:{state:!0},_editingProgress:{state:!0},_dismissing:{state:!0},_toast:{state:!0},_modal:{state:!0},_libraryFilter:{state:!0},_previewLoading:{state:!0},_searchQuery:{state:!0},_searchType:{state:!0},_searchResults:{state:!0},_searching:{state:!0},_adding:{state:!0}}),N(W,"styles",V`
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
    .group-label { padding: 4px 16px 8px; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--secondary-text-color); }
    .wide-row + .group-label, .poster-row + .group-label { padding-top: 8px; }
    .soon-list { display: flex; flex-direction: column; padding: 0 16px 14px; }
    .soon-row { display: flex; justify-content: space-between; gap: 12px; align-items: baseline; background: none; border: 0; border-top: 1px solid var(--divider-color); padding: 10px 0; cursor: pointer; text-align: left; color: var(--primary-text-color); font-size: 0.95rem; }
    .soon-row:first-child { border-top: 0; }
    .soon-when { color: var(--secondary-text-color); font-size: 0.82rem; white-space: nowrap; }
    .icon-btn-badged { position: relative; }
    .icon-badge { position: absolute; top: 4px; right: 2px; min-width: 16px; height: 16px; padding: 0 4px; box-sizing: border-box; border-radius: 8px; background: var(--primary-color); color: var(--text-primary-color, #fff); font-size: 0.65rem; font-weight: 600; line-height: 16px; text-align: center; }
    .suggestion-list-modal { padding: 0; }

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
    .progress-line { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 0.95rem; }
    .progress-pill { font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 999px; }
    .pill-new { background: color-mix(in srgb, var(--warning-color, #ff9800) 22%, transparent); color: var(--warning-color, #ff9800); }
    .pill-ok { background: color-mix(in srgb, var(--success-color, #43a047) 22%, transparent); color: var(--success-color, #43a047); }
    .link-btn { background: none; border: 0; color: var(--primary-color); cursor: pointer; font-size: 0.85rem; padding: 8px 4px; }
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
  `);var B=class extends y{setConfig(e){this._config=e}_valueChanged(e){let t=e.target.dataset.field,s=e.target.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,[t]:s}}}))}render(){return this._config?a`
      <div class="editor">
        <label>Title
          <input type="text" data-field="title" .value=${this._config.title||""} @change=${this._valueChanged} />
        </label>
      </div>
    `:d}};N(B,"properties",{hass:{type:Object},_config:{state:!0}}),N(B,"styles",V`
    .editor { display: flex; flex-direction: column; gap: 10px; padding: 8px; }
    label { display: flex; flex-direction: column; gap: 4px; font-size: 0.9rem; }
    input { padding: 6px; border-radius: 4px; border: 1px solid var(--divider-color, #ccc); background: transparent; color: inherit; }
  `);customElements.get("polr-tmdb-card")||(customElements.define("polr-tmdb-card",W),customElements.define("polr-tmdb-card-editor",B),window.customCards=window.customCards||[],window.customCards.push({type:"polr-tmdb-card",name:"TMDB Shows & Movies",description:"What to watch tonight, and what to try next.",preview:!1}));
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
