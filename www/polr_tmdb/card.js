var Dt=Object.defineProperty;var Ht=(o,t,e)=>t in o?Dt(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var N=(o,t,e)=>(Ht(o,typeof t!="symbol"?t+"":t,e),e);var F=globalThis,V=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,it=Symbol(),ut=new WeakMap,U=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==it)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(V&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=ut.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ut.set(e,t))}return t}toString(){return this.cssText}},_t=o=>new U(typeof o=="string"?o:o+"",void 0,it),Q=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((i,s,r)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new U(e,o,it)},gt=(o,t)=>{if(V)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=F.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},ot=V?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return _t(e)})(o):o;var{is:jt,defineProperty:Bt,getOwnPropertyDescriptor:Wt,getOwnPropertyNames:qt,getOwnPropertySymbols:Ft,getPrototypeOf:Vt}=Object,w=globalThis,mt=w.trustedTypes,Qt=mt?mt.emptyScript:"",Kt=w.reactiveElementPolyfillSupport,R=(o,t)=>o,rt={toAttribute(o,t){switch(t){case Boolean:o=o?Qt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},vt=(o,t)=>!jt(o,t),ft={attribute:!0,type:String,converter:rt,reflect:!1,useDefault:!1,hasChanged:vt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),w.litPropertyMetadata??(w.litPropertyMetadata=new WeakMap);var x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ft){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Bt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:r}=Wt(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:s,set(a){let p=s?.call(this);r?.call(this,a),this.requestUpdate(t,p,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ft}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let t=Vt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let e=this.properties,i=[...qt(e),...Ft(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(ot(s))}else t!==void 0&&e.push(ot(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:rt).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),a=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:rt;this._$Em=s;let p=a.fromAttribute(e,r.type);this[s]=p??this._$Ej?.get(s)??p,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(t!==void 0){let a=this.constructor;if(s===!1&&(r=this[t]),i??(i=a.getPropertyOptions(t)),!((i.hasChanged??vt)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??e??this[t]),r!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:a}=r,p=this[s];a!==!0||this._$AL.has(s)||p===void 0||this.C(s,void 0,r,p)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[R("elementProperties")]=new Map,x[R("finalized")]=new Map,Kt?.({ReactiveElement:x}),(w.reactiveElementVersions??(w.reactiveElementVersions=[])).push("2.1.2");var L=globalThis,xt=o=>o,K=L.trustedTypes,$t=K?K.createPolicy("lit-html",{createHTML:o=>o}):void 0,nt="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,lt="?"+$,Yt=`<${lt}>`,k=document,I=()=>k.createComment(""),D=o=>o===null||typeof o!="object"&&typeof o!="function",dt=Array.isArray,Et=o=>dt(o)||typeof o?.[Symbol.iterator]=="function",at=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,yt=/-->/g,bt=/>/g,S=RegExp(`>|${at}(?:([^\\s"'>=/]+)(${at}*=${at}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),wt=/'/g,At=/"/g,kt=/^(?:script|style|textarea|title)$/i,ct=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),n=ct(1),ne=ct(2),le=ct(3),y=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),St=new WeakMap,E=k.createTreeWalker(k,129);function Tt(o,t){if(!dt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return $t!==void 0?$t.createHTML(t):t}var Ct=(o,t)=>{let e=o.length-1,i=[],s,r=t===2?"<svg>":t===3?"<math>":"",a=O;for(let p=0;p<e;p++){let l=o[p],u,f,c=-1,_=0;for(;_<l.length&&(a.lastIndex=_,f=a.exec(l),f!==null);)_=a.lastIndex,a===O?f[1]==="!--"?a=yt:f[1]!==void 0?a=bt:f[2]!==void 0?(kt.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=S):f[3]!==void 0&&(a=S):a===S?f[0]===">"?(a=s??O,c=-1):f[1]===void 0?c=-2:(c=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?S:f[3]==='"'?At:wt):a===At||a===wt?a=S:a===yt||a===bt?a=O:(a=S,s=void 0);let h=a===S&&o[p+1].startsWith("/>")?" ":"";r+=a===O?l+Yt:c>=0?(i.push(u),l.slice(0,c)+nt+l.slice(c)+$+h):l+$+(c===-2?p:h)}return[Tt(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},H=class o{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,a=0,p=t.length-1,l=this.parts,[u,f]=Ct(t,e);if(this.el=o.createElement(u,i),E.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=E.nextNode())!==null&&l.length<p;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(nt)){let _=f[a++],h=s.getAttribute(c).split($),m=/([.?@])?(.*)/.exec(_);l.push({type:1,index:r,name:m[2],strings:h,ctor:m[1]==="."?J:m[1]==="?"?G:m[1]==="@"?Z:C}),s.removeAttribute(c)}else c.startsWith($)&&(l.push({type:6,index:r}),s.removeAttribute(c));if(kt.test(s.tagName)){let c=s.textContent.split($),_=c.length-1;if(_>0){s.textContent=K?K.emptyScript:"";for(let h=0;h<_;h++)s.append(c[h],I()),E.nextNode(),l.push({type:2,index:++r});s.append(c[_],I())}}}else if(s.nodeType===8)if(s.data===lt)l.push({type:2,index:r});else{let c=-1;for(;(c=s.data.indexOf($,c+1))!==-1;)l.push({type:7,index:r}),c+=$.length-1}r++}}static createElement(t,e){let i=k.createElement("template");return i.innerHTML=t,i}};function T(o,t,e=o,i){if(t===y)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,r=D(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=T(o,s._$AS(o,t.values),s,i)),t}var Y=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??k).importNode(e,!0);E.currentNode=s;let r=E.nextNode(),a=0,p=0,l=i[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new z(r,r.nextSibling,this,t):l.type===1?u=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(u=new X(r,this,t)),this._$AV.push(u),l=i[++p]}a!==l?.index&&(r=E.nextNode(),a++)}return E.currentNode=k,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},z=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=T(this,t,e),D(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==y&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Et(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=H.createElement(Tt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new Y(s,this),a=r.u(this.options);r.p(e),this.T(a),this._$AH=r}}_$AC(t){let e=St.get(t.strings);return e===void 0&&St.set(t.strings,e=new H(t)),e}k(t){dt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let r of t)s===e.length?e.push(i=new o(this.O(I()),this.O(I()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=xt(t).nextSibling;xt(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(t,e=this,i,s){let r=this.strings,a=!1;if(r===void 0)t=T(this,t,e,0),a=!D(t)||t!==this._$AH&&t!==y,a&&(this._$AH=t);else{let p=t,l,u;for(t=r[0],l=0;l<r.length-1;l++)u=T(this,p[i+l],e,l),u===y&&(u=this._$AH[l]),a||(a=!D(u)||u!==this._$AH[l]),u===d?t=d:t!==d&&(t+=(u??"")+r[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},J=class extends C{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},G=class extends C{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},Z=class extends C{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=T(this,t,e,0)??d)===y)return;let i=this._$AH,s=t===d&&i!==d||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==d&&(i===d||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},X=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){T(this,t)}},Pt={M:nt,P:$,A:lt,C:1,L:Ct,R:Y,D:Et,V:T,I:z,H:C,N:G,U:Z,B:J,F:X},Jt=L.litHtmlPolyfillSupport;Jt?.(H,z),(L.litHtmlVersions??(L.litHtmlVersions=[])).push("3.3.2");var zt=(o,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let r=e?.renderBefore??null;i._$litPart$=s=new z(t.insertBefore(I(),r),r,void 0,e??{})}return s._$AI(o),s};var j=globalThis,b=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=zt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return y}};b._$litElement$=!0,b.finalized=!0,j.litElementHydrateSupport?.({LitElement:b});var Gt=j.litElementPolyfillSupport;Gt?.({LitElement:b});(j.litElementVersions??(j.litElementVersions=[])).push("4.2.2");var Mt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Nt=o=>(...t)=>({_$litDirective$:o,values:t}),tt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Zt}=Pt,Ut=o=>o;var Rt=()=>document.createComment(""),M=(o,t,e)=>{let i=o._$AA.parentNode,s=t===void 0?o._$AB:t._$AA;if(e===void 0){let r=i.insertBefore(Rt(),s),a=i.insertBefore(Rt(),s);e=new Zt(r,a,o,o.options)}else{let r=e._$AB.nextSibling,a=e._$AM,p=a!==o;if(p){let l;e._$AQ?.(o),e._$AM=o,e._$AP!==void 0&&(l=o._$AU)!==a._$AU&&e._$AP(l)}if(r!==s||p){let l=e._$AA;for(;l!==r;){let u=Ut(l).nextSibling;Ut(i).insertBefore(l,s),l=u}}}return e},A=(o,t,e=o)=>(o._$AI(t,e),o),Xt={},Ot=(o,t=Xt)=>o._$AH=t,Lt=o=>o._$AH,et=o=>{o._$AR(),o._$AA.remove()};var It=(o,t,e)=>{let i=new Map;for(let s=t;s<=e;s++)i.set(o[s],s);return i},B=Nt(class extends tt{constructor(o){if(super(o),o.type!==Mt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(o,t,e){let i;e===void 0?e=t:t!==void 0&&(i=t);let s=[],r=[],a=0;for(let p of o)s[a]=i?i(p,a):a,r[a]=e(p,a),a++;return{values:r,keys:s}}render(o,t,e){return this.dt(o,t,e).values}update(o,[t,e,i]){let s=Lt(o),{values:r,keys:a}=this.dt(t,e,i);if(!Array.isArray(s))return this.ut=a,r;let p=this.ut??(this.ut=[]),l=[],u,f,c=0,_=s.length-1,h=0,m=r.length-1;for(;c<=_&&h<=m;)if(s[c]===null)c++;else if(s[_]===null)_--;else if(p[c]===a[h])l[h]=A(s[c],r[h]),c++,h++;else if(p[_]===a[m])l[m]=A(s[_],r[m]),_--,m--;else if(p[c]===a[m])l[m]=A(s[c],r[m]),M(o,l[m+1],s[c]),c++,m--;else if(p[_]===a[h])l[h]=A(s[_],r[h]),M(o,s[c],s[_]),_--,h++;else if(u===void 0&&(u=It(a,h,m),f=It(p,c,_)),u.has(p[c]))if(u.has(p[_])){let g=f.get(a[h]),v=g!==void 0?s[g]:null;if(v===null){let P=M(o,s[c]);A(P,r[h]),l[h]=P}else l[h]=A(v,r[h]),M(o,s[c],v),s[g]=null;h++}else et(s[_]),_--;else et(s[c]),c++;for(;h<=m;){let g=M(o,l[m+1]);A(g,r[h]),l[h++]=g}for(;c<=_;){let g=s[c++];g!==null&&et(g)}return this.ut=a,Ot(o,l),y}});function te(o){return o?new Date(o+"T12:00:00").toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}):""}var pt={want_to_watch:"Want to Watch",watching:"Watching",watched:"Watched",paused:"Paused",suggested:"Suggested",dismissed:"Not for us"},ht=["new","soon","upnext","suggested"],ee=["Too stressful","Too slow","Feels dated","Not our genre","Already seen it","Just not interested"],st={want_to_watch:"#6d6d6d",watching:"#1976d2",watched:"#2e7d32",paused:"#e65100",suggested:"#7b1fa2",dismissed:"#6d6d6d"},W=class extends b{constructor(){super(),this._items=[],this._section=null,this._detail=null,this._dismissing=null,this._toast=null,this._loaded=!1,this._unsubEvents=null,this._seasonCache={},this._modal=null,this._libraryFilter="all",this._previewLoading=!1,this._previewSeq=0,this._onKeydown=t=>{t.key==="Escape"&&this._closeTopLayer()},this._searchQuery="",this._searchType="",this._searchResults=null,this._searching=!1,this._adding=new Set,this._searchSeq=0}static getConfigElement(){return document.createElement("polr-tmdb-card-editor")}static getStubConfig(){return{title:"Watch Tonight"}}setConfig(t){let e=(t.sections||ht).filter(s=>ht.includes(s));if(!e.length)throw new Error("sections must include at least one of: "+ht.join(", "));let i=(t.tvs||[]).map(s=>typeof s=="string"?{entity:s}:s);for(let s of i)if(!s.entity||!s.entity.startsWith("media_player."))throw new Error("Each entry in tvs needs a media_player entity");this._config={title:"Watch Tonight",search:!0,...t,sections:e,tvs:i},t.default_section&&e.includes(t.default_section)?this._section=t.default_section:e.includes(this._section)||(this._section=e[0])}set hass(t){this._hass=t,this._loaded||(this._loaded=!0,this._loadItems(),this._subscribeEvents())}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKeydown),this._loaded&&!this._unsubEvents&&(this._loadItems(),this._subscribeEvents())}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKeydown),clearTimeout(this._searchTimer),this._unsubEvents&&this._unsubEvents.then(t=>t&&t()),this._unsubEvents=null}async _loadItems(){try{this._items=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/items"})||[]}catch(t){console.error("polr-tmdb-card: load failed",t)}}async _subscribeEvents(){this._unsubEvents=this._hass.connection.subscribeEvents(t=>{this._loadItems();let e=t.data.item;!this._detail||!e||(e.item_id===this._detail.item_id?this._detail=t.data.action==="remove"?null:e:!this._detail.item_id&&this._sameTitle(e,this._detail)&&(this._detail=e))},"polr_tmdb_updated")}async _updateItem(t,e){let i=Object.fromEntries(Object.entries(e).filter(([,s])=>s!=null));try{await this._hass.connection.sendMessagePromise({type:"polr_tmdb/update",item_id:t,...i})}catch(s){console.error("polr-tmdb-card: update failed",s)}}async _callService(t,e,i){try{await this._hass.callService("polr_tmdb",t,e),i&&this._showToast(i)}catch(s){console.error(`polr-tmdb-card: ${t} failed`,s),this._showToast(s?.message||"Something went wrong")}}_showToast(t){this._toast=t,clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>this._toast=null,3500)}_tvName(t){return t.name||this._hass?.states?.[t.entity]?.attributes?.friendly_name||t.entity}_openOnTv(t,e){this._showToast(`Opening ${t.title} on ${this._tvName(e)}\u2026`),this._callService("open_on_tv",{item_id:t.item_id,entity_id:e.entity})}_addSuggestion(t){this._callService("update_status",{item_id:t.item_id,status:"want_to_watch"},`Added ${t.title} to Up Next`),this._detail?.item_id===t.item_id&&(this._detail={...t,status:"want_to_watch"})}_dismiss(t,e){this._dismissing=null,this._callService("dismiss",{item_id:t.item_id,reason:e||""},`Passed on ${t.title}`),this._detail?.item_id===t.item_id&&(this._detail=null)}async _removeItem(t){if(confirm("Remove from watchlist?"))try{await this._hass.connection.sendMessagePromise({type:"polr_tmdb/remove",item_id:t})}catch(e){console.error("polr-tmdb-card: remove failed",e)}}async _fetchSeasonEpisodes(t,e){let i=`${t}:${e}`;if(!this._seasonCache[i])try{let s=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/season",tmdb_id:t,season_number:e});this._seasonCache[i]=s||[],this.requestUpdate()}catch(s){console.error("season fetch",s)}}_getSeasonEpisodes(t,e){if(!e)return[];let i=`${t}:${e}`;return this._seasonCache[i]?this._seasonCache[i]:(this._fetchSeasonEpisodes(t,e),null)}_openModal(t){this._modal=t,t==="search"&&this.updateComplete.then(()=>this.renderRoot.querySelector(".search-input")?.focus())}_closeModal(){this._modal=null,this._dismissing=null}_closeDetail(){this._detail=null,this._dismissing=null,this._previewSeq++,this._previewLoading=!1}_closeTopLayer(){this._detail?this._closeDetail():this._modal&&this._closeModal()}_sameTitle(t,e){return t.tmdb_id===e.tmdb_id&&t.media_type===e.media_type}_onSearchInput(t){this._searchQuery=t,clearTimeout(this._searchTimer),this._searchTimer=setTimeout(()=>this._runSearch(),400)}_setSearchType(t){this._searchType=t,this._runSearch()}async _runSearch(){clearTimeout(this._searchTimer);let t=this._searchQuery.trim(),e=++this._searchSeq;if(!t){this._searchResults=null,this._searching=!1;return}this._searching=!0;let i={query:t,limit:20};this._searchType&&(i.media_type=this._searchType);try{let s=await this._hass.connection.sendMessagePromise({type:"call_service",domain:"polr_tmdb",service:"search",service_data:i,return_response:!0});e===this._searchSeq&&(this._searchResults=s?.response?.results||[])}catch(s){console.error("polr-tmdb-card: search failed",s),e===this._searchSeq&&(this._searchResults=[],this._showToast(s?.message||"Search failed"))}finally{e===this._searchSeq&&(this._searching=!1)}}_itemForResult(t){return this._items.find(e=>this._sameTitle(e,t))}_openResult(t){let e=this._itemForResult(t);if(e){this._detail=e;return}this._openPreview(t)}async _openPreview(t){let e=++this._previewSeq;this._detail={item_id:null,status:null,tmdb_id:t.tmdb_id,media_type:t.media_type,title:t.title,poster_path:t.poster_url,overview:t.overview,vote_average:t.rating,release_date:t.year||""},this._previewLoading=!0;try{let i=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/preview",tmdb_id:t.tmdb_id,media_type:t.media_type});e===this._previewSeq&&!this._detail?.item_id&&(this._detail=i)}catch(i){console.error("polr-tmdb-card: preview failed",i)}finally{e===this._previewSeq&&(this._previewLoading=!1)}}async _addTitle(t,e="want_to_watch"){let i=`${t.media_type}:${t.tmdb_id}`;this._adding=new Set([...this._adding,i]);try{let s=await this._hass.connection.sendMessagePromise({type:"polr_tmdb/add",tmdb_id:t.tmdb_id,media_type:t.media_type,status:e});await this._loadItems(),this._showToast(`Added ${t.title} to ${e==="watching"?"Watching":"Up Next"}`),this._detail&&!this._detail.item_id&&this._sameTitle(this._detail,t)&&(this._detail=s)}catch(s){console.error("polr-tmdb-card: add failed",s),this._showToast(s?.message||"Couldn't add that title")}finally{let s=new Set(this._adding);s.delete(i),this._adding=s}}_isAdding(t){return this._adding.has(`${t.media_type}:${t.tmdb_id}`)}_libraryItems(t){return[...t==="all"?this._items.filter(i=>i.status!=="dismissed"):this._items.filter(i=>i.status===t)].sort((i,s)=>i.title.localeCompare(s.title))}_today(){let t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}_hasNewEpisode(t){if(t.status==="watched")return!1;if(t.has_new_episode)return!0;let e=t.next_episode_to_air;if(!e?.air_date||e.air_date>this._today())return!1;let i=t.current_season||0,s=t.current_episode||0;return i===0&&s===0?!0:e.season_number>i||e.season_number===i&&e.episode_number>s}_daysUntil(t){if(!t)return null;let e=new Date(t+"T12:00:00")-new Date;return Math.ceil(e/864e5)}_isComingSoon(t){if(t.media_type!=="tv"||t.status!=="watching"||this._hasNewEpisode(t))return!1;let e=t.next_episode_to_air;if(!e?.air_date)return!1;let i=this._daysUntil(e.air_date);return i!==null&&i>0&&i<=14}get _newItems(){return this._items.filter(t=>["watching","paused"].includes(t.status)&&this._hasNewEpisode(t)).sort((t,e)=>t.title.localeCompare(e.title))}get _soonItems(){return this._items.filter(t=>this._isComingSoon(t)).sort((t,e)=>{let i=t.next_episode_to_air?.air_date||"9999",s=e.next_episode_to_air?.air_date||"9999";return i.localeCompare(s)})}get _upNextItems(){return this._items.filter(t=>t.status==="want_to_watch").sort((t,e)=>t.title.localeCompare(e.title))}get _suggestedItems(){return this._items.filter(t=>t.status==="suggested").sort((t,e)=>(e.suggestion?.suggested_at||"").localeCompare(t.suggestion?.suggested_at||""))}_itemsFor(t){return t==="new"?this._newItems:t==="soon"?this._soonItems:t==="suggested"?this._suggestedItems:this._upNextItems}render(){if(!this._config)return d;let t={new:"New",soon:"Coming Soon",upnext:"Up Next",suggested:"Suggested"},e=this._config.sections.map(s=>({id:s,label:t[s],count:this._itemsFor(s).length})),i=this._itemsFor(this._section);return n`
      <ha-card>
        <div class="card-header">
          <div class="section-pills">
            ${e.length===1?n`<span class="single-title">${this._config.title}</span>`:e.map(({id:s,label:r,count:a})=>n`
              <button
                class="pill ${this._section===s?"pill-active":""} ${a===0?"pill-empty":""}"
                @click=${()=>this._section=s}
              >
                ${r}${a>0?n`<span class="pill-count">${a}</span>`:d}
              </button>
            `)}
          </div>
          <div class="header-actions">
            ${this._config.search?n`
              <button class="manage-btn" title="Search" @click=${()=>this._openModal("search")}>
                <ha-icon icon="mdi:magnify"></ha-icon>
              </button>`:d}
            <button class="manage-btn" title="Library" @click=${()=>this._openModal("library")}>
              <ha-icon icon="mdi:bookshelf"></ha-icon>
            </button>
          </div>
        </div>

        ${i.length===0?this._renderEmpty():this._section==="suggested"?n`<div class="suggestion-list">${B(i,s=>s.item_id,s=>this._renderSuggestion(s))}</div>`:n`<div class="poster-row">${B(i,s=>s.item_id,s=>this._renderPoster(s))}</div>`}

        ${this._toast?n`<div class="toast">${this._toast}</div>`:d}
      </ha-card>

      ${this._modal==="search"?this._renderSearchModal():d}
      ${this._modal==="library"?this._renderLibraryModal():d}
      ${this._detail?this._renderDetailDialog():d}
    `}_renderModal(t,e,i=d){return n`
      <div class="modal-overlay" @click=${s=>s.target===s.currentTarget&&this._closeModal()}>
        <div class="modal" role="dialog" aria-label="${t}">
          <div class="modal-header">
            <span class="modal-title">${t}</span>
            <button class="modal-close" title="Close" @click=${()=>this._closeModal()}>✕</button>
          </div>
          ${i}
          <div class="modal-body">${e}</div>
          ${this._toast&&!this._detail?n`<div class="toast">${this._toast}</div>`:d}
        </div>
      </div>
    `}_renderSearchModal(){let t=[["","All"],["tv","TV"],["movie","Movies"]],e=this._searchResults,i=n`
      <div class="modal-toolbar">
        <input class="search-input" type="search" placeholder="Search movies & shows…" enterkeyhint="search"
          .value=${this._searchQuery}
          @input=${r=>this._onSearchInput(r.target.value)}
          @keydown=${r=>r.key==="Enter"&&this._runSearch()} />
        <div class="chip-row">
          ${t.map(([r,a])=>n`
            <button class="pill ${this._searchType===r?"pill-active":""}" @click=${()=>this._setSearchType(r)}>${a}</button>
          `)}
        </div>
      </div>
    `,s=this._searching&&!e?.length?n`<div class="modal-note">Searching…</div>`:e===null?n`<div class="modal-note">Find a movie or show. Tap it for details, or + to add it to Up Next.</div>`:e.length===0?n`<div class="modal-note">No matches for “${this._searchQuery.trim()}”.</div>`:n`<div class="modal-grid">${B(e,r=>`${r.media_type}:${r.tmdb_id}`,r=>this._renderSearchTile(r))}</div>`;return this._renderModal("Search",s,i)}_renderSearchTile(t){let e=this._itemForResult(t),i=this._isAdding(t),s=[t.year,t.media_type==="tv"?"TV":"Movie"].filter(Boolean).join(" \xB7 ");return n`
      <div class="poster" @click=${()=>this._openResult(t)}>
        ${t.poster_url?n`<img class="poster-img" src="${t.poster_url}" alt="${t.title}" loading="lazy" />`:n`<div class="poster-fallback">${t.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}
        ${e?n`<span class="status-badge" style="background:${st[e.status]||"#6d6d6d"}">${pt[e.status]||e.status}</span>`:n`<button class="quick-add" title="Add to Up Next" ?disabled=${i}
              @click=${r=>{r.stopPropagation(),this._addTitle(t)}}>
              <ha-icon icon="${i?"mdi:loading":"mdi:plus"}"></ha-icon>
            </button>`}
        <div class="poster-title">${t.title}</div>
        <div class="poster-sub">${s}</div>
      </div>
    `}_renderLibraryModal(){let t=[["all","All"],["watching","Watching"],["want_to_watch","Want to Watch"],["suggested","Suggested"],["paused","Paused"],["watched","Watched"],["dismissed","Not for us"]],e=this._libraryItems(this._libraryFilter),i=n`
      <div class="modal-toolbar">
        <div class="chip-row chip-row-scroll">
          ${t.map(([r,a])=>{let p=this._libraryItems(r).length;return n`
              <button class="pill ${this._libraryFilter===r?"pill-active":""} ${p===0?"pill-empty":""}"
                @click=${()=>this._libraryFilter=r}>
                ${a}${p>0?n`<span class="pill-count">${p}</span>`:d}
              </button>`})}
        </div>
      </div>
    `,s=e.length===0?n`<div class="modal-note">
          ${this._libraryFilter==="all"?"Your list is empty.":"Nothing here."}
          ${this._config.search?n`<button class="action" @click=${()=>this._openModal("search")}>
            <ha-icon icon="mdi:magnify"></ha-icon> Find something</button>`:d}
        </div>`:n`<div class="modal-grid">${B(e,r=>r.item_id,r=>this._renderPoster(r,!0))}</div>`;return this._renderModal("Library",s,i)}_renderEmpty(){let t={new:{icon:"mdi:check-circle-outline",heading:"All caught up!",sub:"No new episodes to watch right now."},soon:{icon:"mdi:calendar-blank-outline",heading:"Nothing coming soon",sub:"No new episodes airing in the next 2 weeks."},upnext:{icon:"mdi:playlist-play",heading:"Queue is empty",sub:"Add something to your watchlist to get started."},suggested:{icon:"mdi:lightbulb-on-outline",heading:"No suggestions right now",sub:"New ones arrive with the next weekly pass."}},{icon:e,heading:i,sub:s}=t[this._section]||t.upnext;return n`
      <div class="empty-state">
        <ha-icon class="empty-icon" .icon=${e}></ha-icon>
        <div class="empty-heading">${i}</div>
        <div class="empty-sub">${s}</div>
        ${this._section==="upnext"&&this._config.search?n`
          <button class="action" @click=${()=>this._openModal("search")}>
            <ha-icon icon="mdi:magnify"></ha-icon> Find something
          </button>`:d}
      </div>
    `}_renderPoster(t,e=!1){let i=t.next_episode_to_air,s=this._isComingSoon(t)&&i?.air_date?this._daysUntil(i.air_date):null;return n`
      <div class="poster" @click=${()=>this._detail=t}>
        ${t.poster_path?n`<img class="poster-img" src="${t.poster_path}" alt="${t.title}" loading="lazy" />`:n`<div class="poster-fallback">${t.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}

        ${this._hasNewEpisode(t)?n`<span class="new-badge">NEW</span>`:d}
        ${e&&this._libraryFilter==="all"?n`
          <span class="status-badge" style="background:${st[t.status]||"#6d6d6d"}">${pt[t.status]||t.status}</span>
        `:d}

        ${s!==null?n`
          <span class="soon-badge">${s===1?"Tomorrow":`${s}d`}</span>
        `:d}

        <div class="poster-title">${t.title}</div>
      </div>
    `}_streamingNames(t){return(t.watch_providers?.flatrate||[]).map(e=>e.provider_name)}_renderSuggestion(t){let e=[t.release_date?.slice(0,4),t.media_type==="tv"&&t.seasons?`${t.seasons} season${t.seasons===1?"":"s"}`:null,t.watch_link?.service||this._streamingNames(t)[0]].filter(Boolean).join(" \xB7 ");return n`
      <div class="suggestion">
        <div class="suggestion-poster" @click=${()=>this._detail=t}>
          ${t.poster_path?n`<img src="${t.poster_path}" alt="${t.title}" loading="lazy" />`:n`<div class="poster-fallback">${t.media_type==="tv"?"\u{1F4FA}":"\u{1F3AC}"}</div>`}
        </div>
        <div class="suggestion-body">
          <div class="suggestion-title" @click=${()=>this._detail=t}>${t.title}</div>
          <div class="suggestion-meta">${e}</div>
          ${t.suggestion?.reason?n`<div class="suggestion-reason">${t.suggestion.reason}</div>`:d}
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
                  </a>`:d}
              </div>
              ${this._renderTvButtons(t)}`}
        </div>
      </div>
    `}_renderTvButtons(t){return!t.watch_link?.url||!this._config.tvs.length?d:n`
      <div class="tv-row">
        <span class="tv-label">Open on</span>
        ${this._config.tvs.map(e=>n`
          <button class="tv-btn" @click=${()=>this._openOnTv(t,e)}>
            <ha-icon icon="mdi:television-play"></ha-icon> ${this._tvName(e)}
          </button>
        `)}
      </div>
    `}_renderDismissChooser(t){return n`
      <div class="dismiss-chooser">
        <div class="dismiss-prompt">What's the reason?</div>
        <div class="dismiss-reasons">
          ${ee.map(e=>n`<button class="reason-chip" @click=${()=>this._dismiss(t,e)}>${e}</button>`)}
        </div>
        <div class="dismiss-custom">
          <input class="dismiss-input" type="text" maxlength="200" placeholder="Or say why…"
            @keydown=${e=>{e.key==="Enter"&&e.target.value.trim()&&this._dismiss(t,e.target.value.trim())}} />
          <button class="action" @click=${()=>this._dismissing=null}>Cancel</button>
        </div>
      </div>
    `}_renderProgress(t){let e=t.seasons||0,i=t.current_season||"",s=i?this._getSeasonEpisodes(t.tmdb_id,i):[],r=t.last_episode_to_air,a=t.next_episode_to_air,p=this._today(),l=s?s.filter(g=>!g.air_date||g.air_date<=p):[],u=a&&a.air_date&&a.air_date<=p,f=t.current_season||0,c=t.current_episode||0,_=a&&(a.season_number>f||a.season_number===f&&a.episode_number>c),h=t.has_new_episode||u&&_,m=t.has_new_episode?r:u&&_?a:null;return n`
      <div class="section-label">Progress ${e?`(${e} seasons)`:""}</div>

      ${h&&m?n`
        <div class="new-ep-alert">
          <strong>New:</strong> S${m.season_number}E${m.episode_number}${m.name?` \xB7 ${m.name}`:""}
        </div>
      `:d}

      ${a&&!u?n`
        <div class="upcoming-ep">Next: S${a.season_number}E${a.episode_number}${a.air_date?` \xB7 ${te(a.air_date)}`:""}</div>
      `:d}

      <div class="progress-row">
        <label class="select-label">
          <span>Season</span>
          <select class="ep-select" @change=${g=>{let P={current_season:parseInt(g.target.value)||null};t.status==="want_to_watch"&&(P.status="watching"),this._updateItem(t.item_id,P),this._detail={...t,...P,current_episode:null}}}>
            <option value="">—</option>
            ${Array.from({length:e},(g,v)=>v+1).map(g=>n`
              <option value="${g}" ?selected=${i===g}>Season ${g}</option>
            `)}
          </select>
        </label>
        <label class="select-label">
          <span>Episode</span>
          <select class="ep-select" ?disabled=${!i||s===null}
            @change=${g=>{let v=g.target.value?parseInt(g.target.value,10):null;v&&(this._updateItem(t.item_id,{current_episode:v}),this._detail={...t,current_episode:v})}}>
            <option value="">—</option>
            ${s===null?n`<option disabled>Loading…</option>`:l.map(g=>n`
                  <option value="${g.episode_number}" ?selected=${t.current_episode===g.episode_number}>
                    E${g.episode_number}${g.name?` \xB7 ${g.name}`:""}
                  </option>
                `)}
          </select>
        </label>
      </div>

      ${r?n`<div class="ep-latest-hint">Latest aired: S${r.season_number}E${r.episode_number}</div>`:d}
    `}_renderItemControls(t){return n`
      ${this._renderTvButtons(t)}

      <div class="section-label">Status</div>
      <div class="status-pills">
        ${["want_to_watch","watching","watched","paused"].map(e=>n`
          <button class="status-pill ${t.status===e?"status-pill-active":""}"
            style="${t.status===e?`background:${st[e]};border-color:${st[e]}`:""}"
            @click=${async()=>{await this._updateItem(t.item_id,{status:e}),this._detail={...t,status:e}}}
          >${pt[e]}</button>
        `)}
      </div>

      ${t.media_type==="tv"?this._renderProgress(t):d}

      <div class="section-label">Your Rating</div>
      <div class="stars">
        ${[1,2,3,4,5,6,7,8,9,10].map(e=>n`
          <span class="star ${(t.rating||0)>=e?"star-on":""}"
            @click=${async()=>{await this._updateItem(t.item_id,{rating:e}),this._detail={...t,rating:e}}}>★</span>
        `)}
        ${t.rating?n`<span class="rating-num">${t.rating}/10</span>`:d}
      </div>

      <div class="section-label">Notes</div>
      <textarea class="notes" placeholder="Your notes…" .value=${t.notes||""}
        @change=${e=>{this._updateItem(t.item_id,{notes:e.target.value}),this._detail={...t,notes:e.target.value}}}></textarea>
    `}_renderPreviewActions(t){let e=this._isAdding(t);return n`
      <div class="preview-actions">
        <button class="action action-primary" ?disabled=${e} @click=${()=>this._addTitle(t,"want_to_watch")}>
          <ha-icon icon="${e?"mdi:loading":"mdi:playlist-plus"}"></ha-icon> Add to Up Next
        </button>
        <button class="action" ?disabled=${e} @click=${()=>this._addTitle(t,"watching")}>
          <ha-icon icon="mdi:play-circle-outline"></ha-icon> Watching now
        </button>
      </div>
      ${this._previewLoading?n`<div class="preview-loading">Loading details…</div>`:d}
    `}_renderDetailDialog(){let t=this._detail;return n`
      <div class="dialog-overlay" @click=${e=>e.target===e.currentTarget&&this._closeDetail()}>
        <div class="dialog">
          ${t.backdrop_path?n`<div class="dialog-backdrop" style="background-image:url('${t.backdrop_path}')"></div>`:d}

          <button class="dialog-close" @click=${()=>this._closeDetail()}>✕</button>
          ${t.item_id?n`
            <button class="dialog-delete" title="Remove from watchlist" @click=${()=>this._removeItem(t.item_id)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
          `:d}

          <div class="dialog-content">
            <div class="dialog-left">
              ${t.poster_path?n`<img class="dialog-poster" src="${t.poster_path}" alt="${t.title}" />`:d}
            </div>
            <div class="dialog-right">
              <div class="dialog-title">${t.title}</div>
              <div class="dialog-meta">
                ${[t.release_date?.slice(0,4),t.genres?.slice(0,3).join(", "),t.vote_average?`\u2605 ${t.vote_average}`:null,t.networks?.[0]].filter(Boolean).join(" \xB7 ")}
              </div>
              <p class="dialog-overview">${t.overview}</p>

              ${t.status==="suggested"?n`
                <div class="suggestion-box">
                  ${t.suggestion?.reason?n`<div><strong>Why it's here:</strong> ${t.suggestion.reason}</div>`:d}
                  ${this._dismissing===t.item_id?this._renderDismissChooser(t):n`<div class="suggestion-actions">
                        <button class="action action-primary" @click=${()=>this._addSuggestion(t)}>
                          <ha-icon icon="mdi:playlist-plus"></ha-icon> Add to Up Next
                        </button>
                        <button class="action" @click=${()=>this._dismissing=t.item_id}>
                          <ha-icon icon="mdi:thumb-down-outline"></ha-icon> Not for us
                        </button>
                      </div>`}
                </div>
              `:d}

              ${t.item_id?this._renderItemControls(t):this._renderPreviewActions(t)}

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
                  `:d}
                  ${t.watch_providers.rent?.length?n`
                    <div class="provider-row">
                      <span class="provider-type">Rent</span>
                      ${t.watch_providers.rent.map(e=>n`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${e.logo_path}" title="${e.provider_name}" alt="${e.provider_name}" />
                      `)}
                    </div>
                  `:d}
                  ${t.watch_providers.buy?.length?n`
                    <div class="provider-row">
                      <span class="provider-type">Buy</span>
                      ${t.watch_providers.buy.map(e=>n`
                        <img class="provider-logo" src="https://image.tmdb.org/t/p/original${e.logo_path}" title="${e.provider_name}" alt="${e.provider_name}" />
                      `)}
                    </div>
                  `:d}
                </div>
              `:d}

              ${t.trailer_url?n`
                <div class="dialog-footer">
                  <a class="trailer-btn" href="${t.trailer_url}" target="_blank" rel="noopener">▶ Trailer</a>
                </div>
              `:d}
            </div>
          </div>
        </div>
      </div>
    `}};N(W,"properties",{_hass:{state:!0},_config:{state:!0},_items:{state:!0},_section:{state:!0},_detail:{state:!0},_dismissing:{state:!0},_toast:{state:!0},_modal:{state:!0},_libraryFilter:{state:!0},_previewLoading:{state:!0},_searchQuery:{state:!0},_searchType:{state:!0},_searchResults:{state:!0},_searching:{state:!0},_adding:{state:!0}}),N(W,"styles",Q`
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
    .manage-btn:hover { color: var(--primary-color); }
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
    .search-input {
      width: 100%; box-sizing: border-box; padding: 9px 14px; border-radius: 20px;
      border: 1px solid var(--divider-color, #555); background: transparent;
      color: var(--primary-text-color); font-size: 0.95rem; font-family: inherit;
    }
    .search-input:focus { outline: none; border-color: var(--primary-color); }
    .chip-row { display: flex; gap: 6px; }
    .chip-row-scroll { overflow-x: auto; scrollbar-width: none; padding-bottom: 2px; }
    .chip-row-scroll::-webkit-scrollbar { display: none; }
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
    .preview-actions { display: flex; flex-wrap: wrap; gap: 6px; margin: 4px 0 6px; }
    .preview-actions .action[disabled] { opacity: 0.7; cursor: default; }
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
  `);var q=class extends b{setConfig(t){this._config=t}_valueChanged(t){let e=t.target.dataset.field,i=t.target.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,[e]:i}}}))}render(){return this._config?n`
      <div class="editor">
        <label>Title
          <input type="text" data-field="title" .value=${this._config.title||""} @change=${this._valueChanged} />
        </label>
      </div>
    `:d}};N(q,"properties",{hass:{type:Object},_config:{state:!0}}),N(q,"styles",Q`
    .editor { display: flex; flex-direction: column; gap: 10px; padding: 8px; }
    label { display: flex; flex-direction: column; gap: 4px; font-size: 0.9rem; }
    input { padding: 6px; border-radius: 4px; border: 1px solid var(--divider-color, #ccc); background: transparent; color: inherit; }
  `);customElements.define("polr-tmdb-card",W);customElements.define("polr-tmdb-card-editor",q);window.customCards=window.customCards||[];window.customCards.push({type:"polr-tmdb-card",name:"TMDB Shows & Movies",description:"What to watch tonight, and what to try next.",preview:!1});
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
