var It=Object.defineProperty;var Dt=(o,t,e)=>t in o?It(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var N=(o,t,e)=>(Dt(o,typeof t!="symbol"?t+"":t,e),e);var F=globalThis,q=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,et=Symbol(),pt=new WeakMap,U=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==et)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(q&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=pt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&pt.set(e,t))}return t}toString(){return this.cssText}},ht=o=>new U(typeof o=="string"?o:o+"",void 0,et),V=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new U(e,o,et)},ut=(o,t)=>{if(q)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=F.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},st=q?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return ht(e)})(o):o;var{is:Ht,defineProperty:Wt,getOwnPropertyDescriptor:Bt,getOwnPropertyNames:Ft,getOwnPropertySymbols:qt,getPrototypeOf:Vt}=Object,$=globalThis,gt=$.trustedTypes,Qt=gt?gt.emptyScript:"",Kt=$.reactiveElementPolyfillSupport,R=(o,t)=>o,it={toAttribute(o,t){switch(t){case Boolean:o=o?Qt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},mt=(o,t)=>!Ht(o,t),_t={attribute:!0,type:String,converter:it,reflect:!1,useDefault:!1,hasChanged:mt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);var v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_t){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Wt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:r}=Bt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let c=s?.call(this);r?.call(this,n),this.requestUpdate(t,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_t}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let t=Vt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let e=this.properties,i=[...Ft(e),...qt(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(st(s))}else t!==void 0&&e.push(st(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ut(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:it).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:it;this._$Em=s;let c=n.fromAttribute(e,r.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(t!==void 0){let n=this.constructor;if(s===!1&&(r=this[t]),i??(i=n.getPropertyOptions(t)),!((i.hasChanged??mt)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:n}=r,c=this[s];n!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,r,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[R("elementProperties")]=new Map,v[R("finalized")]=new Map,Kt?.({ReactiveElement:v}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.2");var O=globalThis,ft=o=>o,Q=O.trustedTypes,vt=Q?Q.createPolicy("lit-html",{createHTML:o=>o}):void 0,rt="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,at="?"+b,Yt=`<${at}>`,S=document,j=()=>S.createComment(""),I=o=>o===null||typeof o!="object"&&typeof o!="function",nt=Array.isArray,At=o=>nt(o)||typeof o?.[Symbol.iterator]=="function",ot=`[ 	
\f\r]`,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,xt=/>/g,A=RegExp(`>|${ot}(?:([^\\s"'>=/]+)(${ot}*=${ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yt=/'/g,$t=/"/g,kt=/^(?:script|style|textarea|title)$/i,lt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),a=lt(1),ne=lt(2),le=lt(3),x=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),wt=new WeakMap,k=S.createTreeWalker(S,129);function St(o,t){if(!nt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return vt!==void 0?vt.createHTML(t):t}var Et=(o,t)=>{let e=o.length-1,i=[],s,r=t===2?"<svg>":t===3?"<math>":"",n=L;for(let c=0;c<e;c++){let d=o[c],u,m,p=-1,_=0;for(;_<d.length&&(n.lastIndex=_,m=n.exec(d),m!==null);)_=n.lastIndex,n===L?m[1]==="!--"?n=bt:m[1]!==void 0?n=xt:m[2]!==void 0?(kt.test(m[2])&&(s=RegExp("</"+m[2],"g")),n=A):m[3]!==void 0&&(n=A):n===A?m[0]===">"?(n=s??L,p=-1):m[1]===void 0?p=-2:(p=n.lastIndex-m[2].length,u=m[1],n=m[3]===void 0?A:m[3]==='"'?$t:yt):n===$t||n===yt?n=A:n===bt||n===xt?n=L:(n=A,s=void 0);let g=n===A&&o[c+1].startsWith("/>")?" ":"";r+=n===L?d+Yt:p>=0?(i.push(u),d.slice(0,p)+rt+d.slice(p)+b+g):d+b+(p===-2?c:g)}return[St(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},D=class o{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0,c=t.length-1,d=this.parts,[u,m]=Et(t,e);if(this.el=o.createElement(u,i),k.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=k.nextNode())!==null&&d.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(rt)){let _=m[n++],g=s.getAttribute(p).split(b),h=/([.?@])?(.*)/.exec(_);d.push({type:1,index:r,name:h[2],strings:g,ctor:h[1]==="."?Y:h[1]==="?"?J:h[1]==="@"?G:C}),s.removeAttribute(p)}else p.startsWith(b)&&(d.push({type:6,index:r}),s.removeAttribute(p));if(kt.test(s.tagName)){let p=s.textContent.split(b),_=p.length-1;if(_>0){s.textContent=Q?Q.emptyScript:"";for(let g=0;g<_;g++)s.append(p[g],j()),k.nextNode(),d.push({type:2,index:++r});s.append(p[_],j())}}}else if(s.nodeType===8)if(s.data===at)d.push({type:2,index:r});else{let p=-1;for(;(p=s.data.indexOf(b,p+1))!==-1;)d.push({type:7,index:r}),p+=b.length-1}r++}}static createElement(t,e){let i=S.createElement("template");return i.innerHTML=t,i}};function E(o,t,e=o,i){if(t===x)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,r=I(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=E(o,s._$AS(o,t.values),s,i)),t}var K=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??S).importNode(e,!0);k.currentNode=s;let r=k.nextNode(),n=0,c=0,d=i[0];for(;d!==void 0;){if(n===d.index){let u;d.type===2?u=new z(r,r.nextSibling,this,t):d.type===1?u=new d.ctor(r,d.name,d.strings,this,t):d.type===6&&(u=new Z(r,this,t)),this._$AV.push(u),d=i[++c]}n!==d?.index&&(r=k.nextNode(),n++)}return k.currentNode=S,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},z=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),I(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==x&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):At(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=D.createElement(St(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new K(s,this),n=r.u(this.options);r.p(e),this.T(n),this._$AH=r}}_$AC(t){let e=wt.get(t.strings);return e===void 0&&wt.set(t.strings,e=new D(t)),e}k(t){nt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let r of t)s===e.length?e.push(i=new o(this.O(j()),this.O(j()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=ft(t).nextSibling;ft(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=l}_$AI(t,e=this,i,s){let r=this.strings,n=!1;if(r===void 0)t=E(this,t,e,0),n=!I(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else{let c=t,d,u;for(t=r[0],d=0;d<r.length-1;d++)u=E(this,c[i+d],e,d),u===x&&(u=this._$AH[d]),n||(n=!I(u)||u!==this._$AH[d]),u===l?t=l:t!==l&&(t+=(u??"")+r[d+1]),this._$AH[d]=u}n&&!s&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Y=class extends C{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}},J=class extends C{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}},G=class extends C{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??l)===x)return;let i=this._$AH,s=t===l&&i!==l||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==l&&(i===l||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Z=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}},Ct={M:rt,P:b,A:at,C:1,L:Et,R:K,D:At,V:E,I:z,H:C,N:J,U:G,B:Y,F:Z},Jt=O.litHtmlPolyfillSupport;Jt?.(D,z),(O.litHtmlVersions??(O.litHtmlVersions=[])).push("3.3.2");var Tt=(o,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let r=e?.renderBefore??null;i._$litPart$=s=new z(t.insertBefore(j(),r),r,void 0,e??{})}return s._$AI(o),s};var H=globalThis,y=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Tt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return x}};y._$litElement$=!0,y.finalized=!0,H.litElementHydrateSupport?.({LitElement:y});var Gt=H.litElementPolyfillSupport;Gt?.({LitElement:y});(H.litElementVersions??(H.litElementVersions=[])).push("4.2.2");var zt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Pt=o=>(...t)=>({_$litDirective$:o,values:t}),X=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Zt}=Ct,Mt=o=>o;var Nt=()=>document.createComment(""),P=(o,t,e)=>{let i=o._$AA.parentNode,s=t===void 0?o._$AB:t._$AA;if(e===void 0){let r=i.insertBefore(Nt(),s),n=i.insertBefore(Nt(),s);e=new Zt(r,n,o,o.options)}else{let r=e._$AB.nextSibling,n=e._$AM,c=n!==o;if(c){let d;e._$AQ?.(o),e._$AM=o,e._$AP!==void 0&&(d=o._$AU)!==n._$AU&&e._$AP(d)}if(r!==s||c){let d=e._$AA;for(;d!==r;){let u=Mt(d).nextSibling;Mt(i).insertBefore(d,s),d=u}}}return e},w=(o,t,e=o)=>(o._$AI(t,e),o),Xt={},Ut=(o,t=Xt)=>o._$AH=t,Rt=o=>o._$AH,tt=o=>{o._$AR(),o._$AA.remove()};var Lt=(o,t,e)=>{let i=new Map;for(let s=t;s<=e;s++)i.set(o[s],s);return i},M=Pt(class extends X{constructor(o){if(super(o),o.type!==zt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(o,t,e){let i;e===void 0?e=t:t!==void 0&&(i=t);let s=[],r=[],n=0;for(let c of o)s[n]=i?i(c,n):n,r[n]=e(c,n),n++;return{values:r,keys:s}}render(o,t,e){return this.dt(o,t,e).values}update(o,[t,e,i]){let s=Rt(o),{values:r,keys:n}=this.dt(t,e,i);if(!Array.isArray(s))return this.ut=n,r;let c=this.ut??(this.ut=[]),d=[],u,m,p=0,_=s.length-1,g=0,h=r.length-1;for(;p<=_&&g<=h;)if(s[p]===null)p++;else if(s[_]===null)_--;else if(c[p]===n[g])d[g]=w(s[p],r[g]),p++,g++;else if(c[_]===n[h])d[h]=w(s[_],r[h]),_--,h--;else if(c[p]===n[h])d[h]=w(s[p],r[h]),P(o,d[h+1],s[p]),p++,h--;else if(c[_]===n[g])d[g]=w(s[_],r[g]),P(o,s[p],s[_]),_--,g++;else if(u===void 0&&(u=Lt(n,g,h),m=Lt(c,p,_)),u.has(c[p]))if(u.has(c[_])){let f=m.get(n[g]),T=f!==void 0?s[f]:null;if(T===null){let ct=P(o,s[p]);w(ct,r[g]),d[g]=ct}else d[g]=w(T,r[g]),P(o,s[p],T),s[f]=null;g++}else tt(s[_]),_--;else tt(s[p]),p++;for(;g<=h;){let f=P(o,d[h+1]);w(f,r[g]),d[g++]=f}for(;p<=_;){let f=s[p++];f!==null&&tt(f)}return this.ut=n,Ut(o,d),x}});function te(o){return o?new Date(o+"T12:00:00").toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}):""}var Ot={want_to_watch:"Up Next",watching:"Watching",watched:"Watched",paused:"Watching",suggested:"Suggested",dismissed:"Not for us"},dt=["new","soon","upnext","suggested"],ee=["Too stressful","Too slow","Feels dated","Not our genre","Already seen it","Just not interested"],jt={want_to_watch:"#6d6d6d",watching:"#1976d2",watched:"#2e7d32",paused:"#1976d2",suggested:"#7b1fa2",dismissed:"#6d6d6d"},W=class extends y{constructor(){super(),this._items=[],this._section=null,this._detail=null,this._dismissing=null,this._toast=null,this._loaded=!1,this._unsubEvents=null,this._seasonCache={},this._modal=null,this._libraryFilter="all",this._previewLoading=!1,this._previewSeq=0,this._onKeydown=t=>{t.key==="Escape"&&this._closeTopLayer()},this._searchQuery="",this._searchType="",this._searchResults=null,this._searching=!1,this._adding=new Set,this._searchSeq=0}static getConfigElement(){return document.createElement("polr-tmdb-card-editor")}static getStubConfig(){return{title:"Watch Tonight"}}setConfig(t){let e=(t.sections||dt).filter(s=>dt.includes(s));if(!e.length)throw new Error("sections must include at least one of: "+dt.join(", "));let i=(t.tvs||[]).map(s=>typeof s=="string"?{entity:s}:s);for(let s of i)if(!s.entity||!s.entity.startsWith("media_player."))throw new Error("Each entry in tvs needs a media_player entity");this._config={title:"Watch Tonight",search:!0,...t,sections:e,tvs:i},t.default_section&&e.includes(t.default_section)?this._section=t.default_section:e.includes(this._section)||(this._section=e[0])}set hass(t){this._hass=t,this._loaded||(this._loaded=!0,this._loadItems(),this._subscribeEvents())}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKeydown),this._loaded&&!this._unsubEvents&&(this._loadItems(),this._subscribeEvents())}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKeydown),clearTimeout(this._searchTimer),this._unsubEvents&&this._unsubEvents.then(t=>t&&t()),this._unsubEvents=null}async _loadItems(){try{this._items=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/items"})||[]}catch(t){console.error("polr-tmdb-card: load failed",t)}}async _subscribeEvents(){this._unsubEvents=this._hass.connection.subscribeEvents(t=>{this._loadItems();let e=t.data.item;!this._detail||!e||(e.item_id===this._detail.item_id?this._detail=t.data.action==="remove"?null:e:!this._detail.item_id&&this._sameTitle(e,this._detail)&&(this._detail=e))},"polr_tmdb_updated")}async _updateItem(t,e){let i=Object.fromEntries(Object.entries(e).filter(([,s])=>s!=null));try{await this._hass.connection.sendMessagePromise({type:"polr_tmdb/update",item_id:t,...i})}catch(s){console.error("polr-tmdb-card: update failed",s)}}async _callService(t,e,i){try{await this._hass.callService("polr_tmdb",t,e),i&&this._showToast(i)}catch(s){console.error(`polr-tmdb-card: ${t} failed`,s),this._showToast(s?.message||"Something went wrong")}}_showToast(t){this._toast=t,clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>this._toast=null,3500)}_tvName(t){return t.name||this._hass?.states?.[t.entity]?.attributes?.friendly_name||t.entity}_openOnTv(t,e){this._showToast(`Opening ${t.title} on ${this._tvName(e)}\u2026`),this._callService("open_on_tv",{item_id:t.item_id,entity_id:e.entity})}_addSuggestion(t){this._callService("update_status",{item_id:t.item_id,status:"want_to_watch"},`Added ${t.title} to Up Next`),this._detail?.item_id===t.item_id&&(this._detail={...t,status:"want_to_watch"})}_dismiss(t,e){this._dismissing=null,this._callService("dismiss",{item_id:t.item_id,reason:e||""},`Passed on ${t.title}`),this._detail?.item_id===t.item_id&&(this._detail=null)}async _removeItem(t){if(confirm("Remove from watchlist?"))try{await this._hass.connection.sendMessagePromise({type:"polr_tmdb/remove",item_id:t})}catch(e){console.error("polr-tmdb-card: remove failed",e)}}async _fetchSeasonEpisodes(t,e){let i=`${t}:${e}`;if(!this._seasonCache[i])try{let s=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/season",tmdb_id:t,season_number:e});this._seasonCache[i]=s||[],this.requestUpdate()}catch(s){console.error("season fetch",s)}}_getSeasonEpisodes(t,e){if(!e)return[];let i=`${t}:${e}`;return this._seasonCache[i]?this._seasonCache[i]:(this._fetchSeasonEpisodes(t,e),null)}_openModal(t){this._modal=t,t==="search"&&this.updateComplete.then(()=>this.renderRoot.querySelector(".search-input")?.focus())}_closeModal(){this._modal=null,this._dismissing=null}_closeDetail(){this._detail=null,this._editingProgress=null,this._dismissing=null,this._previewSeq++,this._previewLoading=!1}_closeTopLayer(){this._detail?this._closeDetail():this._modal&&this._closeModal()}_sameTitle(t,e){return t.tmdb_id===e.tmdb_id&&t.media_type===e.media_type}_onSearchInput(t){this._searchQuery=t,clearTimeout(this._searchTimer),this._searchTimer=setTimeout(()=>this._runSearch(),400)}_setSearchType(t){this._searchType=t,this._runSearch()}async _runSearch(){clearTimeout(this._searchTimer);let t=this._searchQuery.trim(),e=++this._searchSeq;if(!t){this._searchResults=null,this._searching=!1;return}this._searching=!0;let i={query:t,limit:20};this._searchType&&(i.media_type=this._searchType);try{let s=await this._hass.connection.sendMessagePromise({type:"call_service",domain:"polr_tmdb",service:"search",service_data:i,return_response:!0});e===this._searchSeq&&(this._searchResults=s?.response?.results||[])}catch(s){console.error("polr-tmdb-card: search failed",s),e===this._searchSeq&&(this._searchResults=[],this._showToast(s?.message||"Search failed"))}finally{e===this._searchSeq&&(this._searching=!1)}}_itemForResult(t){return this._items.find(e=>this._sameTitle(e,t))}_openResult(t){let e=this._itemForResult(t);if(e){this._detail=e;return}this._openPreview(t)}async _openPreview(t){let e=++this._previewSeq;this._detail={item_id:null,status:null,tmdb_id:t.tmdb_id,media_type:t.media_type,title:t.title,poster_path:t.poster_url,backdrop_path:t.backdrop_url,overview:t.overview,vote_average:t.rating,release_date:t.year||""},this._previewLoading=!0;try{let i=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/preview",tmdb_id:t.tmdb_id,media_type:t.media_type});e===this._previewSeq&&!this._detail?.item_id&&(this._detail=i)}catch(i){console.error("polr-tmdb-card: preview failed",i)}finally{e===this._previewSeq&&(this._previewLoading=!1)}}async _addTitle(t,e="want_to_watch"){let i=`${t.media_type}:${t.tmdb_id}`;this._adding=new Set([...this._adding,i]);try{let s=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/add",tmdb_id:t.tmdb_id,media_type:t.media_type,status:e});await this._loadItems(),this._showToast(`Added ${t.title} to ${e==="watching"?"Watching":"Up Next"}`),this._detail&&!this._detail.item_id&&this._sameTitle(this._detail,t)&&(this._detail=s)}catch(s){console.error("polr-tmdb-card: add failed",s),this._showToast(s?.message||"Couldn't add that title")}finally{let s=new Set(this._adding);s.delete(i),this._adding=s}}_isAdding(t){return this._adding.has(`${t.media_type}:${t.tmdb_id}`)}_libraryItems(t){return[...t==="all"?this._items.filter(i=>i.status!=="dismissed"):t==="watching"?this._items.filter(i=>this._isWatching(i)):this._items.filter(i=>i.status===t)].sort((i,s)=>i.title.localeCompare(s.title))}_today(){let t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}_isWatching(t){return t.status==="watching"||t.status==="paused"}_hasNewEpisode(t){if(t.status==="watched")return!1;if(t.has_new_episode)return!0;let e=t.next_episode_to_air;if(!e?.air_date||e.air_date>this._today())return!1;let i=t.current_season||0,s=t.current_episode||0;return i===0&&s===0?!0:e.season_number>i||e.season_number===i&&e.episode_number>s}_daysUntil(t){if(!t)return null;let e=new Date(t+"T12:00:00")-new Date;return Math.ceil(e/864e5)}_isComingSoon(t){if(t.media_type!=="tv"||!this._isWatching(t)||this._hasNewEpisode(t))return!1;let e=t.next_episode_to_air;if(!e?.air_date)return!1;let i=this._daysUntil(e.air_date);return i!==null&&i>0&&i<=14}get _newItems(){return this._items.filter(t=>["watching","paused"].includes(t.status)&&this._hasNewEpisode(t)).sort((t,e)=>t.title.localeCompare(e.title))}get _soonItems(){return this._items.filter(t=>this._isComingSoon(t)).sort((t,e)=>{let i=t.next_episode_to_air?.air_date||"9999",s=e.next_episode_to_air?.air_date||"9999";return i.localeCompare(s)})}get _upNextItems(){return this._items.filter(t=>t.status==="want_to_watch").sort((t,e)=>t.title.localeCompare(e.title))}get _suggestedItems(){return this._items.filter(t=>t.status==="suggested").sort((t,e)=>(e.suggestion?.suggested_at||"").localeCompare(t.suggestion?.suggested_at||""))}_itemsFor(t){return t==="new"?this._newItems:t==="soon"?this._soonItems:t==="suggested"?this._suggestedItems:this._upNextItems}render(){if(!this._config)return l;let t={new:"New",soon:"Coming Soon",upnext:"Up Next",suggested:"Suggested"},e=this._config.sections.map(s=>({id:s,label:t[s],count:this._itemsFor(s).length})),i=this._itemsFor(this._section);return a`
      <ha-card>
        <div class="card-header">
          <span class="card-title">${this._config.title}</span>
          <div class="header-actions">
            ${this._config.search?a`
              <button class="icon-btn" title="Search" aria-label="Search" @click=${()=>this._openModal("search")}>
                <ha-icon icon="mdi:magnify"></ha-icon>
              </button>`:l}
            <button class="icon-btn" title="Library" aria-label="Library" @click=${()=>this._openModal("library")}>
              <ha-icon icon="mdi:bookshelf"></ha-icon>
            </button>
          </div>
        </div>
        ${e.length>1?a`
          <div class="section-bar">
            ${this._renderSegmented(e.map(({id:s,label:r,count:n})=>({id:s,label:r,count:n})),this._section,s=>this._section=s)}
          </div>`:l}

        ${i.length===0?this._renderEmpty():this._section==="suggested"?a`<div class="suggestion-list">${M(i,s=>s.item_id,s=>this._renderSuggestion(s))}</div>`:this._section==="new"||this._section==="soon"?a`<div class="wide-row">${M(i,s=>s.item_id,s=>this._renderWideTile(s))}</div>`:a`<div class="poster-row">${M(i,s=>s.item_id,s=>this._renderPoster(s))}</div>`}

        ${this._toast?a`<div class="toast">${this._toast}</div>`:l}
      </ha-card>

      ${this._modal==="search"?this._renderSearchModal():l}
      ${this._modal==="library"?this._renderLibraryModal():l}
      ${this._detail?this._renderDetailDialog():l}
    `}_renderSegmented(t,e,i){return a`
      <div class="segmented" role="tablist">
        ${t.map(s=>a`
          <button class="segment ${s.id===e?"segment-selected":""}" role="tab"
            aria-selected=${s.id===e?"true":"false"}
            style=${s.id===e&&s.color?`--segment-color:${s.color}`:""}
            @click=${()=>i(s.id)}>
            <span class="segment-label">${s.label}</span>
            ${s.count?a`<span class="segment-count">${s.count}</span>`:l}
          </button>
        `)}
      </div>
    `}_renderModal(t,e,i=l){return a`
      <div class="modal-overlay" @click=${s=>s.target===s.currentTarget&&this._closeModal()}>
        <div class="modal" role="dialog" aria-label="${t}">
          <div class="modal-header">
            <span class="modal-title">${t}</span>
            <button class="modal-close" title="Close" @click=${()=>this._closeModal()}>✕</button>
          </div>
          ${i}
          <div class="modal-body">${e}</div>
          ${this._toast&&!this._detail?a`<div class="toast">${this._toast}</div>`:l}
        </div>
      </div>
    `}_renderSearchModal(){let t=[["","All"],["tv","TV"],["movie","Movies"]],e=this._searchResults,i=a`
      <div class="modal-toolbar">
        <input class="search-input" type="search" placeholder="Search movies & shows…" enterkeyhint="search"
          .value=${this._searchQuery}
          @input=${r=>this._onSearchInput(r.target.value)}
          @keydown=${r=>r.key==="Enter"&&this._runSearch()} />
        ${this._renderSegmented(t.map(([r,n])=>({id:r,label:n})),this._searchType,r=>this._setSearchType(r))}
      </div>
    `,s=this._searching&&!e?.length?a`<div class="modal-note">Searching…</div>`:e===null?a`<div class="modal-note">Find a movie or show. Tap it for details, or + to add it to Up Next.</div>`:e.length===0?a`<div class="modal-note">No matches for “${this._searchQuery.trim()}”.</div>`:a`<div class="modal-grid">${M(e,r=>`${r.media_type}:${r.tmdb_id}`,r=>this._renderSearchTile(r))}</div>`;return this._renderModal("Search",s,i)}_renderSearchTile(t){let e=this._itemForResult(t),i=this._isAdding(t),s=[t.year,t.media_type==="tv"?"TV":"Movie"].filter(Boolean).join(" \xB7 ");return a`
      <div class="poster" @click=${()=>this._openResult(t)}>
        ${t.poster_url?a`<img class="poster-img" src="${t.poster_url}" alt="${t.title}" loading="lazy" />`:a`<div class="poster-fallback">${t.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}
        ${e?a`<span class="status-badge" style="background:${jt[e.status]||"#6d6d6d"}">${Ot[e.status]||e.status}</span>`:a`<button class="quick-add" title="Add to Up Next" ?disabled=${i}
              @click=${r=>{r.stopPropagation(),this._addTitle(t)}}>
              <ha-icon icon="${i?"mdi:loading":"mdi:plus"}"></ha-icon>
            </button>`}
        <div class="poster-title">${t.title}</div>
        <div class="poster-sub">${s}</div>
      </div>
    `}_renderLibraryModal(){let t=[["all","All"],["watching","Watching"],["want_to_watch","Up Next"],["suggested","Suggested"],["watched","Watched"],["dismissed","Not for us"]],e=this._libraryItems(this._libraryFilter),i=a`
      <div class="modal-toolbar">
        <div class="chip-row">
          ${t.map(([r,n])=>{let c=this._libraryItems(r).length;return a`
              <button class="chip ${this._libraryFilter===r?"chip-selected":""}"
                @click=${()=>this._libraryFilter=r}>
                ${this._libraryFilter===r?a`<ha-icon icon="mdi:check"></ha-icon>`:l}
                ${n}${c>0?a`<span class="chip-count">${c}</span>`:l}
              </button>`})}
        </div>
      </div>
    `,s=e.length===0?a`<div class="modal-note">
          ${this._libraryFilter==="all"?"Your list is empty.":"Nothing here."}
          ${this._config.search?a`<button class="action" @click=${()=>this._openModal("search")}>
            <ha-icon icon="mdi:magnify"></ha-icon> Find something</button>`:l}
        </div>`:a`<div class="modal-grid">${M(e,r=>r.item_id,r=>this._renderPoster(r,!0))}</div>`;return this._renderModal("Library",s,i)}_renderEmpty(){let t={new:{icon:"mdi:check-circle-outline",heading:"All caught up!",sub:"No new episodes to watch right now."},soon:{icon:"mdi:calendar-blank-outline",heading:"Nothing coming soon",sub:"No new episodes airing in the next 2 weeks."},upnext:{icon:"mdi:playlist-play",heading:"Queue is empty",sub:"Add something to your watchlist to get started."},suggested:{icon:"mdi:lightbulb-on-outline",heading:"No suggestions right now",sub:"New ones arrive with the next weekly pass."}},{icon:e,heading:i,sub:s}=t[this._section]||t.upnext;return a`
      <div class="empty-state">
        <ha-icon class="empty-icon" .icon=${e}></ha-icon>
        <div class="empty-heading">${i}</div>
        <div class="empty-sub">${s}</div>
        ${this._section==="upnext"&&this._config.search?a`
          <button class="action" @click=${()=>this._openModal("search")}>
            <ha-icon icon="mdi:magnify"></ha-icon> Find something
          </button>`:l}
      </div>
    `}_renderTitleArt(t,e=""){return t.logo_path?a`<img class="title-logo ${e}" src="${t.logo_path}" alt="${t.title}" loading="lazy" />`:a`<div class="title-text ${e}">${t.title}</div>`}_epLabel(t){return t?`S${t.season_number} \xB7 E${t.episode_number}${t.name?` \xB7 ${t.name}`:""}`:""}_renderWideTile(t){let e=this._isComingSoon(t),i=e?t.next_episode_to_air:t.last_episode_to_air,s=e&&i?.air_date?this._daysUntil(i.air_date):null,r=!e&&i?.still_path||t.backdrop_path||t.poster_path;return a`
      <div class="wide-tile" @click=${()=>this._detail=t}>
        ${r?a`<img class="wide-img" src="${r}" alt="" loading="lazy" />`:a`<div class="wide-img wide-fallback">${t.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}
        <div class="wide-fade"></div>
        ${this._hasNewEpisode(t)?a`<span class="new-badge">NEW</span>`:l}
        ${s!==null?a`<span class="soon-badge">${s===1?"Tomorrow":`In ${s} days`}</span>`:l}
        <div class="wide-caption">
          ${this._renderTitleArt(t,"wide-logo")}
          ${i?a`<div class="wide-sub">${this._epLabel(i)}</div>`:l}
        </div>
      </div>
    `}_renderPoster(t,e=!1){let i=t.next_episode_to_air,s=this._isComingSoon(t)&&i?.air_date?this._daysUntil(i.air_date):null;return a`
      <div class="poster" @click=${()=>this._detail=t}>
        ${t.poster_path?a`<img class="poster-img" src="${t.poster_path}" alt="${t.title}" loading="lazy" />`:a`<div class="poster-fallback">${t.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}

        ${this._hasNewEpisode(t)?a`<span class="new-badge">NEW</span>`:l}
        ${e&&this._libraryFilter==="all"?a`
          <span class="status-badge" style="background:${jt[t.status]||"#6d6d6d"}">${Ot[t.status]||t.status}</span>
        `:l}

        ${s!==null?a`
          <span class="soon-badge">${s===1?"Tomorrow":`${s}d`}</span>
        `:l}

        <div class="poster-title">${t.title}</div>
      </div>
    `}_streamingNames(t){return(t.watch_providers?.flatrate||[]).map(e=>e.provider_name)}_renderSuggestion(t){let e=[t.release_date?.slice(0,4),t.media_type==="tv"&&t.seasons?`${t.seasons} season${t.seasons===1?"":"s"}`:null,t.watch_link?.service||this._streamingNames(t)[0]].filter(Boolean).join(" \xB7 ");return a`
      <div class="suggestion">
        <div class="suggestion-banner" @click=${()=>this._detail=t}>
          ${t.backdrop_path||t.poster_path?a`<img class="wide-img ${t.backdrop_path?"":"img-blur"}" src="${t.backdrop_path||t.poster_path}" alt="" loading="lazy" />`:a`<div class="wide-img wide-fallback">${t.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}
          <div class="wide-fade"></div>
          <div class="wide-caption">
            ${this._renderTitleArt(t,"wide-logo")}
            <div class="wide-sub">${e}</div>
          </div>
        </div>
        <div class="suggestion-body">
          ${t.suggestion?.reason?a`<div class="suggestion-reason">${t.suggestion.reason}</div>`:l}
          ${this._dismissing===t.item_id?this._renderDismissChooser(t):a`
              <div class="suggestion-actions">
                <button class="action action-primary" @click=${()=>this._addSuggestion(t)}>
                  <ha-icon icon="mdi:playlist-plus"></ha-icon> Add
                </button>
                <button class="action" @click=${()=>this._dismissing=t.item_id}>
                  <ha-icon icon="mdi:thumb-down-outline"></ha-icon> Not for us
                </button>
                ${t.trailer_url?a`
                  <a class="action" href="${t.trailer_url}" target="_blank" rel="noopener">
                    <ha-icon icon="mdi:play-circle-outline"></ha-icon> Trailer
                  </a>`:l}
              </div>
              ${this._renderTvButtons(t)}`}
        </div>
      </div>
    `}_renderTvButtons(t){return!t.watch_link?.url||!this._config.tvs.length?l:a`
      <div class="tv-row">
        <span class="tv-label">Open on</span>
        ${this._config.tvs.map(e=>a`
          <button class="action action-tint" @click=${()=>this._openOnTv(t,e)}>
            <ha-icon icon="mdi:television-play"></ha-icon> ${this._tvName(e)}
          </button>
        `)}
      </div>
    `}_renderDismissChooser(t){return a`
      <div class="dismiss-chooser">
        <div class="dismiss-prompt">What's the reason?</div>
        <div class="dismiss-reasons">
          ${ee.map(e=>a`<button class="chip" @click=${()=>this._dismiss(t,e)}>${e}</button>`)}
        </div>
        <div class="dismiss-custom">
          <input class="dismiss-input" type="text" maxlength="200" placeholder="Or say why…"
            @keydown=${e=>{e.key==="Enter"&&e.target.value.trim()&&this._dismiss(t,e.target.value.trim())}} />
          <button class="action" @click=${()=>this._dismissing=null}>Cancel</button>
        </div>
      </div>
    `}_isCaughtUp(t){let e=t.last_episode_to_air;if(!e)return!1;let i=t.current_season||0,s=t.current_episode||0;return i>0&&(i>e.season_number||i===e.season_number&&s>=e.episode_number)}_progressFields(t,e,i){let s=t.last_episode_to_air,r=t.show_ended&&s&&(e>s.season_number||e===s.season_number&&i>=s.episode_number);return{current_season:e,current_episode:i,status:r?"watched":"watching"}}async _setProgress(t,e,i){let s=this._progressFields(t,e,i);await this._updateItem(t.item_id,s),this._detail={...t,...s}}_nextToWatch(t){if(!t.last_episode_to_air||this._isCaughtUp(t))return null;let i=t.current_season||0,s=t.current_episode||0;if(!i)return{season:1,episode:1};let r=this._getSeasonEpisodes(t.tmdb_id,i);if(r===null)return;let n=this._today(),c=r.find(d=>d.episode_number===s+1&&(!d.air_date||d.air_date<=n));return c?{season:i,episode:s+1,name:c.name}:{season:i+1,episode:1}}_renderProgress(t){let e=t.current_season||0,i=t.current_episode||0,s=e?this._getSeasonEpisodes(t.tmdb_id,e):[],r=Array.isArray(s)?s.find(h=>h.episode_number===i):null,n=this._isCaughtUp(t),c=this._nextToWatch(t),d=this._editingProgress===t.item_id,u;t.status==="watched"?u="Finished":e?u=`You're at S${e} \xB7 E${i}${r?.name?` \xB7 ${r.name}`:""}`:u="Not started";let m=t.status==="watched"?null:this._hasNewEpisode(t)&&e?"New episode":n?"Caught up":null,p=this._today(),_=Array.isArray(s)?s.filter(h=>!h.air_date||h.air_date<=p):[],g=t.seasons||0;return a`
      <div class="section-label">Where you are</div>
      <div class="progress-line">
        <span>${u}</span>
        ${m?a`<span class="progress-pill ${m==="Caught up"?"pill-ok":"pill-new"}">${m}</span>`:l}
      </div>

      <div class="preview-actions">
        ${t.status==="watched"?a`
          <button class="action action-primary" @click=${async()=>{let h={status:"want_to_watch",current_season:null,current_episode:null};await this._updateItem(t.item_id,h),this._detail={...t,...h}}}><ha-icon icon="mdi:replay"></ha-icon> Watch again</button>
        `:a`
          ${c!==null?a`
            <button class="action action-primary" ?disabled=${c===void 0}
              @click=${()=>this._setProgress(t,c.season,c.episode)}>
              <ha-icon icon="mdi:check"></ha-icon> Watched S${c?.season??e}E${c?.episode??i+1}
            </button>`:l}
          ${!n&&t.last_episode_to_air?a`
            <button class="action" @click=${()=>this._setProgress(t,t.last_episode_to_air.season_number,t.last_episode_to_air.episode_number)}>
              <ha-icon icon="mdi:check-all"></ha-icon> All caught up
            </button>`:l}
        `}
        <button class="link-btn" @click=${()=>this._editingProgress=d?null:t.item_id}>
          ${d?"Done":"Change\u2026"}
        </button>
      </div>

      ${d?a`
        <div class="progress-row">
          <label class="select-label">
            <span>Season</span>
            <select class="ep-select" @change=${h=>{let f=parseInt(h.target.value)||null,T={current_season:f,current_episode:null,status:f?"watching":"want_to_watch"};this._updateItem(t.item_id,T),this._detail={...t,...T}}}>
              <option value="">—</option>
              ${Array.from({length:g},(h,f)=>f+1).map(h=>a`
                <option value="${h}" ?selected=${e===h}>Season ${h}</option>
              `)}
            </select>
          </label>
          <label class="select-label">
            <span>Episode</span>
            <select class="ep-select" ?disabled=${!e||s===null}
              @change=${h=>{let f=h.target.value?parseInt(h.target.value,10):null;f&&this._setProgress(t,e,f)}}>
              <option value="">—</option>
              ${s===null?a`<option disabled>Loading…</option>`:_.map(h=>a`
                    <option value="${h.episode_number}" ?selected=${i===h.episode_number}>
                      E${h.episode_number}${h.name?` \xB7 ${h.name}`:""}
                    </option>
                  `)}
            </select>
          </label>
        </div>
      `:l}
    `}_renderMovieStatus(t){let e=t.status==="watched",i=e?"want_to_watch":"watched";return a`
      <div class="preview-actions">
        <button class="action action-primary" @click=${async()=>{await this._updateItem(t.item_id,{status:i}),this._detail={...t,status:i}}}>
          <ha-icon icon="${e?"mdi:replay":"mdi:check"}"></ha-icon> ${e?"Watch again":"Mark watched"}
        </button>
      </div>
    `}_renderItemControls(t){let e=!["suggested","dismissed"].includes(t.status);return a`
      ${this._renderTvButtons(t)}
      ${e?t.media_type==="tv"?this._renderProgress(t):this._renderMovieStatus(t):l}

      ${t.status==="watched"?a`
        <div class="section-label">Your Rating</div>
        <div class="stars">
          ${[1,2,3,4,5,6,7,8,9,10].map(i=>a`
            <span class="star ${(t.rating||0)>=i?"star-on":""}"
              @click=${async()=>{await this._updateItem(t.item_id,{rating:i}),this._detail={...t,rating:i}}}>★</span>
          `)}
          ${t.rating?a`<span class="rating-num">${t.rating}/10</span>`:l}
        </div>
      `:l}
    `}_renderPreviewActions(t){let e=this._isAdding(t);return a`
      <div class="preview-actions">
        <button class="action action-primary" ?disabled=${e} @click=${()=>this._addTitle(t,"want_to_watch")}>
          <ha-icon icon="${e?"mdi:loading":"mdi:playlist-plus"}"></ha-icon> Add to Up Next
        </button>
      </div>
      ${this._previewLoading?a`<div class="preview-loading">Loading details…</div>`:l}
    `}_metaLine(t){let e=Math.floor((t.runtime||0)/60),i=(t.runtime||0)%60,s=t.media_type==="tv"?t.seasons?`${t.seasons} season${t.seasons===1?"":"s"}`:null:t.runtime?e?`${e}h ${i}m`:`${i}m`:null;return[t.release_date?.slice(0,4),s,t.genres?.slice(0,2).join(", "),t.vote_average?`\u2605 ${Number(t.vote_average).toFixed(1)}`:null,t.networks?.[0]].filter(Boolean).join(" \xB7 ")}_renderEpisodeCards(t){let e=[["Next episode",t.next_episode_to_air]].filter(([,i])=>i?.episode_number);return e.length?a`
      <div class="episode-cards">
        ${e.map(([i,s])=>a`
          <div class="episode-card">
            ${s.still_path?a`<img class="episode-still" src="${s.still_path}" alt="" loading="lazy" />`:a`<div class="episode-still episode-still-empty"><ha-icon icon="mdi:television-classic"></ha-icon></div>`}
            <div class="episode-info">
              <div class="episode-label">${i}${s.air_date?a` · ${te(s.air_date)}`:l}</div>
              <div class="episode-name">${this._epLabel(s)}</div>
            </div>
          </div>
        `)}
      </div>
    `:l}_renderCast(t){return a`
      <div class="section-label">Cast</div>
      <div class="cast-row">
        ${t.cast.map(e=>a`
          <div class="cast-member">
            ${e.profile_path?a`<img class="cast-photo" src="${e.profile_path}" alt="${e.name}" loading="lazy" />`:a`<div class="cast-photo cast-photo-empty"><ha-icon icon="mdi:account"></ha-icon></div>`}
            <div class="cast-name">${e.name}</div>
            ${e.character?a`<div class="cast-character">${e.character}</div>`:l}
          </div>
        `)}
      </div>
    `}_renderDetailDialog(){let t=this._detail;return a`
      <div class="dialog-overlay" @click=${e=>e.target===e.currentTarget&&this._closeDetail()}>
        <div class="dialog">
          <div class="dialog-topbar">
            ${t.item_id?a`
              <button class="dialog-btn" title="Remove from watchlist" @click=${()=>this._removeItem(t.item_id)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
            `:l}
            <button class="dialog-btn" title="Close" @click=${()=>this._closeDetail()}>✕</button>
          </div>

          <div class="hero">
            ${t.backdrop_path||t.poster_path?a`<img class="hero-img ${t.backdrop_path?"":"img-blur"}" src="${t.backdrop_path||t.poster_path}" alt="" />`:l}
            <div class="hero-fade"></div>
            <div class="hero-caption">
              ${this._renderTitleArt(t,"hero-logo")}
              <div class="hero-meta">${this._metaLine(t)}</div>
              ${t.trailer_url?a`
                <a class="action action-light" href="${t.trailer_url}" target="_blank" rel="noopener">
                  <ha-icon icon="mdi:play"></ha-icon> Trailer
                </a>`:l}
            </div>
          </div>

          <div class="dialog-content">
            ${t.poster_path&&t.backdrop_path?a`
              <div class="dialog-left"><img class="dialog-poster" src="${t.poster_path}" alt="${t.title}" /></div>
            `:l}
            <div class="dialog-right">
              ${t.tagline?a`<p class="tagline">${t.tagline}</p>`:l}
              <p class="dialog-overview">${t.overview}</p>
              ${t.media_type==="tv"?this._renderEpisodeCards(t):l}

              ${t.status==="suggested"?a`
                <div class="suggestion-box">
                  ${t.suggestion?.reason?a`<div><strong>Why it's here:</strong> ${t.suggestion.reason}</div>`:l}
                  ${this._dismissing===t.item_id?this._renderDismissChooser(t):a`<div class="suggestion-actions">
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

              ${t.watch_providers&&Object.keys(t.watch_providers).length>0?a`
                <div class="section-label">Where to Watch</div>
                <div class="providers">
                  ${t.watch_providers.flatrate?.length?a`
                    <div class="provider-row">
                      <span class="provider-type">Stream</span>
                      ${t.watch_providers.flatrate.map(e=>a`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${e.logo_path}" title="${e.provider_name}" alt="${e.provider_name}" />
                      `)}
                    </div>
                  `:l}
                  ${t.watch_providers.rent?.length?a`
                    <div class="provider-row">
                      <span class="provider-type">Rent</span>
                      ${t.watch_providers.rent.map(e=>a`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${e.logo_path}" title="${e.provider_name}" alt="${e.provider_name}" />
                      `)}
                    </div>
                  `:l}
                  ${t.watch_providers.buy?.length?a`
                    <div class="provider-row">
                      <span class="provider-type">Buy</span>
                      ${t.watch_providers.buy.map(e=>a`
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
    `}};N(W,"properties",{_hass:{state:!0},_config:{state:!0},_items:{state:!0},_section:{state:!0},_detail:{state:!0},_editingProgress:{state:!0},_dismissing:{state:!0},_toast:{state:!0},_modal:{state:!0},_libraryFilter:{state:!0},_previewLoading:{state:!0},_searchQuery:{state:!0},_searchType:{state:!0},_searchResults:{state:!0},_searching:{state:!0},_adding:{state:!0}}),N(W,"styles",V`
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
  `);var B=class extends y{setConfig(t){this._config=t}_valueChanged(t){let e=t.target.dataset.field,i=t.target.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,[e]:i}}}))}render(){return this._config?a`
      <div class="editor">
        <label>Title
          <input type="text" data-field="title" .value=${this._config.title||""} @change=${this._valueChanged} />
        </label>
      </div>
    `:l}};N(B,"properties",{hass:{type:Object},_config:{state:!0}}),N(B,"styles",V`
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
